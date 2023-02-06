<?php


/**
 * Server-side rendering of the `epea-theme/postcontent` block.
 *
 * @package WordPress
 */

/**
 * Renders the `epea-theme/postcontent` block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the filtered post content of the current post.
 */
function render_postcontent($attributes, $content, $block)
{


	static $seen_ids = array();

	if (!isset($block->context['postId'])) {
		return '';
	}

	$post_id = $block->context['postId'];

	if (isset($seen_ids[$post_id])) {
		$is_debug = defined('WP_DEBUG') && WP_DEBUG &&
			defined('WP_DEBUG_DISPLAY') && WP_DEBUG_DISPLAY;

		return $is_debug ?
			__('[block rendering halted]') :
			'';
	}

	$seen_ids[$post_id] = true;

	if (!in_the_loop() && have_posts()) {
		the_post();
	}

	$content = get_the_content();

	if (has_block('core/nextpage')) {
		$content .= wp_link_pages(array('echo' => 0));
	}

	$content = apply_filters('the_content', str_replace(']]>', ']]&gt;', $content));
	unset($seen_ids[$post_id]);

	if (empty($content)) {
		return '';
	}

	$wrapper_attributes = get_block_wrapper_attributes(array('class' => 'entry-content'));

	return ('<main>' .
		$content .
		'</main>'
	);
}


/**
 * Registers the `epea-theme/post-content` block on the server.
 */
register_block_type(
	GbBlocks_URL . 'build/blocks/postcontent',
	array(
		'render_callback' => 'render_postcontent',
	)
);
