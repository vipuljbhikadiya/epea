/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/block-editor";

/**
 * External dependencies
 */

import classnames from "classnames";

export default function Save({ attributes }) {
  const { anchor } = attributes;
  return (
    <>
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
            <ul className="visual-circle__content">
              <InnerBlocks.Content />
            </ul>
          </div>
				</div>
      </div>
    </>
  );
}
