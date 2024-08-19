import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import { PersistConfig } from 'reduxjs-toolkit-persist/lib/types';

/* Reducers */
import { authReducer } from '../modules/auth/features';
import { coursesReducer } from '../modules/courses/features';
import { lessonsReducer } from '../modules/lessons/features';
import { permissionsReducer, statusReducer } from '../modules/shared/features';
import { preachingReducer } from '../modules/preaching/features';
import { revisitsReducer } from '../modules/revisits/features';
import { uiReducer } from '../modules/ui/features';

/* Utils */
import { storageKeys, storePersistor } from '../utils';

/* Debugger */
import reactotron from '../../ReactotronConfig';

/* Combining all the reducers into one reducer. */
const reducers = combineReducers({
    auth: authReducer,
    courses: coursesReducer,
    lessons: lessonsReducer,
    permissions: permissionsReducer,
    preaching: preachingReducer,
    revisits: revisitsReducer,
    status: statusReducer,
    ui: uiReducer
});

/* Persisting the store. */
const persistConfig: PersistConfig<RootState> = {
    key: storageKeys.STORE,
    storage: storePersistor,
    blacklist: [
        'status',
        'permissions',
        'ui'
    ],
};

const reducer = persistReducer(persistConfig, reducers);

/* Creating the store. */
export const store = configureStore({
    reducer,
    devTools: false,
    enhancers: (getDefaultEnhancers) => {
        const enhancers = getDefaultEnhancers();

        if (__DEV__ && !process.env.JEST_WORKER_ID) enhancers.push(reactotron.createEnhancer!());
        return enhancers;
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;