/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * Interal dependencies
 */
import PlaceholderImg from "../../../assets/images/placeholder-square.jpg";

export default class Save extends Component {
  constructor(props) {
    super(...arguments);
  }
  render() {
    const {
      headline,
      description,
      iconClass,
      imageUrl,
      mdimageUrl,
      xsimageUrl,
      webpImageUrl,
      webpmdImageUrl,
      webpxsImageUrl,
      imageAlt,
      imageDefaultAlt,
    } = this.props.attributes;

    return (
      <>
        <div
					class="slider-circle__slide slider-circle__slide--fade"
					id={headline
						.replace(/[^a-zA-Z ]/g, "")
						.split(" ")
						.join("")}
					role="tabpanel"
					aria-labelledby={
						headline
							.replace(/[^a-zA-Z ]/g, "")
							.split(" ")
							.join("") + `-tab`
					}
				>

          <picture className="slider-circle__image">
            {imageUrl || mdimageUrl || xsimageUrl ? (
              <>
            
                {/* Tablet Image rendering */}
                {mdimageUrl ? (
                  <>
                    {webpmdImageUrl ? (
                      <source
                        media="(min-width:481px)"
                        srcset={`${webpmdImageUrl}`}
                        type="image/webp"
                      />
                    ) : (
                      ""
                    )}
                    <source media="(min-width:481px)" srcset={`${mdimageUrl}`} />
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
                      ""
                    )}
                    <source media="(min-width:481px)" srcset={`${imageUrl}`} />
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
                      ""
                    )}
                    <source media="(min-width:481px)" srcset={`${xsimageUrl}`} />
                  </>
                )}
                {/* Mobile Image rendering */}
                {xsimageUrl ? (
                  <>
                    {webpxsImageUrl ? (
                      <source
                        media="(max-width:480px)"
                        srcset={`${webpxsImageUrl}`}
                        type="image/webp"
                      />
                    ) : (
                      ""
                    )}
                    <source media="(max-width:480px)" srcset={`${xsimageUrl}`} />
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
                      ""
                    )}
                    <source media="(max-width:480px)" srcset={`${mdimageUrl}`} />
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
                      ""
                    )}
                    <source media="(max-width:480px)" srcset={`${imageUrl}`} />
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
              <img src={PlaceholderImg} alt="placeholder" />
            )}
          </picture>
          <span className="slider-circle__icon icon icon--bgcolor-six icon--color-two">
						<i className={classnames(iconClass ? iconClass : "")}></i>
					</span>
        </div>
      </>
    );
  }
}
