import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { supabase } from '../supabase/config';

import { RootState, useAppDispatch } from '../features/store';
import {
    setRevisits,
    setIsRevisitsLoading as setIsRevisitsLoadingAction
} from '../features/revisits';

import { useAuth, useStatus } from './';

import { RevisitsState } from '../interfaces/revisits';

const useRevisits = () => {
    const dispatch = useAppDispatch();
    const { navigate } = useNavigation();

    const { state: { user } } = useAuth();
    const { setStatus } = useStatus();

    const state = useSelector<RootState, RevisitsState>(store => store.revisits);

    const setIsRevisitsLoading = (isLoading: boolean) => dispatch(setIsRevisitsLoadingAction({ isLoading }));

    const loadRevisits = async () => {
        setIsRevisitsLoading(true);

        const { data, error } = await supabase.from('preachings')
            .select()
            .eq('user_id', user.id)
            .order('next_visit', { ascending: false })
            .order('created_at', { ascending: false })
            .range(0, 10)

        if (error) {
            console.log(error);

            setIsRevisitsLoading(false);
            setStatus({ code: 400, msg: error.message });

            return;
        }

        dispatch(setRevisits({ revisits: data }));
    }

    return {
        state,
        loadRevisits
    }
}

export default useRevisits;