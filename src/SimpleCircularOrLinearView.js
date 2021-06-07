import React from 'react';
import {
  // aliasedEnzymesByName,
  defaultEnzymesByName
} from 've-sequence-utils';
import { map } from 'lodash';

import { CircularView } from './CircularView';
import { cutsitesSelector } from './selectors/cutsitesSelector';
// import { LinearView } from './LinearView';
import { visibilityDefaultValues } from './redux/annotationVisibility';

const allEnzymes = map(defaultEnzymesByName);

// this view is meant to be a helper for showing a simple (non-redux connected) circular or linear view!
const SimpleCircularOrLinearView = props => {
  const {
    sequenceData: _sequenceData,
    annotationVisibility: _annotationVisibility = {}
  } = props;
  const Component =  CircularView;
  const tickSpacing = _sequenceData.circular
    ? undefined
    : Math.floor(
        (_sequenceData.noSequence ? _sequenceData.size : _sequenceData.sequence.length) /
          5
      );
  let sequenceData = _sequenceData;
  const annotationVisibility = {
    ...visibilityDefaultValues,
    ..._annotationVisibility
  };

  // here we're making it possible to not pass a sequenceData.sequence
  // we can just pass a .size property to save having to send the whole sequence if it isn't needed!
  if (_sequenceData.noSequence) {
    annotationVisibility.sequence = false;
    annotationVisibility.reverseSequence = false;
    if (_sequenceData.size === undefined) {
      return <div>Error: No sequenceData.size detected when using noSequence flag </div>;
    }
    sequenceData = {
      ..._sequenceData,
      sequence: {
        length: _sequenceData.size
      }
    };
  }

  const { cutsitesArray } = cutsitesSelector(
    _sequenceData.sequence,
    _sequenceData.circular,
    allEnzymes
  );

  return (
    <Component
      {...props}
      width={500}
      height={500}
      tickSpacing={tickSpacing}
      annotationVisibility={annotationVisibility}
      sequenceData={{ ...sequenceData, cutsites: cutsitesArray.slice(0, 60) }}
    />
  );
};

export default SimpleCircularOrLinearView;
