import DeviceInfo from 'react-native-device-info';
import en from './en';
import zhHans from './zh-hans';
import zhHant from './zh-hant';

const lan = {
  init: function() {
    const ll = DeviceInfo.getDeviceLocale().toLowerCase();
    if (ll.indexOf('zh-hans') > -1) {
      lan.datas = Object.assign({}, en, zhHans);
    } else if (ll.indexOf('zh-hant') > -1) {
      lan.datas = Object.assign({}, en, zhHant);
    }
  },
  datas: en,
};

export default lan;
