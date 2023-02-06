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
 * Internal dependencies
 */
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
        topPadding,
        bottomPadding,
      },
    } = this.props;

    return (

      <>
        <section
        id={anchor ? anchor : null}
        className={classnames(
          `section section--swipe`,
          `section--swipe-${heroPosition}`,
          topPadding ? `section--pd-top-${topPadding}` : null,
          bottomPadding ? `section--pd-bottom-${bottomPadding}` : null
        )}
        >
          <div class="section__background">
            <picture>
              <source
                media="(min-width:1025px)"
                srcset={
                  heroPosition == 'left'
                    ? `${swipeWebLGLeft}`
                    : `${swipeWebLGRight}`
                }
                type="image/webp"
              />
              <source
                media="(min-width:1025px)"
                srcset={
                  heroPosition == 'left'
                    ? `${swipeLGLeft}`
                    : `${swipeLGRight}`
                }
              />
              <source
                media="(min-width:481px)"
                srcset={
                  heroPosition == 'left'
                    ? `${swipeWebMDLeft}`
                    : `${swipeWebMDRight}`
                }
                type="image/webp"
              />
              <source
                media="(min-width:481px)"
                srcset={
                  heroPosition == 'left'
                    ? `${swipeMDLeft}`
                    : `${swipeMDRight}`
                }
              />
              <source
                media="(max-width:480px)"
                srcset={
                  heroPosition == 'left'
                    ? `${swipeWebXSLeft}`
                    : `${swipeWebXSRight}`
                }
                type="image/webp"
              />
              <source
                media="(max-width:480px)"
                srcset={
                  heroPosition == 'left'
                    ? `${swipeXSLeft}`
                    : `${swipeXSRight}`
                }
              />
              <img
                decoding="async"
                loading="lazy"
                srcset={
                  heroPosition == 'left'
                    ? `${swipeLGLeft}`
                    : `${swipeLGRight}`
                }
                alt="EPEA Swipe Visual"
                width="auto"
                height="auto"
              />
            </picture>
          </div>

          <div className="section__content">

            <InnerBlocks.Content />

          </div>
        </section>
      </>

    );
  }
}