import React from 'react';
import { createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import Navigation, { reducers as navigationReducers } from 'terra-clinical-navigation';
import NavigationToolbar from 'terra-clinical-navigation-toolbar';
import NavigationManager from 'terra-clinical-navigation-manager';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import IconProvider from 'terra-icon/lib/icon/IconProvider';
import MenuExample1 from './MenuExample1';
import MenuExample2 from './MenuExample2';
import MenuExample3 from './MenuExample3';
import Application, { reducers as terraApplicationReducers } from 'terra-clinical-application';
import AppDelegate from 'terra-app-delegate';
import UtilityMenuExample from './UtilityMenuExample';

AppDelegate.registerComponentForDisclosure('UtilityMenuExample', UtilityMenuExample);

const logo = <NavigationToolbar.Logo accessory={<IconVisualization />} title={'Chart of My Awesomeness'} />;
const utility = <NavigationToolbar.Utility accessory={<IconProvider />} menuName="UtilityMenuExample" title={'Mr. Awesomeness'} />;

const navigation3 = (
  <Navigation
    menuClass={MenuExample3}
    menuBreakpoint="huge"
    menuProps={{}}
  />
);

const navigation2 = (
  <Navigation
    menuClass={MenuExample2}
    menuBreakpoint="huge"
    menuProps={{}}
  >
    {navigation3}
  </Navigation>
);

const navigation1 = (
  <Navigation
    menuClass={MenuExample1}
    menuBreakpoint="huge"
    menuProps={{}}
  >
    {navigation2}
  </Navigation>
);

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers(Object.assign({},
    terraApplicationReducers,
    navigationReducers,
  )),
  composeEnhancers(),
);

const manager = () => (
  <Provider store={store}>
    <Application app={AppDelegate.create({})}>
      <NavigationManager
        toolbar={<NavigationToolbar utility={utility} logo={logo} />}
        style={{ border: '1px solid black', height: '400px' }}
      >
        {navigation1}
      </NavigationManager>
    </Application>
  </Provider>
);

export default manager;
