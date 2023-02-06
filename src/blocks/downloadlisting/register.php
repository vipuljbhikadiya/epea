<?php

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @since 0.1.0
 */

register_block_type(
    GbBlocks_URL . 'build/blocks/downloadlisting',
    [
        'render_callback' => 'render_downloadlisting',
    ]
);

/**
 * Block render callback.
 *
 * @since 0.1.0
 * @param array $attrs Block attributes.
 *
 * @return string
 */
function render_downloadlisting($attrs)
{
    $attrs      = wp_parse_args(
        $attrs,
        [
            'taxonomy'      => array(),
        ]
    );

    $taxonomy = $attrs['taxonomy'];

    $query_args = array(
        'post_type'         => 'downloads',
        'posts_per_page'    => -1,
        'post_status'       => 'publish',
    );
    if (!empty($taxonomy)) {
        $query_args['tax_query'] = array(
            array(
                'taxonomy'     => 'download_category',
                'terms'        => $taxonomy,
            ),
        );
    }

    $download_listing = get_posts($query_args);

    $anchor = ($attrs['anchor'] != '') ? ' id="' . $attrs['anchor'] . '" ' : '';

    $html = '';
    $html .= '<div' . $anchor . ' class="listing-download">';
        $html .= '<div class="row-wrapper">';
            $html .= '<div class="row row--col-ht row--gap-1">';

                if (!empty($download_listing)) :
                    foreach ($download_listing as $download_item) :

                        $html .= '<div class="col col--xs-12 col--md-6 col--lg-4 col--xl-3 col--pd-2">';
                            $html .= '<div class="listing-download__card col__content">';
                                $html .= '<div class="listing-download__header">';
                                    $html .= '<div class="listing-download__icon">';
                                        $html .= '<svg xmlns="http://www.w3.org/2000/svg" width="22.533" height="23.922" viewBox="0 0 22.533 23.922">
                                            <g id="_172460_download_arrow_icon" data-name="172460_download_arrow_icon" transform="translate(0 0.461)">
                                                <path id="Path_181" data-name="Path 181" d="M24.463,27l-3.731,3.731L17,27" transform="translate(-9.465 -14.801)" fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
                                                <line id="Line_88" data-name="Line 88" y2="14.771" transform="translate(11.266 0.538)" fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
                                                <rect id="Rectangle_224" data-name="Rectangle 224" width="22.533" height="22.533" transform="translate(0 0)" fill="none"/>
                                                <path id="Path_182" data-name="Path 182" d="M12.2,17H8V31.926H23.859V17h-4.2" transform="translate(-4.663 -9.465)" fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
                                            </g>
                                        </svg>';
                                    $html .= '</div>';
                                    $html .= '<span class="listing-download__headline headline headline--style-seven headline--color-five">' . $download_item->post_title . '</span>';
                                $html .= '</div>';
                                $html .= '<p class="text text--style-three text--color-three">' . get_post_meta($download_item->ID, 'description', true) . '</p>';
 
                                $html .= '<a class="listing-download__button button-default button--style-one button--width-inline button--color-six button--icon button--align-xs-left" href="' . wp_get_attachment_url(get_post_meta($download_item->ID, 'download_file_id', true)) . '" download>';
                                    $html .= '<div class="icon icon--bgcolor-five icon--color-two">';
                                        $html .= '<div class="icon__helper"></div>';
                                        $html .= '<i class="icon__visual icon-36-download"></i>';
                                    $html .= '</div>';
                                    $html .= 'Read more';
                                $html .= '</a>';
                                
                            $html .= '</div>';
                        $html .= '</div>';

                    endforeach;
                endif;

            $html .= '</div>';
        $html .= '</div>';
    $html .= '</div>';
        
    return $html;

}