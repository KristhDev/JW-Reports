import React from 'react';
import { renderHook } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

/* Application */
import { statusReducer, StatusState, uiReducer, UIState } from '@application/features';

/* Shared */
import { useExportData, useStatus } from '@shared';

interface InitialState {
    status: StatusState;
    ui: UIState;
}

export const getMockStoreUseExportData = ({ status, ui }: InitialState) => {
    return configureStore({
        reducer: {
            status: statusReducer,
            ui: uiReducer
        },
        preloadedState: {
            status: { ...status },
            ui: { ...ui }
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    });
}

export const renderUseExportData = (store: any) => {
    return renderHook(() => ({
        useExportData: useExportData(),
        useStatus: useStatus()
    }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}