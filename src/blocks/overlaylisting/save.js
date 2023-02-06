/**
 * External dependencies
 */

import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/block-editor";

export default function Save({ attributes }) {
  const { anchor } = attributes;
  return (
    <>
      <div
        id={anchor ? anchor : null}
        className={classnames(
          "listing-overlay"
        )}>
        <div className="row-wrapper">
          <div className="row row--xs-center row--gap-1">
            <InnerBlocks.Content />
          </div>
        </div>
      </div>
    </>
  );
}
