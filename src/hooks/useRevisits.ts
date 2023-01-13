import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { supabase } from '../supabase/config';

import { RootState, useAppDispatch } from '../features/store';
import {
    addRevisit,
    addRevisits as addRevisitsAction,
    clearRevisits as clearRevisitsAction,
    removeRevisits as removeRevisitsAction,
    setHasMoreRevisits,
    setRefreshRevisits as setRefreshRevisitsAction,
    setIsRevisitDeleting,
    setIsRevisitLoading,
    setIsRevisitsLoading as setIsRevisitsLoadingAction,
    setRevisits as setRevisitsAction,
    setRevisitsPagination as setRevisitsPaginationAction,
    setRevisitsScreenHistory as setRevisitsScreenHistoryAction,
    setSelectedRevisit as setSelectedRevisitAction,
    updateRevisit as updateRevisitAction,
    removeRevisit
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

    const addRevisits = (revisits: Revisit[]) => dispatch(addRevisitsAction({ revisits }));
    const clearRevisits = () => dispatch(clearRevisitsAction());
    const removeRevisits = () => dispatch(removeRevisitsAction());
    const setIsRevisitsLoading = (isLoading: boolean) => dispatch(setIsRevisitsLoadingAction({ isLoading }));
    const setRefreshRevisits = (refresh: boolean) => dispatch(setRefreshRevisitsAction({ refresh }));
    const setRevisits = (revisits: Revisit[]) => dispatch(setRevisitsAction({ revisits }));
    const setRevisitsScreenHistory = (newScreen: string) => dispatch(setRevisitsScreenHistoryAction({ newScreen }));
    const setRevisitsPagination = (pagination: { from: number, to: number }) => dispatch(setRevisitsPaginationAction({ pagination }));
    const setSelectedRevisit = (revisit: Revisit) => dispatch(setSelectedRevisitAction({ revisit }));

    const loadRevisits = async (filter: 'all' | 'visited' | 'unvisited', refresh: boolean = false, loadMore: boolean = false) => {
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
        (loadMore) ? addRevisits(data) : setRevisits(data);
    }

    const saveRevisit = async (revisitValues: RevisitFormValues, back: boolean = true, onFinish?: () => void) => {
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
            onFinish && onFinish();
            setStatus({ code: 400, msg: error.message });

            return;
        }

        dispatch(addRevisit({ revisit: data[0] }));
        onFinish && onFinish();

        const successMsg = (back)
            ? 'Haz agregado tu revisita correctamente.'
            : `Haz agregado correctamente a ${ data[0].person_name } para volverla a visitar.`

        setStatus({ code: 201, msg: successMsg });

        back && goBack();
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

    const deleteRevisit = async (back: boolean = false, onFinish?: () => void) => {
        dispatch(setIsRevisitDeleting({ isDeleting: true }));

        if (state.seletedRevisit.id === '') {
            onFinish && onFinish();
            dispatch(setIsRevisitDeleting({ isDeleting: false }));

            setStatus({
                code: 400,
                msg: 'No hay una revisita seleccionada para eliminar.'
            });

            return;
        }

        const { error } = await supabase.from('revisits')
            .delete()
            .eq('id', state.seletedRevisit.id)
            .eq('user_id', user.id);

        if (error) {
            console.log(error);
            onFinish && onFinish();
            dispatch(setIsRevisitDeleting({ isDeleting: false }));
            setStatus({ code: 400, msg: error.message });

            return;
        }

        dispatch(removeRevisit({ id: state.seletedRevisit.id }));
        onFinish && onFinish();
        back && goBack();

        setSelectedRevisit({
            id: '',
            user_id: '',
            person_name: '',
            about: '',
            address: '',
            photo: '',
            next_visit: new Date().toString(),
            done: false,
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        });

        setStatus({
            code: 200,
            msg: 'Haz eliminado tu revisita correctamente.'
        });
    }

    const completeRevisit = async (onFailFinish?: () => void) => {
        dispatch(setIsRevisitLoading({ isLoading: true }));

        if (state.seletedRevisit.id === '') {
            onFailFinish && onFailFinish();
            dispatch(setIsRevisitDeleting({ isDeleting: false }));

            setStatus({
                code: 400,
                msg: 'No hay una revisita seleccionada para completar.'
            });

            return '';
        }

        const { data, error } = await supabase.from('revisits')
            .update({
                done: true,
                updated_at:dayjs().format('YYYY-MM-DD HH:mm')
            })
            .eq('id', state.seletedRevisit.id)
            .eq('user_id', user.id)
            .select();

        if (error) {
            console.log(error);
            onFailFinish && onFailFinish();
            dispatch(setIsRevisitDeleting({ isDeleting: false }));
            setStatus({ code: 400, msg: error.message });

            return '';
        }

        dispatch(updateRevisitAction({ revisit: data[0] }));
        setSelectedRevisit(data[0]);

        return 'Haz marcado como completa tu revista correctamente.';
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
        deleteRevisit,
        loadRevisits,
        saveRevisit,
        updateRevisit,
        completeRevisit
    }
}

export default useRevisits;