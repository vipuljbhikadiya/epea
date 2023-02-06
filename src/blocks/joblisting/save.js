/**
 * External dependencies
 */

import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/block-editor";
import { RichText } from "@wordpress/block-editor";

/**
 * Internal Dependencies
 */
import { JobheadlineIcon } from '../../utils/block-icons';

export default function Save({ attributes }) {
  const { contentHeadline, contentText, buttonText, buttonLink, anchor } = attributes;
  return (
    <>
      <div
        id={anchor ? anchor : null}
        className={classnames(
          "listing-job"
        )}>
        <div className="row-wrapper">
          <div className="row row--col-ht row--gap-1">

            <InnerBlocks.Content />
            
            <div className="col col--xs-12 col--md-6 col--lg-4 col--xl-3 col--pd-2">
						  <div className="listing-job__item col__content">
							  <div className="listing-job__header">
								  <div className="listing-job__icon">
									  <JobheadlineIcon />
								  </div>
								  <div className="listing-job__headline-helper">
                    <RichText.Content value={contentHeadline} 
                      tagName="span"
                      className="listing-job__headline headline headline--style-seven headline--color-two"
                    />
                    <RichText.Content value={contentText} 
                      tagName="span"
                      className="listing-job__text text text--style-three text--color-two"
                    />
								  </div>
							  </div>

                {undefined == buttonLink ? (
                  <div className="listing-job__button button-default button--style-one button--width-inline button--color-two button--icon button--align-xs-left">
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
                    className="listing-job__button button-default button--style-one button--width-inline button--color-two button--icon button--align-xs-left">
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
          </div>
        </div>
      </div>
    </>
  );
}
