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
import "./styles/editor.scss";
import "./icon.json";
import metadata from "./block.json";
import { registerBlock } from "../../utils/helper";

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="fcafd5af-995f-42b5-b68a-3f980e4593ef" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><circle cx="15" cy="15" r="10.07" fill="#fff"/><polygon points="15 7.47 17.45 12.43 22.92 13.22 18.96 17.08 19.89 22.53 15 19.96 10.11 22.53 11.04 17.08 7.08 13.22 12.55 12.43 15 7.47" fill="#1e1e1e"/></svg>,
  /**
   * @see ./edit.js
   */
  edit: (props) => {
    return <div {...useBlockProps()}>{<Edit {...props} />}</div>;
  },
  save: (props) => {
    return <Save {...props} />;
  },
};

registerBlock({ metadata, name, settings });
