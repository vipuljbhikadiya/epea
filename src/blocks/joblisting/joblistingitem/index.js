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
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="a624223e-2b4e-4f0d-b794-fc069a4d2d20" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><path d="M21.27,7.4h-5a2.26,2.26,0,0,0-1.59.65l-7.5,7.47a2.23,2.23,0,0,0-.66,1.59,2.27,2.27,0,0,0,.66,1.59l5,5a2.28,2.28,0,0,0,1.59.65,2.24,2.24,0,0,0,1.59-.65l7.53-7.51a2.23,2.23,0,0,0,.66-1.59v-5A2.24,2.24,0,0,0,21.27,7.4ZM19,14.13a2.25,2.25,0,1,1,2.24-2.24A2.25,2.25,0,0,1,19,14.13Z" fill="#fff"/></svg>,
  edit,
  save,
};
registerBlock({ metadata, name, settings });
