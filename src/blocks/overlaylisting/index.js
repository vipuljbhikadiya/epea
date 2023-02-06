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
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="a5c0dbd4-87a2-420c-a744-f00bf736e8b1" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><rect x="3.25" y="3.25" width="23.51" height="23.51" rx="3.29" fill="#3c3c3b"/><polygon points="19.44 8.71 12.65 17.07 9.88 13 4.34 21.14 9.88 21.14 15.42 21.14 25.66 21.14 19.44 8.71" fill="#fff"/><circle cx="11.47" cy="7.85" r="2.64" fill="#fff"/><rect x="13.93" y="19.37" width="11.73" height="5.5" fill="#037cbb"/><circle cx="6.83" cy="22.61" r="5.76" fill="#037cbb"/><rect x="3.13" y="18.89" width="2.99" height="2.99" rx="0.71" fill="#fff"/><rect x="7.51" y="18.89" width="2.99" height="2.99" rx="0.71" fill="#fff"/><rect x="3.13" y="23.29" width="2.99" height="2.99" rx="0.71" fill="#fff"/><rect x="7.51" y="23.29" width="2.99" height="2.99" rx="0.71" fill="#fff"/></svg>,
  edit,
  save,
};
registerBlock({ metadata, name, settings });
