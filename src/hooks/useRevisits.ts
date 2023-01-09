import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { supabase } from '../supabase/config';

import { RootState, useAppDispatch } from '../features/store';
import {
    addRevisit,
    clearRevisits as clearRevisitsAction,
    removeRevisits as removeRevisitsAction,
    setHasMoreRevisits,
    setRefreshRevisits as setRefreshRevisitsAction,
    setIsRevisitLoading,
    setIsRevisitsLoading as setIsRevisitsLoadingAction,
    setRevisits as setRevisitsAction,
    setRevisitsPagination as setRevisitsPaginationAction,
    setRevisitsScreenHistory as setRevisitsScreenHistoryAction,
    setSelectedRevisit as setSelectedRevisitAction,
    updateRevisit as updateRevisitAction
} from '../features/revisits';

import { useAuth, useStatus } from './';

import { Revisit, RevisitsState } from '../interfaces/revisits';
import { RevisitFormValues } from '../components/revisits/RevisitForm/interfaces';

const useRevisits = () => {
    const dispatch = useAppDispatch();
    const { goBack } = useNavigation();

    const { state: { user } } = useAuth();
    const { setStatus } = useStatus();

    const state = useSelector<RootState, RevisitsState>(store => store.revisits);

    const clearRevisits = () => dispatch(clearRevisitsAction());
    const removeRevisits = () => dispatch(removeRevisitsAction());
    const setIsRevisitsLoading = (isLoading: boolean) => dispatch(setIsRevisitsLoadingAction({ isLoading }));
    const setRefreshRevisits = (refresh: boolean) => dispatch(setRefreshRevisitsAction({ refresh }));
    const setRevisits = (revisits: Revisit[]) => dispatch(setRevisitsAction({ revisits }));
    const setRevisitsScreenHistory = (newScreen: string) => dispatch(setRevisitsScreenHistoryAction({ newScreen }));
    const setRevisitsPagination = (pagination: { from: number, to: number }) => dispatch(setRevisitsPaginationAction({ pagination }));
    const setSelectedRevisit = (revisit: Revisit) => dispatch(setSelectedRevisitAction({ revisit }));

    const loadRevisits = async (filter: 'all' | 'visited' | 'unvisited',  refresh: boolean = false) => {
        setIsRevisitsLoading(true);

        const revisitsPromise = supabase.from('revisits').select().eq('user_id', user.id);

        if (filter === 'visited') {
            revisitsPromise.eq('done', true);
        }
        else if (filter === 'unvisited') {
            revisitsPromise.eq('done', false);
        }

        revisitsPromise.order('next_visit', { ascending: false })
            .order('created_at', { ascending: false })
            .range(
                (refresh) ? 0 : state.revisitsPagination.from,
                (refresh) ? 9 : state.revisitsPagination.to
            )

        const { data, error, status } = await revisitsPromise;

        if (error) {
            console.log(error);

            setIsRevisitsLoading(false);
            setStatus({ code: status, msg: error.message });

            return;
        }

        if (data.length >= 10) {
            setRevisitsPagination({
                from: (refresh) ? 10 : state.revisitsPagination.from + 10,
                to: (refresh) ? 19 : state.revisitsPagination.to + 10
            });
        }

        dispatch(setHasMoreRevisits({ hasMore: (data.length >= 10) }));
        setRevisits(data);
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

        goBack();
    }

    const updateRevisit = async (revisitValues: RevisitFormValues) => {
        dispatch(setIsRevisitLoading({ isLoading: true }));

        const { data, error } = await supabase.from('revisits')
            .update({
                ...revisitValues,
                next_visit: dayjs(revisitValues.next_visit).format('YYYY-MM-DD HH:mm'),
                updated_at:dayjs().format('YYYY-MM-DD HH:mm')
            })
            .eq('id', state.seletedRevisit.id)
            .eq('user_id', user.id)
            .select();

        if (error) {
            console.log(error);
            dispatch(setIsRevisitLoading({ isLoading: false }));
            setStatus({ code: 400, msg: error.message });

            return;
        }

        dispatch(updateRevisitAction({ revisit: data[0] }));

        setStatus({
            code: 200,
            msg: 'Haz actualizado tu revisita correctamente.'
        });

        goBack();
    }

    return {
        state,

        // Actions
        clearRevisits,
        removeRevisits,
        setRefreshRevisits,
        setRevisitsPagination,
        setRevisitsScreenHistory,
        setSelectedRevisit,

        // Functions
        loadRevisits,
        saveRevisit,
        updateRevisit
    }
}

export default useRevisits;