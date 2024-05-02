import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import reduxFlipper from 'redux-flipper';

/* Reducers */
import { authReducer } from '../modules/auth';
import { coursesReducer } from '../modules/courses';
import { permissionsReducer, statusReducer } from '../modules/shared';
import { preachingReducer } from '../modules/preaching';
import { revisitsReducer } from '../modules/revisits';

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
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware({
            serializableCheck: false
        });

        /* Checking if the app is in development mode. If it is, it will add the reduxFlipper
        middleware to the store. */
        if (__DEV__ && !process.env.JEST_WORKER_ID) {
            middleware.push(reduxFlipper());
        }

        return middleware;
    }
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;