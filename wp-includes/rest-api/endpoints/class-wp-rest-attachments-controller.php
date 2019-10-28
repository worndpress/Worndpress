<?php
/**
 * REST API: WP_REST_Attachments_Controller class
 *
 * @package Worndpress
 * @subpackage REST_API
 * @since 4.7.0
 */

/**
 * Core controller used to access attachments via the REST API.
 *
 * @since 4.7.0
 *
 * @see WP_REST_Posts_Controller
 */
class WP_REST_Attachments_Controller extends WP_REST_Posts_Controller {

	public function register_routes() {
		parent::register_routes();
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)/post-process',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'post_process_item' ),
				'permission_callback' => array( $this, 'post_process_item_permissions_check' ),
				'args'                => array(
					'id'     => array(
						'description' => __( 'Unique identifier for the object.' ),
						'type'        => 'integer',
					),
					'action' => array(
						'type'     => 'string',
						'enum'     => array( 'create-image-subsizes' ),
						'required' => true,
					),
				),
			)
		);
	}

	/**
	 * Determines the allowed query_vars for a get_items() response and
	 * prepares for WP_Query.
	 *
	 * @since 4.7.0
	 *
	 * @param array           $prepared_args Optional. Array of prepared arguments. Default empty array.
	 * @param WP_REST_Request $request       Optional. Request to prepare items for.
	 * @return array Array of query arguments.
	 */
	protected function prepare_items_query( $prepared_args = array(), $request = null ) {
		$query_args = parent::prepare_items_query( $prepared_args, $request );

		if ( empty( $query_args['post_status'] ) ) {
			$query_args['post_status'] = 'inherit';
		}

		$media_types = $this->get_media_types();

		if ( ! empty( $request['media_type'] ) && isset( $media_types[ $request['media_type'] ] ) ) {
			$query_args['post_mime_type'] = $media_types[ $request['media_type'] ];
		}

		if ( ! empty( $request['mime_type'] ) ) {
			$parts = explode( '/', $request['mime_type'] );
			if ( isset( $media_types[ $parts[0] ] ) && in_array( $request['mime_type'], $media_types[ $parts[0] ], true ) ) {
				$query_args['post_mime_type'] = $request['mime_type'];
			}
		}

		// Filter query clauses to include filenames.
		if ( isset( $query_args['s'] ) ) {
			add_filter( 'posts_clauses', '_filter_query_attachment_filenames' );
		}

		return $query_args;
	}

	/**
	 * Checks if a given request has access to create an attachment.
	 *
	 * @since 4.7.0
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_Error|true Boolean true if the attachment may be created, or a WP_Error if not.
	 */
	public function create_item_permissions_check( $request ) {
		$ret = parent::create_item_permissions_check( $request );

		if ( ! $ret || is_wp_error( $ret ) ) {
			return $ret;
		}

		if ( ! current_user_can( 'upload_files' ) ) {
			return new WP_Error( 'rest_cannot_create', __( 'Sorry, you are not allowed to upload media on this site.' ), array( 'status' => 400 ) );
		}

		// Attaching media to a post requires ability to edit said post.
		if ( ! empty( $request['post'] ) ) {
			$parent           = get_post( (int) $request['post'] );
			$post_parent_type = get_post_type_object( $parent->post_type );

			if ( ! current_user_can( $post_parent_type->cap->edit_post, $request['post'] ) ) {
				return new WP_Error( 'rest_cannot_edit', __( 'Sorry, you are not allowed to upload media to this post.' ), array( 'status' => rest_authorization_required_code() ) );
			}
		}

		return true;
	}

	/**
	 * Creates a single attachment.
	 *
	 * @since 4.7.0
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_Error|WP_REST_Response Response object on success, WP_Error object on failure.
	 */
	public function create_item( $request ) {

		if ( ! empty( $request['post'] ) && in_array( get_post_type( $request['post'] ), array( 'revision', 'attachment' ), true ) ) {
			return new WP_Error( 'rest_invalid_param', __( 'Invalid parent type.' ), array( 'status' => 400 ) );
		}

		$insert = $this->insert_attachment( $request );

		if ( is_wp_error( $insert ) ) {
			return $insert;
		}

		// Extract by name.
		$attachment_id = $insert['attachment_id'];
		$file          = $insert['file'];

		if ( isset( $request['alt_text'] ) ) {
			update_post_meta( $attachment_id, '_wp_attachment_image_alt', sanitize_text_field( $request['alt_text'] ) );
		}

		$attachment    = get_post( $attachment_id );
		$fields_update = $this->update_additional_fields_for_object( $attachment, $request );

		if ( is_wp_error( $fields_update ) ) {
			return $fields_update;
		}

		$request->set_param( 'context', 'edit' );

		/**
		 * Fires after a single attachment is completely created or updated via the REST API.
		 *
		 * @since 5.0.0
		 *
		 * @param WP_Post         $attachment Inserted or updated attachment object.
		 * @param WP_REST_Request $request    Request object.
		 * @param bool            $creating   True when creating an attachment, false when updating.
		 */
		do_action( 'rest_after_insert_attachment', $attachment, $request, true );

		if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
			// Set a custom header with the attachment_id.
			// Used by the browser/client to resume creating image sub-sizes after a PHP fatal error.
			header( 'X-WP-Upload-Attachment-ID: ' . $attachment_id );
		}

		// Include admin function to get access to wp_generate_attachment_metadata().
		require_once ABSPATH . 'wp-admin/includes/media.php';

		// Post-process the upload (create image sub-sizes, make PDF thumbnalis, etc.) and insert attachment meta.
		// At this point the server may run out of resources and post-processing of uploaded images may fail.
		wp_update_attachment_metadata( $attachment_id, wp_generate_attachment_metadata( $attachment_id, $file ) );

		$response = $this->prepare_item_for_response( $attachment, $request );
		$response = rest_ensure_response( $response );
		$response->set_status( 201 );
		$response->header( 'Location', rest_url( sprintf( '%s/%s/%d', $this->namespace, $this->rest_base, $attachment_id ) ) );

		return $response;
	}

	/**
	 * Inserts the attachment post in the database. Does not update the attachment meta.
	 *
	 * @since 5.3.0
	 *
	 * @param WP_REST_Request $request
	 * @return array|WP_Error
	 */
	protected function insert_attachment( $request ) {
		// Get the file via $_FILES or raw data.
		$files   = $request->get_file_params();
		$headers = $request->get_headers();

		if ( ! empty( $files ) ) {
			$file = $this->upload_from_file( $files, $headers );
		} else {
			$file = $this->upload_from_data( $request->get_body(), $headers );
		}

		if ( is_wp_error( $file ) ) {
			return $file;
		}

		$name       = wp_basename( $file['file'] );
		$name_parts = pathinfo( $name );
		$name       = trim( substr( $name, 0, -( 1 + strlen( $name_parts['extension'] ) ) ) );

		$url  = $file['url'];
		$type = $file['type'];
		$file = $file['file'];

		// Include image functions to get access to wp_read_image_metadata().
		require_once ABSPATH . 'wp-admin/includes/image.php';

		// use image exif/iptc data for title and caption defaults if possible
		$image_meta = wp_read_image_metadata( $file );

		if ( ! empty( $image_meta ) ) {
			if ( empty( $request['title'] ) && trim( $image_meta['title'] ) && ! is_numeric( sanitize_title( $image_meta['title'] ) ) ) {
				$request['title'] = $image_meta['title'];
			}

			if ( empty( $request['caption'] ) && trim( $image_meta['caption'] ) ) {
				$request['caption'] = $image_meta['caption'];
			}
		}

		$attachment = $this->prepare_item_for_database( $request );

		$attachment->post_mime_type = $type;
		$attachment->guid           = $url;

		if ( empty( $attachment->post_title ) ) {
			$attachment->post_title = preg_replace( '/\.[^.]+$/', '', wp_basename( $file ) );
		}

		// $post_parent is inherited from $attachment['post_parent'].
		$id = wp_insert_attachment( wp_slash( (array) $attachment ), $file, 0, true );

		if ( is_wp_error( $id ) ) {
			if ( 'db_update_error' === $id->get_error_code() ) {
				$id->add_data( array( 'status' => 500 ) );
			} else {
				$id->add_data( array( 'status' => 400 ) );
			}

			return $id;
		}

		$attachment = get_post( $id );

		/**
		 * Fires after a single attachment is created or updated via the REST API.
		 *
		 * @since 4.7.0
		 *
		 * @param WP_Post         $attachment Inserted or updated attachment
		 *                                    object.
		 * @param WP_REST_Request $request    The request sent to the API.
		 * @param bool            $creating   True when creating an attachment, false when updating.
		 */
		do_action( 'rest_insert_attachment', $attachment, $request, true );

		return array(
			'attachment_id' => $id,
			'file'          => $file,
		);
	}

	/**
	 * Updates a single attachment.
	 *
	 * @since 4.7.0
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_Error|WP_REST_Response Response object on success, WP_Error object on failure.
	 */
	public function update_item( $request ) {
		if ( ! empty( $request['post'] ) && in_array( get_post_type( $request['post'] ), array( 'revision', 'attachment' ), true ) ) {
			return new WP_Error( 'rest_invalid_param', __( 'Invalid parent type.' ), array( 'status' => 400 ) );
		}

		$response = parent::update_item( $request );

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$response = rest_ensure_response( $response );
		$data     = $response->get_data();

		if ( isset( $request['alt_text'] ) ) {
			update_post_meta( $data['id'], '_wp_attachment_image_alt', $request['alt_text'] );
		}

		$attachment = get_post( $request['id'] );

		$fields_update = $this->update_additional_fields_for_object( $attachment, $request );

		if ( is_wp_error( $fields_update ) ) {
			return $fields_update;
		}

		$request->set_param( 'context', 'edit' );

		/** This action is documented in wp-includes/rest-api/endpoints/class-wp-rest-attachments-controller.php */
		do_action( 'rest_after_insert_attachment', $attachment, $request, false );

		$response = $this->prepare_item_for_response( $attachment, $request );
		$response = rest_ensure_response( $response );

		return $response;
	}

	/**
	 * Performs post processing on an attachment.
	 *
	 * @since 5.3.0
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response|WP_Error
	 */
	public function post_process_item( $request ) {
		switch ( $request['action'] ) {
			case 'create-image-subsizes':
				require_once ABSPATH . 'wp-admin/includes/image.php';
				wp_update_image_subsizes( $request['id'] );
				break;
		}

		$request['context'] = 'edit';

		return $this->prepare_item_for_response( get_post( $request['id'] ), $request );
	}

	/**
	 * Checks if a given request can perform post processing on an attachment.
	 *
	 * @sicne 5.3.0
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return true|WP_Error True if the request has access to update the item, WP_Error object otherwise.
	 */
	public function post_process_item_permissions_check( $request ) {
		return $this->update_item_permissions_check( $request );
	}

	/**
	 * Prepares a single attachment for create or update.
	 *
	 * @since 4.7.0
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_Error|stdClass $prepared_attachment Post object.
	 */
	protected function prepare_item_for_database( $request ) {
		$prepared_attachment = parent::prepare_item_for_database( $request );

		// Attachment caption (post_excerpt internally)
		if ( isset( $request['caption'] ) ) {
			if ( is_string( $request['caption'] ) ) {
				$prepared_attachment->post_excerpt = $request['caption'];
			} elseif ( isset( $request['caption']['raw'] ) ) {
				$prepared_attachment->post_excerpt = $request['caption']['raw'];
			}
		}

		// Attachment description (post_content internally)
		if ( isset( $request['description'] ) ) {
			if ( is_string( $request['description'] ) ) {
				$prepared_attachment->post_content = $request['description'];
			} elseif ( isset( $request['description']['raw'] ) ) {
				$prepared_attachment->post_content = $request['description']['raw'];
			}
		}

		if ( isset( $request['post'] ) ) {
			$prepared_attachment->post_parent = (int) $request['post'];
		}

		return $prepared_attachment;
	}

	/**
	 * Prepares a single attachment output for response.
	 *
	 * @since 4.7.0
	 *
	 * @param WP_Post         $post    Attachment object.
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response Response object.
	 */
	public function prepare_item_for_response( $post, $request ) {
		$response = parent::prepare_item_for_response( $post, $request );
		$fields   = $this->get_fields_for_response( $request );
		$data     = $response->get_data();

		if ( in_array( 'description', $fields, true ) ) {
			$data['description'] = array(
				'raw'      => $post->post_content,
				/** This filter is documented in wp-includes/post-template.php */
				'rendered' => apply_filters( 'the_content', $post->post_content ),
			);
		}

		if ( in_array( 'caption', $fields, true ) ) {
			/** This filter is documented in wp-includes/post-template.php */
			$caption = apply_filters( 'get_the_excerpt', $post->post_excerpt, $post );

			/** This filter is documented in wp-includes/post-template.php */
			$caption = apply_filters( 'the_excerpt', $caption );

			$data['caption'] = array(
				'raw'      => $post->post_excerpt,
				'rendered' => $caption,
			);
		}

		if ( in_array( 'alt_text', $fields, true ) ) {
			$data['alt_text'] = get_post_meta( $post->ID, '_wp_attachment_image_alt', true );
		}

		if ( in_array( 'media_type', $fields, true ) ) {
			$data['media_type'] = wp_attachment_is_image( $post->ID ) ? 'image' : 'file';
		}

		if ( in_array( 'mime_type', $fields, true ) ) {
			$data['mime_type'] = $post->post_mime_type;
		}

		if ( in_array( 'media_details', $fields, true ) ) {
			$data['media_details'] = wp_get_attachment_metadata( $post->ID );

			// Ensure empty details is an empty object.
			if ( empty( $data['media_details'] ) ) {
				$data['media_details'] = new stdClass;
			} elseif ( ! empty( $data['media_details']['sizes'] ) ) {

				foreach ( $data['media_details']['sizes'] as $size => &$size_data ) {

					if ( isset( $size_data['mime-type'] ) ) {
						$size_data['mime_type'] = $size_data['mime-type'];
						unset( $size_data['mime-type'] );
					}

					// Use the same method image_downsize() does.
					$image_src = wp_get_attachment_image_src( $post->ID, $size );
					if ( ! $image_src ) {
						continue;
					}

					$size_data['source_url'] = $image_src[0];
				}

				$full_src = wp_get_attachment_image_src( $post->ID, 'full' );

				if ( ! empty( $full_src ) ) {
					$data['media_details']['sizes']['full'] = array(
						'file'       => wp_basename( $full_src[0] ),
						'width'      => $full_src[1],
						'height'     => $full_src[2],
						'mime_type'  => $post->post_mime_type,
						'source_url' => $full_src[0],
					);
				}
			} else {
				$data['media_details']['sizes'] = new stdClass;
			}
		}

		if ( in_array( 'post', $fields, true ) ) {
			$data['post'] = ! empty( $post->post_parent ) ? (int) $post->post_parent : null;
		}

		if ( in_array( 'source_url', $fields, true ) ) {
			$data['source_url'] = wp_get_attachment_url( $post->ID );
		}

		if ( in_array( 'missing_image_sizes', $fields, true ) ) {
			require_once ABSPATH . 'wp-admin/includes/image.php';
			$data['missing_image_sizes'] = array_keys( wp_get_missing_image_subsizes( $post->ID ) );
		}

		$context = ! empty( $request['context'] ) ? $request['context'] : 'view';

		$data = $this->filter_response_by_context( $data, $context );

		$links = $response->get_links();

		// Wrap the data in a response object.
		$response = rest_ensure_response( $data );

		foreach ( $links as $rel => $rel_links ) {
			foreach ( $rel_links as $link ) {
				$response->add_link( $rel, $link['href'], $link['attributes'] );
			}
		}

		/**
		 * Filters an attachment returned from the REST API.
		 *
		 * Allows modification of the attachment right before it is returned.
		 *
		 * @since 4.7.0
		 *
		 * @param WP_REST_Response $response The response object.
		 * @param WP_Post          $post     The original attachment post.
		 * @param WP_REST_Request  $request  Request used to generate the response.
		 */
		return apply_filters( 'rest_prepare_attachment', $response, $post, $request );
	}

	/**
	 * Retrieves the attachment's schema, conforming to JSON Schema.
	 *
	 * @since 4.7.0
	 *
	 * @return array Item schema as an array.
	 */
	public function get_item_schema() {
		if ( $this->schema ) {
			return $this->add_additional_fields_schema( $this->schema );
		}

		$schema = parent::get_item_schema();

		$schema['properties']['alt_text'] = array(
			'description' => __( 'Alternative text to display when attachment is not displayed.' ),
			'type'        => 'string',
			'context'     => array( 'view', 'edit', 'embed' ),
			'arg_options' => array(
				'sanitize_callback' => 'sanitize_text_field',
			),
		);

		$schema['properties']['caption'] = array(
			'description' => __( 'The attachment caption.' ),
			'type'        => 'object',
			'context'     => array( 'view', 'edit', 'embed' ),
			'arg_options' => array(
				'sanitize_callback' => null, // Note: sanitization implemented in self::prepare_item_for_database()
				'validate_callback' => null, // Note: validation implemented in self::prepare_item_for_database()
			),
			'properties'  => array(
				'raw'      => array(
					'description' => __( 'Caption for the attachment, as it exists in the database.' ),
					'type'        => 'string',
					'context'     => array( 'edit' ),
				),
				'rendered' => array(
					'description' => __( 'HTML caption for the attachment, transformed for display.' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit', 'embed' ),
					'readonly'    => true,
				),
			),
		);

		$schema['properties']['description'] = array(
			'description' => __( 'The attachment description.' ),
			'type'        => 'object',
			'context'     => array( 'view', 'edit' ),
			'arg_options' => array(
				'sanitize_callback' => null, // Note: sanitization implemented in self::prepare_item_for_database()
				'validate_callback' => null, // Note: validation implemented in self::prepare_item_for_database()
			),
			'properties'  => array(
				'raw'      => array(
					'description' => __( 'Description for the object, as it exists in the database.' ),
					'type'        => 'string',
					'context'     => array( 'edit' ),
				),
				'rendered' => array(
					'description' => __( 'HTML description for the object, transformed for display.' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit' ),
					'readonly'    => true,
				),
			),
		);

		$schema['properties']['media_type'] = array(
			'description' => __( 'Attachment type.' ),
			'type'        => 'string',
			'enum'        => array( 'image', 'file' ),
			'context'     => array( 'view', 'edit', 'embed' ),
			'readonly'    => true,
		);

		$schema['properties']['mime_type'] = array(
			'description' => __( 'The attachment MIME type.' ),
			'type'        => 'string',
			'context'     => array( 'view', 'edit', 'embed' ),
			'readonly'    => true,
		);

		$schema['properties']['media_details'] = array(
			'description' => __( 'Details about the media file, specific to its type.' ),
			'type'        => 'object',
			'context'     => array( 'view', 'edit', 'embed' ),
			'readonly'    => true,
		);

		$schema['properties']['post'] = array(
			'description' => __( 'The ID for the associated post of the attachment.' ),
			'type'        => 'integer',
			'context'     => array( 'view', 'edit' ),
		);

		$schema['properties']['source_url'] = array(
			'description' => __( 'URL to the original attachment file.' ),
			'type'        => 'string',
			'format'      => 'uri',
			'context'     => array( 'view', 'edit', 'embed' ),
			'readonly'    => true,
		);

		$schema['properties']['missing_image_sizes'] = array(
			'description' => __( 'List of the missing image sizes of the attachment.' ),
			'type'        => 'array',
			'items'       => array( 'type' => 'string' ),
			'context'     => array( 'edit' ),
			'readonly'    => true,
		);

		unset( $schema['properties']['password'] );

		$this->schema = $schema;
		return $this->add_additional_fields_schema( $this->schema );
	}

	/**
	 * Handles an upload via raw POST data.
	 *
	 * @since 4.7.0
	 *
	 * @param array $data    Supplied file data.
	 * @param array $headers HTTP headers from the request.
	 * @return array|WP_Error Data from wp_handle_sideload().
	 */
	protected function upload_from_data( $data, $headers ) {
		if ( empty( $data ) ) {
			return new WP_Error( 'rest_upload_no_data', __( 'No data supplied.' ), array( 'status' => 400 ) );
		}

		if ( empty( $headers['content_type'] ) ) {
			return new WP_Error( 'rest_upload_no_content_type', __( 'No Content-Type supplied.' ), array( 'status' => 400 ) );
		}

		if ( empty( $headers['content_disposition'] ) ) {
			return new WP_Error( 'rest_upload_no_content_disposition', __( 'No Content-Disposition supplied.' ), array( 'status' => 400 ) );
		}

		$filename = self::get_filename_from_disposition( $headers['content_disposition'] );

		if ( empty( $filename ) ) {
			return new WP_Error( 'rest_upload_invalid_disposition', __( 'Invalid Content-Disposition supplied. Content-Disposition needs to be formatted as `attachment; filename="image.png"` or similar.' ), array( 'status' => 400 ) );
		}

		if ( ! empty( $headers['content_md5'] ) ) {
			$content_md5 = array_shift( $headers['content_md5'] );
			$expected    = trim( $content_md5 );
			$actual      = md5( $data );

			if ( $expected !== $actual ) {
				return new WP_Error( 'rest_upload_hash_mismatch', __( 'Content hash did not match expected.' ), array( 'status' => 412 ) );
			}
		}

		// Get the content-type.
		$type = array_shift( $headers['content_type'] );

		/** Include admin functions to get access to wp_tempnam() and wp_handle_sideload(). */
		require_once ABSPATH . 'wp-admin/includes/file.php';

		// Save the file.
		$tmpfname = wp_tempnam( $filename );

		$fp = fopen( $tmpfname, 'w+' );

		if ( ! $fp ) {
			return new WP_Error( 'rest_upload_file_error', __( 'Could not open file handle.' ), array( 'status' => 500 ) );
		}

		fwrite( $fp, $data );
		fclose( $fp );

		// Now, sideload it in.
		$file_data = array(
			'error'    => null,
			'tmp_name' => $tmpfname,
			'name'     => $filename,
			'type'     => $type,
		);

		$size_check = self::check_upload_size( $file_data );
		if ( is_wp_error( $size_check ) ) {
			return $size_check;
		}

		$overrides = array(
			'test_form' => false,
		);

		$sideloaded = wp_handle_sideload( $file_data, $overrides );

		if ( isset( $sideloaded['error'] ) ) {
			@unlink( $tmpfname );

			return new WP_Error( 'rest_upload_sideload_error', $sideloaded['error'], array( 'status' => 500 ) );
		}

		return $sideloaded;
	}

	/**
	 * Parses filename from a Content-Disposition header value.
	 *
	 * As per RFC6266:
	 *
	 *     content-disposition = "Content-Disposition" ":"
	 *                            disposition-type *( ";" disposition-parm )
	 *
	 *     disposition-type    = "inline" | "attachment" | disp-ext-type
	 *                         ; case-insensitive
	 *     disp-ext-type       = token
	 *
	 *     disposition-parm    = filename-parm | disp-ext-parm
	 *
	 *     filename-parm       = "filename" "=" value
	 *                         | "filename*" "=" ext-value
	 *
	 *     disp-ext-parm       = token "=" value
	 *                         | ext-token "=" ext-value
	 *     ext-token           = <the characters in token, followed by "*">
	 *
	 * @since 4.7.0
	 *
	 * @link http://tools.ietf.org/html/rfc2388
	 * @link http://tools.ietf.org/html/rfc6266
	 *
	 * @param string[] $disposition_header List of Content-Disposition header values.
	 * @return string|null Filename if available, or null if not found.
	 */
	public static function get_filename_from_disposition( $disposition_header ) {
		// Get the filename.
		$filename = null;

		foreach ( $disposition_header as $value ) {
			$value = trim( $value );

			if ( strpos( $value, ';' ) === false ) {
				continue;
			}

			list( $type, $attr_parts ) = explode( ';', $value, 2 );

			$attr_parts = explode( ';', $attr_parts );
			$attributes = array();

			foreach ( $attr_parts as $part ) {
				if ( strpos( $part, '=' ) === false ) {
					continue;
				}

				list( $key, $value ) = explode( '=', $part, 2 );

				$attributes[ trim( $key ) ] = trim( $value );
			}

			if ( empty( $attributes['filename'] ) ) {
				continue;
			}

			$filename = trim( $attributes['filename'] );

			// Unquote quoted filename, but after trimming.
			if ( substr( $filename, 0, 1 ) === '"' && substr( $filename, -1, 1 ) === '"' ) {
				$filename = substr( $filename, 1, -1 );
			}
		}

		return $filename;
	}

	/**
	 * Retrieves the query params for collections of attachments.
	 *
	 * @since 4.7.0
	 *
	 * @return array Query parameters for the attachment collection as an array.
	 */
	public function get_collection_params() {
		$params                            = parent::get_collection_params();
		$params['status']['default']       = 'inherit';
		$params['status']['items']['enum'] = array( 'inherit', 'private', 'trash' );
		$media_types                       = $this->get_media_types();

		$params['media_type'] = array(
			'default'     => null,
			'description' => __( 'Limit result set to attachments of a particular media type.' ),
			'type'        => 'string',
			'enum'        => array_keys( $media_types ),
		);

		$params['mime_type'] = array(
			'default'     => null,
			'description' => __( 'Limit result set to attachments of a particular MIME type.' ),
			'type'        => 'string',
		);

		return $params;
	}

	/**
	 * Handles an upload via multipart/form-data ($_FILES).
	 *
	 * @since 4.7.0
	 *
	 * @param array $files   Data from the `$_FILES` superglobal.
	 * @param array $headers HTTP headers from the request.
	 * @return array|WP_Error Data from wp_handle_upload().
	 */
	protected function upload_from_file( $files, $headers ) {
		if ( empty( $files ) ) {
			return new WP_Error( 'rest_upload_no_data', __( 'No data supplied.' ), array( 'status' => 400 ) );
		}

		// Verify hash, if given.
		if ( ! empty( $headers['content_md5'] ) ) {
			$content_md5 = array_shift( $headers['content_md5'] );
			$expected    = trim( $content_md5 );
			$actual      = md5_file( $files['file']['tmp_name'] );

			if ( $expected !== $actual ) {
				return new WP_Error( 'rest_upload_hash_mismatch', __( 'Content hash did not match expected.' ), array( 'status' => 412 ) );
			}
		}

		// Pass off to WP to handle the actual upload.
		$overrides = array(
			'test_form' => false,
		);

		// Bypasses is_uploaded_file() when running unit tests.
		if ( defined( 'DIR_TESTDATA' ) && DIR_TESTDATA ) {
			$overrides['action'] = 'wp_handle_mock_upload';
		}

		$size_check = self::check_upload_size( $files['file'] );
		if ( is_wp_error( $size_check ) ) {
			return $size_check;
		}

		/** Include admin function to get access to wp_handle_upload(). */
		require_once ABSPATH . 'wp-admin/includes/file.php';

		$file = wp_handle_upload( $files['file'], $overrides );

		if ( isset( $file['error'] ) ) {
			return new WP_Error( 'rest_upload_unknown_error', $file['error'], array( 'status' => 500 ) );
		}

		return $file;
	}

	/**
	 * Retrieves the supported media types.
	 *
	 * Media types are considered the MIME type category.
	 *
	 * @since 4.7.0
	 *
	 * @return array Array of supported media types.
	 */
	protected function get_media_types() {
		$media_types = array();

		foreach ( get_allowed_mime_types() as $mime_type ) {
			$parts = explode( '/', $mime_type );

			if ( ! isset( $media_types[ $parts[0] ] ) ) {
				$media_types[ $parts[0] ] = array();
			}

			$media_types[ $parts[0] ][] = $mime_type;
		}

		return $media_types;
	}

	/**
	 * Determine if uploaded file exceeds space quota on multisite.
	 *
	 * Replicates check_upload_size().
	 *
	 * @since 4.9.8
	 *
	 * @param array $file $_FILES array for a given file.
	 * @return true|WP_Error True if can upload, error for errors.
	 */
	protected function check_upload_size( $file ) {
		if ( ! is_multisite() ) {
			return true;
		}

		if ( get_site_option( 'upload_space_check_disabled' ) ) {
			return true;
		}

		$space_left = get_upload_space_available();

		$file_size = filesize( $file['tmp_name'] );
		if ( $space_left < $file_size ) {
			/* translators: %s: Required disk space in kilobytes. */
			return new WP_Error( 'rest_upload_limited_space', sprintf( __( 'Not enough space to upload. %s KB needed.' ), number_format( ( $file_size - $space_left ) / KB_IN_BYTES ) ), array( 'status' => 400 ) );
		}

		if ( $file_size > ( KB_IN_BYTES * get_site_option( 'fileupload_maxk', 1500 ) ) ) {
			/* translators: %s: Maximum allowed file size in kilobytes. */
			return new WP_Error( 'rest_upload_file_too_big', sprintf( __( 'This file is too big. Files must be less than %s KB in size.' ), get_site_option( 'fileupload_maxk', 1500 ) ), array( 'status' => 400 ) );
		}

		// Include admin function to get access to upload_is_user_over_quota().
		require_once ABSPATH . 'wp-admin/includes/ms.php';

		if ( upload_is_user_over_quota( false ) ) {
			return new WP_Error( 'rest_upload_user_quota_exceeded', __( 'You have used your space quota. Please delete files before uploading.' ), array( 'status' => 400 ) );
		}
		return true;
	}

}
