import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-image-crop-picker';
import dayjs from 'dayjs';

import { supabase } from '../supabase/config';

import { RootState, useAppDispatch } from '../features/store';
import {
    INIT_REVISIT,
    addRevisit,
    addRevisits as addRevisitsAction,
    clearRevisits as clearRevisitsAction,
    removeRevisits as removeRevisitsAction,
    setHasMoreRevisits,
    setRefreshRevisits as setRefreshRevisitsAction,
    setIsRevisitDeleting,
    setIsRevisitLoading,
    setIsRevisitsLoading as setIsRevisitsLoadingAction,
    setRevisitFilter,
    setRevisits as setRevisitsAction,
    setRevisitsPagination as setRevisitsPaginationAction,
    setRevisitsScreenHistory as setRevisitsScreenHistoryAction,
    setSelectedRevisit as setSelectedRevisitAction,
    updateRevisit as updateRevisitAction,
    removeRevisit,
} from '../features/revisits';

import { useAuth, useImage, useStatus } from './';

import { Revisit, RevisitFormValues, RevisitsState, SaveRevisitOptions, loadRevisitsOptions } from '../interfaces/revisits';
import { Pagination } from '../interfaces/ui';

const useRevisits = () => {
    const dispatch = useAppDispatch();
    const { goBack, navigate } = useNavigation();

    const { state: { user } } = useAuth();
    const { uploadImage, deleteImage } = useImage();
    const { setStatus, setSupabaseError } = useStatus();

    const state = useSelector<RootState, RevisitsState>(store => store.revisits);

    const addRevisits = (revisits: Revisit[]) => dispatch(addRevisitsAction({ revisits }));
    const clearRevisits = () => dispatch(clearRevisitsAction());
    const removeRevisits = () => dispatch(removeRevisitsAction());
    const setIsRevisitsLoading = (isLoading: boolean) => dispatch(setIsRevisitsLoadingAction({ isLoading }));
    const setRefreshRevisits = (refresh: boolean) => dispatch(setRefreshRevisitsAction({ refresh }));
    const setRevisits = (revisits: Revisit[]) => dispatch(setRevisitsAction({ revisits }));
    const setRevisitsScreenHistory = (newScreen: string) => dispatch(setRevisitsScreenHistoryAction({ newScreen }));
    const setRevisitsPagination = (pagination: Pagination) => dispatch(setRevisitsPaginationAction({ pagination }));
    const setSelectedRevisit = (revisit: Revisit) => dispatch(setSelectedRevisitAction({ revisit }));

    const loadRevisits = async ({ filter, loadMore = false, refresh = false, search = '' }: loadRevisitsOptions) => {
        dispatch(setRevisitFilter({ filter }));
        setIsRevisitsLoading(true);

        const revisitsPromise = supabase.from('revisits').select().eq('user_id', user.id);

        if (filter === 'visited') revisitsPromise.eq('done', true);
        else if (filter === 'unvisited') revisitsPromise.eq('done', false);

        if (search.trim().length > 0) {
            let searchQuery = `person_name.ilike.%${ search }%,`;
            searchQuery += `about.ilike.%${ search }%,`;
            searchQuery += `address.ilike.%${ search }%`;

            revisitsPromise.or(searchQuery);
        }

        revisitsPromise.order('next_visit', { ascending: false })
            .order('created_at', { ascending: false })
            .range(
                (refresh) ? 0 : state.revisitsPagination.from,
                (refresh) ? 9 : state.revisitsPagination.to
            )

        const { data, error, status } = await revisitsPromise;

        const next = setSupabaseError(error, status, () => setIsRevisitsLoading(false));
        if (next) return;

        if (data!.length >= 10) {
            setRevisitsPagination({
                from: (refresh) ? 10 : state.revisitsPagination.from + 10,
                to: (refresh) ? 19 : state.revisitsPagination.to + 10
            });
        }

        dispatch(setHasMoreRevisits({ hasMore: (data!.length >= 10) }));
        (loadMore) ? addRevisits(data!) : setRevisits(data!);
    }

    const saveRevisit = async ({ revisitValues, back  = true, image, onFinish }: SaveRevisitOptions) => {
        dispatch(setIsRevisitLoading({ isLoading: true }));

        let photo = null;

        if (image) {
            const { data, error } = await uploadImage(image);

            const next = setSupabaseError(error, 400, () => {
                dispatch(setIsRevisitLoading({ isLoading: false }));
                onFinish && onFinish();
            });

            if (next) return;

            photo = data!.publicUrl;
        }

        const { data, error, status } = await supabase.from('revisits')
            .insert({
                ...revisitValues,
                photo,
                next_visit: dayjs(revisitValues.next_visit).format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                user_id: user.id
            })
            .select();

        const next = setSupabaseError(error, status, () => {
            dispatch(setIsRevisitLoading({ isLoading: false }));
            onFinish && onFinish();
        });

        if (next) return;

        dispatch(addRevisit({ revisit: data![0] }));
        onFinish && onFinish();

        const successMsg = (back)
            ? 'Haz agregado tu revisita correctamente.'
            : `Haz agregado correctamente a ${ data![0].person_name } para volverla a visitar.`

        setStatus({ code: status, msg: successMsg });

        back && navigate('RevisitsTopTabsNavigation' as never);
    }

    const updateRevisit = async (revisitValues: RevisitFormValues, image?: Image) => {
        dispatch(setIsRevisitLoading({ isLoading: true }));

        let photo = state.selectedRevisit.photo;

        if (image) {
            if (photo) {
                const { error: errorDelete } = await deleteImage(photo);

                const next = setSupabaseError(errorDelete, 400, () => dispatch(setIsRevisitLoading({ isLoading: false })));
                if (next) return;
            }

            const { data: dataImage, error: errorImage } = await uploadImage(image);

            const next = setSupabaseError(errorImage, 400, () => dispatch(setIsRevisitLoading({ isLoading: false })));
            if (next) return;

            photo = dataImage!.publicUrl;
        }

        const { data, error, status } = await supabase.from('revisits')
            .update({
                ...revisitValues,
                photo,
                next_visit: dayjs(revisitValues.next_visit).format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedRevisit.id)
            .eq('user_id', user.id)
            .select();

        const next = setSupabaseError(error, status, () => dispatch(setIsRevisitLoading({ isLoading: false })));
        if (next) return;

        dispatch(updateRevisitAction({ revisit: data![0] }));

        setStatus({
            code: 200,
            msg: 'Haz actualizado tu revisita correctamente.'
        });

        goBack();
    }

    const deleteRevisit = async (back: boolean = false, onFinish?: () => void) => {
        dispatch(setIsRevisitDeleting({ isDeleting: true }));

        if (state.selectedRevisit.id === '') {
            onFinish && onFinish();
            dispatch(setIsRevisitDeleting({ isDeleting: false }));

            setStatus({
                code: 400,
                msg: 'No hay una revisita seleccionada para eliminar.'
            });

            return;
        }

        if (state.selectedRevisit.photo) {
            const { error: errorDelete } = await deleteImage(state.selectedRevisit.photo);

            const next = setSupabaseError(errorDelete, 400, () => {
                onFinish && onFinish();
                dispatch(setIsRevisitDeleting({ isDeleting: false }));
            });

            if (next) return;
        }

        const { error, status } = await supabase.from('revisits')
            .delete()
            .eq('id', state.selectedRevisit.id)
            .eq('user_id', user.id);

        const next = setSupabaseError(error, status, () => {
            onFinish && onFinish();
            dispatch(setIsRevisitDeleting({ isDeleting: false }));
        });

        if (next) return;

        dispatch(removeRevisit({ id: state.selectedRevisit.id }));
        onFinish && onFinish();
        back && navigate('RevisitsTopTabsNavigation' as never);

        setSelectedRevisit(INIT_REVISIT);

        setStatus({
            code: 200,
            msg: 'Haz eliminado tu revisita correctamente.'
        });
    }

    const completeRevisit = async (onFailFinish?: () => void) => {
        dispatch(setIsRevisitLoading({ isLoading: true }));

        if (state.selectedRevisit.id === '') {
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
                updated_at:dayjs().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedRevisit.id)
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