/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { InnerBlocks } from "@wordpress/block-editor";

/**
 * External dependencies
 */
import classnames from 'classnames';

export default class Save extends Component {
  render() {
    const { 
      anchor,
      innerItem,
      style,
    } = this.props.attributes;

    var loopIndex = 0;

		if (style == 'big') {

			if (innerItem.length <= 6) {
				loopIndex = 3;
			} else {
				loopIndex = 4;
			}

		} else {
			loopIndex = 4;
		}

    const tabsContent = (index, item) => {
			return (
				<div class="slider-circle__item" role="presentation">
					<a
						href={
							'#' +
							item.attributes.headline
								.replace(/[^a-zA-Z ]/g, '')
								.split(' ')
								.join('')
						}
						class={classnames('slider-circle__link')}
						id={
							item.attributes.headline
								.replace(/[^a-zA-Z ]/g, '')
								.split(' ')
								.join('') + '-tab'
						}
						data-index={index}
					>
						<h4 class="headline headline--style-three">
							{item.attributes.headline}
						</h4>
						<span className="slider-circle__separator"></span>
						<p class="text text--style-three">
							{item.attributes.description}
						</p>
					</a>
				</div>
			);
		};


    return (
      <>
				<div
					id={anchor ? anchor : null}
					className={classnames(
						`slider-circle`,
						'' != style ? `slider-circle--${style}` : null
					)}
				>
					<div className="row-wrapper">
						<div class="row">
							<div class="slider-circle__tabs">
								{innerItem && (
									<>
										{innerItem.map((item, index) => {
											if (index >= loopIndex) {
												return false;
											}
											return tabsContent(index, item);
										})}
									</>
								)}
							</div>
							{((style == 'big' && innerItem.length > loopIndex) ||
								(style == 'small' &&
									innerItem.length > loopIndex)) && (
								<div class="slider-circle__tabs">
									{innerItem.map((item, index) => {
										if (style == 'big' && index >= loopIndex) {
											return tabsContent(index, item);
										}
										if (
											style == 'small' &&
											index >= loopIndex
										) {
											return tabsContent(index, item);
										}
									})}
								</div>
							)}
							<div className="slider-circle__content">
								<InnerBlocks.Content />
							</div>
						</div>
					</div>
				</div>
			</>
    );
  }
}
