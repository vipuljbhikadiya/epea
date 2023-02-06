/**
 * External dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * WordPress dependencies
 */
import { Component } from "@wordpress/element";
import { Placeholder } from "@wordpress/components";
import {
  ButtonBlockAppender,
  ButtonBlockerAppender,
} from "@wordpress/block-editor";
const BlockAppender = ButtonBlockAppender || ButtonBlockerAppender;

class MapSliderSlidePlaceholder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Placeholder
        label={__("Slide", "epea-theme")}
        instructions={__("Add any block to slide", "epea-theme")}
        isColumnLayout={true}>
        <BlockAppender rootClientId={this.props.rootClientId} />
      </Placeholder>
    );
  }
}

export default MapSliderSlidePlaceholder;
