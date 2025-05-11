import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import { PersistConfig } from 'reduxjs-toolkit-persist/lib/types';

/* Constants */
import { storageKeys } from '@application/constants/utils';

/* Persistor */
import { storePersistor } from './persistor';

/* Reducers */
import { authReducer, AuthState } from '@application/features/auth';
import { coursesReducer, CoursesState } from '@application/features/courses';
import { lessonsReducer, LessonsState } from '@application/features/lessons';
import { permissionsReducer, PermissionsState } from '@application/features/permissions';
import { preachingReducer, PreachingState } from '@application/features/preaching';
import { revisitsReducer, RevisitsState } from '@application/features/revisits';
import { statusReducer, StatusState } from '@application/features/status';
import { uiReducer, UIState } from '@application/features/ui';

/* Debugger */
import reactotron from '../../../ReactotronConfig';

const coursesPersistConfig: PersistConfig<CoursesState> = {
    key: storageKeys.STORE_COURSES,
    storage: storePersistor,
    whitelist: [ 'courses' ]
}

const lessonsPersistConfig: PersistConfig<LessonsState> = {
    key: storageKeys.STORE_LESSONS,
    storage: storePersistor,
    whitelist: [ 'lessons', 'lastLesson' ]
}

const permissionsPersistConfig: PersistConfig<PermissionsState> = {
    key: storageKeys.STORE_PERMISSIONS,
    storage: storePersistor,
    whitelist: [ 'isPermissionsRequested' ],
}

const preachingPersistConfig: PersistConfig<PreachingState> = {
    key: storageKeys.STORE_PREACHING,
    storage: storePersistor,
    whitelist: [ 'preachings' ]
}

const revisitsPersistConfig: PersistConfig<RevisitsState> = {
    key: storageKeys.STORE_REVISITS,
    storage: storePersistor,
    whitelist: [ 'revisits', 'lastRevisit' ]
}

const uiPersistConfig: PersistConfig<UIState> = {
    key: storageKeys.STORE_UI,
    storage: storePersistor,
    whitelist: [ 'userInterface' ]
}

/* Combining all the reducers into one reducer. */
const reducers = combineReducers({
    auth: authReducer,
    courses: persistReducer(coursesPersistConfig, coursesReducer),
    lessons: persistReducer(lessonsPersistConfig, lessonsReducer),
    permissions: persistReducer(permissionsPersistConfig, permissionsReducer),
    preaching: persistReducer(preachingPersistConfig, preachingReducer),
    revisits: persistReducer(revisitsPersistConfig, revisitsReducer),
    status: statusReducer,
    ui: persistReducer(uiPersistConfig, uiReducer),
});

/* Persisting the store. */
const persistConfig: PersistConfig<RootState> = {
    key: storageKeys.STORE,
    storage: storePersistor,
    blacklist: [
        'courses',
        'lessons',
        'permissions',
        'preaching',
        'revisits',
        'status',
        'ui'
    ]
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