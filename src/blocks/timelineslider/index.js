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
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="b14c259b-d61d-49e3-a091-ac39981350b5" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><path d="M27.25,3H18.81a8.56,8.56,0,0,0-4,.87,6.23,6.23,0,0,0-2.61,2.41,6.81,6.81,0,0,0-.9,3.5,6.29,6.29,0,0,0,1.86,4.67,7.66,7.66,0,0,0,4.92,2.08.16.16,0,0,1,.18.18V29.64a.53.53,0,0,0,.11.36h2.91a.53.53,0,0,0,.11-.36V6.23a.16.16,0,0,1,.18-.18h2.87a.16.16,0,0,1,.18.18V29.64a.53.53,0,0,0,.11.36h1.94a3.23,3.23,0,0,0,1-.18.9.9,0,0,0,0-.18V3.55A.45.45,0,0,0,27.25,3Z" fill="#3c3c3b"/><path d="M26.1,17.73l0,0,2.72-2.36A.45.45,0,0,0,29,15a.45.45,0,0,0-.15-.33l-2.71-2.36-.05,0a.25.25,0,0,0-.15,0,.28.28,0,0,0-.27.29h0v5h0a.28.28,0,0,0,.27.29A.3.3,0,0,0,26.1,17.73Z" fill="#fff"/><path d="M15,6.07A8.93,8.93,0,1,0,23.93,15,8.93,8.93,0,0,0,15,6.07Zm0,15.62A6.69,6.69,0,1,1,21.69,15,6.68,6.68,0,0,1,15,21.69Z" fill="#fff"/><path d="M18.35,13.88H16.12V11.65a1.12,1.12,0,0,0-2.24,0V15A1.12,1.12,0,0,0,15,16.12h3.35a1.12,1.12,0,0,0,0-2.24Z" fill="#fff"/><path d="M3.9,12.27l0,0L1.15,14.66A.45.45,0,0,0,1,15a.45.45,0,0,0,.15.33l2.71,2.36.05,0a.25.25,0,0,0,.15.05.28.28,0,0,0,.27-.29h0v-5h0a.28.28,0,0,0-.27-.29A.3.3,0,0,0,3.9,12.27Z" fill="#fff"/></svg>,
  edit: (props) => {
    return <div {...useBlockProps()}>{<Edit {...props} />}</div>;
  },
  save: (props) => {
    return <Save {...props} />;
  },
};
registerBlock({ metadata, name, settings });
