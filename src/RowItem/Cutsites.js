import {
  isPositionWithinRange,
  getOverlapsOfPotentiallyCircularRanges
} from 've-range-utils';
import assign from 'lodash/assign';
import React from 'react';
import areNonNegativeIntegers from 'validate.io-nonnegative-integer-array';

import getXStartAndWidthOfRangeWrtRow from './getXStartAndWidthOfRangeWrtRow';
import pureNoFunc from '../utils/pureNoFunc';

let snipStyle = {
  height: '100%',
  // background: 'black',
  position: 'absolute',
  top: 1,
  width: '2px'
};
let snipConnectorStyle = {
  height: '2px',
  // background: 'black',
  position: 'absolute',
  top: 1
};

// var cursor = getCursorForRow(caretPosition, row, bpsPerRow, snipStyle, charWidth, true);

function getSnipForRow(
  snipPosition,
  row,
  sequenceLength,
  bpsPerRow,
  snipStyle,
  charWidth,
  index
) {
  if (!isPositionWithinRange(snipPosition, row)) return;

  const { xStart } = getXStartAndWidthOfRangeWrtRow({
    range: { start: snipPosition, end: snipPosition },
    row,
    charWidth,
    sequenceLength
  });

  const newCursorStyle = assign({}, snipStyle, {
    left: xStart + 2
  });
  const cursorEl = (
    <div key={index} className="veRowViewCutsite snip" style={newCursorStyle} />
  );
  return cursorEl;
}

function getSnipConnector(
  snipRange,
  row,
  sequenceLength,
  bpsPerRow,
  snipConnectorStyle,
  charWidth,
  index
) {
  // tnr: we basically need to first determine what the range start and end are..
  // var _snipRange = {
  //     ...snipRange,
  //     end: norm(snipRange.end-1,sequenceLength)
  // }
  // then mask the range by the row

  const overlaps = getOverlapsOfPotentiallyCircularRanges(
    snipRange,
    { ...row, end: row.end + 1 },
    sequenceLength
  );
  return overlaps.map(function (overlap, index2) {
    let { xStart, width } = getXStartAndWidthOfRangeWrtRow({
      range: overlap,
      row,
      charWidth,
      sequenceLength
    });
    width -= charWidth;
    // the second logical operator catches the special case where we're at the very end of the sequence..
    const newCursorStyle = assign({}, snipConnectorStyle, {
      left: xStart + 2,
      width
    });
    const cursorEl = (
      <div
        key={index + index2}
        className="veRowViewCutsite snipConnector"
        style={newCursorStyle}
      />
    );
    return cursorEl;
  });
}

function Cutsites(props) {
  const {
    annotationRanges,
    charWidth,
    bpsPerRow,
    row,
    // height,
    // editorName,
    sequenceLength,
    topStrand
  } = props;
  const snips = [];
  const snipConnectors = [];
  Object.keys(annotationRanges).forEach(function (key) {
    const annotationRange = annotationRanges[key];
    let { annotation } = annotationRange;
    if (!annotation) {
      annotation = annotationRange;
    }
    let {
      topSnipPosition,
      bottomSnipPosition,
      upstreamBottomSnip,
      upstreamTopSnip
    } = annotation;
    const { upstreamTopBeforeBottom, topSnipBeforeBottom } = annotation;
    topSnipPosition = topSnipPosition && Number(topSnipPosition);
    bottomSnipPosition = bottomSnipPosition && Number(bottomSnipPosition);
    upstreamTopSnip = upstreamTopSnip && Number(upstreamTopSnip);
    upstreamBottomSnip = upstreamBottomSnip && Number(upstreamBottomSnip);

    snipStyle = {
      ...snipStyle,
      background: annotation.restrictionEnzyme.color || 'black'
    };
    snipConnectorStyle = {
      ...snipConnectorStyle,
      background: annotation.restrictionEnzyme.color || 'black'
    };

    let newSnip;
    let newConnector;
    const snipRange = {};

    if (areNonNegativeIntegers([bottomSnipPosition, topSnipPosition])) {
      if (topStrand) {
        // if (isPositionWithinRange(topSnipPosition, row)) {}
        newSnip = getSnipForRow(
          topSnipPosition,
          row,
          sequenceLength,
          bpsPerRow,
          snipStyle,
          charWidth,
          `${key}downstream`
        );
        if (newSnip) {
          snips.push(newSnip);
        }
      } else {
        newSnip = getSnipForRow(
          bottomSnipPosition,
          row,
          sequenceLength,
          bpsPerRow,
          snipStyle,
          charWidth,
          `${key}downstream`
        );
        if (newSnip) {
          snips.push(newSnip);
        }
        if (topSnipBeforeBottom) {
          snipRange.start = topSnipPosition;
          snipRange.end = bottomSnipPosition;
        } else {
          snipRange.start = bottomSnipPosition;
          snipRange.end = topSnipPosition;
        }
        newConnector = getSnipConnector(
          snipRange,
          row,
          sequenceLength,
          bpsPerRow,
          snipConnectorStyle,
          charWidth,
          `${key}downstreamConnector`
        );
        snipConnectors.push(newConnector);
      }
    }
    if (areNonNegativeIntegers([upstreamBottomSnip, upstreamTopSnip])) {
      if (topStrand) {
        newSnip = getSnipForRow(
          upstreamTopSnip,
          row,
          sequenceLength,
          bpsPerRow,
          snipStyle,
          charWidth,
          `${key}upstream`
        );
        if (newSnip) {
          snips.push(newSnip);
        }
      } else {
        newSnip = getSnipForRow(
          upstreamBottomSnip,
          row,
          sequenceLength,
          bpsPerRow,
          snipStyle,
          charWidth,
          `${key}upstream`
        );
        if (newSnip) {
          snips.push(newSnip);
        }
        if (upstreamTopBeforeBottom) {
          snipRange.start = upstreamTopSnip;
          snipRange.end = upstreamBottomSnip;
        } else {
          snipRange.start = upstreamBottomSnip;
          snipRange.end = upstreamTopSnip;
        }
        newConnector = getSnipConnector(
          snipRange,
          row,
          sequenceLength,
          bpsPerRow,
          snipConnectorStyle,
          charWidth,
          `${key}upstreamConnector`
        );
        snipConnectors.push(newConnector);
      }
    }
  });
  return (
    <div>
      {snips}
      {snipConnectors}
    </div>
  );
}

// Cutsites.propTypes = {
//   // annotationRanges: React.PropTypes.object.isRequired,
//   charWidth: PropTypes.number.isRequired,
//   bpsPerRow: PropTypes.number.isRequired,
//   row: PropTypes.object.isRequired,
//   sequenceLength: PropTypes.number.isRequired,
//   topStrand: PropTypes.bool.isRequired
// };

export default pureNoFunc(Cutsites);
