/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const { values } = attributes;
  return (
    <li>
      <RichText.Content value={values} />
    </li>
  );
}
