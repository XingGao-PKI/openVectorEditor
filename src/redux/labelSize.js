import { createReducer } from 'redux-act';

import createAction from './utils/createMetaAction';

// ------------------------------------
// Actions
// ------------------------------------
export const changeLabelSize = createAction('changeLabelSize');

// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer(
  {
    [changeLabelSize]: (state, payload) => {
      return payload;
    }
  },
  8 //  8 is 100% label size
);
