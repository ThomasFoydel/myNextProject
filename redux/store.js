import { useMemo } from 'react';
import { createStore } from 'redux';

let store;

const initialState = {
  auth: { loggedIn: false, token: null },
  user: {
    name: '',
    id: '',
  },
};

const reducer = (state = initialState, action) => {
  const { payload } = action;
  const { user, token } = payload || {};
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        loggedIn: true,
        token,
        user: user,
      };
    case 'LOG_OUT':
      return {
        ...state,
        loggedIn: false,
        token: null,
        user: { name: '', id: '' },
      };
    default:
      return state;
  }
};

function initStore(preloadedState = initialState) {
  return createStore(reducer, preloadedState);
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  if (typeof window === 'undefined') return _store;
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
