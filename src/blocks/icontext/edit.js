/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useInnerBlocksProps,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function edit({ attributes, setAttributes }) {
	const { anchor } = attributes;
	const BLOCK_TEMPLATE = [
		[
			'epea-theme/icon',
			{
				iconColor: '#FFFFFF',
				iconColorClass: 'two',
				iconbgColor: '#8ABD7D',
				iconbgColorClass: 'six',
				isbutton: true,
			},
		],
		[
			'epea-theme/paragraph',
			{
				textColor: '#575756',
				textColorClass: 'three',
				textStyle: 'two',
				tag: 'span',
				placeholder: 'Lorem ipsum dolor',
			},
		],
	];

	const innerBlocksProps = useInnerBlocksProps(
		{ className: `icon-text` },
		{
			allowedBlocks: ['epea-theme/icon', 'epea-theme/paragraph'],
			template: BLOCK_TEMPLATE,
			templateLock: 'all',
		}
	);
	return (
		<>
			<div {...useBlockProps()}>
				<InspectorControls>
					<PanelBody
						title={__('Additional', 'epea-theme')}
						initialOpen={false}
					>
						<TextControl
							label={__('Anchor', 'epea-theme')}
							placeholder={__('Specify Id…', 'epea-theme')}
							type="text"
							value={anchor}
							onChange={(value) =>
								setAttributes({ anchor: value })
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div
					id={anchor ? `${anchor}` : null}
					{...innerBlocksProps}
				></div>
			</div>
		</>
	);
}
