/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/block-editor";

/**
 * External dependencies
 */

import classnames from "classnames"; 

/**
 * Internal Dependencies
 */
import headlineClasses from './headlineClasses';
import { QuoteIcon } from '../../utils/block-icons';

export default function Save({ attributes }) {

  const { 
    anchor,
    number,
    mainHeadline,
    mainLevel,
    subHeadline,
    subLevel,
    paragraph,
    buttonLink,
    buttonText,
    hideButton,
    hideDescription,
  } = attributes;

  const TagNameMainHeadline = mainLevel == "span" ? "span" : "h" + mainLevel;
  const TagNameSubHeadline = subLevel == "span" ? "span" : "h" + subLevel;
  const TagNameParagraph = "p";

  return (
    <>
      <div
        id={anchor ? anchor : null}
        className="visual-headline">
        
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
                <div className="visual-headline__content">
                  <TagNameSubHeadline className="headline headline--style-five headline--color-six">
                    <RichText.Content value={subHeadline} />
                  </TagNameSubHeadline>
                  <TagNameMainHeadline className="headline headline--style-two headline--color-three">
                    <RichText.Content value={mainHeadline} />
                  </TagNameMainHeadline>
                  {hideDescription == true ? (
                    <TagNameParagraph className="text text--color-three text--style-two">
                      <RichText.Content value={paragraph} />
                    </TagNameParagraph>
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
                        <RichText.Content
                          className="button__helper"
                          value={buttonText} 
                          tagName="div"
                        />
                      </div>
                    ) : (
                      <a
                        className="button-default button--style-one button--width-inline button--color-six button--icon button--align-xs-left"
                        href={buttonLink ? buttonLink.url : ""}
                        target={buttonLink ? buttonLink.opensInNewTab == true ? `_blank` : null : ""}
                        rel={buttonLink ? buttonLink.opensInNewTab == true ? `noopener` : null : ""}
                      >
                        <div class="icon icon--bgcolor-five icon--color-two">
                          <div class="icon__helper"></div>
                          <i class="icon__visual icon-37-epea"></i>
                        </div>
                        <RichText.Content
                          className="button__helper"
                          value={buttonText} 
                          tagName="div"
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
    </>
  );
}
 