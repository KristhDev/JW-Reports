import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-native';

import { statusReducer, StatusState, useStatus } from '../../src/modules/shared';

export const getMockStoreUseStatus = (initialState: StatusState) => {
    return configureStore({
        reducer: {
            status: statusReducer,
        },
        preloadedState: {
            status: { ...initialState }
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    });
}

export const renderUseStatus = (store: any) => {
    return renderHook(() => useStatus(), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}