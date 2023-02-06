/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const {
    headColorClass,
    content,
    level,
    headStyle,
    AlignXs,
    AlignSm,
    AlignMd,
    AlignLg,
    AlignXl,
    anchor,
  } = attributes;

  let alignclass = "";

  if (
    AlignXs == AlignSm &&
    AlignSm == AlignMd &&
    AlignMd == AlignLg &&
    AlignLg == AlignXl &&
    AlignXs == "left"
  ) {
    alignclass = "";
  } else {
    if (AlignXs) {
      alignclass += " headline--align-xs-" + AlignXs;
    }
    if (AlignSm) {
      if (AlignSm != AlignXs) {
        alignclass += " headline--align-sm-" + AlignSm;
      }
    }
    if (AlignMd) {
      if (AlignMd != AlignSm) {
        alignclass += " headline--align-md-" + AlignMd;
      }
    }
    if (AlignLg) {
      if (AlignLg != AlignMd) {
        alignclass += " headline--align-lg-" + AlignLg;
      }
    }
    if (AlignXl) {
      if (AlignXl != AlignLg) {
        alignclass += " headline--align-xl-" + AlignXl;
      }
    }
  }

  const TagName = level == "span" ? "span" : "h" + level;

  const colorClass = headColorClass ? `headline--color-${headColorClass}` : "";
  const styleClass = headStyle ? `headline--style-${headStyle}` : "";
  const headlineAlign = "" !== alignclass ? `${alignclass}` : "";

  const blockClass = classnames(
    `headline`,
    `${headlineAlign}`,
    `${styleClass}`,
    `${colorClass}`
  );

  return (
    <TagName id={anchor ? anchor : null} className={blockClass}>
      <RichText.Content value={content} />
    </TagName>
  );
}
