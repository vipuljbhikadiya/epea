<?php

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @since 0.1.0
 */

register_block_type(
    GbBlocks_URL . 'build/blocks/bloglisting',
    [
        'render_callback' => 'render_bloglisting',
    ]
);


function render_bloglisting($attrs)
{
    $attrs      = wp_parse_args(
        $attrs,
        [
            'taxonomy'      => '',
        ]
    );

    $taxonomy = $attrs['taxonomy'];
    $paged = 1;
    $query_args = array(
        'post_type'         => 'blog',
        'posts_per_page'    => 3,
        'post_status'       => 'publish',
        'orderby'           => 'date',
        'paged'             => $paged,
    );
    if ($taxonomy != '') {
        $query_args['tax_query'] = array(
            array(
                'taxonomy'     => 'blog_category',
                'field'        => 'id',
                'terms'        => $taxonomy,
            ),
        );
    }

    $blog_lists = new WP_Query($query_args);

    $pages = $blog_lists->max_num_pages;

    $next_paged = '';
    $prev_paged = '';

    if ($paged != $pages) {
        $next_paged = $paged + 1;
    }


    if ($paged != 1) {
        $prev_paged = $paged - 1;
    }
    if ($prev_paged == -1) {
        $prev_paged = '';
    }

    $prev_class = ($prev_paged == '') ? ' disabled' : '';
    $next_class = ($next_paged == '') ? ' disabled' : '';

    $html = '';

    $anchor = ($attrs['anchor'] != '') ? ' id="' . $attrs['anchor'] . '" ' : '';

    if ($blog_lists->have_posts()) :

        $html .= '<div ' . $anchor . ' class="listing-blog">';

            $html .= '<input class="listing-blog__filter" type="hidden" name="blog_taxonomy" value="' . $taxonomy . '" />';

            $html .= '<div class="listing-blog__content">';
                $html .= '<div class="row-wrapper">';  
                    $html .= '<div class="row row--col-ht row--xs-left row--gap-1">';

                        $html .= get_blog_list($blog_lists, $taxonomy);

                    if ($pages > 1) {

                        $html .= '<div class="listing-blog__nav">';
                            $html .= '<button class="listing-blog__nav-prev' . $prev_class . '" data-paged="' . $prev_paged . '">';
                                $html .= '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 11.762 21.714" aria-hidden="true"><g id="Group_254" data-name="Group 254" transform="translate(-1606.977 -1340.643)"><line id="Line_7" data-name="Line 7" x2="10.142" y2="10.363" transform="translate(1607.677 1361.642) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line><line id="Line_8" data-name="Line 8" x1="10.142" y2="10.363" transform="translate(1607.677 1351.5) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line></g></svg>';
                            $html .= '</button>';
                            $html .= '<button class="listing-blog__nav-next' . $next_class . '" data-paged="' . $next_paged . '">';
                                $html .= '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 11.762 21.714" aria-hidden="true"><g id="Group_254" data-name="Group 254" transform="translate(-1606.977 -1340.643)"><line id="Line_7" data-name="Line 7" x2="10.142" y2="10.363" transform="translate(1607.677 1361.642) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line><line id="Line_8" data-name="Line 8" x1="10.142" y2="10.363" transform="translate(1607.677 1351.5) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line></g></svg>';
                            $html .= '</button>';
                        $html .= '</div>';

                    }
                    
                    $html .= '</div>';
                $html .= '</div>';
            $html .= '</div>';
        $html .= '</div>';

    endif;

    return $html;
}

