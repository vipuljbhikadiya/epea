/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
 
export default class Save extends Component {
	render() {
		const { innerItem, anchor } = this.props.attributes;
		return (
			<div id={anchor ? anchor : null} className="slider-timeline">
				<div className="slider-timeline__helper">
					<div className="slider-timeline__content splide">
						<div className="splide__track">
							<div className="splide__list">
								<InnerBlocks.Content />
							</div>
						</div>
					</div>
					<div className="splide slider-timeline__nav">
						<div class="splide__arrows">
							<button class="splide__arrow splide__arrow--prev">
								<span className="nav--arrow is--left"></span>
							</button>
							<button class="splide__arrow splide__arrow--next">
								<span className="nav--arrow is--right"></span>
							</button>
						</div>
						<div className="splide__track">
							<div className="splide__list">
								{innerItem && (
									<>
										{innerItem.map((item, index) => {
											return (
												<div
													data-index={index}
													className={
														"slider-timeline__nav-slide slider-timeline__year splide__slide"
													}
												>
													{item.attributes.year}
												</div>
											);
										})}
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}