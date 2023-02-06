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
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";

export default function edit({ clientId, attributes, setAttributes }) {
  const { anchor } = attributes;

  const blockProps = useBlockProps();

  const ALLOWED_BLOCKS = ["epea-theme/overlaylistingitem"];

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
      className: "row row--xs-center row--gap-1",
    },
    { allowedBlocks: ALLOWED_BLOCKS, renderAppender: renderappender }
  );

  return (
    <div {...blockProps}>
      <InspectorControls>
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
          "listing-overlay"
        )}>
          <div className="row-wrapper">
            <div {...innerBlocksProps} />
          </div>
      </div>
    </div>
  );
}
