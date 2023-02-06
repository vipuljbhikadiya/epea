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

/**
 * External dependencies
 */

import classnames from "classnames";

export default function edit({ clientId, attributes, setAttributes }) {
  const { anchor } = attributes;

  const blockProps = useBlockProps();

  const ALLOWED_BLOCKS = ["epea-theme/visualcircleitem"];

  const { hasInnerBlocks } = useSelect(
    (select) => {
      const { getBlock } = select(blockEditorStore);
      const block = getBlock(clientId);
      return {
        hasInnerBlocks: block.innerBlocks.length,
      };
    },
    [clientId]
  );

	const renderappender = hasInnerBlocks >= 4 ? false : () => <InnerBlocks.ButtonBlockAppender />;

  const innerBlocksProps = useInnerBlocksProps(
    {
      className: "visual-circle__content",
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

      <div class="col col--xs-12 col--md-10 col--lg-6 col--pd-0">
				<div class="col__content">
					<div
						id={anchor ? `${anchor}` : null}
						className={classnames(
							`visual-circle`
						)}
					>
						<div className="visual-circle__helper">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
						<ul {...innerBlocksProps} />
					</div>
				</div>
			</div>
    </div>
  );
}
