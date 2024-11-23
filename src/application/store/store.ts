import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import { PersistConfig } from 'reduxjs-toolkit-persist/lib/types';

/* Reducers */
import {
    authReducer,
    AuthState,
    coursesReducer,
    CoursesState,
    lessonsReducer,
    LessonsState,
    permissionsReducer,
    PermissionsState,
    preachingReducer,
    PreachingState,
    revisitsReducer,
    RevisitsState,
    statusReducer,
    StatusState,
    uiReducer,
    UIState
} from '@application/features';

/* Adapters */
import { storageKeys, storePersistor } from '@infrasturcture/adapters';

/* Debugger */
import reactotron from '../../../ReactotronConfig';

const permissionsPersistConfig: PersistConfig<PermissionsState> = {
    key: storageKeys.STORE_PERMISSIONS,
    storage: storePersistor,
    whitelist: ['isPermissionsRequested'],
}

const uiPersistConfig: PersistConfig<UIState> = {
    key: storageKeys.STORE_UI,
    storage: storePersistor,
    whitelist: [ 'userInterface' ]
}

/* Combining all the reducers into one reducer. */
const reducers = combineReducers({
    auth: authReducer,
    courses: coursesReducer,
    lessons: lessonsReducer,
    permissions: persistReducer(permissionsPersistConfig, permissionsReducer),
    preaching: preachingReducer,
    revisits: revisitsReducer,
    status: statusReducer,
    ui: persistReducer(uiPersistConfig, uiReducer),
});

/* Persisting the store. */
const persistConfig: PersistConfig<RootState> = {
    key: storageKeys.STORE,
    storage: storePersistor,
    blacklist: [ 'status' ]
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

export type RootState = {
    auth: AuthState;
    courses: CoursesState;
    lessons: LessonsState;
    permissions: PermissionsState;
    preaching: PreachingState;
    revisits: RevisitsState;
    status: StatusState;
    ui: UIState;
}

export type AppDispatch = typeof store.dispatch;