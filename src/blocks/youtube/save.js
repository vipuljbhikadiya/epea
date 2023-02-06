/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import classnames from 'classnames';

/***
 * Interal dependencies
 */
import { IconPlay } from '../../utils/block-icons';
import PlaceholderImg from "../../assets/images/placeholder.jpg";

export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const {
			attributes: {
				imageUrl,
				webpImageUrl,
				xsimageUrl,
				webpxsImageUrl,
				mdimageUrl,
				webpmdImageUrl,
				imageAlt,
      			imageDefaultAlt,
				youTubeId,
				showdesc,
				anchor,
				iframeId,
			},
		} = this.props;

		return (
			<div
				id={anchor ? `${anchor}` : null}
				className={classnames(
					`youtube`
				)}
			>

				<a
					href="#"
					id={anchor ? `${anchor}` : null}
					className={classnames(
						`youtube__link`
					)}
					data-id={`${iframeId}`}
					data-youtubeid={youTubeId}
				>
					<picture className={`youtube__image-helper`}>
						{imageUrl || xsimageUrl || mdimageUrl ? (
							<>
								{imageUrl ? (
									<>
										{webpImageUrl ? (
											<source
												media="(min-width:1025px)"
												srcset={`${webpImageUrl}`}
												type="image/webp"
											/>
										) : (
											''
										)}
										<source
											media="(min-width:1025px)"
											srcset={`${imageUrl}`}
										/>
									</>
								) : mdimageUrl ? (
									<>
										{webpmdImageUrl ? (
											<source
												media="(min-width:1025px)"
												srcset={`${webpmdImageUrl}`}
												type="image/webp"
											/>
										) : (
											''
										)}
										<source
											media="(min-width:1025px)"
											srcset={`${mdimageUrl}`}
										/>
									</>
								) : (
									<>
										{webpxsImageUrl ? (
											<source
												media="(min-width:1025px)"
												srcset={`${webpxsImageUrl}`}
												type="image/webp"
											/>
										) : (
											''
										)}
										<source
											media="(min-width:1025px)"
											srcset={`${xsimageUrl}`}
										/>
									</>
								)}
								{mdimageUrl ? (
									<>
										{webpmdImageUrl ? (
											<source
												media="(min-width:481px)"
												srcset={`${webpmdImageUrl}`}
												type="image/webp"
											/>
										) : (
											''
										)}
										<source
											media="(min-width:481px)"
											srcset={`${mdimageUrl}`}
										/>
									</>
								) : imageUrl ? (
									<>
										{webpImageUrl ? (
											<source
												media="(min-width:481px)"
												srcset={`${webpImageUrl}`}
												type="image/webp"
											/>
										) : (
											''
										)}
										<source
											media="(min-width:481px)"
											srcset={`${imageUrl}`}
										/>
									</>
								) : (
									<>
										{webpxsImageUrl ? (
											<source
												media="(min-width:481px)"
												srcset={`${webpxsImageUrl}`}
												type="image/webp"
											/>
										) : (
											''
										)}
										<source
											media="(min-width:481px)"
											srcset={`${xsimageUrl}`}
										/>
									</>
								)}
								{xsimageUrl ? (
									<>
										{webpxsImageUrl ? (
											<source
												media="(max-width:480px)"
												srcset={`${webpxsImageUrl}`}
												type="image/webp"
											/>
										) : (
											''
										)}
										<source
											media="(max-width:480px)"
											srcset={`${xsimageUrl}`}
										/>
									</>
								) : mdimageUrl ? (
									<>
										{webpmdImageUrl ? (
											<source
												media="(max-width:480px)"
												srcset={`${webpmdImageUrl}`}
												type="image/webp"
											/>
										) : (
											''
										)}
										<source
											media="(max-width:480px)"
											srcset={`${mdimageUrl}`}
										/>
									</>
								) : (
									<>
										{webpImageUrl ? (
											<source
												media="(max-width:480px)"
												srcset={`${webpImageUrl}`}
												type="image/webp"
											/>
										) : (
											''
										)}
										<source
											media="(max-width:480px)"
											srcset={`${imageUrl}`}
										/>
									</>
								)}
								<img
									src={`${imageUrl}`}
									alt={
									"" !== imageAlt
										? `${imageAlt}`
										: `${imageDefaultAlt}`
									}
									loading="lazy"
								/>
							</>
						) : (
							<img
								src={PlaceholderImg}
								alt="placeholder"
							/>
						)}
					</picture>
					<div class="youtube__content">
						<div class="youtube__content-helper">
							<div class="youtube__icon">
								<IconPlay />
							</div>
							{showdesc == true && (
								<div class="youtube__text">
									<InnerBlocks.Content />
								</div>
							)}
						</div>
					</div>
				</a>
			</div>
		);
	}
}
