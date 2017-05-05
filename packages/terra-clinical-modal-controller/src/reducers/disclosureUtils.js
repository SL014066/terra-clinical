const cloneDisclosureState = (state) => {
  const newState = Object.assign({}, state);
  newState.componentKeys = Object.assign([], newState.componentKeys);
  newState.components = Object.assign({}, newState.components);

  return newState;
};

const defaultState = Object.freeze({
  isOpen: false,
  isMaximized: false,
  componentKeys: [],
  components: {},
});

const disclose = (state, action) => {
  const newState = cloneDisclosureState(state);

  newState.isOpen = true;
  newState.componentKeys = [action.data.content.key];
  newState.components[action.data.content.key] = {
    name: action.data.content.name,
    props: action.data.content.props,
  };

  return newState;
};

const push = (state, action) => {
  const newState = cloneDisclosureState(state);

  newState.componentKeys.push(action.data.content.key);
  newState.components[action.data.content.key] = {
    name: action.data.content.name,
    props: action.data.content.props,
  };

  return newState;
};

const pop = (state) => {
  const newState = cloneDisclosureState(state);

  newState.components[newState.componentKeys.pop()] = undefined;

  return newState;
};

const maximize = (state) => {
  const newState = cloneDisclosureState(state);

  newState.isMaximized = !state.isMaximized;

  return newState;
};

export { defaultState, disclose, push, pop, maximize };
