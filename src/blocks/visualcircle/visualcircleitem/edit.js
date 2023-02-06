/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";
import { Platform } from "@wordpress/element";

export default function edit({ attributes, setAttributes }) {
  const { circleHeadline, circleText } = attributes;

  const blockProps = useBlockProps({
		className: 'visual-circle__item',
	});

  const onTitleChange = (value) => {
    const newTitle = { circleHeadline: value };
    setAttributes(newTitle);
  };

  const onTextChange = (value) => {
    const newText = { circleText: value };
    setAttributes(newText);
  };

  return (
    <li {...blockProps}>
      <RichText
        identifier="circleHeadline"
        tagName="span"
        className="visual-circle__title"
        value={circleHeadline}
        onChange={onTitleChange}
        withoutInteractiveFormatting={true}
        aria-label={__("Main Text", "epea-theme")}
        placeholder={__("Lorem", "epea-theme")}
        {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
        allowedFormats={[""]}
      />
      <RichText
        identifier="circleText"
        tagName="span"
        className="visual-circle__text"
        value={circleText}
        onChange={onTextChange}
        withoutInteractiveFormatting={true}
        aria-label={__("Sub Text", "epea-theme")}
        placeholder={__("Nullam dictum eu pede", "epea-theme")}
        {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
        allowedFormats={[""]}
      />
    </li>
	);
}