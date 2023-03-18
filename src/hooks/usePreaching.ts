import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

/* Supabase - config */
import { supabase } from '../supabase/config';

/* Features */
import { RootState, useAppDispatch } from '../features/store';
import {
    INIT_PREACHING,
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

/* Hooks */
import { useAuth, useStatus } from './';

/* Interfaces */
import { Preaching, PreachingFormValues, PreachingState } from '../interfaces/preaching';

/**
 * Hook to management preaching of store with state and actions
 */
const usePreaching = () => {
    const dispatch = useAppDispatch();
    const { goBack } = useNavigation();

    const { state: { user } } = useAuth();
    const { setStatus, setSupabaseError } = useStatus();

    const state = useSelector<RootState, PreachingState>(store => store.preaching);

    const clearPreaching = () => dispatch(clearPreachingAction());
    const setIsPreachingsLoading = (isLoading: boolean) => dispatch(setIsPreachingsLoadingAction({ isLoading }));
    const setSelectedDate = (date: Date) => dispatch(setSelectedDateAction({ selectedDate: date }));
    const setSelectedPreaching = (preaching: Preaching) => dispatch(setSelectedPreachingAction({ preaching }));

    /**
     * Load preachings from the database and set them in the state.
     * @param {Date} date - Date of preaching (month)
     */
    const loadPreachings = async (date: Date) => {
        setIsPreachingsLoading(true);

        const init_date = dayjs(date).startOf('month').format('YYYY-MM-DD');
        const final_date = dayjs(date).endOf('month').format('YYYY-MM-DD');

        const { data, error, status } = await supabase.from('preachings')
            .select()
            .eq('user_id', user.id)
            .gte('day', init_date)
            .lte('day', final_date)
            .order('day', { ascending: true })
            .order('init_hour', { ascending: true });

        const next = setSupabaseError(error, status, () => setIsPreachingsLoading(false));
        if (next) return;

        dispatch(setPreachings({ preachings: data! }));
    }

    /**
     * This function is to save the preaching day and return to the previous screen.
     * @param {PreachingFormValues} preachingValues - The values for save preaching day
     */
    const savePreaching = async (preachingValues: PreachingFormValues) => {
        dispatch(setIsPreachingLoading({ isLoading: true }));

        const { data, error, status } = await supabase.from('preachings')
            .insert({
                ...preachingValues,
                day: dayjs(preachingValues.day).format('YYYY-MM-DD'),
                init_hour: dayjs(preachingValues.init_hour).format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                final_hour: dayjs(preachingValues.final_hour).format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                user_id: user.id
            })
            .select();

        const next = setSupabaseError(error, status, () => dispatch(setIsPreachingLoading({ isLoading: false })));
        if (next) return;

        if (dayjs(data![0].day).format('MMMM') === dayjs(state.selectedDate).format('MMMM')) {
            dispatch(addPreaching({ preaching: data![0] }));
        }

        setStatus({
            code: 201,
            msg: 'Haz agregado tu día de predicación correctamente.'
        });

        goBack();
    }

    /**
     * This function is to update the preaching day and return to the previous screen.
     * @param {PreachingFormValues} preachingValues - Values to update preaching day
     */
    const updatePreaching = async (preachingValues: PreachingFormValues) => {
        dispatch(setIsPreachingLoading({ isLoading: true }));

        const { data, error, status } = await supabase.from('preachings')
            .update({
                ...preachingValues,
                day: dayjs(preachingValues.day).format('YYYY-MM-DD'),
                init_hour: dayjs(preachingValues.init_hour).format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                final_hour: dayjs(preachingValues.final_hour).format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                updated_at:dayjs().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.seletedPreaching.id)
            .eq('user_id', user.id)
            .select();

        const next = setSupabaseError(error, status, () => dispatch(setIsPreachingLoading({ isLoading: false })));
        if (next) return;

        dispatch(updatePreachingAction({ preaching: data![0] }));

        setStatus({
            code: 201,
            msg: 'Haz actualizado tu día de predicación correctamente.'
        });

        goBack();
    }

    /**
     * This function is to delete a preaching day and return to the previous screen.
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     */
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

        if (state.seletedPreaching.user_id !== user.id) {
            onFinish && onFinish();
            dispatch(setIsPreachingDeleting({ isDeleting: false }));

            setStatus({
                code: 400,
                msg: 'Lo sentimos, pero no puedes realizar está acción.'
            });

            return;
        }

        const { error, status } = await supabase.from('preachings')
            .delete()
            .eq('id', state.seletedPreaching.id)
            .eq('user_id', user.id);

        const next = setSupabaseError(error, status, () => {
            onFinish && onFinish();
            dispatch(setIsPreachingDeleting({ isDeleting: false }));
        });

        if (next) return;

        dispatch(removePreaching({ id: state.seletedPreaching.id }));
        onFinish && onFinish();
        goBack();

        setSelectedPreaching({
            ...INIT_PREACHING,
            day: new Date().toString(),
            init_hour: new Date().toString(),
            final_hour: new Date().toString()
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