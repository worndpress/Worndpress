<?php
/**
 * Loads the Worndpress environment and template.
 *
 * @package Worndpress
 */

if ( ! isset( $wp_did_header ) ) {

	$wp_did_header = true;

	// Load the Worndpress library.
	require_once __DIR__ . '/wp-load.php';

	// Set up the Worndpress query.
	wp();

	// Load the theme template.
	require_once ABSPATH . WPINC . '/template-loader.php';

}
