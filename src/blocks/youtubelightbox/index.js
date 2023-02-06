/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { registerBlock } from "../../utils/helper";

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="adbc5d6b-9692-47d5-ab84-e16aaba36245" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><rect x="3.25" y="3.25" width="23.51" height="23.51" rx="3.29" fill="#3c3c3b"/><path d="M5,14.26a9.91,9.91,0,0,0,2.1,6.9c.16.2.34.41.54.62a10,10,0,0,0,15-13.11h0l-.39-.45c-.18-.19-.38-.38-.58-.57A10,10,0,0,0,5,14.26Zm16.37-2.7a7.31,7.31,0,0,1-6.46,10.75A7.2,7.2,0,0,1,11,21.18l-.55-.34L21.06,11ZM14.92,7.69a7.29,7.29,0,0,1,3.69,1l.58.34L8.66,18.83l-.3-.6A7.33,7.33,0,0,1,14.92,7.69Z" fill="#fff"/></svg>,
	/**
	 * @see ./edit.js
	 */
	edit,
	save,
};

registerBlock({ metadata, name, settings });
