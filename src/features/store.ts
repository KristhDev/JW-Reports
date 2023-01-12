import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { useDispatch } from 'react-redux';
import reduxFlipper from 'redux-flipper';

import { authReducer } from './auth';
import { permissionsReducer } from './permissions';
import { preachingReducer } from './preaching';
import { revisitsReducer } from './revisits';
import { statusReducer } from './status';

const reducers = combineReducers({
    auth: authReducer,
    permissions: permissionsReducer,
    preaching: preachingReducer,
    revisits: revisitsReducer,
    status: statusReducer
});

const persistConfig = {
    key: 'jw-reports-root',
    storage: AsyncStorage,
}

const reducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer,
    devTools: false,
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware({
            serializableCheck: false
        });

        if (__DEV__) {
            middleware.push(reduxFlipper());
        }

        return middleware;
    }
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;