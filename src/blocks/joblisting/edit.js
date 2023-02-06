/**
 * External dependencies
 */

import classnames from "classnames";

/**
 * Wordpress dependencies
 */

import { __ } from "@wordpress/i18n";
import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps,
  store as blockEditorStore,
  RichText,
  InspectorControls,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { PanelBody, TextControl, Button, Tooltip } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { Platform } from "@wordpress/element";

/**
 * Internal Dependencies
 */
import { JobheadlineIcon } from '../../utils/block-icons';

export default function edit({ clientId, attributes, setAttributes, }) {
  const { contentHeadline, contentText, buttonText, buttonLink, anchor } = attributes;

  const blockProps = useBlockProps();

  const ALLOWED_BLOCKS = ["epea-theme/joblistingitem"];

  const { hasInnerBlocks } = useSelect(
    (select) => {
      const { getBlock } = select(blockEditorStore);
      const block = getBlock(clientId);
      return {
        hasInnerBlocks: !!(block && block.innerBlocks.length),
      };
    },
    [clientId]
  );

  const renderappender = hasInnerBlocks
    ? undefined
    : () => <InnerBlocks.ButtonBlockAppender />;

  const innerBlocksProps = useInnerBlocksProps(
    {
      className: "row row--col-ht row--gap-1",
    },
    { allowedBlocks: ALLOWED_BLOCKS, renderAppender: renderappender }
  );

  const onContentHeadlineChange = (value) => {
    const newContentHeadline = { contentHeadline: value };
    setAttributes(newContentHeadline);
  };

  const onContentTextChange = (value) => {
    const newContentText = { contentText: value };
    setAttributes(newContentText);
  };

  const onButtonTextChange = (value) => {
    const newButtonText = { buttonText: value };
    setAttributes(newButtonText);
  };

  const unlink = () => {
    setAttributes({
      buttonLink: undefined
    });
  };

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody
          title={__("Link", "epea-theme")}
          initialOpen={true}>
          <div className="gb--link-control">
            <LinkControl
              searchInputPlaceholder="Search here..."
              value={buttonLink}
              settings={[
                {
                  id: "opensInNewTab",
                  title: "Open in new Tab",
                },
              ]}
              onChange={(newLink) => setAttributes({ buttonLink: newLink })}
              onRemove={() => {
                unlink();
              }}
              withCreateSuggestion={true}
              createSuggestion={(inputValue) =>
                setAttributes({
                  post: {
                    ...buttonLink,
                    title: inputValue,
                    type: "custom-url",
                    id: Date.now(),
                    url: inputValue,
                  },
                })
              }></LinkControl>
          </div>
        </PanelBody>
        <PanelBody title={__("Additional", "epea-theme")} initialOpen={false}>
          <TextControl
            label={__("Anchor", "epea-theme")}
            placeholder={__("Specify Id…", "epea-theme")}
            type="text"
            value={anchor}
            onChange={(value) => setAttributes({ anchor: value })}
          />
        </PanelBody>
      </InspectorControls>
      <div
        id={anchor ? anchor : null}
        className={classnames(
          "listing-job"
        )}>
        <div className="row-wrapper">
          
          <div {...innerBlocksProps} />

          <div className="col col--xs-12 col--md-6 col--lg-4 col--xl-3 col--pd-2">
            <div className="listing-job__item col__content">
              <div className="listing-job__header">
                <div className="listing-job__icon">
                  <JobheadlineIcon />
                </div>
                <div className="listing-job__headline-helper">
                  <RichText
                    identifier="contentHeadline"
                    tagName="span"
                    className="listing-job__headline headline headline--style-seven headline--color-two"
                    value={contentHeadline}
                    onChange={onContentHeadlineChange}
                    withoutInteractiveFormatting={true}
                    aria-label={__("Headline", "epea-theme")}
                    placeholder={__("Lorem ipsum dolor sit", "epea-theme")}
                    {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
                    allowedFormats={[""]}
                  />
                  <RichText
                    identifier="contentText"
                    tagName="span"
                    className="listing-job__text text text--style-three text--color-two"
                    value={contentText}
                    onChange={onContentTextChange}
                    withoutInteractiveFormatting={true}
                    aria-label={__("Description", "epea-theme")}
                    placeholder={__("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", "epea-theme")}
                    {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
                    allowedFormats={[""]}
                  />
                </div>
              </div>

              {undefined == buttonLink ? (
                <div className="listing-job__button button-default button--style-one button--width-inline button--color-two button--icon button--align-xs-left">
                  <div className="icon icon--bgcolor-five icon--color-two">
                    <div className="icon__helper"></div>
                    <i className="icon__visual icon-36-download"></i>
                  </div>
                  <RichText
                    identifier="buttonText"
                    tagName="span"
                    className="listing-job__button-helper"
                    value={buttonText}
                    onChange={onButtonTextChange}
                    withoutInteractiveFormatting={true}
                    aria-label={__("Button text", "epea-theme")}
                    placeholder={__("Lorem ipsum", "epea-theme")}
                    {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
                    allowedFormats={[""]}
                  />
                </div>
              ) : (
                <a
                  onClick={(e) => e.preventDefault()}
                  href={buttonLink.url}
                  target={buttonLink.opensInNewTab == true ? `_blank` : null}
                  rel={buttonLink.opensInNewTab ? "noopener" : null}
                  className="listing-job__button button-default button--style-one button--width-inline button--color-two button--icon button--align-xs-left">
                  <div className="icon icon--bgcolor-five icon--color-two">
                    <div className="icon__helper"></div>
                    <i className="icon__visual icon-36-download"></i>
                  </div>
                  <RichText
                    identifier="buttonText"
                    tagName="span"
                    className="listing-job__button-helper"
                    value={buttonText}
                    onChange={onButtonTextChange}
                    withoutInteractiveFormatting={true}
                    aria-label={__("Button text", "epea-theme")}
                    placeholder={__("Lorem ipsum", "epea-theme")}
                    {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
                    allowedFormats={[""]}
                  />
                </a>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
