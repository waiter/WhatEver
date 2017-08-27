import {AsyncStorage} from 'react-native';

export default {
  getAllData: function() {
    return function(fn) {
      AsyncStorage.getAllKeys((err, keys) => {
        if (err) {
          fn(err);
        } else {
          AsyncStorage.multiGet(keys, (err, stores) => {
            if (err) {
              fn(err)
            } else {
              const re = {};
              stores.forEach(item => {
                re[item[0]] = item[1];
              });
              fn(null, re);
            }
          });
        }
      });
    };
  },
  getAllDataAsync: function() {
    return new Promise(async function(resolve, reject) {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const stores = await AsyncStorage.multiGet(keys);
        const re = {};
        stores.forEach(item => {
          re[item[0]] = item[1];
        });
        resolve(re);
      } catch (err) {
        reject(err);
      }
    });
  },
  saveDatas: function(kvs) {
    return function(fn) {
      const keys = Object.keys(kvs);
      const arr = keys.map(key => [key, kvs[key]]);
      AsyncStorage.multiSet(arr, errs => {
        if (errs && errs.length > 0) {
          fn(errs);
        } else {
          fn(null, true);
        }
      });
    };
  },
  saveDatasAsync: function(kvs) {
    return new Promise(async function(resolve, reject) {
      const keys = Object.keys(kvs);
      const arr = keys.map(key => [key, kvs[key]]);
      try {
        await AsyncStorage.multiSet(arr);
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  },
  saveData: function(key, value) {
    return function(fn) {
      AsyncStorage.setItem(key, value, err => {
        if (err) {
          fn(err);
        } else {
          fn(null, true);
        }
      });
    };
  },
  clearData: function() {
    return function(fn) {
      AsyncStorage.clear(err => {
        if (err) {
          fn(err);
        } else {
          fn(null, true);
        }
      });
    };
  },
  deleteOne: function(key) {
    return function(fn) {
      AsyncStorage.removeItem(key, err => {
        if (err) {
          fn(err);
        } else {
          fn(null, true);
        }
      });
    };
  },
  deleteOneAsync: function(key) {
    return new Promise(async function(resolve, reject) {
      try {
        await AsyncStorage.removeItem(key);
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }
}
