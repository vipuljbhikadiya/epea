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
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="abc45d08-546f-4554-902f-4ddf182f058c" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><rect x="3.25" y="3.25" width="23.51" height="23.51" rx="3.29" fill="#3c3c3b"/><path d="M22.43,15,16,7.63A1.33,1.33,0,0,0,15,7a1.33,1.33,0,0,0-1,.59l-3,3.42V9A1,1,0,1,0,9,9v4.3L7.57,15c-.33.37-.53.59-.53,1a1,1,0,0,0,1,1H9v5a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V17h1a1,1,0,0,0,1-1C23,15.59,22.76,15.37,22.43,15ZM19,15v6H17V17H13v4H11V15h-.81L15,9.52,19.79,15Z" fill="#fff"/><circle cx="6.83" cy="22.61" r="5.76" fill="#037cbb"/><rect x="3.13" y="18.89" width="2.99" height="2.99" rx="0.71" fill="#fff"/><rect x="7.51" y="18.89" width="2.99" height="2.99" rx="0.71" fill="#fff"/><rect x="3.13" y="23.29" width="2.99" height="2.99" rx="0.71" fill="#fff"/><rect x="7.51" y="23.29" width="2.99" height="2.99" rx="0.71" fill="#fff"/></svg>,
	edit,
	save: (props) => {
		return null;
	},
};

registerBlock({ metadata, name, settings });
