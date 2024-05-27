import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Reducers */
import { authReducer } from '../modules/auth/features';
import { coursesReducer } from '../modules/courses/features';
import { lessonsReducer } from '../modules/lessons/features';
import { permissionsReducer, statusReducer } from '../modules/shared/features';
import { preachingReducer } from '../modules/preaching/features';
import { revisitsReducer } from '../modules/revisits/features';

/* Utils */
import { asyncStorageKeys } from '../utils';

/* Combining all the reducers into one reducer. */
const reducers = combineReducers({
    auth: authReducer,
    courses: coursesReducer,
    lessons: lessonsReducer,
    permissions: permissionsReducer,
    preaching: preachingReducer,
    revisits: revisitsReducer,
    status: statusReducer
});

/* Persisting the store. */
const persistConfig = {
    key: asyncStorageKeys.STORE,
    storage: AsyncStorage
};

const reducer = persistReducer(persistConfig, reducers);

/* Creating the store. */
export const store = configureStore({
    reducer,
    devTools: false,
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;