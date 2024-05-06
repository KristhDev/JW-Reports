import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reduxFlipper from 'redux-flipper';

/* Reducers */
import { authReducer } from '../modules/auth';
import { coursesReducer } from '../modules/courses';
import { lessonsReducer } from '../modules/lessons';
import { permissionsReducer, statusReducer } from '../modules/shared';
import { preachingReducer } from '../modules/preaching';
import { revisitsReducer } from '../modules/revisits';

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
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware({
            serializableCheck: false
        });

        /* Checking if the app is in development mode. If it is, it will add the reduxFlipper
        middleware to the store. */
        if (__DEV__ && !process.env.JEST_WORKER_ID) {
            middleware.push(reduxFlipper() as any);
        }

        return middleware;
    }
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;