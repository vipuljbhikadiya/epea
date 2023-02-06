/**
 * External Dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

export default function save({ attributes }) {
  const { anchor, dividerColorClass, paddingTop, paddingBottom } = attributes;
  return (
    <hr
      id={anchor ? anchor : null}
      className={classnames(
        `divider`,
        `divider--color-${dividerColorClass}`,
        `divider--pd-top-${paddingTop} divider--pd-bottom-${paddingBottom}`
      )}
    />
  );
}
