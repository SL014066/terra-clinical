import React from 'react';
import Navigation from 'terra-clinical-navigation';
import NavigationPrimary from 'terra-clinical-navigation-primary';
import IconVisualization from 'terra-icon/lib/icon/IconVisualization';
import Logo from 'terra-clinical-navigation-primary/lib/Logo';

const logo = <Logo icon={<IconVisualization />} title={'Chart of My Awesomeness'} />;

const navigation = () => (
  <Navigation
    primary={<NavigationPrimary logo={logo} />}
    style={{ border: '1px solid black', height: '400px' }}
  />
);

export default navigation;
