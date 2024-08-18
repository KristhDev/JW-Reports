import Reactotron, { openInEditor, trackGlobalErrors } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron
    .configure({ name: 'JW Reports' })
    .useReactNative()
    .use(openInEditor())
    .use(reactotronRedux())
    .use(trackGlobalErrors())
    .connect();

export default reactotron;