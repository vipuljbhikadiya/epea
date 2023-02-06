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
import { QuoteIcon } from '../../utils/block-icons';

import swipeXSLeft from "../../assets/images/epea-swipe-xs-left.png";
import swipeMDLeft from "../../assets/images/epea-swipe-md-left.png";
import swipeLGLeft from "../../assets/images/epea-swipe-lg-left.png";
import swipeWebXSLeft from "../../assets/images/epea-swipe-xs-left.webp";
import swipeWebMDLeft from "../../assets/images/epea-swipe-md-left.webp";
import swipeWebLGLeft from "../../assets/images/epea-swipe-lg-left.webp";

import swipeXSRight from "../../assets/images/epea-swipe-xs-right.png";
import swipeMDRight from "../../assets/images/epea-swipe-md-right.png";
import swipeLGRight from "../../assets/images/epea-swipe-lg-right.png";
import swipeWebXSRight from "../../assets/images/epea-swipe-xs-right.webp";
import swipeWebMDRight from "../../assets/images/epea-swipe-md-right.webp";
import swipeWebLGRight from "../../assets/images/epea-swipe-lg-right.webp";



export default class Save extends Component {
  constructor(props) {
    super(...arguments);
  }
  render() {
    const {
      attributes: {
        anchor,
        heroPosition,
        number,
        mainHeadline,
        mainLevel,
        subHeadline,
        subLevel,
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
    const TagNameSubHeadline = subLevel == "span" ? "span" : "h" + subLevel;
    const TagNameParagraph = "span";

    return (

      <>
        <section
          id={anchor ? anchor : null}
          className={classnames(
            `section section--hero-sub`,
            `section--hero-sub-${heroPosition}`,
            bottomPadding ? `section--pd-bottom-${bottomPadding}` : null
          )}
        >
          <div className="section__content">
            <div className="section__header">

              <div className="section__header-visual">

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

              <div className="section__header-content">

                <div className="visual-headline">
                  
                  <div class="row-wrapper">
                    <div class="row row--xs-center row--gap-1">
                      <div class="col col--xs-12 col--lg-3 col--pd-0">
                        <div class="col__content">

                          <span
                            class={classnames(
                              `visual-headline__icon`,
                              0 !== number
                                ? `visual-headline__number`
                                : null
                            )}
                          >
                            {number != 0 ? (
                              number <= 9 ? (
                                '0' + number
                              ) : (
                                number
                              )
                            ) : (
                              <QuoteIcon />
                            )}
                          </span>

                        </div>
                      </div>
                      <div
                        className={classnames(
                          'col col--xs-12 col--pd-0 col--lg-9'
                        )}
                      >
                        <div class="col__content">
                          <div className="visual-headline__content">
                            <TagNameSubHeadline className="headline headline--style-five headline--color-six">
                              <RichText.Content value={subHeadline} />
                            </TagNameSubHeadline>
                            <TagNameMainHeadline className="headline headline--style-two headline--color-three">
                              <RichText.Content value={mainHeadline} />
                            </TagNameMainHeadline>
                            {hideDescription == true ? (
                              <TagNameParagraph className="text text--color-three text--style-two">
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
                                  <div class="icon icon--bgcolor-five icon--color-two">
                                    <div class="icon__helper"></div>
                                    <i class="icon__visual icon-37-epea"></i>
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
                                  <div class="icon icon--bgcolor-five icon--color-two">
                                    <div class="icon__helper"></div>
                                    <i class="icon__visual icon-37-epea"></i>
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
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              <picture className="section__swipe">
                <source
                  media="(min-width:1025px)"
                  srcset={
                    heroPosition == 'right'
                      ? `${swipeWebLGLeft}`
                      : `${swipeWebLGRight}`
                  }
                  type="image/webp"
                />
                <source
                  media="(min-width:1025px)"
                  srcset={
                    heroPosition == 'right'
                      ? `${swipeLGLeft}`
                      : `${swipeLGRight}`
                  }
                />
                <source
                  media="(min-width:481px)"
                  srcset={
                    heroPosition == 'right'
                      ? `${swipeWebMDLeft}`
                      : `${swipeWebMDRight}`
                  }
                  type="image/webp"
                />
                <source
                  media="(min-width:481px)"
                  srcset={
                    heroPosition == 'right'
                      ? `${swipeMDLeft}`
                      : `${swipeMDRight}`
                  }
                />
                <source
                  media="(max-width:480px)"
                  srcset={
                    heroPosition == 'right'
                      ? `${swipeWebXSLeft}`
                      : `${swipeWebXSRight}`
                  }
                  type="image/webp"
                />
                <source
                  media="(max-width:480px)"
                  srcset={
                    heroPosition == 'right'
                      ? `${swipeXSLeft}`
                      : `${swipeXSRight}`
                  }
                />
                <img
                  decoding="async"
                  loading="lazy"
                  srcset={
                    heroPosition == 'right'
                      ? `${swipeLGLeft}`
                      : `${swipeLGRight}`
                  }
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