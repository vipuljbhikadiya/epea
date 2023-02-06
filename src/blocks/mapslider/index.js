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
import metadata from "./block.json";
import { registerBlock } from "../../utils/helper";

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="a935cab2-44ff-4b01-9bc6-173ac8ffcdde" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><path d="M15,3.4a6,6,0,0,0-6,6c0,5.37,6,11.41,6,11.41s6-6,6-11.41A6,6,0,0,0,15,3.4Zm0,8.72a2.69,2.69,0,1,1,2.68-2.68A2.68,2.68,0,0,1,15,12.12Z" fill="#fff"/><rect x="7.37" y="23.18" width="15.27" height="3.28" fill="#fff"/></svg>,
  edit: (props) => {
    return <div {...useBlockProps()}>{<Edit {...props} />}</div>;
  },
  save: (props) => {
    return <Save {...props} />;
  },
};
registerBlock({ metadata, name, settings });