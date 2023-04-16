import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

/* Reducers */
import { authReducer } from './auth';
import { coursesReducer } from './courses';
import { permissionsReducer } from './permissions';
import { preachingReducer } from './preaching';
import { revisitsReducer } from './revisits';
import { statusReducer } from './status';

/* Combining all the reducers into one reducer. */
const reducers = combineReducers({
    auth: authReducer,
    courses: coursesReducer,
    permissions: permissionsReducer,
    preaching: preachingReducer,
    revisits: revisitsReducer,
    status: statusReducer
});

/* Setting the key and storage for the persistor. */
const persistConfig = {
    key: 'jw-reports-root',
    storage: AsyncStorage,
}

const reducer = persistReducer(persistConfig, reducers);

/* Creating the store. */
export const store = configureStore({
    reducer,
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;