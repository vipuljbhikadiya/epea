/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import sitelogo from "../../assets/images/logo.svg";

export default function save({ attributes }) {
  return (
    <>
      <div class="header__container">
        <div class="header__logo">
					<a href={attributes.site_url}>
						<img
							src={sitelogo}
							alt="EPEA - Part of Dress &uuml; Sommer - Logo"
						/>
          </a>
        </div>
        <div className="header__nav">
          <InnerBlocks.Content />
          <span id="header__nav-btn" class="header__nav-btn">
            <span>Toggle menu</span>
          </span>
        </div>
			</div>
    </>
  );
}
