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
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="bbba9e70-ca66-4862-826d-097706f7cc8d" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><path d="M18.05,6.22a.34.34,0,0,1,.38.39v19.6a.34.34,0,0,1-.38.38H16.48a.34.34,0,0,1-.38-.38V8.62c0-.09-.05-.13-.14-.13H13.81c-.09,0-.13,0-.13.13V26.21a.34.34,0,0,1-.39.38H11.71a.34.34,0,0,1-.39-.38V16.52c0-.09,0-.14-.13-.14A5.68,5.68,0,0,1,7.5,14.82a4.7,4.7,0,0,1-1.41-3.51,5.09,5.09,0,0,1,.68-2.62,4.77,4.77,0,0,1,2-1.81,6.42,6.42,0,0,1,3-.66Z" fill="#fff"/></svg>,
  edit,
  save,
};
registerBlock({ metadata, name, settings });
