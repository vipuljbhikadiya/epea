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

import './styles/editor.scss';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: <svg xmlns="http://www.w3.org/2000/svg" id="b2279396-3048-4556-bb68-0c82dc93afef" data-name="Ebene 1" viewBox="0 0 30 30"><rect width="30" height="30" rx="3.29" fill="#1e1e1e"/><circle cx="9.35" cy="9.05" r="4.16" fill="#3c3c3b"/><path d="M30,26.71v-.16L21.93,10.39,11.22,23.58,6.85,17.16l-6.8,10A3.28,3.28,0,0,0,3.29,30H26.71A3.29,3.29,0,0,0,30,26.71Z" fill="#3c3c3b"/><path d="M26.1,17.73l0,0,2.72-2.36A.45.45,0,0,0,29,15a.45.45,0,0,0-.15-.33l-2.71-2.36-.05,0a.25.25,0,0,0-.15,0,.28.28,0,0,0-.27.29h0v5h0a.28.28,0,0,0,.27.29A.3.3,0,0,0,26.1,17.73Z" fill="#fff"/><path d="M3.9,12.27l0,0L1.15,14.66A.45.45,0,0,0,1,15a.45.45,0,0,0,.15.33l2.71,2.36.05,0a.25.25,0,0,0,.15.05.28.28,0,0,0,.27-.29h0v-5h0a.28.28,0,0,0-.27-.29A.3.3,0,0,0,3.9,12.27Z" fill="#fff"/><path d="M20.52,7.35l-9.25,4.81L12,17.54l.61.12L12,19.52a1.54,1.54,0,0,0,1,2,.83.83,0,0,0,.21.06l3.28.62a1.58,1.58,0,0,0,1.76-1L18.92,19l3.29.69a.78.78,0,0,0,.92-.6.77.77,0,0,0,0-.26L21.65,7.93a.78.78,0,0,0-.87-.66A.79.79,0,0,0,20.52,7.35ZM16.73,20.63,13.45,20l.69-2,3.25.68ZM8.93,18l1.54-.21-.74-5.38-1.54.21a1.55,1.55,0,0,0-1.32,1.75l.31,2.3A1.55,1.55,0,0,0,8.93,18Z" fill="#fff"/></svg>,
	edit,
	save: (props) => {
		return null;
	},
};

registerBlock({ metadata, name, settings });
