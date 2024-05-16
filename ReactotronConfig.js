import Reactotron, { asyncStorage, openInEditor, trackGlobalErrors } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reactotron = Reactotron
    .setAsyncStorageHandler(AsyncStorage)
    .configure({ name: 'JW Reports' })
    .useReactNative()
    .use(asyncStorage())
    .use(openInEditor())
    .use(reactotronRedux())
    .use(trackGlobalErrors())
    .connect();

export default reactotron;