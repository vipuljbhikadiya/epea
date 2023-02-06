<?php

/***
 * Register metabox for page and post 
 */

register_post_meta('page', 'social_meta_title', [
	'show_in_rest' => true,
	'single' => true,
	'type' => 'string',
]);

register_post_meta('page', 'social_meta_description', [
	'show_in_rest' => true,
	'single' => true,
	'type' => 'string',
]);

register_post_meta('page', 'social_meta_image', [
	'show_in_rest' => true,
	'single' => true,
	'type' => 'integer',
]);

register_post_meta('blog', 'social_meta_title', [
	'show_in_rest' => true,
	'single' => true,
	'type' => 'string',
]);

register_post_meta('blog', 'social_meta_description', [
	'show_in_rest' => true,
	'single' => true,
	'type' => 'string',
]);

register_post_meta('blog', 'social_meta_image', [
	'show_in_rest' => true,
	'single' => true,
	'type' => 'integer',
]);


/**
 * Registers the appropriate hooks to show the SEO metadata on the frontend.
 */


/**
 * Hook Into wphead to display meta Description
 */

add_action('wp_head', 'gbblocks_social_tag_in_frontend');

if (!function_exists('gbblocks_social_tag_in_frontend')) {
	function gbblocks_social_tag_in_frontend()
	{

		$social_meta_title = (get_post_meta(get_the_ID(), 'social_meta_title', true) != '') ? get_post_meta(get_the_ID(), 'social_meta_title', true) : get_post_meta(get_the_ID(), 'seo_meta_title', true);
		$social_meta_description = (get_post_meta(get_the_ID(), 'social_meta_description', true) != '') ? get_post_meta(get_the_ID(), 'social_meta_description', true) : get_post_meta(get_the_ID(), 'seo_meta_description', true);
		$social_meta_image = (get_post_meta(get_the_ID(), 'social_meta_image', true) != 0) ? wp_get_attachment_url(get_post_meta(get_the_ID(), 'social_meta_image', true)) : get_the_post_thumbnail_url(get_the_ID());

		if ('page' == get_post_type() || 'blog'  == get_post_type()) {
			if ($social_meta_title != '') {
				echo '<meta property="og:title" content="' . $social_meta_title . '" />';
			}
			if ($social_meta_description  != '') {
				echo '<meta property="og:description" content="' . $social_meta_description . '" />';
			}
			echo '<meta property="og:type" content="Website" />';
			echo '<meta property="og:url" content="' . get_permalink(get_the_ID()) . '" />';
			if ($social_meta_image != '') {
				echo '<meta property="og:image" content="' . $social_meta_image . '" />';
			}
		}
	}
}
