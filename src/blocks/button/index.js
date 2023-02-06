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
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="f951b2f0-eb7d-4720-a89e-7b2ab9b5a20a" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><path d="M25.53,19.89H4.62V10.11H25.53Zm-19.91-1H24.53V11.11H5.62Z" fill="#037cbb"/><rect x="7.47" y="12.91" width="15.22" height="4.19" fill="#fff"/></svg>,
  /**
   * @see ./edit.js
   */
  edit: edit,
  save: save,
};
registerBlock({ metadata, name, settings });
