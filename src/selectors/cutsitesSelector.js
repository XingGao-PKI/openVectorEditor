/* eslint-disable no-param-reassign */
import { createSelector } from 'reselect';
import bsonObjectid from 'bson-objectid';
import { flatMap as flatmap, map } from 'lodash';
import { getCutsitesFromSequence } from 've-sequence-utils';
import circularSelector from './circularSelector';
import sequenceSelector from './sequenceSelector';
import restrictionEnzymesSelector from './restrictionEnzymesSelector';
import cutsiteLabelColorSelector from './cutsiteLabelColorSelector';
import { getLowerCaseObj } from '../utils/arrayUtils';

export function cutsitesSelector(sequence, circular, enzymeList, cutsiteLabelColors) {
  console.log(sequence, circular, enzymeList, cutsiteLabelColors)
  // get the cutsites grouped by enzyme
  const cutsitesByName = getLowerCaseObj(
    getCutsitesFromSequence(sequence, circular, map(enzymeList))
  );
  // tag each cutsite with a unique id
  const cutsitesById = {};
  Object.keys(cutsitesByName).forEach(function (enzymeName) {
    const cutsitesForEnzyme = cutsitesByName[enzymeName];
    cutsitesForEnzyme.forEach(function (cutsite) {
      const numberOfCuts = cutsitesByName[enzymeName].length;
      const uniqueId = bsonObjectid().str;
      cutsite.id = uniqueId;
      cutsite.numberOfCuts = numberOfCuts;
      cutsite.annotationType = 'cutsite';
      cutsitesById[uniqueId] = cutsite;
      const mergedCutsiteColors = {
        single: 'salmon',
        double: 'lightblue',
        multi: 'lightgrey',
        ...cutsiteLabelColors
      };
      if (numberOfCuts === 1) {
        cutsite.labelColor = mergedCutsiteColors.single;
        cutsite.labelClassname = 'singleCutter';
      } else if (numberOfCuts === 2) {
        cutsite.labelColor = mergedCutsiteColors.double;
        cutsite.labelClassname = 'doubleCutter';
      } else {
        cutsite.labelColor = mergedCutsiteColors.multi;
        cutsite.labelClassname = 'multiCutter';
      }
    });
  });
  // create an array of the cutsites
  const cutsitesArray = flatmap(cutsitesByName, function (cutsitesForEnzyme) {
    return cutsitesForEnzyme;
  });
  return {
    cutsitesByName,
    cutsitesById,
    cutsitesArray
  };
}

export default createSelector(
  sequenceSelector,
  circularSelector,
  restrictionEnzymesSelector,
  cutsiteLabelColorSelector,
  cutsitesSelector
);
