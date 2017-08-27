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
import BulletView from './BulletView';

export default class Show extends BindComponent {
  constructor(props) {
    super(props);
    const datas = props.item || DataManager.getCur();
    this.state = {
      title: datas.title,
      content: datas.content,
      current: Language.datas.title,
      running: false,
      word: Language.datas.title,
      isExpand: true,
    }
    this.wordValue = new Animated.Value(0);
    this.isEnd = false;
    const {height, width} = Dimensions.get('window');
    this.screenWidth = width;
    this.screenHeight = height;
  }

  componentWillMount() {
    this.isEnd = false;
    this.wordValue.addListener(this.bindWordValueListener);
  }

  componentWillUnmount() {
    this.isEnd = true;
    this.wordValue.removeAllListeners();
    this.wordValue.stopAnimation();
  }

  bindWordValueListener(ext) {
    const size = this.state.content.length;
    const value = parseInt(ext.value, 10) % size;
    this.setState({
      word: this.state.content[value]
    });
  }

  bindClickShow() {
    if (!this.state.running) {
      const size = this.state.content.length;
      this.setState({
        current: this.state.content[parseInt(size * Math.random(), 10)],
        running: true
      });
      this.bindRunWord();
    }
  }

  bindRunWord() {
    this.wordValue.setValue(0);
    Animated.timing(this.wordValue, {
      toValue: 40,
      duration: 2000,
    }).start((end) => {
      if (!this.isEnd) {
        this.setState({
          running: false
        });
      }
    });
  }

  bindClickSetting() {
    Actions.list();
  }

  bindExpandClick() {
    this.setState({
      isExpand: !this.state.isExpand
    });
  }

  render() {
    const {title, current, word, running, content, isExpand} = this.state;
    const adView = ADManager.isNoAd ? null : (
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        testDeviceID={ADManager.testDeviceID}
        adUnitID={ADManager.keys.show}
      />
    );
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>
            {title}
          </Text>
        </View>
        <View style={styles.contentView}>
          <Image
            source={require('../../static/guaiqiao.png')}
            style={styles.img}
          />
        </View>
        {running ? null : <BulletView content={content}/>}
        <View style={styles.iconView}>
          <TouchableOpacity onPress={this.bindClickSetting}>
            <Icon name="cog" size={30}/>
          </TouchableOpacity>
        </View>
        {adView}
        {isExpand ? (
          <View style={styles.topView}>
            <TouchableOpacity style={styles.topViewTouch} onPress={this.bindClickShow}>
              <View style={styles.choiceWordView}>
                <Text style={styles.choiceWord} numberOfLines={2}>{running ? word : current}</Text>
              </View>
              <View style={styles.choiceTipView}>
                <Text style={styles.choiceTip}>{Language.datas.tipWord}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
        <TouchableOpacity style={[styles.expandIcon, { top: this.screenHeight / 2.0 + 20 }]} onPress={this.bindExpandClick}>
          <Icon name={isExpand ? 'compress' : 'expand'} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: Constant.colors.background,
  },
  titleView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  contentView: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  img: {
    // borderWidth: 1
  },
  iconView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  topView: {
    width: '100%',
    height: 100,
    position: 'absolute',
    zIndex: 999,
    backgroundColor: '#ffffffdd',
  },
  topViewTouch: {
    width: '100%',
    height: '100%',
    padding: 10,
    justifyContent: 'center',
  },
  choiceWordView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  choiceTipView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  choiceWord: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  choiceTip: {
    color: '#aaa'
  },
  expandIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
    zIndex: 999,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
