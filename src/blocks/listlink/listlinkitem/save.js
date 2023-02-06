/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { ArrowIcon } from "../../../utils/block-icons";

export default function Save({ attributes }) {
  const { itemLink } = attributes;

  return (
    <>
      
      {undefined == itemLink ? (
        <div className={`list-link__item`}>
          <div className={`list-link__helper`}>
            <InnerBlocks.Content />
          </div>
        </div>
      ) : (
        <a
          href={itemLink.url}
          target={itemLink.opensInNewTab == true ? `_blank` : null}
          rel={itemLink.opensInNewTab ? "noopener" : null}
          className="list-link__item"
        >
          <div className="list-link__helper">
            <InnerBlocks.Content />
          </div>
          <ArrowIcon />
        </a>
      )}
    </>
  );
}
 