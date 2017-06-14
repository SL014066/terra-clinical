import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-clinical-app-delegate';
import ContentContainer from 'terra-content-container';
import SlidePanel from 'terra-slide-panel';
import NavigationHeader from 'terra-clinical-navigation-header';

import './NavigationPrimary.scss';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * Components that will receive the Primary's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   **/
  children: PropTypes.node,
};

const defaultProps = {
  children: [],
  hasSecondary: false,
  isOpen: false,
  size: 'tiny',
};

class NavigationPrimary extends React.Component {

  buildTopNavigation(isTiny) {
    return <NavigationHeader onButtonClick={this.props.requestPrimaryOpen} />;
  }

  buildSideNavigation(shouldDisplaySide, navigationItems) {
    if (shouldDisplaySide) {
      const sideHeader = <div onClick={this.handleRequestClose} style={{height: '40px', width: '100%', backgroundColor: '#c07610'}}>I'm Mr. Side Primary</div>;
      return (
        <ContentContainer header={sideHeader} fill>
          {navigationItems}
        </ContentContainer>
      );
    }
  }

  buildMainContent(children, topNav) {
    if (topNav) {
      return (
        <ContentContainer header={topNav} fill>
          {children}
        </ContentContainer>
      );
    }
    return children;
  }

  buildChildren(isTiny) {
    const { app, children } = this.props;

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, { app, requestPrimaryOpen: this.handleRequestOpen, isTiny});
    });
  }

  render() {
    const { 
      app,
      children,
      hasSecondary,
      isOpen,
      requestPrimaryOpen,
      requestPrimaryCLose,
      requestSecondaryOpen,
      requestSecondaryClose,
      size,
      ...customProps
    } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-NavigationPrimary',
      customProps.className,
    ]); 

    const isTiny = size === 'tiny';
    const topNav = this.buildTopNavigation(!isTiny);
    const sideNav = this.buildSideNavigation(isTiny, []);
    const clonedChildren = this.buildChildren(isTiny);
    const mainContent = this.buildMainContent(clonedChildren, topNav);

    let panelClassNames;
    if (!isTiny) {
      panelClassNames = 'terraClinical-PrimaryPanel--disabled';
    }

    return (
      <div {...customProps} className={navigationClassNames}>
        <ContentContainer header={topNav} fill>
          <SlidePanel
            className={panelClassNames}
            mainContent={mainContent}
            panelContent={sideNav}
            panelSize="small"
            panelBehavior="overlay"
            panelPosition="start"
            isOpen={isOpen && isTiny}
            fill
          />
        </ContentContainer>
      </div>
    );
  }
}

NavigationPrimary.propTypes = propTypes;
NavigationPrimary.defaultProps = defaultProps;

export default NavigationPrimary;
