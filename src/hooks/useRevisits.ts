import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { supabase } from '../supabase/config';

import { RootState, useAppDispatch } from '../features/store';
import {
    addRevisit,
    clearRevisits as clearRevisitsAction,
    setIsRevisitLoading,
    setIsRevisitsLoading as setIsRevisitsLoadingAction,
    setRevisits
} from '../features/revisits';

import { useAuth, useStatus } from './';

import { RevisitsState } from '../interfaces/revisits';
import { RevisitFormValues } from '../components/revisits/RevisitForm/interfaces';

const useRevisits = () => {
    const dispatch = useAppDispatch();
    const { navigate } = useNavigation();

    const { state: { user } } = useAuth();
    const { setStatus } = useStatus();

    const state = useSelector<RootState, RevisitsState>(store => store.revisits);

    const clearRevisits = () => dispatch(clearRevisitsAction());
    const setIsRevisitsLoading = (isLoading: boolean) => dispatch(setIsRevisitsLoadingAction({ isLoading }));

    const loadRevisits = async () => {
        setIsRevisitsLoading(true);

        const { data, error } = await supabase.from('revisits')
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

    const saveRevisit = async (revisitValues: RevisitFormValues) => {
        dispatch(setIsRevisitLoading({ isLoading: true }));

        const { data, error } = await supabase.from('revisits')
            .insert({
                ...revisitValues,
                next_visit: dayjs(revisitValues.next_visit).format('YYYY-MM-DD HH:mm'),
                user_id: user.id
            })
            .select();

        if (error) {
            console.log(error);
            dispatch(setIsRevisitLoading({ isLoading: false }));
            setStatus({ code: 400, msg: error.message });

            return;
        }

        dispatch(addRevisit({ revisit: data[0] }));

        setStatus({
            code: 201,
            msg: 'Haz agregado tu revisita correctamente.'
        });

        navigate('RevisitsScreen' as never);
    }

    return {
        state,

        // Actions
        clearRevisits,

        // Functions
        loadRevisits,
        saveRevisit,
    }
}

export default useRevisits;