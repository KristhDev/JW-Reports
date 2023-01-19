import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-image-crop-picker';
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

import { useAuth, useImage, useStatus } from './';

import { Revisit, RevisitsState } from '../interfaces/revisits';
import { RevisitFormValues } from '../components/revisits/RevisitForm/interfaces';
import { Pagination } from '../interfaces/ui';

const useRevisits = () => {
    const dispatch = useAppDispatch();
    const { navigate } = useNavigation();

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

    const loadRevisits = async (filter: 'all' | 'visited' | 'unvisited', refresh: boolean = false, loadMore: boolean = false) => {
        setIsRevisitsLoading(true);

        const revisitsPromise = supabase.from('revisits').select().eq('user_id', user.id);

        if (filter === 'visited') revisitsPromise.eq('done', true);
        else if (filter === 'unvisited') revisitsPromise.eq('done', false);

        revisitsPromise.order('next_visit', { ascending: false })
            .order('created_at', { ascending: false })
            .range(
                (refresh) ? 0 : state.revisitsPagination.from,
                (refresh) ? 9 : state.revisitsPagination.to
            )

        const { data, error } = await revisitsPromise;

        const next = setSupabaseError(error, () => setIsRevisitsLoading(false));
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

    const saveRevisit = async (revisitValues: RevisitFormValues, imageUri?: string, image?: Image, back: boolean = true, onFinish?: () => void) => {
        dispatch(setIsRevisitLoading({ isLoading: true }));

        let photo = imageUri || null;

        if (image) {
            const { data, error } = await uploadImage(image);

            const next = setSupabaseError(error, () => {
                dispatch(setIsRevisitLoading({ isLoading: false }));
                onFinish && onFinish();
            });

            if (next) return;

            photo = data!.publicUrl;
        }

        const { data, error } = await supabase.from('revisits')
            .insert({
                ...revisitValues,
                photo,
                next_visit: dayjs(revisitValues.next_visit).format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                user_id: user.id
            })
            .select();

        const next = setSupabaseError(error, () => {
            dispatch(setIsRevisitLoading({ isLoading: false }));
            onFinish && onFinish();
        });

        if (next) return;

        dispatch(addRevisit({ revisit: data![0] }));
        onFinish && onFinish();

        const successMsg = (back)
            ? 'Haz agregado tu revisita correctamente.'
            : `Haz agregado correctamente a ${ data![0].person_name } para volverla a visitar.`

        setStatus({ code: 201, msg: successMsg });

        back && navigate('RevisitsTopTabsNavigation' as never);
    }

    const updateRevisit = async (revisitValues: RevisitFormValues, image?: Image) => {
        dispatch(setIsRevisitLoading({ isLoading: true }));

        let photo = state.selectedRevisit.photo;

        if (image) {
            if (photo) {
                const { error: errorDelete } = await deleteImage(photo);

                const next = setSupabaseError(errorDelete, () => dispatch(setIsRevisitLoading({ isLoading: false })));
                if (next) return;
            }

            const { data: dataImage, error: errorImage } = await uploadImage(image);

            const next = setSupabaseError(errorImage, () => dispatch(setIsRevisitLoading({ isLoading: false })));
            if (next) return;

            photo = dataImage!.publicUrl;
        }

        const { data, error } = await supabase.from('revisits')
            .update({
                ...revisitValues,
                photo,
                next_visit: dayjs(revisitValues.next_visit).format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
                updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedRevisit.id)
            .eq('user_id', user.id)
            .select();

        const next = setSupabaseError(error, () => dispatch(setIsRevisitLoading({ isLoading: false })));
        if (next) return;

        dispatch(updateRevisitAction({ revisit: data![0] }));

        setStatus({
            code: 200,
            msg: 'Haz actualizado tu revisita correctamente.'
        });

        navigate('RevisitsTopTabsNavigation' as never);
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

            const next = setSupabaseError(errorDelete, () => {
                onFinish && onFinish();
                dispatch(setIsRevisitDeleting({ isDeleting: false }));
            });

            if (next) return;
        }

        const { error } = await supabase.from('revisits')
            .delete()
            .eq('id', state.selectedRevisit.id)
            .eq('user_id', user.id);

        const next = setSupabaseError(error, () => {
            onFinish && onFinish();
            dispatch(setIsRevisitDeleting({ isDeleting: false }));
        });

        if (next) return;

        dispatch(removeRevisit({ id: state.selectedRevisit.id }));
        onFinish && onFinish();
        back && navigate('RevisitsTopTabsNavigation' as never);

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