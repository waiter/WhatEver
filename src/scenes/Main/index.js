/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BindComponent from '../../components/BindComponent';
import ListSeparator from '../../components/ListSeparator';
import DataManager from '../../common/DataManager';
import ADManager from '../../common/ADManager';
import Constant from '../../common/Constant';
import Language from '../../Language';
import {Actions} from 'react-native-router-flux';
import { AdMobBanner } from 'react-native-admob';

export default class WhatEver extends BindComponent {
  async bindClickItem(item) {
    await DataManager.setLast(item.key);
    Actions.show({
      item
    });
  }

  bindClickEdit(item) {
    Actions.edit({
      title: Language.datas.edit,
      item,
    })
  }

  bindClickDelete(item) {
    Alert.alert(Language.datas.sure, Language.datas.sureContent, [
      {
        text: Language.datas.no
      },
      {
        text: Language.datas.yes,
        onPress: async () => {
          await DataManager.deleteOne(item.key);
          Actions.refresh({
            items: DataManager.getAll()
          });
        }
      }
    ]);
  }

  bindRenderItem(info) {
    const size = Constant.colors.kitList.length;
    const leftColor = Constant.colors.kitList[info.index % size];
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.bindClickItem(info.item)}
        >
          <View style={[styles.itemView, { borderLeftColor: leftColor }]}>
            <View style={styles.itemTitleItems}>
              <Text style={styles.itemTitleText} numberOfLines={1}>{info.item.title}</Text>
              <TouchableOpacity onPress={() => this.bindClickEdit(info.item)}>
                <View style={[styles.itemTitleBtnView, { borderRightWidth: 1, borderRightColor: Constant.colors.line }]}>
                  <Icon color={Constant.colors.iconColor} name="pencil" size={20}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.bindClickDelete(info.item)}>
                <View style={styles.itemTitleBtnView}>
                  <Icon color={Constant.colors.iconColor} name="close" size={20}/>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.itemContentView}>
              {info.item.content.map((it, idx) => (
                <View key={idx} style={styles.itemContentText}>
                  <Text style={styles.tagText} numberOfLines={1}>{it}</Text>
                </View>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {items} = this.props;
    const adView = ADManager.isNoAd ? null : (
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        testDeviceID={ADManager.testDeviceID}
        adUnitID={ADManager.keys.show}
      />
    );
    return (
      <View style={styles.container}>
        <FlatList
          data={items || []}
          renderItem={this.bindRenderItem}
        />
        {adView}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.colors.background,
  },
  itemView: {
    flex: 1,
    borderLeftWidth: 6,
    paddingTop: 5,
    backgroundColor: Constant.colors.item,
  },
  itemTitleItems: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    // borderBottomWidth: 1,
    // borderBottomColor: Constant.colors.line,
    // borderStyle: 'dashed',
  },
  itemTitleText: {
    fontSize: 20,
    flex: 1
  },
  itemTitleBtnView: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemContentView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderBottomWidth: 1,
    borderBottomColor: Constant.colors.line,
  },
  itemContentText: {
    justifyContent: 'center',
    backgroundColor: '#dddddd',
    marginTop: 6,
    marginRight: 3,
    padding: 8,
    height: 24,
    borderRadius: 2,
  },
  tagText: {
    padding: 0,
    margin: 0,
    color: '#777777'
  },
});
