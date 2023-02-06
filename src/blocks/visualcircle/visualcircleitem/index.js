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
import { registerBlock } from "../../../utils/helper";

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="e314208c-292e-4ecd-9f7a-a964df451621" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><path d="M15,7A8.05,8.05,0,1,0,23.05,15,8,8,0,0,0,15,7ZM15,21a6,6,0,1,1,6-6A6,6,0,0,1,15,21Z" fill="#fff"/><circle cx="15" cy="7.15" r="3.97" fill="#037cbb"/><circle cx="15" cy="22.83" r="3.97" fill="#037cbb"/><circle cx="22.84" cy="14.99" r="3.97" fill="#037cbb"/><circle cx="7.16" cy="14.99" r="3.97" fill="#037cbb"/></svg>,
  edit,
  save,
};
registerBlock({ metadata, name, settings });
