import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { supabase } from '../supabase/config';

import { RootState, useAppDispatch } from '../features/store';
import {
    addPreaching,
    clearPreaching as clearPreachingAction,
    removePreaching,
    setIsPreachingDeleting,
    setIsPreachingLoading,
    setIsPreachingsLoading as setIsPreachingsLoadingAction,
    setPreachings,
    setSelectedDate as setSelectedDateAction,
    setSelectedPreaching as setSelectedPreachingAction,
    updatePreaching as updatePreachingAction,
} from '../features/preaching';

import { useAuth, useStatus } from './';

import { Preaching, PreachingState } from '../interfaces/preaching';
import { PreachingFormValues } from '../components/preaching/PreachingForm/interfaces';

const usePreaching = () => {
    const dispatch = useAppDispatch();
    const { goBack } = useNavigation();

    const { state: { user } } = useAuth();
    const { setStatus } = useStatus();

    const state = useSelector<RootState, PreachingState>(store => store.preaching);

    const clearPreaching = () => dispatch(clearPreachingAction());
    const setIsPreachingsLoading = (isLoading: boolean) => dispatch(setIsPreachingsLoadingAction({ isLoading }));
    const setSelectedDate = (date: Date) => dispatch(setSelectedDateAction({ selectedDate: date }));
    const setSelectedPreaching = (preaching: Preaching) => dispatch(setSelectedPreachingAction({ preaching }));

    const loadPreachings = async (date: Date) => {
        setIsPreachingsLoading(true);

        const init_date = dayjs(date).startOf('month').format('YYYY-MM-DD HH:mm');
        const final_date = dayjs(date).endOf('month').format('YYYY-MM-DD HH:mm');

        const { data, error } = await supabase.from('preachings')
            .select()
            .eq('user_id', user.id)
            .gte('day', init_date)
            .lte('day', final_date)
            .order('day', { ascending: true })
            .order('init_hour', { ascending: true });

        if (error) {
            console.log(error);

            setIsPreachingsLoading(false);
            setStatus({ code: 400, msg: error.message });

            return;
        }

        dispatch(setPreachings({ preachings: data }));
    }

    const savePreaching = async (preachingValues: PreachingFormValues) => {
        dispatch(setIsPreachingLoading({ isLoading: true }));

        const { data, error } = await supabase.from('preachings')
            .insert({
                ...preachingValues,
                day: dayjs(preachingValues.day).format('YYYY-MM-DD'),
                init_hour: dayjs(preachingValues.init_hour).format('YYYY-MM-DD HH:mm'),
                final_hour: dayjs(preachingValues.final_hour).format('YYYY-MM-DD HH:mm'),
                user_id: user.id
            })
            .select();

        if (error) {
            console.log(error);
            dispatch(setIsPreachingLoading({ isLoading: false }));
            setStatus({ code: 400, msg: error.message });

            return;
        }

        if (dayjs(data[0].day).format('MMMM') === dayjs(state.selectedDate).format('MMMM')) {
            dispatch(addPreaching({ preaching: data[0] }));
        }

        setStatus({
            code: 201,
            msg: 'Haz agregado tu día de predicación correctamente.'
        });

        goBack();
    }

    const updatePreaching = async (preachingValues: PreachingFormValues) => {
        dispatch(setIsPreachingLoading({ isLoading: true }));

        const { data, error } = await supabase.from('preachings')
            .update({
                ...preachingValues,
                day: dayjs(preachingValues.day).format('YYYY-MM-DD'),
                init_hour: dayjs(preachingValues.init_hour).format('YYYY-MM-DD HH:mm'),
                final_hour: dayjs(preachingValues.final_hour).format('YYYY-MM-DD HH:mm')
            })
            .eq('id', state.seletedPreaching.id)
            .eq('user_id', user.id)
            .select();

        if (error) {
            console.log(error);
            dispatch(setIsPreachingLoading({ isLoading: false }));
            setStatus({ code: 400, msg: error.message });

            return;
        }

        dispatch(updatePreachingAction({ preaching: data[0] }));

        setStatus({
            code: 201,
            msg: 'Haz actualizado tu día de predicación correctamente.'
        });

        goBack();
    }

    const deletePreaching = async (onFinish?: () => void) => {
        dispatch(setIsPreachingDeleting({ isDeleting: true }));

        if (state.seletedPreaching.id === '') {
            onFinish && onFinish();
            dispatch(setIsPreachingDeleting({ isDeleting: false }));

            setStatus({
                code: 400,
                msg: 'No hay un día de predicación seleccionado para eliminar.'
            });

            return;
        }

        const { error } = await supabase.from('preachings')
            .delete()
            .eq('id', state.seletedPreaching.id)
            .eq('user_id', user.id);

        if (error) {
            console.log(error);
            onFinish && onFinish();
            dispatch(setIsPreachingDeleting({ isDeleting: false }));
            setStatus({ code: 400, msg: error.message });

            return;
        }

        dispatch(removePreaching({ id: state.seletedPreaching.id }));
        onFinish && onFinish();
        goBack();

        setSelectedPreaching({
            id: '',
            user_id: '',
            day: new Date().toString(),
            init_hour: new Date().toString(),
            final_hour: new Date().toString(),
            posts: 0,
            videos: 0,
            revisits: 0,
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        });

        setStatus({
            code: 200,
            msg: 'Haz eliminado tu día de predicación correctamente.'
        });
    }

    return {
        state,

        // Actions
        clearPreaching,
        setIsPreachingsLoading,
        setSelectedDate,
        setSelectedPreaching,

        // Functions
        deletePreaching,
        loadPreachings,
        savePreaching,
        updatePreaching
    }
}

export default usePreaching;