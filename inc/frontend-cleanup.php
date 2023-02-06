<?php

/**
 * Cleanup wp head.
 */

function DT_remove_version()
{
    return '';
}
add_filter('the_generator', 'DT_remove_version');

remove_action('wp_head', 'rest_output_link_wp_head', 10);
remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);
remove_action('template_redirect', 'rest_output_link_header', 11, 0);

remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_shortlink_wp_head');

function cleanup_query_string($src)
{
    $parts = explode('?', $src);
    return $parts[0];
}
add_filter('script_loader_src', 'cleanup_query_string', 15, 1);
add_filter('style_loader_src', 'cleanup_query_string', 15, 1);

/**
 * Disable the emoji's
 */
function disable_emojis()
{
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');

    // Remove from TinyMCE
    add_filter('tiny_mce_plugins', 'disable_emojis_tinymce');
}
add_action('init', 'disable_emojis');


/**
 * Filter out the tinymce emoji plugin.
 */
function disable_emojis_tinymce($plugins)
{
    if (is_array($plugins)) {
        return array_diff($plugins, array('wpemoji'));
    } else {
        return array();
    }
}

/**
 * Filter out the global styles
 */

remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');

// remove DNS prefetch
remove_action('wp_head', 'wp_resource_hints', 2);

// dequeue unused styles
function remove_wp_block_library_css()
{

    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('wp-block-site-logo');
    wp_dequeue_style('global-styles');
}
add_action('wp_enqueue_scripts', 'remove_wp_block_library_css');

/**
 * remove classes from body 
 */
add_filter('body_class', 'remove_body_classes');
function remove_body_classes($classes)
{
    $remove_classes = ['wp-custom-logo', 'wp-embed-responsive'];
    $classes = array_diff($classes, $remove_classes);
    return $classes;
}

/**
 * Skip link from block template
 */
remove_action('wp_footer', 'the_block_template_skip_link');

add_filter('render_block', 'wp_render_theme_layout_support_flag', 11, 9);
function wp_render_theme_layout_support_flag($block_content, $block)
{
    return $block_content;
}
