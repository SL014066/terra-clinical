import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import ModalManager, { reducers as modalManagerReducers } from '../../lib/containers/ModalManager';
import DemoContainer from './DemoContainer';

const store = createStore(
  combineReducers(Object.assign({},
    modalManagerReducers,
  )),
);

const ModalManagerDemo = () => (
  <Provider store={store}>
    <ModalManager>
      <DemoContainer identifier="root" />
    </ModalManager>
  </Provider>
);

export default ModalManagerDemo;