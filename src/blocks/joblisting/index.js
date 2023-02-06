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
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="b2608326-a8ee-4d36-bfce-48a52d6aab6a" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><rect x="3.25" y="3.25" width="23.51" height="23.51" rx="3.29" fill="#3c3c3b"/><path d="M23.31,10.74v2.87a2.5,2.5,0,0,1-.71,1.22,2.67,2.67,0,0,1-1.87.74H16.26V14.7a.67.67,0,0,0-.67-.67H14.45a.67.67,0,0,0-.67.67v.87H9.32a2.7,2.7,0,0,1-1.88-.74,2.56,2.56,0,0,1-.7-1.22V10.74A1.13,1.13,0,0,1,7.86,9.61H22.18A1.14,1.14,0,0,1,23.31,10.74Zm-7.72,6.38A.11.11,0,0,0,15.7,17V14.7a.11.11,0,0,0-.11-.11H14.45a.11.11,0,0,0-.11.11V17a.11.11,0,0,0,.11.11ZM23,15.23a3.24,3.24,0,0,1-2.26.9H16.26V17a.67.67,0,0,1-.67.67H14.45a.67.67,0,0,1-.67-.67v-.88H9.32a3.27,3.27,0,0,1-2.27-.9,2.59,2.59,0,0,1-.31-.35V21a1.12,1.12,0,0,0,1.12,1.12H22.18A1.13,1.13,0,0,0,23.31,21V14.88A2.66,2.66,0,0,1,23,15.23ZM17.62,7.69a1.13,1.13,0,0,0-.8-.33H13.23A1.13,1.13,0,0,0,12.1,8.49v.56h1V8.49a.17.17,0,0,1,0-.12.16.16,0,0,1,.12,0h3.59a.17.17,0,0,1,.17.17v.56h1V8.49A1.12,1.12,0,0,0,17.62,7.69Z" fill="#fff"/><circle cx="6.83" cy="22.61" r="5.76" fill="#037cbb"/><rect x="3.13" y="18.89" width="2.99" height="2.99" rx="0.71" fill="#fff"/><rect x="7.51" y="18.89" width="2.99" height="2.99" rx="0.71" fill="#fff"/><rect x="3.13" y="23.29" width="2.99" height="2.99" rx="0.71" fill="#fff"/><rect x="7.51" y="23.29" width="2.99" height="2.99" rx="0.71" fill="#fff"/></svg>,
  edit,
  save,
};
registerBlock({ metadata, name, settings });
