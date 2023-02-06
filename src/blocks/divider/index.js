/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import { registerBlock } from "../../utils/helper";

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="ee8e150e-eac9-4603-9da3-a33f6a04870a" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><rect x="2.62" y="13.59" width="4.69" height="2.81" fill="#fff"/><rect x="9.31" y="13.59" width="4.69" height="2.81" fill="#fff"/><rect x="16" y="13.59" width="4.69" height="2.81" fill="#fff"/><rect x="22.69" y="13.59" width="4.69" height="2.81" fill="#fff"/></svg>,
  /**
   * @see ./edit.js
   */
  edit: edit,
  save: save,
};
registerBlock({ metadata, name, settings });
