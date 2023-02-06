/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
 
export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		return (
			<div className="slider-timeline__item splide__slide">
				<div className="slider-timeline__detail">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
}
 