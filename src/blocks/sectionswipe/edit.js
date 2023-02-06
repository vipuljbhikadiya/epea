/**
 * Wordpress dependencies
 */ 
import { __ } from "@wordpress/i18n";
import {
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import { 
  PanelBody,
  TextControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import { withSelect } from "@wordpress/data";
import { Component } from "@wordpress/element";
import { compose } from "@wordpress/compose";

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


class Edit extends Component {
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
      clientId,
      setAttributes,
    } = this.props;


    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Style", "epea-theme")} initialOpen={true}>
            <ToggleGroupControl
              label={__("Swipe Position", "epea-theme")}
              className="block-togglegroup"
              value={heroPosition}
              isBlock
              onChange={(value) => {
                setAttributes({
                  heroPosition: value,
                });
              }}
            >
              <ToggleGroupControlOption
                value="left"
                label={__("Left", "epea-theme")}
                showTooltip={true}
                aria-label={__("Left", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="right"
                label="Right"
                showTooltip={true}
                aria-label={__("Right", "epea-theme")}
              />
            </ToggleGroupControl>
            <ToggleGroupControl
              label={__("Top Padding", "epea-theme")}
              className="block-togglegroup"
              value={topPadding}
              isBlock
              onChange={(value) => {
                setAttributes({
                  topPadding: Number(value),
                });
              }}
            >
              <ToggleGroupControlOption
                value="0"
                label={__("0", "epea-theme")}
                showTooltip={true}
                aria-label={__("0px", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="1"
                label="1"
                showTooltip={true}
                aria-label="60px"
              />
              <ToggleGroupControlOption
                value="2"
                label={__("2", "epea-theme")}
                showTooltip={true}
                aria-label={__("90px", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="3"
                label={__("3", "epea-theme")}
                showTooltip={true}
                aria-label={__("120", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="4"
                label={__("4", "epea-theme")}
                showTooltip={true}
                aria-label={__("240px", "epea-theme")}
              />
            </ToggleGroupControl>
            <ToggleGroupControl
              label={__("Bottom Padding", "epea-theme")}
              className="block-togglegroup"
              value={bottomPadding}
              isBlock
              onChange={(value) => {
                setAttributes({
                  bottomPadding: Number(value),
                });
              }}
            >
              <ToggleGroupControlOption
                value="0"
                label={__("0", "epea-theme")}
                showTooltip={true}
                aria-label={__("0px", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="1"
                label="1"
                showTooltip={true}
                aria-label="60px"
              />
              <ToggleGroupControlOption
                value="2"
                label={__("2", "epea-theme")}
                showTooltip={true}
                aria-label={__("90px", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="3"
                label={__("3", "epea-theme")}
                showTooltip={true}
                aria-label={__("120", "epea-theme")}
              />
              <ToggleGroupControlOption
                value="4"
                label={__("4", "epea-theme")}
                showTooltip={true}
                aria-label={__("240px", "epea-theme")}
              />
            </ToggleGroupControl>
          </PanelBody>
          <PanelBody
            title={__('Additional', 'epea-theme')}
            initialOpen={false}
          >
            <TextControl
              label={__('Anchor', 'epea-theme')}
              placeholder={__('Specify Id…', 'epea-theme')}
              type="text"
              value={anchor}
              onChange={(value) =>
                setAttributes({ anchor: value })
              }
            />
          </PanelBody>
        </InspectorControls>

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
            <InnerBlocks
              allowedBlocks={[
                "epea-theme/quoteimage",
                "epea-theme/row",
                "epea-theme/divider",
                "epea-theme/previewcards",
                "epea-theme/teamlisting",
              ]}
              templateLock={false}
              renderAppender={InnerBlocks.ButtonBlockAppender}
            />
          </div>

        </section>
      </>   
    );
  }
}

export default compose(
  withSelect((select, props) => {
    const { getMedia } = select("core");
    const { imageId } = props.attributes;

    return {
      Image: imageId ? getMedia(imageId) : null,
    };
  })
)(Edit);