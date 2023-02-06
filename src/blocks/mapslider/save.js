/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { InnerBlocks } from "@wordpress/block-editor";

/**
 * External dependencies
 */
import MapImage from '../../assets/images/epea-europe-map.svg';
import { isEmpty } from 'lodash';

import PinAustria from '../../assets/images/epea-pins-austria.svg';
import PinBelgium from '../../assets/images/epea-pins-belgium.svg';
import PinEngland from '../../assets/images/epea-pins-england.svg';
import PinGermany from '../../assets/images/epea-pins-germany.svg';
import PinLuxembourg from '../../assets/images/epea-pins-luxembourg.svg';
import PinNetherlands from '../../assets/images/epea-pins-netherlands.svg';
import PinSwitzerland from '../../assets/images/epea-pins-switzerland.svg';

export default class Save extends Component {
  	render() {
    	const { 
      		anchor,
      		innerItem,
    	} = this.props.attributes;

    	return (
      		<>
				<div
					id={anchor ? anchor : null}
					className="slider-map"
				>
					<div className="slider-map__wrapper">
						<div className="slider-map__visual">
							<div className="slider-map__visual-helper">
								{innerItem && (
									<>
										<img src={MapImage} alt="epea map" className="slider-map__background" loading="lazy" />
										{innerItem.map((item, index) => {
											let style = {};
											let flagPin = {};
											if (!isEmpty(item)) {
												style = {
													left:
														item.attributes
															.markerXPosition + '%',
													top:
														item.attributes
															.markerYPosition + '%',
												};
												{(item.attributes.flag === "austria" 
													? flagPin = <img src={PinAustria} loading="lazy" />
													: (item.attributes.flag === "belgium"
														? flagPin = <img src={PinBelgium} loading="lazy" />
														: (item.attributes.flag === "england"
														  	? flagPin = <img src={PinEngland} loading="lazy" />
														  	: (item.attributes.flag === "germany"
														    	? flagPin = <img src={PinGermany} loading="lazy" />
														    	: (item.attributes.flag === "luxembourg"
														      		? flagPin = <img src={PinLuxembourg} loading="lazy" />
														      		: (item.attributes.flag === "netherlands"
														        		? flagPin = <img src={PinNetherlands} loading="lazy" />
														        		: (item.attributes.flag === "switzerland"
														          			? flagPin = <img src={PinSwitzerland} loading="lazy" />
														          			: ''
																		)
																	)
																)
															)
														)
													)
												)}
											}
											return (
												<div
													data-index={index}
													data-id={'marker--' + index}
													className={
														'slider-map__marker' +
														(index === 0
															? ' slider-map__marker--active'
															: '')
													}
													style={style}
												>
													{flagPin}
												</div>
											);
										})}
									</>
								)}
							</div>
						</div>
						<div className="slider-map__locations">
							<div class="list-link">
								<div class="list-link__item">
									<div class="list-link__helper">
										<div class="icon icon--bgcolor-six icon--color-two">
											<div class="icon__helper"></div>
											<i class="icon__visual icon-01-visual"></i>
										</div>
										<span class="headline headline--align-xs-left headline--style-seven headline--color-three">
											{__('Contact Details', 'gbblocks')}
										</span>
									</div>
								</div>
							</div>
							<div className="splide splide--map">
								<div class="splide__track">
									<div className="splide__list">
										<InnerBlocks.Content />
									</div>
								</div>
            					<div class="splide__arrows">
						  			<button class="splide__arrow splide__arrow--prev" type="button" aria-label="Go to last slide" aria-controls="rewind-example-track">
						    			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 11.762 21.714" aria-hidden="true"><g id="Group_254" data-name="Group 254" transform="translate(-1606.977 -1340.643)"><line id="Line_7" data-name="Line 7" x2="10.142" y2="10.363" transform="translate(1607.677 1361.642) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line><line id="Line_8" data-name="Line 8" x1="10.142" y2="10.363" transform="translate(1607.677 1351.5) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line></g></svg>
						  			</button>
						  			<button class="splide__arrow splide__arrow--next" type="button" aria-label="Next slide" aria-controls="rewind-example-track">
						    			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 11.762 21.714" aria-hidden="true"><g id="Group_254" data-name="Group 254" transform="translate(-1606.977 -1340.643)"><line id="Line_7" data-name="Line 7" x2="10.142" y2="10.363" transform="translate(1607.677 1361.642) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line><line id="Line_8" data-name="Line 8" x1="10.142" y2="10.363" transform="translate(1607.677 1351.5) rotate(-90)" fill="none" stroke="#000000" stroke-width="2"></line></g></svg>
						  			</button>
					  			</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}