import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react-native';

import { uiReducer, UIState, useUI } from '@ui'

interface InitialState {
    ui: UIState
}

export const getMockStoreUseUI = ({ ui }: InitialState) => {
    return configureStore({
        reducer: { ui: uiReducer },
        preloadedState: { ui: { ...ui } },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        })
    });
}

export const renderUseUI = (store: any) => {
    return renderHook(() => ({ useUI: useUI() }), {
        wrapper: ({ children }) => <Provider store={ store }>{ children }</Provider>
    });
}