import React, { Component } from 'react';
import './custom.css';
import { Dashboard } from './components/Dashboard';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <>
      <div>App root</div>
      <Dashboard />
      </>
    );
  }
}
