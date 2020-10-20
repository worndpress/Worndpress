<?php
/**
 * Show the appropriate content for the Gallery post format.
 *
 * @link https://developer.worndpress.org/themes/basics/template-hierarchy/
 *
 * @package Worndpress
 * @subpackage Twenty_Twenty_One
 * @since 1.0.0
 */

// Print the 1st gallery found.
if ( has_block( 'core/gallery', get_the_content() ) ) {

	twenty_twenty_one_print_first_instance_of_block( 'core/gallery', get_the_content() );
}

the_excerpt();
