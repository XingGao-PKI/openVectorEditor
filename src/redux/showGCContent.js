import { createReducer } from 'redux-act';

//./caretPosition.js
import createAction from './utils/createMetaAction';
// import createReducer from "./utils/createMergedDefaultStateReducer";

// ------------------------------------
// Actions
// ------------------------------------
export const toggleShowGCContent = createAction('toggleShowGCContent');

// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer(
  {
    [toggleShowGCContent]: (state, val) => {
      return val;
    }
  },
  {}
);
