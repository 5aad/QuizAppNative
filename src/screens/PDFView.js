import React from 'react';
import {View} from 'react-native';
import PDFViews from 'react-native-view-pdf';
import {Appbar} from 'react-native-paper';
const resources = {
  file:
    Platform.OS === 'ios'
      ? 'downloadedDocument.pdf'
      : '/sdcard/Download/downloadedDocument.pdf',
  url: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
  base64: 'JVBERi0xLjMKJcfs...',
};
const PDFView = ({navigation}) => {
  const resourceType = 'url';
  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={{backgroundColor: '#fff'}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="PDF View" />
      </Appbar.Header>
      <PDFViews
        fadeInDuration={250.0}
        style={{flex: 1}}
        resource={resources[resourceType]}
        resourceType={resourceType}
        onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
        onError={(error) => console.log('Cannot render PDF', error)}
      />
    </View>
  );
};

export default PDFView;
