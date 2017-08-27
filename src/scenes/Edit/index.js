import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BindComponent from '../../components/BindComponent';
import ListSeparator from '../../components/ListSeparator';
import TagInput from '../../components/TagInput';
import DataManager from '../../common/DataManager';
import {Actions} from 'react-native-router-flux';
import Language from '../../Language';
import Constant from '../../common/Constant';

export default class Edit extends BindComponent {
  constructor(props) {
    super(props);
    if (props.item) {
      this.state = {
        key: props.item.key,
        title: props.item.title,
        content: props.item.content
      };
    } else {
      this.state = {
        key: null,
        title: Language.datas.defaultTitle || '',
        content: Language.datas.defaultTags || []
      };
    }
  }

  componentWillMount() {
    Actions.refresh({
      rightTitle: (<Icon name="check" size={17}/>),
      onRight: this.bindDone
    });
  }

  async bindDone() {
    const { key, title, content } = this.state;
    if (title.trim().length < 1 || content.length < 1) {
      Alert.alert(Language.datas.editError);
    } else {
      await DataManager.editOne(key, title, content);
      Actions.pop();
    }
  }

  bindChangeTags(tags) {
    this.setState({
      content: tags || []
    })
  }

  bindChangeTitle(title) {
    this.setState({
      title: title || ''
    });
  }

  render() {
    const { title, content } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          value={title}
          onChangeText={this.bindChangeTitle}
          style={styles.titleInput}
          placeholder={Language.datas.titlePlaceholder}
          selectTextOnFocus
        />
        <View style={styles.tagView}>
          <TagInput
            value={content}
            onChange={this.bindChangeTags}
            numberOfLines={1}
            separators={['\n']}
            inputProps={{
              placeholder: Language.datas.tagPlaceholder
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.colors.background,
    padding: 10
  },
  titleInput: {
    fontSize: 20,
    height: 40,
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  tagView: {
    borderTopWidth: 1,
    borderTopColor: Constant.colors.line,
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
});
