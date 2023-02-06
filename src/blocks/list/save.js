/**
 * External Dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const { listStyle, listType, listColorClass, anchor } = attributes;

  const colorClass = listColorClass ? `list--color-${listColorClass}` : "";

  const TagName = listType == "ordered" ? "ol" : "ul";

  return (
    <TagName
      id={anchor ? `${anchor}` : null}
      className={classnames(
        "list",
        "" !== listStyle ? `list--style-${listStyle}` : null,
        "" !== colorClass ? `${colorClass}` : null
      )}>
      <InnerBlocks.Content />
    </TagName>
  );
}
