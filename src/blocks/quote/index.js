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
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="bac89c73-c9db-4654-abb8-31f0ceb421c8" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><path d="M27.25,3H18.81a8.56,8.56,0,0,0-4,.87,6.23,6.23,0,0,0-2.61,2.41,6.81,6.81,0,0,0-.9,3.5,6.29,6.29,0,0,0,1.86,4.67,7.66,7.66,0,0,0,4.92,2.08.16.16,0,0,1,.18.18V29.64a.53.53,0,0,0,.11.36h2.91a.53.53,0,0,0,.11-.36V6.23a.16.16,0,0,1,.18-.18h2.87a.16.16,0,0,1,.18.18V29.64a.53.53,0,0,0,.11.36h1.94a3.23,3.23,0,0,0,1-.18.9.9,0,0,0,0-.18V3.55A.45.45,0,0,0,27.25,3Z" fill="#3c3c3b"/><path d="M14.91,10.74a.54.54,0,0,1,0,.53l-2.66,7.66a.73.73,0,0,1-.79.55H8.6a.58.58,0,0,1-.51-.2A.59.59,0,0,1,8,18.73l1.66-7.62a.67.67,0,0,1,.72-.59h4A.59.59,0,0,1,14.91,10.74Zm7,0a.54.54,0,0,1,0,.53l-2.7,7.66a.73.73,0,0,1-.79.55H15.54a.58.58,0,0,1-.51-.22.6.6,0,0,1-.08-.53l1.74-7.62a.67.67,0,0,1,.72-.59h4A.59.59,0,0,1,21.93,10.74Z" fill="#fff"/></svg>,
  /**
   * @see ./edit.js
   */
  edit,
  save,
};
registerBlock({ metadata, name, settings });
