import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SanitizedHtml from '../containers/SanitizedHtml';

/**
 * CanvasAnnotations ~
*/
export class CanvasAnnotations extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleAnnotationHighlight = this.handleAnnotationHighlight.bind(this);
    this.handleAnnotationUnHighlight = this.handleAnnotationUnHighlight.bind(this);
  }

  /**
   * Handle click event of an annotation.
  */
  handleClick(event, annotation) {
    const {
      deselectAnnotation, selectAnnotation, selectedAnnotationIds, windowId,
    } = this.props;

    if (selectedAnnotationIds.includes(annotation.id)) {
      deselectAnnotation(windowId, annotation.targetId, annotation.id);
    } else {
      selectAnnotation(windowId, annotation.targetId, annotation.id);
    }
  }

  /** */
  handleAnnotationHighlight(annotation) {
    const { allAnnotationsAreHighlighted, highlightAnnotation, windowId } = this.props;
    if (allAnnotationsAreHighlighted) return;

    highlightAnnotation(windowId, annotation.id);
  }

  /** */
  handleAnnotationUnHighlight() {
    const { allAnnotationsAreHighlighted, highlightAnnotation, windowId } = this.props;
    if (allAnnotationsAreHighlighted) return;

    highlightAnnotation(windowId, null);
  }

  /**
   * Returns the rendered component
  */
  render() {
    const {
      annotations, classes, index, label, selectedAnnotationIds, t, totalSize,
      listContainerComponent, htmlSanitizationRuleSet,
    } = this.props;
    if (annotations.length === 0) return <></>;

    return (
      <>
        <Typography className={classes.sectionHeading} variant="overline">
          {t('annotationCanvasLabel', { context: `${index + 1}/${totalSize}`, label })}
        </Typography>
        <List>
          {
            annotations.map(annotation => (
              <ListItem
                button
                component={listContainerComponent}
                className={classes.annotationListItem}
                key={annotation.id}
                annotationid={annotation.id}
                selected={selectedAnnotationIds.includes(annotation.id)}
                onClick={e => this.handleClick(e, annotation)}
                onFocus={() => this.handleAnnotationHighlight(annotation)}
                onBlur={this.handleAnnotationUnHighlight}
                onMouseEnter={() => this.handleAnnotationHighlight(annotation)}
                onMouseLeave={this.handleAnnotationUnHighlight}
              >
                <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                  <SanitizedHtml
                    ruleSet={htmlSanitizationRuleSet}
                    htmlString={annotation.content}
                  />
                  <div>
                    {
                      annotation.tags.map(tag => (
                        <Chip size="small" variant="outlined" label={tag} id={tag} className={classes.chip} />
                      ))
                    }
                  </div>
                </ListItemText>
              </ListItem>
            ))
          }
        </List>
      </>
    );
  }
}

CanvasAnnotations.propTypes = {
  allAnnotationsAreHighlighted: PropTypes.bool.isRequired,
  annotations: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ),
  classes: PropTypes.objectOf(PropTypes.string),
  deselectAnnotation: PropTypes.func.isRequired,
  highlightAnnotation: PropTypes.func.isRequired,
  htmlSanitizationRuleSet: PropTypes.string,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  listContainerComponent: PropTypes.elementType,
  selectAnnotation: PropTypes.func.isRequired,
  selectedAnnotationIds: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
  totalSize: PropTypes.number.isRequired,
  windowId: PropTypes.string.isRequired,
};
CanvasAnnotations.defaultProps = {
  annotations: [],
  classes: {},
  htmlSanitizationRuleSet: 'iiif',
  listContainerComponent: 'li',
  selectedAnnotationIds: [],
};
