import { createReducer } from 'redux-act';

import createAction from './utils/createMetaAction';

// ------------------------------------
// Actions
// ------------------------------------
export const toggleExternalLabels = createAction('toggleExternalLabels');

// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer(
  {
    [toggleExternalLabels]: (state, payload) => {
      return payload;
    }
  },
  'noPreference' //  noPreference || true || false
);
