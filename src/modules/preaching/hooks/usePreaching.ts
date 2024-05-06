import { useNavigation } from '@react-navigation/native';

/* Supabase */
import { supabase } from '../../../config';

/* Adapters */
import { preachingAdapter } from '../adapters';

/* Features */
import { useAppDispatch, useAppSelector } from '../../../features';
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
    updatePreaching as updatePreachingAction
} from '../features';

/* Hooks */
import { useNetwork, useStatus } from '../../shared';

/* Interfaces */
import { Preaching, PreachingFormValues, PreachingEndpoint } from '../interfaces';

/* Utils */
import { date as dateUtil } from '../../../utils';

/**
 * Hook to management preaching of store with state and actions
 */
const usePreaching = () => {
    const dispatch = useAppDispatch();
    const { goBack } = useNavigation();

    const state = useAppSelector(store => store.preaching);
    const { user, isAuthenticated } = useAppSelector(store => store.auth);

    const { setStatus, setSupabaseError, setUnauthenticatedError, setNetworkError } = useStatus();
    const { wifi } = useNetwork();

    const clearPreaching = () => dispatch(clearPreachingAction());
    const setIsPreachingsLoading = (isLoading: boolean) => dispatch(setIsPreachingsLoadingAction({ isLoading }));
    const setSelectedDate = (date: Date) => dispatch(setSelectedDateAction({ selectedDate: date }));
    const setSelectedPreaching = (preaching: Preaching) => dispatch(setSelectedPreachingAction({ preaching }));

    /**
     * Load preachings from the database and set them in the state.
     *
     * @param {Date} date - Date of preaching (month)
     * @return {Promise<void>} This function does not return anything.
     */
    const loadPreachings = async (date: Date): Promise<void> => {
        if (!wifi.isConnected) {
            setNetworkError();
            return;
        }

        setIsPreachingsLoading(true);

        if (!isAuthenticated) {
            setUnauthenticatedError(() => setIsPreachingsLoading(false));
            return;
        }

        const init_date = dateUtil.getFirstDateOfMonth(date, 'YYYY-MM-DD');
        const final_date = dateUtil.getLastDateOfMonth(date, 'YYYY-MM-DD');

        const { data, error, status } = await supabase.from('preachings')
            .select<'*', PreachingEndpoint>()
            .eq('user_id', user.id)
            .gte('day', init_date)
            .lte('day', final_date)
            .order('day', { ascending: true })
            .order('init_hour', { ascending: true });

        const next = setSupabaseError(error, status, () => setIsPreachingsLoading(false));
        if (next) return;

        dispatch(setPreachings({ preachings: data!.map(preachingAdapter) }));
    }

    /**
     * This function is to save the preaching day and return to the previous screen.
     *
     * @param {PreachingFormValues} preachingValues - The values for save preaching day
     * @return {Promise<void>} This function does not return anything.
     */
    const savePreaching = async (preachingValues: PreachingFormValues): Promise<void> => {
        if (!wifi.isConnected) {
            setNetworkError();
            return;
        }

        dispatch(setIsPreachingLoading({ isLoading: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => dispatch(setIsPreachingLoading({ isLoading: false })));
            return;
        }

        const { data, error, status } = await supabase.from('preachings')
            .insert({
                day: dateUtil.format(preachingValues.day, 'YYYY-MM-DD'),
                init_hour: dateUtil.format(preachingValues.initHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
                final_hour: dateUtil.format(preachingValues.finalHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
                user_id: user.id
            })
            .single<PreachingEndpoint>();

        const next = setSupabaseError(error, status, () => dispatch(setIsPreachingLoading({ isLoading: false })));
        if (next) return;

        if (dateUtil.format(data!.day, 'MMMM') === dateUtil.format(state.selectedDate, 'MMMM')) {
            dispatch(addPreaching({ preaching: preachingAdapter(data!) }));
        }

        setStatus({
            code: 201,
            msg: 'Haz agregado tu día de predicación correctamente.'
        });

        goBack();
    }

    /**
     * This function is to update the preaching day and return to the previous screen.
     *
     * @param {PreachingFormValues} preachingValues - Values to update preaching day
     * @return {Promise<void>} This function does not return anything.
     */
    const updatePreaching = async (preachingValues: PreachingFormValues): Promise<void> => {
        if (!wifi.isConnected) {
            setNetworkError();
            return;
        }

        dispatch(setIsPreachingLoading({ isLoading: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => dispatch(setIsPreachingLoading({ isLoading: false })));
            return;
        }

        if (state.seletedPreaching.id === '') {
            dispatch(setIsPreachingLoading({ isLoading: false }));

            setStatus({
                code: 400,
                msg: 'No hay un día de predicación seleccionado para actualizar.'
            });

            return;
        }

        const { data, error, status } = await supabase.from('preachings')
            .update({
                day: dateUtil.format(preachingValues.day, 'YYYY-MM-DD'),
                init_hour: dateUtil.format(preachingValues.initHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
                final_hour: dateUtil.format(preachingValues.finalHour, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
                updated_at: dateUtil.format(new Date(),'YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.seletedPreaching.id)
            .eq('user_id', user.id)
            .single<PreachingEndpoint>();

        const next = setSupabaseError(error, status, () => dispatch(setIsPreachingLoading({ isLoading: false })));
        if (next) return;

        dispatch(updatePreachingAction({ preaching: preachingAdapter(data!) }));

        setStatus({
            code: 200,
            msg: 'Haz actualizado tu día de predicación correctamente.'
        });

        setSelectedPreaching({
            ...INIT_PREACHING,
            day: new Date().toString(),
            initHour: new Date().toString(),
            finalHour: new Date().toString()
        });

        goBack();
    }

    /**
     * This function is to delete a preaching day and return to the previous screen.
     *
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const deletePreaching = async (onFinish?: () => void): Promise<void> => {
        if (!wifi.isConnected) {
            setNetworkError();
            return;
        }

        dispatch(setIsPreachingDeleting({ isDeleting: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => {
                onFinish && onFinish();
                dispatch(setIsPreachingDeleting({ isDeleting: false }));
            });

            return;
        }

        if (state.seletedPreaching.id === '') {
            onFinish && onFinish();
            dispatch(setIsPreachingDeleting({ isDeleting: false }));

            setStatus({
                code: 400,
                msg: 'No hay un día de predicación seleccionado para eliminar.'
            });

            return;
        }

        if (state.seletedPreaching.userId !== user.id) {
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
            initHour: new Date().toString(),
            finalHour: new Date().toString()
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
