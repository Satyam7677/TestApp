import {StackActions, CommonActions} from '@react-navigation/native';

/*
  Router only generates navigation actions (plain js objects).
  The actual navigation is done using the Navigator ref, by dispatching those actions.
*/
const Router = {
  /**
   * Need to remove/replace this. Its not available in react navigation v5.
   */
  /**
   * called when have to navigate to a particular screen
   */
  goTo: (navigation: any, routeName: any, params: object) =>
    navigation.dispatch(
      CommonActions.navigate({
        name: routeName,
        params,
      }),
    ) as unknown,

  /**
   * called when need to reset whole navigation state
   */
  resetNew: (navigation: any, routeName: any, params: object) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: routeName, params}],
      }),
    );
  },

  /**
   * called when have to go back to previous screen
   */
  pop: (n = 1) => StackActions.pop(n),

  /**
   * called when need to pop to top of stack
   */
  popToTop: () => StackActions.popToTop(),
};

export default Router;
