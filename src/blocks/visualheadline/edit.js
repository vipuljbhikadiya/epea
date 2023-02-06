/**
 * Wordpress dependencies
 */ 
import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  RichText,
  __experimentalLinkControl as LinkControl,
  useBlockProps,
} from "@wordpress/block-editor";
import { 
  PanelBody,
  TextControl,
	RangeControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	ToggleControl,
} from "@wordpress/components";
import { Platform, useState } from "@wordpress/element";

/**
 * Internal Dependencies
 */
import headlineClasses from './headlineClasses';
import { QuoteIcon } from '../../utils/block-icons';

/**
 * External dependencies
 */

import classnames from "classnames";

export default function edit({ clientId, attributes, setAttributes }) {
  
  const [contentResponsiveMode, setcontentResponsiveMode] = useState("xl");

  const { 
    anchor,
    xlwidth,
    lgwidth,
    mdwidth,
    number,
    hideDescription,
    hideButton,
    mainHeadline,
    mainLevel,
    subHeadline,
    subLevel,
    paragraph,
    buttonLink,
    buttonText,
  } = attributes;

  const TagNameMainHeadline = mainLevel == "span" ? "span" : "h" + mainLevel;
  const TagNameSubHeadline = subLevel == "span" ? "span" : "h" + subLevel;
  const TagNameParagraph = "p";

  const onMainHeadlineChange = (value) => {
    const newMainHeadline = { mainHeadline: value };
    setAttributes(newMainHeadline);
  };

  const onSubHeadlineChange = (value) => {
    const newSubHeadline = { subHeadline: value };
    setAttributes(newSubHeadline);
  };

  const onParagraphChange = (value) => {
    const newParagraph = { paragraph: value };
    setAttributes(newParagraph);
  };

  const onButtonTextChange = (value) => {
    setAttributes({ buttonText: value });
  };

  const resMode = ['md', 'lg', 'xl'];

	const contentSettings = {
		md: {
			width: mdwidth,
		},
		lg: {
			width: lgwidth,
		},
		xl: {
			width: xlwidth,
		},
	};

	const onChangeWidth = (value) => {
		if (contentResponsiveMode == 'xl') {
			setAttributes({
				xlwidth: value !== undefined ? value : 0,
			});
		}
		if (contentResponsiveMode == 'lg') {
			setAttributes({
				lgwidth: value !== undefined ? value : 0,
			});
		}
		if (contentResponsiveMode == 'md') {
			setAttributes({
				mdwidth: value !== undefined ? value : 0,
			});
		}
	};

  const unlink = () => {
    setAttributes({
      buttonLink: undefined
    });
  };
 
  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        <PanelBody
          title={__('General', 'epea-theme')}
          initialOpen={false}
          opened={true}
        >
          <RangeControl
            label={__('Visual / Number', 'epea-theme')}
            value={number}
            onChange={(value) =>
              setAttributes({ number: value })
            }
            min={0}
            max={15}
          />
          <ToggleGroupControl
            label={__('Responsive Setting - Width', 'epea-theme')}
            className="block-togglegroup"
            value={contentResponsiveMode}
            isBlock
            onChange={(value) => {
              setcontentResponsiveMode(value);
            }}
          >
            <ToggleGroupControlOption
              value="xl"
              label={__('XL', 'epea-theme')}
              showTooltip={true}
              aria-label={__('Extra Large', 'epea-theme')}
            />
            <ToggleGroupControlOption
              value="lg"
              label={__('LG', 'epea-theme')}
              showTooltip={true}
              aria-label={__('Large', 'epea-theme')}
            />
            <ToggleGroupControlOption
              value="md"
              label={__('MD', 'epea-theme')}
              showTooltip={true}
              aria-label={__('Medium', 'epea-theme')}
            />
          </ToggleGroupControl>
          {contentResponsiveMode && (
            <div className="col-control">
              {resMode.map((item, index) => {
                let width = contentSettings[item]['width'];
                return (
                  <div
                    className="col-control-wrap"
                    id={`col-${index}`}
                  >
                    {contentResponsiveMode == item ? (
                      <>
                        <RangeControl
                          label={__(
                            'Width',
                            'epea-theme'
                          )}
                          value={width}
                          onChange={onChangeWidth}
                          min={0}
                          max={10}
                          allowReset={true}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </PanelBody>
        <PanelBody
          title={__('Headline', 'epea-theme')}
          initialOpen={false}
        >
          <ToggleGroupControl
            label={__("Main Headline Tag", "epea-theme")}
            value={mainLevel}
            onChange={(value) => {
              setAttributes({
                mainLevel: value,
              });
            }}
            className="block-toggle-full">
            <ToggleGroupControlOption
              value="1"
              label={__("H1", "epea-theme")}
              showTooltip={true}
              aria-label={__("H1", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="2"
              label={__("H2", "epea-theme")}
              showTooltip={true}
              aria-label={__("H2", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="3"
              label={__("H3", "epea-theme")}
              showTooltip={true}
              aria-label={__("H3", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="4"
              label={__("H4", "epea-theme")}
              showTooltip={true}
              aria-label={__("H4", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="5"
              label={__("H5", "epea-theme")}
              showTooltip={true}
              aria-label={__("H5", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="6"
              label={__("H6", "epea-theme")}
              showTooltip={true}
              aria-label={__("H6", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="span"
              label={__("SPAN", "epea-theme")}
              showTooltip={true}
              aria-label={__("Span", "epea-theme")}
            />
          </ToggleGroupControl>
          <ToggleGroupControl
            label={__("Sub Headline Tag", "epea-theme")}
            value={subLevel}
            onChange={(value) => {
              setAttributes({
                subLevel: value,
              });
            }}
            className="block-toggle-full">
            <ToggleGroupControlOption
              value="1"
              label={__("H1", "epea-theme")}
              showTooltip={true}
              aria-label={__("H1", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="2"
              label={__("H2", "epea-theme")}
              showTooltip={true}
              aria-label={__("H2", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="3"
              label={__("H3", "epea-theme")}
              showTooltip={true}
              aria-label={__("H3", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="4"
              label={__("H4", "epea-theme")}
              showTooltip={true}
              aria-label={__("H4", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="5"
              label={__("H5", "epea-theme")}
              showTooltip={true}
              aria-label={__("H5", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="6"
              label={__("H6", "epea-theme")}
              showTooltip={true}
              aria-label={__("H6", "epea-theme")}
            />
            <ToggleGroupControlOption
              value="span"
              label={__("SPAN", "epea-theme")}
              showTooltip={true}
              aria-label={__("Span", "epea-theme")}
            />
          </ToggleGroupControl>
        </PanelBody>
        <PanelBody
          title={__('Text', 'epea-theme')}
          initialOpen={false}
        >
          <ToggleControl
            label={__('Show / Hide Description', 'epea-theme')}
            checked={hideDescription}
            onChange={() =>
              setAttributes({
                hideDescription: !hideDescription,
              })
            }
          />
        </PanelBody>
        <PanelBody
          title={__('Button', 'epea-theme')}
          initialOpen={false}
        >
          <ToggleControl
            label={__('Show / Hide Button', 'epea-theme')}
            checked={hideButton}
            onChange={() =>
              setAttributes({
                hideButton: !hideButton,
              })
            }
          />
          <span className="block-seprator"></span>
          <div className="gb--link-control">
            <LinkControl
              searchInputPlaceholder="Search here..."
              value={buttonLink}
              settings={[
                {
                  id: "opensInNewTab",
                  title: "Open in new Tab",
                },
              ]}
              onChange={(newLink) => setAttributes({ buttonLink: newLink })}
              onRemove={() => {
                unlink();
              }}
              withCreateSuggestion={true}
              createSuggestion={(inputValue) =>
                setAttributes({
                  post: {
                    ...buttonLink,
                    title: inputValue,
                    type: "custom-url",
                    id: Date.now(),
                    url: inputValue,
                  },
                })
              }></LinkControl>
          </div>
        </PanelBody>
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
        id={anchor ? anchor : null}
        className="visual-headline"
      >

        <div class="row-wrapper row-wrapper--ct-wd">
          <div class="row row--xs-center row--gap-1">
            <div class="col col--xs-12 col--md-2 col--pd-0">
              <div class="col__content">

                <span
                  class={classnames(
                    `visual-headline__icon`,
                    0 !== number
                      ? `visual-headline__number`
                      : null
                  )}
                >
                  {number != 0 ? (
                    number <= 9 ? (
                      '0' + number
                    ) : (
                      number
                    )
                  ) : (
                    <QuoteIcon />
                  )}
                </span>

              </div>
            </div>
            <div
              className={classnames(
                'col col--xs-12 col--pd-0',
                ...headlineClasses(attributes)
              )}
            >
              <div class="col__content">
                <RichText
                  identifier="subHeadline"
                  tagName={TagNameSubHeadline}
                  className="headline headline--style-five headline--color-six"
                  value={subHeadline}
                  onChange={onSubHeadlineChange}
                  withoutInteractiveFormatting={true}
                  aria-label={__("Add Headline ...", "epea-theme")}
                  placeholder={__("Lorem ipsum dolor sit", "epea-theme")}
                  {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
                  allowedFormats={[""]}
                />
                <RichText
                  identifier="mainHeadline"
                  tagName={TagNameMainHeadline}
                  className="headline headline--style-two headline--color-three"
                  value={mainHeadline}
                  onChange={onMainHeadlineChange}
                  withoutInteractiveFormatting={true}
                  aria-label={__("Add Headline ...", "epea-theme")}
                  placeholder={__("Lorem ipsum", "epea-theme")}
                  {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
                  allowedFormats={[""]}
                />
                {hideDescription == true ? (
                  <RichText
                    identifier="paragraph"
                    tagName={TagNameParagraph}
                    className="text text--color-three text--style-two"
                    value={paragraph}
                    onChange={onParagraphChange}
                    withoutInteractiveFormatting={true}
                    aria-label={__("Add Text ...", "epea-theme")}
                    placeholder={__("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.", "epea-theme")}
                    {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
                    allowedFormats={[""]}
                  />
                ) : (
                  ""
                )}
                {hideButton == true ? (
                  (undefined == buttonLink ? (
                    <div
                      className="button-default button--style-one button--width-inline button--color-six button--icon button--align-xs-left"
                    >
                      <div class="icon icon--bgcolor-five icon--color-two">
                        <div class="icon__helper"></div>
                        <i class="icon__visual icon-37-epea"></i>
                      </div>
                      <RichText
                        tagName="div"
                        className="button__helper"
                        identifier="buttonText"
                        value={buttonText}
                        onChange={onButtonTextChange}
                        aria-label={__("Button text", "epea-theme")}
                        placeholder={__("Lorem ipsum", "epea-theme")}
                        {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
                        allowedFormats={[]}
                      />
                    </div>
                  ) : (
                    <a
                      className="button-default button--style-one button--width-inline button--color-six button--icon button--align-xs-left"
                      href={buttonLink ? buttonLink.url : ""}
                      target={buttonLink ? buttonLink.opensInNewTab == true ? `_blank` : null : ""}
                      rel={buttonLink ? buttonLink.opensInNewTab == true ? `noopener` : null : ""}
                      onClick={(e) => e.preventDefault()}
                    >
                      <div class="icon icon--bgcolor-five icon--color-two">
                        <div class="icon__helper"></div>
                        <i class="icon__visual icon-37-epea"></i>
                      </div>
                      <RichText
                        tagName="div"
                        className="button__helper"
                        identifier="buttonText"
                        value={buttonText}
                        onChange={onButtonTextChange}
                        aria-label={__("Button text", "epea-theme")}
                        placeholder={__("Lorem ipsum", "epea-theme")}
                        {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
                        allowedFormats={[]}
                      />
                    </a>
                  ))
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
 