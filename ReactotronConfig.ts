import Reactotron, { openInEditor, trackGlobalErrors, ReactotronReactNative } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import mmkvPlugin from 'reactotron-react-native-mmkv';

import { mmkvStorage } from './src/utils';

const reactotron = Reactotron
    .configure({
        name: 'JW Reports'
    })
    .useReactNative()
    .use(openInEditor())
    .use(reactotronRedux())
    .use(mmkvPlugin<ReactotronReactNative>({ storage: mmkvStorage }))
    .use(trackGlobalErrors())
    .connect();

export default reactotron;