import {AdMobInterstitial} from 'react-native-admob';

const ad = {
  keys: {
    show: 'ca-app-pub-5825705564244333/1700795141',
    home: 'ca-app-pub-5825705564244333/2430233517',
    video: 'ca-app-pub-5825705564244333/1995119243'
  },
  // testDeviceID: '00fda71dc67fc13903cb9f0be47c0a35',
  testDeviceID: 'EMULATOR',
  isNoAd: false,
  isInit: false,
  init: function() {
    AdMobInterstitial.setTestDeviceID(ad.testDeviceID);
    AdMobInterstitial.setAdUnitID(ad.keys.video);
    ad.isInit = true;
  },
  showAd: function() {
    AdMobInterstitial.requestAd(() => AdMobInterstitial.showAd(
      () => ({})
    ));
  }
};

export default ad;
