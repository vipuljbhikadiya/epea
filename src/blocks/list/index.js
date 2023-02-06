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
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="be1f83ad-7e2d-4c87-95b8-24c21ac4815f" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><circle cx="6.32" cy="7.54" r="2.47" fill="#fff"/><circle cx="6.32" cy="15" r="2.47" fill="#fff"/><circle cx="6.32" cy="22.46" r="2.47" fill="#fff"/><rect x="11.47" y="5.97" width="14.68" height="3.14" fill="#fff"/><rect x="11.47" y="13.43" width="14.68" height="3.14" fill="#fff"/><rect x="11.47" y="20.89" width="14.68" height="3.14" fill="#fff"/></svg>,
  edit,
  save,
};
registerBlock({ metadata, name, settings });
