/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { RichText } from "@wordpress/block-editor";

/**
 * Internal Dependencies
 */
import { JobheadlineIcon } from '../../../utils/block-icons';

export default class Save extends Component {
  constructor(props) {
    super(...arguments);
  }
  render() {
    const {
      attributes: {
        jobTitle,
        jobLocation,
        jobLevel,
        jobEmployment,
        jobSector,
        buttonText,
        buttonLink,
      },
    } = this.props;

    return (
      <>
        <div className="listing-job__item col col--xs-12 col--md-6 col--lg-4 col--xl-3 col--pd-2">
          <div className="col__content">
            <div className="listing-job__header">
              <div className="listing-job__icon">
                <JobheadlineIcon />
              </div>
              <div className="listing-job__title-helper">
                <RichText.Content value={jobTitle} 
                  tagName="span"
                  className="listing-job__title headline headline--style-seven headline--color-five"
                />
              </div>
            </div>
            <div className="listing-job__content">
              {jobLocation && (
                <div className="listing-job__location">
                  <span className="listing-job__location-label">Location</span>
                  <RichText.Content value={jobLocation} 
                    tagName="span"
                    className="listing-job__location-value text text--style-three text--color-three"
                  />
                </div>
              )}
              {jobLevel && (
                <div className="listing-job__level">
                  <span className="listing-job__level-label">Entry level</span>
                  <RichText.Content value={jobLevel} 
                    tagName="span"
                    className="listing-job__level-value text text--style-three text--color-three"
                  />
                </div>
              )}
              {jobEmployment && (
                <div className="listing-job__employment">
                <span className="listing-job__employment-label">Employment</span>
                <RichText.Content value={jobEmployment} 
                  tagName="span"
                  className="listing-job__employment-value text text--style-three text--color-three"
                />
                </div>
              )}
              {jobSector && (
                <div className="listing-job__sector">
                  <span className="listing-job__sector-label">Sector</span>
                  <RichText.Content value={jobSector} 
                    tagName="span"
                    className="listing-job__sector-value text text--style-three text--color-three"
                  />
                </div>
              )}
            </div>

            {undefined == buttonLink ? (
              <div className="listing-job__button button-default button--style-one button--width-inline button--color-six button--icon button--align-xs-left">
                <div className="icon icon--bgcolor-five icon--color-two">
                  <div className="icon__helper"></div>
                  <i className="icon__visual icon-36-download"></i>
                </div>
                <RichText.Content value={buttonText} 
                  tagName="span"
                  className="listing-job__button-helper"
                />
              </div>
            ) : (
              <a
                href={buttonLink.url}
                target={buttonLink.opensInNewTab == true ? `_blank` : null}
                rel={buttonLink.opensInNewTab ? "noopener" : null}
                className="listing-job__button button-default button--style-one button--width-inline button--color-six button--icon button--align-xs-left">
                <div className="icon icon--bgcolor-five icon--color-two">
                  <div className="icon__helper"></div>
                  <i className="icon__visual icon-36-download"></i>
                </div>
                <RichText.Content value={buttonText} 
                  tagName="span"
                  className="listing-job__button-helper"
                />
              </a>
            )}

          </div>
        </div>
      </>
    );
  }
}