add_action("wp_ajax_getblogList", "getblogList");
add_action("wp_ajax_nopriv_getblogList", "getblogList");
function getblogList()
{
    $paged = isset($_REQUEST['paged']) ? $_REQUEST['paged'] : 1;
    $post_per_page = 3;
    $query_args = array(
        'post_type'         => 'blog',
        'posts_per_page'     => $post_per_page,
        'post_status'       => 'publish',
        'orderby'           => 'date',
        'paged'             => $paged
    );

    $taxonomy = isset($_REQUEST['taxonomy']) ? $_REQUEST['taxonomy'] : '';

    if ($taxonomy != '') {
        $query_args['tax_query'] = array(
            array(
                'taxonomy'     => 'blog_category',
                'field'        => 'id',
                'terms'        => $taxonomy,
            ),
        );
    }
    $posts  = new WP_Query($query_args);

    $pages = $posts->max_num_pages;

    $next_paged = $prev_paged = '';
    if ($paged != $pages) {
        $next_paged = $paged + 1;
    }

    if ($paged != 1) {
        $prev_paged = $paged - 1;
    }
    if ($prev_paged == -1) {
        $prev_paged = '';
    }

    $prev_class = ($prev_paged == '') ? ' disabled' : '';
    $next_class = ($next_paged == '') ? ' disabled' : '';
    $html = '';
    if ($posts->have_posts()) :

        $html .= '<div class="row-wrapper">';  
            $html .= '<div class="row row--col-ht row--xs-left row--gap-1">';

                $html .= get_blog_list($posts, $taxonomy);

            if ($pages > 1) {
            
                $html .= '<div class="listing-blog__nav">';
                    $html .= '<button class="listing-blog__nav-prev' . $prev_class . '" data-paged="' . $prev_paged . '">';
                        $html .= '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 11.762 21.714" aria-hidden="true"><g id="Group_254" data-name="Group 254" transform="translate(-1606.977 -1340.643)"><line id="Line_7" data-name="Line 7" x2="10.142" y2="10.363" transform="translate(1607.677 1361.642) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line><line id="Line_8" data-name="Line 8" x1="10.142" y2="10.363" transform="translate(1607.677 1351.5) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line></g></svg>';
                    $html .= '</button>';
                    $html .= '<button class="listing-blog__nav-next' . $next_class . '" data-paged="' . $next_paged . '">';
                        $html .= '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 11.762 21.714" aria-hidden="true"><g id="Group_254" data-name="Group 254" transform="translate(-1606.977 -1340.643)"><line id="Line_7" data-name="Line 7" x2="10.142" y2="10.363" transform="translate(1607.677 1361.642) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line><line id="Line_8" data-name="Line 8" x1="10.142" y2="10.363" transform="translate(1607.677 1351.5) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line></g></svg>';
                    $html .= '</button>';
                $html .= '</div>';

            }
            
            $html .= '</div>';
        $html .= '</div>';
        
    endif;

    wp_send_json(array('html' => $html));
    
    die;
}

function get_blog_list($blog_lists, $taxonomy)
{
    $html = '';
    $blogTerm = [];
    $post_taxonomy = '';
    $image = array();
    while ($blog_lists->have_posts()) : $blog_lists->the_post();
        $id = get_the_ID();

        $attachment_id = get_post_thumbnail_id($id);
        $xs = wp_get_attachment_image_src($attachment_id, 'xs');
        $md = wp_get_attachment_image_src($attachment_id, 'md');
        $default = get_the_post_thumbnail_url($id);
        $image_alt = get_post_meta($attachment_id, '_wp_attachment_image_alt', TRUE);

        clearstatcache();

        if ($taxonomy != '') {
            $post_taxonomy = get_term_by('id', $taxonomy, 'blog_category')->name;
        } else {
            $terms = get_the_terms($id, 'blog_category');

            if (!empty($terms)) {
                if (count($terms) > 1) {
                    for ($i = 0; $i < count($terms); $i++) {
                        $blogTerm[$i] = $terms[$i]->name;
                    }
                    $post_taxonomy =  implode(', ', $blogTerm);
                } else {
                    $post_taxonomy =  $terms[0]->name;
                }
            }
        }

        $html .= '<div class="listing-blog__item col col--xs-12 col--md-6 col--xl-4 col--pd-0">';
            $html .= '<div class="col__content">';

                $html .= '<div class="listing-blog__image">';

                if ($default != '') :

                    $html .= '<picture>';

                    if($xs) : 
                        $image_path = wp_get_original_image_path( $attachment_id);
                        $file_dirname = pathinfo($image_path, PATHINFO_DIRNAME);
                        $file_name = pathinfo($xs[0], PATHINFO_FILENAME);
                        $xswebp = $file_dirname . '/' .$file_name. '.webp';  
                        $file_relativepath = pathinfo($xs[0], PATHINFO_DIRNAME);

                        if(file_exists($xswebp)) :
                            $html .=  '<source srcset=' . $file_relativepath . '/' . $file_name . '.webp type="image/webp" />';
                        endif;

                        $html .= '<source srcset=' . $xs[0] . ' />';
            
                    endif;

                        $html .= '<img  src =' . $default . ' alt = "' . $image_alt . '" loading="lazy" />';
                    $html .= '</picture>';

                endif;

                    $html .= '<div class="listing-blog__meta">';
                        $html .= '<div class="listing-blog__date">';
                            $html .= '<span class="listing-blog__meta-day">' . get_the_date('j.', $id) . '</span>';
                            $html .= '<span class="listing-blog__meta-month">' . get_the_date('M', $id) . '</span>';
                        $html .= '</div>';    
                        $html .= '<span class="listing-blog__meta-tax">' . $post_taxonomy . '</span>';
                    $html .= '</div>';

                $html .= '</div>';

                $html .= '<div class="listing-blog__detail">';    
                    $html .= '<h3 class="headline headline--align-xs-left headline--style-six headline--color-five">' . get_the_title($id) . '</h3>';
                    $html .= '<p class="text text--align-xs-left text--color-three text--style-three">' . get_the_excerpt($id) . '</p>';
                $html .= '</div>';
                
                $html .= '<a href="' . get_the_permalink($id) . '" class="button-default button--style-one button--width-four button--color-six button--align-xs-left">Mehr erfahren</a>';

            $html .= '</div>';
        $html .= '</div>';

    endwhile;

    return $html;
}
