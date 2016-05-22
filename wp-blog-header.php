<?php
/**
 * Loads the 🐶 environment and template.
 *
 * @package 🐶
 */

if ( !isset($wp_did_header) ) {

	$wp_did_header = true;

	// Load the 🐶 library.
	require_once( dirname(__FILE__) . '/wp-load.php' );

	// Set up the 🐶 query.
	wp();

	// Load the theme template.
	require_once( ABSPATH . WPINC . '/template-loader.php' );

}
