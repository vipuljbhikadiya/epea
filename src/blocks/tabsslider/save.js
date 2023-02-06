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
			<div id={anchor ? anchor : null} className="tabs-slider">
				<div className={`tabs-slider__nav splide`}>
					<div className="splide__track">
						<div className="splide__list">
							{innerItem && (
								<>
									{innerItem.map((item, index) => {
										return (
											<div
												data-index={index}
												className={
													"tabs-slider__nav-item splide__slide"
												}
											>
												<span className="headline headline--style-three headline--color-three">
													{item.attributes.tabHead}
												</span>
												<span className="text text--style-three text--color-three">
													{item.attributes.tabDesc}
												</span>
											</div>
										);
									})}
								</>
							)}
						</div>
					</div>
				</div>		
				<div className="tabs-slider__content splide">
					<div className="splide__track">
						<div className="splide__list">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
 