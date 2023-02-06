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
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="a8c1c824-da1a-4326-af6c-c1d394df5cc9" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><circle cx="9.35" cy="9.05" r="4.16" fill="#3c3c3b"/><path d="M30,26.71v-.16L21.93,10.39,11.22,23.58,6.85,17.16l-6.8,10A3.28,3.28,0,0,0,3.29,30H26.71A3.29,3.29,0,0,0,30,26.71Z" fill="#3c3c3b"/><path d="M26.1,17.73l0,0,2.72-2.36A.45.45,0,0,0,29,15a.45.45,0,0,0-.15-.33l-2.71-2.36-.05,0a.25.25,0,0,0-.15,0,.28.28,0,0,0-.27.29h0v5h0a.28.28,0,0,0,.27.29A.3.3,0,0,0,26.1,17.73Z" fill="#fff"/><path d="M15,6.07A8.93,8.93,0,1,0,23.93,15,8.93,8.93,0,0,0,15,6.07Zm0,15.62A6.69,6.69,0,1,1,21.69,15,6.68,6.68,0,0,1,15,21.69Z" fill="#fff"/><path d="M3.9,12.27l0,0L1.15,14.66A.45.45,0,0,0,1,15a.45.45,0,0,0,.15.33l2.71,2.36.05,0a.25.25,0,0,0,.15.05.28.28,0,0,0,.27-.29h0v-5h0a.28.28,0,0,0-.27-.29A.3.3,0,0,0,3.9,12.27Z" fill="#fff"/><circle cx="15" cy="15" r="5.11" fill="#037cbb"/></svg>,
  edit: (props) => {
    return <div {...useBlockProps()}>{<Edit {...props} />}</div>;
  },
  save: (props) => {
    return <Save {...props} />;
  },
};
registerBlock({ metadata, name, settings });