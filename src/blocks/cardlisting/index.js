/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import edit from "./edit";
import save from "./save";
import "./styles/editor.scss";
import metadata from "./block.json";
import { registerBlock } from "../../utils/helper";

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="b93e3c3f-1c4b-46b9-9523-01a9741b3f43" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><rect x="3.25" y="3.25" width="23.51" height="23.51" rx="3.29" fill="#3c3c3b"/><rect x="6.24" y="6.22" width="7.11" height="7.11" rx="0.71" fill="#fff"/><rect x="16.65" y="6.22" width="7.11" height="7.11" rx="0.71" fill="#fff"/><rect x="6.24" y="16.67" width="7.11" height="7.11" rx="0.71" fill="#fff"/><rect x="16.65" y="16.67" width="7.11" height="7.11" rx="0.71" fill="#fff"/><circle cx="6.83" cy="22.61" r="5.76" fill="#037cbb"/><path d="M11,21.8v1.68a.29.29,0,0,1-.33.33H8.11c-.08,0-.11,0-.11.12v2.49a.29.29,0,0,1-.33.33H6a.29.29,0,0,1-.33-.33V23.93c0-.08,0-.12-.11-.12H3a.29.29,0,0,1-.33-.33V21.8A.29.29,0,0,1,3,21.47H5.56c.07,0,.11,0,.11-.12V18.79A.29.29,0,0,1,6,18.46H7.67a.29.29,0,0,1,.33.33v2.56c0,.08,0,.12.11.12h2.54A.29.29,0,0,1,11,21.8Z" fill="#fff"/></svg>,
  edit,
  save,
};
registerBlock({ metadata, name, settings });
