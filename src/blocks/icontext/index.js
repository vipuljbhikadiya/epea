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
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="ae5d65cc-8fc1-4b9d-80f9-7ad7b2daf7db" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><circle cx="15" cy="15" r="10.07" fill="#fff"/><polygon points="15 7.47 17.45 12.43 22.92 13.22 18.96 17.08 19.89 22.53 15 19.96 10.11 22.53 11.04 17.08 7.08 13.22 12.55 12.43 15 7.47" fill="#1e1e1e"/><circle cx="6.83" cy="22.61" r="5.76" fill="#037cbb"/><path d="M11,21.8v1.68a.29.29,0,0,1-.33.33H8.11c-.08,0-.11,0-.11.12v2.49a.29.29,0,0,1-.33.33H6a.29.29,0,0,1-.33-.33V23.93c0-.08,0-.12-.11-.12H3a.29.29,0,0,1-.33-.33V21.8A.29.29,0,0,1,3,21.47H5.56c.07,0,.11,0,.11-.12V18.79A.29.29,0,0,1,6,18.46H7.67a.29.29,0,0,1,.33.33v2.56c0,.08,0,.12.11.12h2.54A.29.29,0,0,1,11,21.8Z" fill="#fff"/></svg>,
	edit: edit,
	save: save,
};

registerBlock({ metadata, name, settings });