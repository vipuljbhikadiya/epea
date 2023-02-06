/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import "./styles/editor.scss";
import Edit from "./edit";
import Save from "./save";
import metadata from "./block.json";
import { registerBlock } from "../../utils/helper";

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="b963f67d-10c5-4cb6-8895-14eadad1b6ae" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><rect x="3.12" y="3.79" width="10.82" height="5.81" fill="#037cbb"/><rect x="15.93" y="3.79" width="10.82" height="5.81" fill="#fff"/><path d="M26.74,26.11H3.26V11.81H26.74Zm-21.48-2H24.74V13.81H5.26Z" fill="#fff"/></svg>,
  edit: (props) => {
    return <div {...useBlockProps()}>{<Edit {...props} />}</div>;
  },
  save: (props) => {
    return <Save {...props} />;
  },
};
registerBlock({ metadata, name, settings });
