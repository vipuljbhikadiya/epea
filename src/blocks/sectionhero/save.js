/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { RichText } from "@wordpress/block-editor";
import { InnerBlocks } from "@wordpress/block-editor";

/**
 * External dependencies
 */

import classnames from "classnames";

/**
 * Internal Dependencies
 */
import PlaceholderImg from "../../assets/images/placeholder.jpg";

import swipeXSLeft from "../../assets/images/epea-swipe-xs-left.png";
import swipeMDLeft from "../../assets/images/epea-swipe-md-left.png";
import swipeLGLeft from "../../assets/images/epea-swipe-lg-left.png";
import swipeWebXSLeft from "../../assets/images/epea-swipe-xs-left.webp";
import swipeWebMDLeft from "../../assets/images/epea-swipe-md-left.webp";
import swipeWebLGLeft from "../../assets/images/epea-swipe-lg-left.webp";


export default class Save extends Component {
  constructor(props) {
    super(...arguments);
  }
  render() {
    const {
      attributes: {
        anchor,
        mainHeadline,
        mainLevel,
        paragraph,
        buttonLink,
        buttonText,
        hideButton,
        hideDescription,
        bottomPadding,
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

    const TagNameMainHeadline = mainLevel == "span" ? "span" : "h" + mainLevel;
    const TagNameParagraph = "span";

    return (

      <>
        <section
          id={anchor ? anchor : null}
          className={classnames(
            `section section--hero-main`,
            bottomPadding ? `section--pd-bottom-${bottomPadding}` : null
          )}
        >
          <div className="section__content">
            <div className="section__header row-wrapper">
              <div className="row row--xs-center row--sm-start row--gap-0">

                <div className="col col--xs-10 col--sm-9 col--md-9 col--lg-4 col--xl-4 col--sm-os-1 col--md-os-1 col--lg-os-1 col--xl-os-1 col--pd-0">
                  <div className="section__header-content col__content">

                    <TagNameMainHeadline className="headline headline--style-one headline--color-five">
                      <RichText.Content value={mainHeadline} />
                    </TagNameMainHeadline>
                    {hideDescription == true ? (
                      <TagNameParagraph className="text text--color-three text--style-one">
                        <RichText.Content value={paragraph} />
                      </TagNameParagraph>
                    ) : (
                      ""
                    )}
                    {hideButton == true ? (
                      (undefined == buttonLink ? (
                        <div
                          className="button-default button--style-one button--width-inline button--color-six button--icon button--align-xs-left"
                        >
                          <div className="icon icon--bgcolor-five icon--color-two">
                            <div className="icon__helper"></div>
                            <i className="icon__visual icon-37-epea"></i>
                          </div>
                          <RichText.Content
                            className="button__helper"
                            value={buttonText} 
                            tagName="div"
                          />
                        </div>
                      ) : (
                        <a
                          className="button-default button--style-one button--width-inline button--color-six button--icon button--align-xs-left"
                          href={buttonLink ? buttonLink.url : ""}
                          target={buttonLink ? buttonLink.opensInNewTab == true ? `_blank` : null : ""}
                          rel={buttonLink ? buttonLink.opensInNewTab == true ? `noopener` : null : ""}
                        >
                          <div className="icon icon--bgcolor-five icon--color-two">
                            <div className="icon__helper"></div>
                            <i className="icon__visual icon-37-epea"></i>
                          </div>
                          <RichText.Content
                            className="button__helper"
                            value={buttonText} 
                            tagName="div"
                          />
                        </a>
                      ))
                    ) : (
                      ""
                    )}

                  </div>
                </div>
          
                <div className="col col--xs-12 col--md-10 col--lg-6 col--md-os-2 col--lg-os-1 col--xl-os-1 col--pd-0">
                  <div className="section__header-visual col__content">

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
                            />
                          </>
                        )
                      )}
                    </picture>

                  </div>
                </div>

              </div>

              <picture className="section__swipe">
                <source
                  media="(min-width:1025px)"
                  srcset={swipeWebLGLeft}
                  type="image/webp"
                />
                <source
                  media="(min-width:1025px)"
                  srcset={swipeLGLeft}
                />
                <source
                  media="(min-width:481px)"
                  srcset={swipeWebMDLeft}
                  type="image/webp"
                />
                <source
                  media="(min-width:481px)"
                  srcset={swipeMDLeft}
                />
                <source
                  media="(max-width:480px)"
                  srcset={swipeWebXSLeft}
                  type="image/webp"
                />
                <source
                  media="(max-width:480px)"
                  srcset={swipeXSLeft}
                />
                <img
                  decoding="async"
                  loading="lazy"
                  srcset={swipeLGLeft}
                  alt="EPEA Swipe Visual"
                  width="auto"
                  height="auto"
                />
              </picture>

            </div>

            <InnerBlocks.Content />

          </div>
        </section>
      </>

    );
  }
}