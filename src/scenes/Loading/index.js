import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BindComponent from '../../components/BindComponent';
import DataManager from '../../common/DataManager';
import ADManager from '../../common/ADManager';
import Constant from '../../common/Constant';
import {Actions} from 'react-native-router-flux';

export default class Loading extends BindComponent {
  constructor(props) {
    super(props);
  }

  async bindInit() {
    ADManager.init();
    const need = await DataManager.init();
    Actions.show({
      item: DataManager.getCur()
    });
  }

  componentWillMount() {
    this.bindInit();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Loading...
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constant.colors.background,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
