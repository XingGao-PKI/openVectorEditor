import React, { useReducer, createContext } from 'react';
import { createAction } from './util';

export const ReadOnlyContext = createContext({});

// actions
const UPDATE_READ_ONLY = createAction('UPDATE_READ_ONLY');
const TOGGLE_READ_ONLY = createAction('TOGGLE_READ_ONLY');

//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_READ_ONLY:
      return action.readOnly;
    case TOGGLE_READ_ONLY:
      return !state;
    default:
      return state;
  }
};

export const ReadOnly = props => {
  const [readOnly, dispatch] = useReducer(reducer, true);
  const updateReadOnly = v => dispatch({ type: UPDATE_READ_ONLY, readOnly: v });
  const toggleReadOnly = () => dispatch({ type: TOGGLE_READ_ONLY });
  return (
    <ReadOnlyContext.Provider value={{ readOnly, updateReadOnly, toggleReadOnly }}>
      {props.children}
    </ReadOnlyContext.Provider>
  );
};
