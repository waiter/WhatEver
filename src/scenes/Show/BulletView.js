import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  Animated,
  Dimensions,
  Easing
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BindComponent from '../../components/BindComponent';
import DataManager from '../../common/DataManager';
import ADManager from '../../common/ADManager';
import Constant from '../../common/Constant';
import {Actions} from 'react-native-router-flux';
import { AdMobBanner} from 'react-native-admob';
import Language from '../../Language';

const lineSpeed = [0.1, 0.15, 0.13, 0.11, 0.16, 0.14, 0.12, 0.17];

export default class BulletView extends BindComponent {
  constructor(props) {
    super(props);
    const {height, width} = Dimensions.get('window');
    this.screenWidth = width;
    this.screenHeight = height;
    const valueObj = {};
    Array.from({length: 12}, (it, ind) => {
      valueObj[ind] = {
        ani: new Animated.Value(width),
        word: '',
        style: {
          top: (height * 3.0 / 14.0) + (parseInt(ind / 3, 10) - 5) * 25
        }
      };
      return 0;
    });
    this.state = {
      valueObj
    };
  }

  componentWillMount() {
    Object.keys(this.state.valueObj).forEach(it => this.bindMakeItem(it, true));
  }

  componentWillUnmount() {
    Object.keys(this.state.valueObj).forEach(it => this.state.valueObj[it].ani.stopAnimation());
  }

  bindMakeItem(index, isFirst) {
    const { content } = this.props;
    const size = content.length;
    const line = parseInt(index / 3, 10);
    const item = index % 3;
    const speed = lineSpeed[line % 8];
    let rightP = 4.0 * this.screenWidth / 3.0;
    if (isFirst) {
      rightP = this.screenWidth * (1.0 + item * 2.0 / 3.0);
    }
    const right = this.screenWidth * (1.0 + item * 2.0 / 3.0);
    const { valueObj } = this.state;
    valueObj[index].ani.setValue(rightP);
    valueObj[index].word = size > 0 ? content[parseInt(Math.random() * size, 10)] : '...';
    valueObj[index].style.fontWeight = Math.random() < 0.3 ? 'bold' : 'normal';
    Animated.timing(valueObj[index].ani, {
      toValue: - 2.0 * this.screenWidth / 3.0,
      easing: Easing.linear,
      duration: (rightP + 2.0 * this.screenWidth / 3.0) / speed
    }).start(end => {
      if (end.finished) {
        this.bindMakeItem(index);
      }
    });
    this.setState({
      valueObj
    });
  }

  render() {
    const { valueObj } = this.state;
    return (
      <View style={[styles.container, { height: this.screenHeight * 3.0 / 7.0}]}>
        {Object.keys(valueObj).map(it => (
          <Animated.Text
            key={it}
            style={{
              position: 'absolute',
              backgroundColor: '#ffffff00',
              width: this.screenWidth * 2.0 / 3.0,
              height: 25,
              paddingLeft: 5,
              paddingRight: 5,
              ...valueObj[it].style,
              left: valueObj[it].ani,
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            {valueObj[it].word}
          </Animated.Text>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 10,
    width: '100%',
    height: '100%',
    position: 'absolute',
    overflow: 'hidden'
  }
});
