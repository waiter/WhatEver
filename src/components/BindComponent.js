import React from 'react';

export default class BindComponent extends React.Component {
  constructor(props, funcArr) {
    super(props);
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(key => {
      if (typeof this[key] === 'function' && key.startsWith('bind')) {
        this[key] = this[key].bind(this);
      }
    });
  }
  render() {
    return null;
  }
}
