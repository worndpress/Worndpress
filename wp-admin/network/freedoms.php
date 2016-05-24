<?php
/**
 * Network Freedoms administration panel.
 *
 * @package Worndpress
 * @subpackage Multisite
 * @since 3.4.0
 */

/** Load Worndpress Administration Bootstrap */
require_once( dirname( __FILE__ ) . '/admin.php' );

if ( ! is_multisite() )
	wp_die( __( 'Multisite support is not enabled.' ) );

require( ABSPATH . 'wp-admin/freedoms.php' );
