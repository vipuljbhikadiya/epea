<?php

if (file_exists(get_template_directory() . '/inc/backend-cleanup.php')) {

    /**
     * feed url and other stuff from wordpress Head
     */

    require get_template_directory() . '/inc/backend-cleanup.php';
}

if (file_exists(get_template_directory() . '/inc/frontend-cleanup.php')) {

    /**
     * feed url and other stuff from wordpress Head
     */

    require get_template_directory() . '/inc/frontend-cleanup.php';
}

if (file_exists(get_template_directory() . '/inc/gbblocks/gbblocks.php')) {

    /**
     * feed url and other stuff from wordpress Head
     */

    require get_template_directory() . '/inc/gbblocks/gbblocks.php';
}

if (file_exists(get_template_directory() . '/inc/frontend-scripts.php')) {

    /**
     * feed url and other stuff from wordpress Head
     */

    require get_template_directory() . '/inc/frontend-scripts.php';
}


/**
 * remove users from sitemap page
 */
add_filter(
    'wp_sitemaps_add_provider',
    function ($provider, $name) {
        if ('users' === $name) {
            return false;
        }

        return $provider;
    },
    10,
    2
);

/**
 * remove taxonomy from sitemap page
 */
add_filter('wp_sitemaps_taxonomies', function ($taxonomies) {
    unset($taxonomies['blog_category']);
    return $taxonomies;
});

/**
 * add last modified date and time into sitemap page
 */
add_filter(
    'wp_sitemaps_posts_entry',
    function ($entry, $post) {
        $entry['lastmod'] = $post->post_modified_gmt;
        return $entry;
    },
    10,
    2
);

/**
 * remove privacy, imprint, 404 and noindex pages from sitemap page
 */
add_filter('wp_sitemaps_posts_query_args', 'exclude_no_index_page', 10, 2);
function exclude_no_index_page($args, $post_type)
{

    // get all page/post id with no index;
    if ('page' !== $post_type) {
        return $args;
    }

    $post_id_array = get_posts(array(
        'fields'          => 'ids', // Only get post IDs
        'posts_per_page'  => -1,
        'post_type' => array('page', 'posts', 'blog'),
        'meta_query' => array(
            array(
                'key' => 'seo_no_index',
                'value' => true,
                'compare' => '==',
            ),
        ),
    ));

    $excludePosts = get_posts(array(
        'post_name__in' => array("impressum", "datenschutz", "404"),
        'fields' => 'ids',
        'posts_per_page'  => -1,
        'post_type' => array('page')
    ));

    $args['post__not_in'] = array_merge($post_id_array, $excludePosts);

    return $args;
}
