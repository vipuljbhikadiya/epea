/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { anchor } = attributes;
	return (
		<>
			<div
				id={anchor ? `${anchor}` : null}
				className={`icon-text`}
			>
				<InnerBlocks.Content />
			</div>
		</>
	);
}
