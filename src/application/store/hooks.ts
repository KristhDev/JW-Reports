import { useDispatch, useSelector } from 'react-redux';

/* Store */
import { AppDispatch, RootState } from './store';

/* Defined types hooks */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();