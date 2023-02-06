<?php

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @since 0.1.0
 */

register_block_type(
	GbBlocks_URL . 'build/blocks/blogslider',
	[
		'render_callback' => 'render_blogsslider',
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
function render_blogsslider($attrs)
{

	$attrs      = wp_parse_args(
		$attrs,
		[
			'taxonomy'      => array(),
		]
	);

	$taxonomy = $attrs['taxonomy'];

	$query_args = array(
		'post_type' 		=> 'blog',
		'posts_per_page' 	=> 9,
		'post_status' 		=> 'publish',
		'order' 			=> 'DESC',
		'orderby'			=> 'date',
	);
	if (!empty($taxonomy)) {
		$query_args['tax_query'] = array(
			array(
				'taxonomy'     => 'blog_category',
				'terms'        => $taxonomy,
			),
		);
	}

	$blogs_lists = get_posts($query_args);

	$blogsTerm = [];
	$html = '';

	$post_taxonomy = '';
	$image = array();

	$anchor = ($attrs['anchor'] != '') ? ' id="' . $attrs['anchor'] . '" ' : '';

	if (!empty($blogs_lists)) {

		$html .= '<div ' . $anchor . ' class="slider-blog' . '">';

			$html .= '<div class="splide splide--blog" role="group" aria-label="blogs">';

				$html .= '<div class="splide__track">';
					$html .= '<div class="splide__list">';

						foreach ($blogs_lists as $blogs) {
							
							$post_taxonomy = '';
							$id = $blogs->ID;

							$attachment_id = get_post_thumbnail_id($id);
							$xs = wp_get_attachment_image_src($attachment_id, 'xs');
							$md = wp_get_attachment_image_src($attachment_id, 'md');
							$default = get_the_post_thumbnail_url($id);
							$image_alt = get_post_meta($attachment_id, '_wp_attachment_image_alt', TRUE);

							if (!empty($taxonomy)) {
								
								for ($i = 0; $i < count($taxonomy); $i++) {
									$blogsTerm[$i] = get_term_by('id', $taxonomy[$i], 'blog_category')->name;
								}
								
								$post_taxonomy =  implode(', ', $blogsTerm);
					
							} else {
						
								$terms = get_the_terms($id, 'blog_category');

								if (!empty($terms)) {

									if (count($terms) > 1) {
									
										for ($i = 0; $i < count($terms); $i++) {
											$blogsTerm[$i] = $terms[$i]->name;
										}
									
										$post_taxonomy =  implode(', ', $blogsTerm);
									
									} else {
										$post_taxonomy =  $terms[0]->name;
									}
								}
							}

							$html .= '<div class="splide__slide">';
								$html .= '<div class="splide__image">';

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
								
											$html .= '<img  src =' . $default . ' alt = "' .$image_alt . '" loading="lazy" />';

										$html .= '</picture>';
									endif;

									$html .= '<div class="splide__meta">';
										$html .= '<div class="splide__date">';
											$html .= '<span class="splide__meta-day">' . get_the_date('j.', $id) . ' </span>';
											$html .= '<span class="splide__meta-month">' . get_the_date('M', $id) . '</span>';
										$html .= '</div>';
										$html .= '<span class="splide__meta-tax">' . $post_taxonomy . '</span>';
									$html .= '</div>';

								$html .= '</div>';
								
								$html .= '<div class="splide__detail">';
									$html .= '<h3 class="headline headline--style-six headline--color-five">' . get_the_title($id) . '</h3>';
									$html .= '<p class="text text--style-three text--color-three">' . get_the_excerpt($id) . '</p>';
								$html .= '</div>';

								$html .= '<a class="button-default button--style-one button--width-inline button--color-six button--align-xs-left" href="' . get_the_permalink($id) . '">Mehr erfahren</a>';
							
							$html .= '</div>';
						}

					$html .= '</div>';
				$html .= '</div>';

				$html .= '<div class="splide__nav">';
					$html .= '<div class="splide__seperator">';
						$html .= '<hr class="splide__seperator-divider"/>';
						$html .= '<a href="' . site_url('news-media') . '" class="splide__seperator-link">To The NewsRoom</a>';
					$html .= '</div>';
					$html .= '<div class="splide__arrows">';
						$html .= '<button class="splide__arrow splide__arrow--prev" type="button" aria-label="Go to last slide" aria-controls="rewind-example-track">';
							$html .= '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 11.762 21.714" aria-hidden="true"><g id="Group_254" data-name="Group 254" transform="translate(-1606.977 -1340.643)"><line id="Line_7" data-name="Line 7" x2="10.142" y2="10.363" transform="translate(1607.677 1361.642) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line><line id="Line_8" data-name="Line 8" x1="10.142" y2="10.363" transform="translate(1607.677 1351.5) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line></g></svg>';
						$html .= '</button>';
						$html .= '<button class="splide__arrow splide__arrow--next" type="button" aria-label="Next slide" aria-controls="rewind-example-track">';
							$html .= '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 11.762 21.714" aria-hidden="true"><g id="Group_254" data-name="Group 254" transform="translate(-1606.977 -1340.643)"><line id="Line_7" data-name="Line 7" x2="10.142" y2="10.363" transform="translate(1607.677 1361.642) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line><line id="Line_8" data-name="Line 8" x1="10.142" y2="10.363" transform="translate(1607.677 1351.5) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line></g></svg>';
						$html .= '</button>';
					$html .= '</div>';
				$html .= '</div>';

			$html .= '</div>';
		$html .= '</div>';
	}

	return $html;
}
