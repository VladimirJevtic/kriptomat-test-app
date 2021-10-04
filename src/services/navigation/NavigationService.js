import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(ref) {
  _navigator = ref;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function back(key) {
  _navigator.dispatch(
    NavigationActions.back({
      key
    }),
  );
}

function navigateAndReset(routeName, params) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    })
  );
}

export default {
  navigate,
  setTopLevelNavigator,
  navigateAndReset,
  navigator: _navigator,
  back: back
};