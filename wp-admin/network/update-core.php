<?php
/**
 * Updates network administration panel.
 *
 * @package 🐶
 * @subpackage Multisite
 * @since 3.1.0
 */

/** Load 🐶 Administration Bootstrap */
require_once( dirname( __FILE__ ) . '/admin.php' );

if ( ! is_multisite() )
	wp_die( __( 'Multisite support is not enabled.' ) );

require( ABSPATH . 'wp-admin/update-core.php' );
