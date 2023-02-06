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
  const {  } = attributes;
  return (
    <>
      <div className="list-link">
        <InnerBlocks.Content />
      </div>
    </>
  );
}
 