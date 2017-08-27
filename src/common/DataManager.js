import Constant from './Constant';
import Language from '../Language';
import SaveKeys from './SaveKeys';
import StorageHelper from './StorageHelper';

const DataManager = {
  _datas: {},
  _isFirstOpen: false,
  _lastId: null,
  init: async function() {
    const data = await StorageHelper.getAllDataAsync();
    DataManager._datas = {};
    DataManager._isFirstOpen = data[SaveKeys.DATA_IS_OPENED] !== 'true';
    if (DataManager._isFirstOpen) {
      const need = {};
      const baseList = Language.datas.baseList;
      need[SaveKeys.DATA_IS_OPENED] = 'true';
      need[SaveKeys.DATA_EVENT_ID_LIST] = JSON.stringify(baseList.keys);
      baseList.keys.forEach(it => {
        DataManager._datas[it] = baseList[it];
        need[`${SaveKeys.DATA_EVENT_CONTENT_PRE}${it}`] = JSON.stringify(baseList[it]);
      });
      need[SaveKeys.DATA_EVENT_LAST_ID] = baseList.keys[0];
      DataManager._lastId = baseList.keys[0];
      await StorageHelper.saveDatasAsync(need);
    } else {
      const keys = JSON.parse(data[SaveKeys.DATA_EVENT_ID_LIST]) || [];
      keys.forEach(it => {
        const da = data[`${SaveKeys.DATA_EVENT_CONTENT_PRE}${it}`];
        if (da) {
          DataManager._datas[it] = JSON.parse(da);
        }
      });
      const lastId = data[SaveKeys.DATA_EVENT_LAST_ID];
      if (DataManager._datas[lastId]) {
        DataManager._lastId = lastId;
      } else if (Object.keys(DataManager._datas).length > 0) {
        DataManager._lastId = Object.keys(DataManager._datas)[0];
      }
    }
  },
  getCur: function() {
    if (DataManager._lastId) {
      return DataManager._datas[DataManager._lastId];
    }
    return {
      title: Language.datas.defaultTitle,
      content: Language.datas.defaultTags
    };
  },
  getAll: function() {
    return Object.keys(DataManager._datas).map(it => ({
      key: it,
      ...DataManager._datas[it]
    }));
  },
  makeKey: function() {
    return `${new Date().getTime()}_${parseInt(Math.random()*1000, 10)}`;
  },
  editOne: async function(key, title, content) {
    const need = {};
    if (key) {
      if (DataManager._datas[key]) {
        DataManager._datas[key] = {
          title,
          content
        };
        need[`${SaveKeys.DATA_EVENT_CONTENT_PRE}${key}`] = JSON.stringify({
          title,
          content
        });
      } else {
        // error
      }
    } else {
      const newKey = DataManager.makeKey();
      DataManager._datas[newKey] = {
        title,
        content
      };
      need[SaveKeys.DATA_EVENT_ID_LIST] = JSON.stringify(Object.keys(DataManager._datas));
      need[`${SaveKeys.DATA_EVENT_CONTENT_PRE}${newKey}`] = JSON.stringify({
        title,
        content
      });
    }
    if (Object.keys(need).length > 0) {
      await StorageHelper.saveDatasAsync(need);
    }
  },
  deleteOne: async function(key) {
    if (DataManager._datas[key]) {
      delete DataManager._datas[key];
      await StorageHelper.deleteOneAsync(`${SaveKeys.DATA_EVENT_CONTENT_PRE}${key}`);
      await StorageHelper.saveDatasAsync({
        [SaveKeys.DATA_EVENT_ID_LIST]: JSON.stringify(Object.keys(DataManager._datas))
      });
    }
  },
  setLast: async function(key) {
    await StorageHelper.saveDatasAsync({
      [SaveKeys.DATA_EVENT_LAST_ID]: key
    });
  },
};

export default DataManager;
