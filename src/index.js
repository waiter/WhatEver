/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Scene, Router, ActionConst, Actions} from 'react-native-router-flux';
import {StatusBar, StyleSheet, Text, AppState} from 'react-native';
import Main from './scenes/Main';
import Show from './scenes/Show';
import Edit from './scenes/Edit';
import Loading from './scenes/Loading';
import Constant from './common/Constant';
import Language from './Language';
import Icon from 'react-native-vector-icons/FontAwesome';
import BindComponent from './components/BindComponent';
import DataManager from './common/DataManager';
import ADManager from './common/ADManager';

class WhatEver extends BindComponent {
  constructor(props) {
    super(props);
    StatusBar.setBarStyle('default', 'fade');
    Language.init();
    AppState.addEventListener('change', this.bindAppChangeState);
  }

  bindAppChangeState(currentAppState) {
    if (currentAppState == 'active' && ADManager.isInit) {
      ADManager.showAd();
    }
  }

  bindToAdd() {
    Actions.edit({title:Language.datas.add, item: null});
  }

  bindListOnEnter() {
    Actions.refresh({
      items: DataManager.getAll()
    });
  }

  render() {
    return (
      <Router
        navigationBarStyle={styles.navigationBarStyle}
        titleStyle={styles.titleStyle}
        rightButtonTextStyle={styles.rightButtonTextStyle}
      >
        <Scene key="root">
          <Scene key="loading"
            component={Loading}
            hideNavBar
            initial={true}
          />
          <Scene key="show"
            component={Show}
            hideNavBar
          />
          <Scene key="list" component={Main} hideNavBar={false}
            title={Language.datas.title}
            type={ActionConst.REPLACE}
            rightTitle={<Icon name="plus" size={17}/>}
            onRight={this.bindToAdd}
            onEnter={this.bindListOnEnter}
          />
          <Scene key="edit" component={Edit} hideNavBar={false}
            title={Language.datas.add}
            backButtonTextStyle={styles.rightButtonTextStyle}
            backTitle={<Icon name="chevron-left" size={17}/>}
            hideBackImage
          />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor: Constant.colors.topBar,
    borderBottomWidth: 0,
    borderBottomColor: Constant.colors.topBar,
  },
  titleStyle: {
    color: '#fff',
    fontWeight: 'bold'
  },
  leftButtonStyle1: {
    marginTop: 0,
  },
  leftButtonStyle2: {
    marginTop: 0,
    paddingTop: 4,
  },
  rightButtonTextStyle: {
    color: '#fff',
    fontSize: 17,
  }
});

export default WhatEver;
