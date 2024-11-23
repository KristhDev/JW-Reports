/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

if (__DEV__ && !process.env.JEST_WORKER_ID) require('./ReactotronConfig');

AppRegistry.registerComponent(appName, () => App);
