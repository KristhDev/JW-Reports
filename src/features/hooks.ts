import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/* Store */
import { AppDispatch, RootState } from './store';

/* Defined types hooks */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;