import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { useDispatch } from 'react-redux';

import { authReducer } from './auth';
import { preachingReducer } from './preaching';
import { statusReducer } from './status';

const reducers = combineReducers({
    auth: authReducer,
    preaching: preachingReducer,
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
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;