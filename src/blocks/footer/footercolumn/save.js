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
	const { extraClass } = attributes;

  return (
    <>
      <div className={`footer-column ${extraClass}`}>
        <InnerBlocks.Content />
      </div>
    </>
  );
 }
 