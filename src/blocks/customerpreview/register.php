<?php

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @since 0.1.0
 */

register_block_type(
    GbBlocks_URL . 'build/blocks/customerpreview',
    [
        'render_callback' => 'render_customerpreview',
    ]
);


function render_customerpreview($attrs)
{
    $attrs      = wp_parse_args(
        $attrs,
        [
            'taxonomy'      => '',
        ]
    );

    $taxonomy = $attrs['taxonomy'];

    $query_args = array(
        'post_type'         => 'customers',
        'posts_per_page'    => 3,
        'post_status'       => 'publish',
        'orderby'           => 'date',
    );
    if ($taxonomy != '') {
        $query_args['tax_query'] = array(
            array(
                'taxonomy'     => 'category',
                'field'        => 'id',
                'terms'        => $taxonomy,
            ),
        );
    }

    $customer_preview = new WP_Query($query_args);

    $html = '';

    $anchor = ($attrs['anchor'] != '') ? ' id="' . $attrs['anchor'] . '" ' : '';

    if ($customer_preview->have_posts()) :

        $html .= '<div ' . $anchor . ' class="preview-customer">';

            $html .= '<input class="preview-customer__filter" type="hidden" name="customer_taxonomy" value="' . $taxonomy . '" />';

            $html .= '<div class="preview-customer__content">';
                $html .= '<div class="row-wrapper">';  
                    $html .= '<div class="row row--col-ht row--xs-left row--gap-1">';

                        $html .= get_customer_preview($customer_preview, $taxonomy);
                    
                    $html .= '</div>';
                $html .= '</div>';
            $html .= '</div>';
        $html .= '</div>';

    endif;

    return $html;
}

function get_customer_preview($customer_preview, $taxonomy)
{
    $html = '';
    $customerTerm = [];
    $post_taxonomy = '';
    $image = array();
    while ($customer_preview->have_posts()) : $customer_preview->the_post();
        $id = get_the_ID();

        $attachment_id = get_post_thumbnail_id($id);
        $xs = wp_get_attachment_image_src($attachment_id, 'xs');
        $md = wp_get_attachment_image_src($attachment_id, 'md');
        $default = get_the_post_thumbnail_url($id);
        $image_alt = get_post_meta($attachment_id, '_wp_attachment_image_alt', TRUE);

        clearstatcache();

        if ($taxonomy != '') {
            $post_taxonomy = get_term_by('id', $taxonomy, 'category')->name;
        } else {
            $terms = get_the_terms($id, 'category');

            if (!empty($terms)) {
                if (count($terms) > 1) {
                    for ($i = 0; $i < count($terms); $i++) {
                        $customerTerm[$i] = $terms[$i]->name;
                    }
                    $post_taxonomy =  implode(', ', $customerTerm);
                } else {
                    $post_taxonomy =  $terms[0]->name;
                }
            }
        }

        $html .= '<div class="preview-customer__item col col--xs-12 col--md-6 col--xl-4 col--pd-0">';
            $html .= '<div class="col__content">';

                $html .= '<div class="preview-customer__image">';

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
                $html .= '</div>';

                $html .= '<div class="preview-customer__detail">';    
                    $html .= '<h3 class="preview-customer__title headline headline--align-xs-left headline--style-six headline--color-five">' . get_the_title($id) . '</h3>';
                    $html .= '<div class="preview-customer__overlay">';
                        $html .= '<span class="preview-customer__close"></span>';
                        $html .= '<p class="preview-customer__text text text--style-three text--color-three">' . str_replace("…", "", substr(get_the_excerpt($id), 0, 110)) . '...</p>';
                        $html .= '<a class="button-default button--style-one button--width-inline button--color-six button--icon button--align-xs-left" href="' . get_the_permalink($id) . '"><div class="icon icon--bgcolor-five icon--color-two"><div class="icon__helper"></div><i class="icon__visual icon-01-visual"></i></div>Read more</a>';
                    $html .= '</div>';
                $html .= '</div>';

            $html .= '</div>';
        $html .= '</div>';

    endwhile;

    return $html;
}
