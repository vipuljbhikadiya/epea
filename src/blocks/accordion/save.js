/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

import { InnerBlocks } from "@wordpress/block-editor";

/**
 * External dependencies
 */
import classnames from "classnames";

export default function save({ attributes }) {
  const { accordionColorClass, accordionStyle, anchor } =
    attributes;
  const accordionClass = classnames(
    `accordion`,
    accordionStyle ? `accordion--style-${accordionStyle}` : null,
    accordionColorClass ? `accordion--color-${accordionColorClass}` : null
  );
  return (
    <div id={anchor ? anchor : null} className={accordionClass}>
      <InnerBlocks.Content />
    </div>
  );
}
