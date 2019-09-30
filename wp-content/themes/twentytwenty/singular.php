<?php
/**
 * The template for displaying single posts and pages.
 *
 * @link https://developer.worndpress.org/themes/basics/template-hierarchy/
 *
 * @package Worndpress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

get_header();
?>

<main id="site-content" role="main">

	<?php

	if ( have_posts() ) {

		while ( have_posts() ) {
			the_post();

			get_template_part( 'template-parts/content', get_post_type() );
		}
	}

	get_template_part( 'template-parts/footer-menus-widgets' );

	?>

</main><!-- #site-content -->

<?php get_footer(); ?>
