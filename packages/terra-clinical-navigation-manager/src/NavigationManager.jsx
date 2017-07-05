import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'terra-base/lib/baseStyles';

import AppDelegate from 'terra-app-delegate';
import getBreakpoints from 'terra-responsive-element/lib/breakpoints';
import NavigationToolbar from 'terra-clinical-navigation-toolbar';
import ContentContainer from 'terra-content-container';

import './NavigationManager.scss';


const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   **/
  app: AppDelegate.propType,
  /**
   * Components that will be displayed within the content body of secondary navigation
   **/
  children: PropTypes.node,
  /**
   * Component that will managed primary navigation actions.
   **/
  toolbar: PropTypes.element,
};

const defaultProps = {
  children: [],
};

class NavigationManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { size: 'default', openIndex: -1, hasMenu: false };
    this.handleResize = this.handleResize.bind(this);
    this.handleOpenHomeMenu = this.handleOpenHomeMenu.bind(this);
    this.handleOpenParentMenu = this.handleOpenParentMenu.bind(this);
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
    this.handleRegisterNavigation = this.handleRegisterNavigation.bind(this);
    this.handleDeregisterNavigation = this.handleDeregisterNavigation.bind(this);
    this.hasMenuArray = [];
    this.isOpenArray = [];
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const size = this.getBreakpointSize();
    if (size !== this.state.size) {
      this.isOpenArray.fill(false);
      this.setState({ size: size, openIndex: -1 });
    }
  }

  handleRegisterNavigation(index, hasMenu) {
    if (this.hasMenuArray[index] !== hasMenu) {
      this.hasMenuArray[index] = hasMenu;
      this.isOpenArray[index] = false;

      const newHasMenu= this.hasMenuArray.indexOf(true) >= 0;
      if (this.state.hasMenu !== newHasMenu) {
        this.setState({ hasMenu: newHasMenu});
      }
    }
  }

  handleDeregisterNavigation(index) {
    if (this.hasMenuArray[index] || this.isOpenArray[index]) {
      this.hasMenuArray.splice(index);
      this.isOpenArray.splice(index);

      let newState;
      const newHasMenu= this.hasMenuArray.indexOf(true) >= 0;
      if (this.state.hasMenu !== newHasMenu) {
        newState = { hasMenu: newHasMenu };
      }
      if (this.state.openIndex >= index) {
        (newState || {}).openIndex = -1;
      }
      if (newState) {
        this.setState(newState);
      }
    }
  }

  handleToggleMenu() {
    if (this.isOpenArray.indexOf(true) >= 0) {
      this.isOpenArray.fill(false);
      this.setState({ openIndex: -1 });
    } else {
      const hasMenuIndex = this.hasMenuArray.lastIndexOf(true);
      this.isOpenArray[hasMenuIndex] = true;
      this.setState({ openIndex: hasMenuIndex });
    }    
  }

  handleOpenHomeMenu() {
    const openIndex = this.isOpenArray.indexOf(true);
    const hasMenuIndex = this.hasMenuArray.indexOf(true);

    this.traverseMenuStack(openIndex, hasMenuIndex);
  }

  handleOpenParentMenu() {
    const openIndex = this.isOpenArray.indexOf(true);
    const hasMenuIndex = this.hasMenuArray.lastIndexOf(true, openIndex - 1);

    this.traverseMenuStack(openIndex, hasMenuIndex);
  }

  traverseMenuStack(previousIndex, nextIndex) {
    if (nextIndex >= 0 && previousIndex !== nextIndex) {
      this.isOpenArray[previousIndex] = false;
      this.isOpenArray[nextIndex] = true;
      this.setState({ openIndex: nextIndex });
    } else {
      this.isOpenArray.fill(false);
      this.setState({ openIndex: -1 });
    }
  }

  buildToolbar(app, size, toolbar) {
    let toggle;
    if (this.state.hasMenu && size === 'tiny') {
      toggle = this.handleToggleMenu;
    }
    if (toolbar) {
      return React.cloneElement(toolbar, { app, size, onToggleClick: toggle });
    }
    return <NavigationToolbar app={app} size={size} onToggleClick={toggle} />;
  }

  buildChildren(app, size, children) {
    const newChildProps = {
      app,
      hasParentMenu: false,
      index: 0,
      openIndex: this.state.openIndex,
      requestOpenHomeMenu: this.handleOpenHomeMenu,
      requestOpenParentMenu: this.handleOpenParentMenu,
      requestToggleMenu: this.handleToggleMenu,
      registerNavigation: this.handleRegisterNavigation,
      deregisterNavigation: this.handleDeregisterNavigation,
      size,
    };

    return React.Children.map(children, (child) => {
      return React.cloneElement(child, newChildProps);
    });
  }

  getBreakpointSize() {
    const width = window.innerWidth;
    const { tiny, small, medium, large, huge } = getBreakpoints();
    
    if (width >= huge) {
      return 'huge';
    } else if (width >= large) {
      return 'large';
    } else if (width >= medium) {
      return 'medium';
    } else if (width >= small) {
      return 'small';
    }
    return 'tiny';
  }

  render() {
    const {
      app,
      children,
      toolbar,
      ...customProps } = this.props;

    const navigationClassNames = classNames([
      'terraClinical-NavigationManager',
      customProps.className,
    ]); 

    const size = this.state.size === 'default' ? this.getBreakpointSize() : this.state.size;
    const toolbarContent = this.buildToolbar(app, size, toolbar);
    const childContent = this.buildChildren(app, size, children);

    return (
      <ContentContainer {...customProps} className={navigationClassNames} header={toolbarContent} fill>
        {childContent}
      </ContentContainer>
    );
  }
}

NavigationManager.propTypes = propTypes;
NavigationManager.defaultProps = defaultProps;

export default NavigationManager;
