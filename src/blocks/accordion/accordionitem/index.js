/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import Save from "./save";
import metadata from "./block.json";
import { registerBlock } from "../../../utils/helper";

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="fc4d8e92-5f9e-4870-9c81-e1e4a1ff380d" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><path d="M7.65,11.81l.08.1,6.37,7.33a1.2,1.2,0,0,0,1.79,0l6.36-7.31.11-.13a.68.68,0,0,0,.13-.4.76.76,0,0,0-.78-.74H8.29a.76.76,0,0,0-.78.74A.66.66,0,0,0,7.65,11.81Z" fill="#fff"/></svg>,
  getEditWrapperProps(attributes) {
    const currentId =
      typeof attributes.itemId != "undefined"
        ? attributes.itemId
        : attributes.id;
    return { "data-item": currentId };
  },
  /**
   * @see ./edit.js
   */
  edit: (props) => {
    return (
      <div
        {...useBlockProps({
          className: `accordion-item`,
        })}>
        <Edit
          {...{
            ...props,
          }}
        />
      </div>
    );
  },
  save: (props) => (
    <Save
      {...{
        ...props,
      }}
    />
  ),
};
registerBlock({ metadata, name, settings });
