import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Constant from '../common/Constant';

export default class ListSeparator extends React.Component {
  render() {
    return (
      <View style={styles.listSeparator}></View>
    );
  }
}

const styles = StyleSheet.create({
  listSeparator: {
    borderTopWidth: 1,
    borderTopColor: Constant.colors.line
  }
});
