/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { InnerBlocks } from "@wordpress/block-editor";

/**
 * External dependencies
 */

import classnames from "classnames";

/**
 * Internal Dependencies
 */

import PlaceholderImg from "../../assets/images/placeholder.jpg";


export default class Save extends Component {
  constructor(props) {
    super(...arguments);
  }
  render() {
    const {
      attributes: {
        anchor,
        style,
        imageAlt,
        imageDefaultAlt,
        imageUrl,
        webpImageUrl,
        mdimageUrl,
        webpmdImageUrl,
        xsimageUrl,
        webpxsImageUrl,
      },
    } = this.props;

    const classes = `visual-image visual-image--${style}`;

    return (
      <>
        <div
          id={anchor ? anchor : null}
          className={classes}>
          <div className="row-wrapper">
            <div className="row row--xs-top row--lg-middle">

              <div className={classnames(
                `col col--xs-12 col--md-10 col--lg-6 col--pd-0`,
                style == 'left' ? '' : 'col--md-os-2 col--lg-os-1')}>

                <div className="col__content">        
                  <div className="visual-image__item">
                    <picture>

                      {!imageUrl ? (
                        <img src={PlaceholderImg} alt="placeholder" />
                      ) : (
                        (imageUrl || mdimageUrl || xsimageUrl) && (
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
                                <source
                                  media="(min-width:481px)"
                                  srcset={`${xsimageUrl}`}
                                />
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
                                  ""
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
                        )
                      )}

                    </picture>
                  </div>
                </div>
              </div>

              <div className="col col--xs-10 col--lg-4 col--xs-os-1 col--lg-os-1 col--pd-0">
                <div className="col__content">

                  <InnerBlocks.Content />

                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }
}