/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import { registerBlock } from "../../utils/helper";

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="e3b51611-7932-401a-b1be-6b459f82699b" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><rect x="3.25" y="3.25" width="23.51" height="23.51" rx="3.29" fill="#3c3c3b"/><path d="M20.54,7.45,11.4,12.2l.73,5.31.59.12-.62,1.83a1.55,1.55,0,0,0,1,1.95l.21.05,3.24.61a1.53,1.53,0,0,0,1.73-1L19,18.94l3.25.69a.78.78,0,0,0,.91-.6,1.11,1.11,0,0,0,0-.26L21.65,8a.76.76,0,0,0-.86-.65A.73.73,0,0,0,20.54,7.45ZM16.79,20.56,13.55,20l.68-2,3.22.68Zm-7.7-2.63,1.52-.21-.73-5.31-1.52.2a1.55,1.55,0,0,0-1.31,1.73l.32,2.28A1.53,1.53,0,0,0,9.09,17.93Z" fill="#fff"/><circle cx="6.83" cy="22.61" r="5.76" fill="#037cbb"/><rect x="3.13" y="18.89" width="2.99" height="2.99" rx="0.71" fill="#fff"/><rect x="7.51" y="18.89" width="2.99" height="2.99" rx="0.71" fill="#fff"/><rect x="3.13" y="23.29" width="2.99" height="2.99" rx="0.71" fill="#fff"/><rect x="7.51" y="23.29" width="2.99" height="2.99" rx="0.71" fill="#fff"/></svg>,
	edit,
	save: (props) => {
		return null;
	},
};

registerBlock({ metadata, name, settings });
