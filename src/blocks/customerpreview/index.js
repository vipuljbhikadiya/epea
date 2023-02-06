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
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="a4906334-96f6-478a-9fda-eeffd1b9f3a6" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><rect x="3.25" y="3.25" width="23.51" height="23.51" rx="3.29" fill="#3c3c3b"/><path d="M22.43,15,16,7.63A1.33,1.33,0,0,0,15,7a1.33,1.33,0,0,0-1,.59l-3,3.42V9A1,1,0,1,0,9,9v4.3L7.57,15c-.33.37-.53.59-.53,1a1,1,0,0,0,1,1H9v5a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V17h1a1,1,0,0,0,1-1C23,15.59,22.76,15.37,22.43,15ZM19,15v6H17V17H13v4H11V15h-.81L15,9.52,19.79,15Z" fill="#fff"/><circle cx="6.83" cy="22.61" r="5.76" fill="#037cbb"/><g id="b18a22dd-6845-4c7d-a5d9-37c8f60744ef" data-name="Layer 2"><path d="M6.84,19.37c-3,0-4.51,2.9-4.57,3l-.11.2.1.21c.07.12,1.56,3,4.58,3s4.5-2.9,4.56-3l.1-.21-.1-.2C11.34,22.27,9.86,19.37,6.84,19.37Zm0,5.54A4.58,4.58,0,0,1,3.21,22.6a4.58,4.58,0,0,1,3.63-2.31,4.57,4.57,0,0,1,3.62,2.31A4.57,4.57,0,0,1,6.84,24.91Z" fill="#fff"/><path d="M6.84,21.07A1.54,1.54,0,1,0,8.37,22.6,1.53,1.53,0,0,0,6.84,21.07Z" fill="#fff"/></g></svg>,
	edit,
	save: (props) => {
		return null;
	},
};

registerBlock({ metadata, name, settings });
