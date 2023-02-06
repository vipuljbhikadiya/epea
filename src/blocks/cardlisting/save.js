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
          "listing-card"
        )}>
        <div className="row-wrapper">
          <div className="row row--gap-2 row--col-ht">
            <InnerBlocks.Content />
          </div>
        </div>
      </div>
    </>
  );
}
