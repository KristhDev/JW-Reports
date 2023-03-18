import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import hexToRgba from 'hex-to-rgba';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '../../src/hooks';

import { ThemeProvider } from '../../src/theme/context';

import { darkState, defaultThemeState } from '../features/theme';

const render = () => {
    return renderHook(() => useTheme(), {
        wrapper: ({ children }) => <ThemeProvider>{ children }</ThemeProvider>
    });
}

describe('Test in useTheme hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return respective props', async () => {
        const { result } = render();

        await waitFor(() => {
            const BUTTON_TRANSLUCENT_COLOR = hexToRgba(
                (result.current.state.selectedTheme === 'dark') ? '#5A3D86' : '#C0A7E1',
                (result.current.state.selectedTheme === 'dark') ? 0.25 : 0.50
            );

            const BUTTON_TRANSPARENT_COLOR = (result.current.state.selectedTheme === 'dark')
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(0, 0, 0, 0.15)';

            expect(result.current).toEqual({
                state: defaultThemeState,
                setTheme: expect.any(Function),
                setDefaultTheme: expect.any(Function),
                BUTTON_TRANSLUCENT_COLOR,
                BUTTON_TRANSPARENT_COLOR
            });
        });
    });

    it('should change theme with setTheme', async () => {
        const { result } = render();

        await waitFor(async () => {
            result.current.setTheme('dark');

            const BUTTON_TRANSLUCENT_COLOR = hexToRgba(
                (result.current.state.selectedTheme === 'dark') ? '#5A3D86' : '#C0A7E1',
                (result.current.state.selectedTheme === 'dark') ? 0.25 : 0.50
            );

            const BUTTON_TRANSPARENT_COLOR = (result.current.state.selectedTheme === 'dark')
                ? 'rgba(255, 255, 255, 0.15)'
                : 'rgba(0, 0, 0, 0.15)';

            expect(result.current.state).toEqual({
                ...darkState,
                deviceTheme: 'default'
            });

            expect(result.current.BUTTON_TRANSLUCENT_COLOR).toBe(BUTTON_TRANSLUCENT_COLOR);
            expect(result.current.BUTTON_TRANSPARENT_COLOR).toBe(BUTTON_TRANSPARENT_COLOR);
        });

        expect(AsyncStorage.setItem).toHaveBeenCalled();
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('jw-reports-theme', 'dark');
    });

    it('should set default theme with setDefaultTheme', async () => {
        const { result } = render();

        await waitFor(async () => {
            result.current.setDefaultTheme();

            expect(result.current.state).toEqual(defaultThemeState);
        });

        expect(AsyncStorage.setItem).toHaveBeenCalled();
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('jw-reports-theme', 'default');
    });
});