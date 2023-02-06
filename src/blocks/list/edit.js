/**
 * External Dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  InspectorControls,
  PanelColorSettings,
  useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
  PanelBody,
  CustomSelectControl,
  TextControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";

/**
 * Internal Dependencies
 */
import { theme_colors, ButtonBlockAppender } from "../../utils/block-helpers";

export default function edit({
  setAttributes,
  attributes,
  clientId,
  hasChildBlocks,
}) {
  const { listStyle, listType, listColorClass, listColor, anchor } = attributes;

  const SetColorClass = (value) => {
    theme_colors.filter(function (item) {
      if (item.color == value) {
        setAttributes({
          listColorClass: item.slug,
        });
      }
    });
  };
  const colorClass = listColorClass ? `list--color-${listColorClass}` : "";

  const options = [
    {
			key: 'one',
			name: 'One',
			style: {
				fontSize: '27px',
				lineHeight: '32px',
				fontFamily: 'Barlow',
			},
		},
		{
			key: 'two',
			name: 'Two',
			style: {
				fontSize: '20px',
				lineHeight: '30px',
				fontFamily: 'Barlow',
			},
		},
		{
			key: 'three',
			name: 'Three',
			style: {
				fontSize: '18px',
				lineHeight: '28px',
				fontFamily: 'Barlow',
			},
		},
  ];

  const { getBlockOrder } = useSelect((select) => {
    return select("core/block-editor") || select("core/editor");
  });

  hasChildBlocks = getBlockOrder(clientId).length;

  const renderappender = () => (
    <ButtonBlockAppender rootClientId={clientId} label={"Add a List Item"} />
  );

  const innerBlocksProps = useInnerBlocksProps(
    {
      className: classnames(
        `list`,
        "" !== listStyle ? `list--style-${listStyle}` : null,
        "" !== colorClass ? `${colorClass}` : null
      ),
    },
    {
      allowedBlocks: ["epea-theme/listitem"],
      template: [["epea-theme/listitem"]],
      renderAppender: renderappender,
    }
  );

  const TagName = listType == "ordered" ? "ol" : "ul";

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Style", "epea-theme")} initialOpen={true}>
          <CustomSelectControl
            __nextUnconstrainedWidth={true}
            label={__("Type", "epea-theme")}
            options={options}
            className="block--customselect"
            onChange={({ selectedItem }) =>
              setAttributes({
                listStyle: selectedItem.key,
              })
            }
            value={options.find((option) => option.key === listStyle)}
          />
          <ToggleGroupControl
            label=""
            className="responsive_buttons"
            value={listType}
            isBlock
            onChange={(value) => {
              setAttributes({
                listType: value,
              });
            }}>
            <ToggleGroupControlOption
              value="ordered"
              label={__("Ordered", "epea-theme")}
              showTooltip={true}
              aria-label={__("Ordered", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="unordered"
              label={__("UnOrdered", "epea-theme")}
              showTooltip={true}
              aria-label={__("UnOrdered", "epea-theme")}
            />
          </ToggleGroupControl>
          <PanelColorSettings
            title={__("Color", "epea-theme")}
            className={"block-color-setting block-color-top-0"}
            colorSettings={[
              {
                colors: theme_colors,
                value: listColor,
                onChange: (value) => {
                  typeof value == "undefined"
                    ? setAttributes({ listColorClass: "" })
                    : SetColorClass(value);
                  setAttributes({ listColor: value });
                },
                label: __("Color Selector", "epea-theme"),
              },
            ]}
          />
        </PanelBody>
        <PanelBody title={__("Additional", "epea-theme")} initialOpen={false}>
          <TextControl
            label={__("Anchor", "epea-theme")}
            placeholder={__("Specify Id…", "epea-theme")}
            type="text"
            value={anchor}
            onChange={(value) => setAttributes({ anchor: value })}
          />
        </PanelBody>
      </InspectorControls>
      <div {...useBlockProps()}>
        <TagName {...innerBlocksProps} />
      </div>
    </>
  );
}
