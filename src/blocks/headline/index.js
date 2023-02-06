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
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="a23eb55e-3d24-4f85-ac99-9addd8f6d3e0" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><path d="M16.05,5.48H19a.41.41,0,0,1,.46.47v18.1a.41.41,0,0,1-.46.47H16.05a.41.41,0,0,1-.46-.47V16.71a.14.14,0,0,0-.16-.16h-6a.14.14,0,0,0-.16.16v7.34a.42.42,0,0,1-.46.47H5.94a.41.41,0,0,1-.46-.47V6a.41.41,0,0,1,.46-.47H8.85A.42.42,0,0,1,9.31,6V13.1a.14.14,0,0,0,.16.16h6a.14.14,0,0,0,.16-.16V6A.41.41,0,0,1,16.05,5.48Z" fill="#fff"/><path d="M22.86,15.56h1.45c.14,0,.21.07.21.22V24.3a.19.19,0,0,1-.21.22H22.94a.2.2,0,0,1-.22-.22v-7a.09.09,0,0,0,0-.07s0,0-.06,0l-1.13.23h-.05a.17.17,0,0,1-.19-.19v-1a.24.24,0,0,1,.17-.24l1.16-.46A.76.76,0,0,1,22.86,15.56Z" fill="#fff"/></svg>,
  edit,
  save,
};
registerBlock({ metadata, name, settings });
