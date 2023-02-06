/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { RichText, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const {
    style,
    bgcolorClass,
    width,
    url,
    linkTarget,
    text,
		buttonicon,
    AlignLg,
    AlignXl,
    AlignMd,
    AlignSm,
    AlignXs,
    anchor,
    downloadable,
  } = attributes;

  const relAttributes = [];

  if (linkTarget) {
    relAttributes.push("noopener");
  }

  let alignclass = "";
  if (
    AlignXs == AlignSm &&
    AlignSm == AlignMd &&
    AlignMd == AlignLg &&
    AlignLg == AlignXl
  ) {
    if (AlignXs) {
      alignclass += " button--align-xs-" + AlignXs;
    }
  } else {
    if (AlignXs) {
      alignclass += " button--align-xs-" + AlignXs;
    }
    if (AlignSm) {
      if (AlignSm != AlignXs) {
        alignclass += " button--align-sm-" + AlignSm;
      }
    }
    if (AlignMd) {
      if (AlignMd != AlignSm) {
        alignclass += " button--align-md-" + AlignMd;
      }
    }
    if (AlignLg) {
      if (AlignLg != AlignMd) {
        alignclass += " button--align-lg-" + AlignLg;
      }
    }
    if (AlignXl) {
      if (AlignXl != AlignLg) {
        alignclass += " button--align-xl-" + AlignXl;
      }
    }
  }

  const classes = `button-default button--style-${style} button--width-${width} button--color-${bgcolorClass}`;
  const btnclassName = classnames({
    [`${classes}`]: undefined !== classes,
		'button--icon': false !== buttonicon,
    [`${alignclass}`]: "" !== alignclass,
  });
  const relation =
    relAttributes && relAttributes.length > 0 ? relAttributes.join(" ") : null;

  return (
    <>
      <a
        id={anchor ? anchor : null}
        className={btnclassName}
        href={!!url ? url : null}
        target={!!linkTarget ? "_blank" : null}
        rel={relation}
        download={downloadable == true ? true : false}>
          {!!buttonicon && (
					  <InnerBlocks.Content />
				  )}
          <RichText.Content value={text} />
      </a>
    </>
  );
}
