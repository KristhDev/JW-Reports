import React from 'react';
import { renderHook } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

/* Application */
import { statusReducer, StatusState } from '@application/features';

/* Shared */
import { useStatus, useVoiceRecorder } from '@shared';

interface InitialState {
    status: StatusState
}

export const getMockStoreUseVoiceRecorder = ({ status }: InitialState) => {
    return configureStore({
        reducer: { status: statusReducer },
        preloadedState: { status: { ...status } },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    });
}

export const renderUseVoiceRecorder = (store: any) => {
    return renderHook(() => ({
        useStatus: useStatus(),
        useVoiceRecorder: useVoiceRecorder()
    }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}