/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  RichText,
  InspectorControls,
  __experimentalLinkControl as LinkControl,
  useBlockProps,
} from "@wordpress/block-editor";
import {
  PanelBody,
} from "@wordpress/components";
import { Platform } from "@wordpress/element";

/**
 * Internal Dependencies
 */
import { JobheadlineIcon } from '../../../utils/block-icons';

export default function edit({ setAttributes, attributes }) {
  const {
    jobTitle,
    jobLocation,
    jobLevel,
    jobEmployment,
    jobSector,
    buttonText,
    buttonLink,
  } = attributes;

  const onJobTitleChange = (value) => {
    const newJobTitle = { jobTitle: value };
    setAttributes(newJobTitle);
  };

  const onJobLocationChange = (value) => {
    const newJobLocation = { jobLocation: value };
    setAttributes(newJobLocation);
  };

  const onJobLevelChange = (value) => {
    const newJobLevel = { jobLevel: value };
    setAttributes(newJobLevel);
  };

  const onJobEmploymentChange = (value) => {
    const newJobEmployment = { jobEmployment: value };
    setAttributes(newJobEmployment);
  };

  const onJobSectorChange = (value) => {
    const newJobSector = { jobSector: value };
    setAttributes(newJobSector);
  };

  const onButtonTextChange = (value) => {
    const newButtonText = { buttonText: value };
    setAttributes(newButtonText);
  };

  const unlink = () => {
    setAttributes({
      buttonLink: undefined
    });
  };
    
  return (
    <div {...useBlockProps({className:"listing-job__item col col--xs-12 col--md-6 col--lg-4 col--xl-3 col--pd-2"})}>
      <InspectorControls>
        <PanelBody
          title={__("Link", "epea-theme")}
          initialOpen={true}>
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
      </InspectorControls>
      <div className="col__content">

        <div className="listing-job__header">
          <div className="listing-job__icon">
            <JobheadlineIcon />
          </div>
          <div className="listing-job__title-helper"></div>
          <RichText
            identifier="jobTitle"
            tagName="span"
            className="listing-job__title headline headline--style-seven headline--color-five"
            value={jobTitle}
            onChange={onJobTitleChange}
            withoutInteractiveFormatting={true}
            aria-label={__("Title", "epea-theme")}
            placeholder={__("Lorem ipsum dolor sit amet consectetuer", "epea-theme")}
            {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
            allowedFormats={[""]}
          />
        </div>

        <div className="listing-job__content">
          <div className="listing-job__location">
            <span className="listing-job__location-label">Location</span>
            <RichText
              identifier="jobLocation"
              tagName="span"
              className="listing-job__location-value text text--style-three text--color-three"
              value={jobLocation}
              onChange={onJobLocationChange}
              withoutInteractiveFormatting={true}
              aria-label={__("Location", "epea-theme")}
              placeholder={__("Lorem ipsum", "epea-theme")}
              {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
              allowedFormats={[""]}
            />
          </div>

          <div className="listing-job__level">
            <span className="listing-job__level-label">Entry level</span>
            <RichText
              identifier="jobLevel"
              tagName="span"
              className="listing-job__level-value text text--style-three text--color-three"
              value={jobLevel}
              onChange={onJobLevelChange}
              withoutInteractiveFormatting={true}
              aria-label={__("Level", "epea-theme")}
              placeholder={__("Lorem ipsum", "epea-theme")}
              {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
              allowedFormats={[""]}
            />
          </div>

          <div className="listing-job__employment">
            <span className="listing-job__employment-label">Employment</span>
            <RichText
              identifier="jobEmployment"
              tagName="span"
              className="listing-job__employment-value text text--style-three text--color-three"
              value={jobEmployment}
              onChange={onJobEmploymentChange}
              withoutInteractiveFormatting={true}
              aria-label={__("Employment", "epea-theme")}
              placeholder={__("Lorem ipsum", "epea-theme")}
              {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
              allowedFormats={[""]}
            />
          </div>

          <div className="listing-job__sector">
            <span className="listing-job__sector-label">Sector</span>
            <RichText
              identifier="jobSector"
              tagName="span"
              className="listing-job__sector-value text text--style-three text--color-three"
              value={jobSector}
              onChange={onJobSectorChange}
              withoutInteractiveFormatting={true}
              aria-label={__("Sector", "epea-theme")}
              placeholder={__("Lorem ipsum", "epea-theme")}
              {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
              allowedFormats={[""]}
            />
          </div>
        </div>

        {undefined == buttonLink ? (
          <div className="listing-job__button button-default button--style-one button--width-inline button--color-six button--icon button--align-xs-left">
            <div className="icon icon--bgcolor-five icon--color-two">
              <div className="icon__helper"></div>
              <i className="icon__visual icon-36-download"></i>
            </div>
            <RichText
              identifier="buttonText"
              tagName="span"
              className="listing-job__button-helper"
              value={buttonText}
              onChange={onButtonTextChange}
              withoutInteractiveFormatting={true}
              aria-label={__("Button text", "epea-theme")}
              placeholder={__("Lorem ipsum", "epea-theme")}
              {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
              allowedFormats={[""]}
            />
          </div>
        ) : (
          <a
            onClick={(e) => e.preventDefault()}
            href={buttonLink.url}
            target={buttonLink.opensInNewTab == true ? `_blank` : null}
            rel={buttonLink.opensInNewTab ? "noopener" : null}
            className="listing-job__button button-default button--style-one button--width-inline button--color-six button--icon button--align-xs-left">
            <div className="icon icon--bgcolor-five icon--color-two">
              <div className="icon__helper"></div>
              <i className="icon__visual icon-36-download"></i>
            </div>
            <RichText
              identifier="buttonText"
              tagName="span"
              className="listing-job__button-helper"
              value={buttonText}
              onChange={onButtonTextChange}
              withoutInteractiveFormatting={true}
              aria-label={__("Button text", "epea-theme")}
              placeholder={__("Lorem ipsum", "epea-theme")}
              {...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
              allowedFormats={[""]}
            />

          </a>
        )}
      </div>
    </div>
  );
}