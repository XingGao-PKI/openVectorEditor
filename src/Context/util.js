import * as R from 'ramda';
import React from 'react';

export const createAction = action => `open-vector-editor/${action}`;

export function mapContextToProps(Component) {
  return props => {
    mapContextToProps.displayName = `mapContextToProps(${
      Component.displayName || 'Component'
    })`;
    return React.useMemo(() => {
      return <Component {...props} />;
    }, Object.values(props));
  };
}

export function contextMapperSetup(context) {
  /**
   * @param mapStateToProps a mapper function that take the context and returns a derived state,
   *   this state will be the factor to determine if the component will rendered
   *  @example
   *   using mapStateToProps - (state: YourInterface) => ({someDerivedState: 1})
   *   your component will now re render only when someDerivedState ref changes
   */
  return (Component, mapStateToProps) => {
    return function MapContextToProps(props) {
      const contextState = mapStateToProps(React.useContext(context));
      mapContextToProps.displayName = `MapContextToProps(${
        Component.displayName || 'Component'
      })`;
      return React.useMemo(
        () => {
          return <Component {...props} {...contextState} />;
        },
        Object.values({
          ...contextState,
          ...props
        })
      );
    };
  };
}
