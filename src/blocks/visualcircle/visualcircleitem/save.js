/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/block-editor";


export default function Save({ attributes }) {
  const { circleHeadline, circleText } = attributes;
  return (
    <li className="visual-circle__item">
      <span className="visual-circle__title">
        <RichText.Content value={circleHeadline} />
      </span>
      <span className="visual-circle__text">
        <RichText.Content value={circleText} />
      </span>
    </li>
	);
}