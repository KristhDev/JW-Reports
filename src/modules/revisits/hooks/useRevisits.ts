import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-image-crop-picker';

/* Supabase */
import { supabase } from '@config';

/* Adapters */
import { revisitAdapter, revisitFormValuesAdapter } from '../adapters';

/* Features */
import { useAppDispatch, useAppSelector } from '@features';
import {
    INIT_REVISIT,
    addRevisit,
    addRevisits as addRevisitsAction,
    clearRevisits as clearRevisitsAction,
    removeRevisit,
    removeRevisits as removeRevisitsAction,
    setHasMoreRevisits,
    setIsLastRevisitLoading,
    setIsRevisitDeleting,
    setIsRevisitLoading,
    setIsRevisitsLoading as setIsRevisitsLoadingAction,
    setLastRevisit,
    setRefreshRevisits as setRefreshRevisitsAction,
    setRevisitFilter,
    setRevisits as setRevisitsAction,
    setRevisitsPagination as setRevisitsPaginationAction,
    setRevisitsScreenHistory as setRevisitsScreenHistoryAction,
    setSelectedRevisit as setSelectedRevisitAction,
    updateRevisit as updateRevisitAction
} from '../features';

/* Hooks */
import { useImage, useNetwork, useStatus } from '@shared';

/* Interfaces */
import { Pagination } from '@ui';
import {
    loadRevisitsOptions,
    Revisit,
    RevisitEndpoint,
    RevisitFormValues,
    SaveRevisitOptions
} from '../interfaces';

/* Services */
import { logger } from '@services';

/* Utils */
import { revisitsMessages } from '../utils';
import { date } from '@utils';

/* ENV */
import { SUPABASE_REVISITS_FOLDER } from '@env';

/**
 * Hook to management revisits of store with state and actions
 */
const useRevisits = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const state = useAppSelector(store => store.revisits);
    const { isAuthenticated, user } = useAppSelector(store => store.auth);

    const { uploadImage, deleteImage } = useImage();
    const { setStatus, setSupabaseError, setUnauthenticatedError, setNetworkError } = useStatus();
    const { wifi } = useNetwork();

    const addRevisits = (revisits: Revisit[]) => dispatch(addRevisitsAction({ revisits }));
    const clearRevisits = () => dispatch(clearRevisitsAction());
    const removeRevisits = () => dispatch(removeRevisitsAction());
    const setIsRevisitsLoading = (isLoading: boolean) => dispatch(setIsRevisitsLoadingAction({ isLoading }));
    const setRefreshRevisits = (refresh: boolean) => dispatch(setRefreshRevisitsAction({ refresh }));
    const setRevisits = (revisits: Revisit[]) => dispatch(setRevisitsAction({ revisits }));
    const setRevisitsScreenHistory = (newScreen: string) => dispatch(setRevisitsScreenHistoryAction({ newScreen }));
    const setRevisitsPagination = (pagination: Pagination) => dispatch(setRevisitsPaginationAction({ pagination }));
    const setSelectedRevisit = (revisit: Revisit) => dispatch(setSelectedRevisitAction({ revisit }));

    /**
     * This function is to mark a revisit as complete.
     *
     * @param {Function} onFailFinish - This callback executed when the process is failed
     * @return {Promise<string | void>} This function returns a string
     */
    const completeRevisit = async (onFailFinish?: () => void): Promise<string> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return '';
        }

        dispatch(setIsRevisitLoading({ isLoading: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => {
                onFailFinish && onFailFinish();
                dispatch(setIsRevisitLoading({ isLoading: false }));
            });

            return '';
        }

        /* Should not update if selectedRevisit.id is an empty string */
        if (state.selectedRevisit.id === '') {
            onFailFinish && onFailFinish();
            dispatch(setIsRevisitLoading({ isLoading: false }));
            setStatus({ code: 400, msg: revisitsMessages.UNSELECTED_COMPLETE });

            return '';
        }

        const { data, error } = await supabase.from('revisits')
            .update({
                done: true,
                updated_at: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedRevisit.id)
            .eq('user_id', user.id)
            .select<'*', RevisitEndpoint>()
            .single();

        if (error) {
            logger.error({ ...error, message: error.message });
            onFailFinish && onFailFinish();
            dispatch(setIsRevisitLoading({ isLoading: false }));
            setStatus({ code: 400, msg: error.message });

            return '';
        }

        const revisit = revisitAdapter(data!);

        dispatch(updateRevisitAction({ revisit }));
        setSelectedRevisit(revisit);

        if (user.precursor === 'ninguno' && state.lastRevisit.id === state.selectedRevisit.id) {
            dispatch(setLastRevisit({ revisit }));
        }

        return revisitsMessages.COMPLETED_SUCCESS;
    }

    /**
     * This function is to delete a revisit.
     *
     * @param {boolean} back - This is a flag to indicate whether to navigate to the previous screen or not, default is `false`
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure), default is `undefined`
     * @return {Promise<void>} This function does not return anything
     */
    const deleteRevisit = async (back: boolean = false, onFinish?: () => void): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        dispatch(setIsRevisitDeleting({ isDeleting: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => {
                onFinish && onFinish();
                dispatch(setIsRevisitDeleting({ isDeleting: false }));
            });

            return;
        }

        /* Should not delete if selectedRevisit.id is an empty string */
        if (state.selectedRevisit.id === '') {
            onFinish && onFinish();
            dispatch(setIsRevisitDeleting({ isDeleting: false }));
            setStatus({ code: 400, msg: revisitsMessages.UNSELECTED_DELETE });

            return;
        }

        /* If revisit has a photo you have to delete it */
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
        back && navigation.navigate('RevisitsTopTabsNavigation' as never);

        setSelectedRevisit(INIT_REVISIT);

        if (user.precursor === 'ninguno' && state.lastRevisit.id === state.selectedRevisit.id) {
            await loadLastRevisit();
        }

        setStatus({ code: 200, msg: revisitsMessages.DELETED_SUCCESS });
    }

    /**
     * Loads the last revisit from the database.
     *
     * @return {Promise<void>} - Returns a promise that resolves when the last revisit is loaded.
     */
    const loadLastRevisit = async (): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        dispatch(setIsLastRevisitLoading({ isLoading: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => dispatch(setIsLastRevisitLoading({ isLoading: false })));
            return;
        }

        const { data, error, status } = await supabase.from('revisits')
            .select<'*', RevisitEndpoint>('*')
            .eq('user_id', user.id)
            .order('next_visit', { ascending: false })
            .limit(1);

        const next = setSupabaseError(error, status, () => dispatch(setIsLastRevisitLoading({ isLoading: false })));
        if (next) return;

        dispatch(setLastRevisit({
            revisit: (data && data?.length > 0) ? revisitAdapter(data[0]) : INIT_REVISIT
        }));
    }

    /**
     * This function is to load the revisits using the options that are passed by parameter, you can
     * load them for pagination or not.
     *
     * @param {loadRevisitsOptions} { filter: RevisitFilter, loadMore: boolean, refresh: boolean, search: string } - They are the options that are used to load the revisits:
     * - filter: It is the filter of the revisits to show them are: `all`, `unvisited`, `visited`
     * - loadMore: This flag is used to add or set the revisits that are requested, default is `false`
     * - refresh: This flag is to reset the pagination of the revisits, default is `false`
     * - search: This is a search text to search revisits, default is empty `string`
     * @return {Promise<void>} This function does not return anything.
    */
    const loadRevisits = async ({ filter, loadMore = false, refresh = false, search = '' }: loadRevisitsOptions): Promise<void> => {
        dispatch(setRevisitFilter({ filter }));

        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        setIsRevisitsLoading(true);

        if (!isAuthenticated) {
            setUnauthenticatedError(() => setIsRevisitsLoading(false));
            return;
        }

        const revisitsPromise = supabase.from('revisits')
            .select<'*', RevisitEndpoint>()
            .eq('user_id', user.id);

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

        const revisits = data!.map(revisitAdapter);

        dispatch(setHasMoreRevisits({ hasMore: (data!.length >= 10) }));
        (loadMore) ? addRevisits(revisits!) : setRevisits(revisits!);
    }

    /**
     * This function is to save a revisit according to the options that are sent to you.
     *
     * @param {SaveRevisitOptions} { revisitValues: RevisitFormValues, back: boolean, image: Image, onFinish: Function } - This
     * is a options for save revisit.
     * - revisitValues: This is a values for save revisits
     * - back: This flag is used to navigate for previus screen, default is `true`
     * - image: This is a image for upload and save uri in revisit, default is `undefined`
     * - onFinish: This callback executed when the process is finished (success or failure), default is `undefined`
     * @return {Promise<void>} This function does not return anything.
     */
    const saveRevisit = async ({ revisitValues, back = true, image, onFinish }: SaveRevisitOptions): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        dispatch(setIsRevisitLoading({ isLoading: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => {
                dispatch(setIsRevisitLoading({ isLoading: false }));
                onFinish && onFinish();
            });

            return;
        }

        let photo = null;

        /* If image is other than undefined, an attempt is made to upload */
        if (image) {
            const { data, error } = await uploadImage(image, SUPABASE_REVISITS_FOLDER);

            const next = setSupabaseError(error, 400, () => {
                dispatch(setIsRevisitLoading({ isLoading: false }));
                onFinish && onFinish();
            });

            if (next) return;

            photo = data!.publicUrl;
        }

        const { data, error, status } = await supabase.from('revisits')
            .insert({
                ...revisitFormValuesAdapter(revisitValues),
                photo,
                next_visit: date.format(revisitValues.nextVisit, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
                user_id: user.id
            })
            .select<'*', RevisitEndpoint>()
            .single();

        const next = setSupabaseError(error, status, () => {
            dispatch(setIsRevisitLoading({ isLoading: false }));
            onFinish && onFinish();
        });

        if (next) return;

        dispatch(addRevisit({ revisit: revisitAdapter(data!) }));
        onFinish && onFinish();

        const successMsg = (back)
            ? revisitsMessages.ADDED_SUCCESS
            : `Has agregado correctamente a ${ data!.person_name } para volverla a visitar.`

        setStatus({ code: status, msg: successMsg });

        back && navigation.navigate('RevisitsTopTabsNavigation' as never);
        if (user.precursor === 'ninguno') await loadLastRevisit();
    }

    /**
     * This function is responsible for updating a revisit and returns to the previous screen.
     *
     * @param {RevisitFormValues} revisitValues - Revisit values to update
     * @param {Image | null} image - Image to upload, default is `undefined`
     * @return {Promise<void>} This function does not return anything
     */
    const updateRevisit = async (revisitValues: RevisitFormValues, image: Image | null): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        dispatch(setIsRevisitLoading({ isLoading: true }));

        if (!isAuthenticated) {
            setUnauthenticatedError(() => dispatch(setIsRevisitLoading({ isLoading: false })));
            return;
        }

        if (state.selectedRevisit.id === '') {
            dispatch(setIsRevisitLoading({ isLoading: false }));
            setStatus({ code: 400, msg: revisitsMessages.UNSELECTED_UPDATE });

            return;
        }

        let photo = state.selectedRevisit.photo;

        /* If image is other than undefined, an attempt is made to upload */
        if (image) {

            /* If revisit has an image you have to delete it to update it with the new one */
            if (photo && photo.trim().length > 0) {
                const { error: errorDelete } = await deleteImage(photo);

                const next = setSupabaseError(errorDelete, 400, () => dispatch(setIsRevisitLoading({ isLoading: false })));
                if (next) return;
            }

            const { data: dataImage, error: errorImage } = await uploadImage(image, SUPABASE_REVISITS_FOLDER);

            const next = setSupabaseError(errorImage, 400, () => dispatch(setIsRevisitLoading({ isLoading: false })));
            if (next) return;

            photo = dataImage!.publicUrl;
        }

        const { data, error, status } = await supabase.from('revisits')
            .update({
                ...revisitFormValuesAdapter(revisitValues),
                photo,
                next_visit: date.format(revisitValues.nextVisit, 'YYYY-MM-DD HH:mm:ss.SSSSSS'),
                updated_at: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSS')
            })
            .eq('id', state.selectedRevisit.id)
            .eq('user_id', user.id)
            .select<'*', RevisitEndpoint>()
            .single();

        const next = setSupabaseError(error, status, () => dispatch(setIsRevisitLoading({ isLoading: false })));
        if (next) return;

        dispatch(updateRevisitAction({ revisit: revisitAdapter(data!) }));
        setStatus({ code: 200, msg: revisitsMessages.UPDATED_SUCCESS });

        if (user.precursor === 'ninguno') await loadLastRevisit();

        navigation.goBack();
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
        completeRevisit,
        deleteRevisit,
        loadLastRevisit,
        loadRevisits,
        saveRevisit,
        updateRevisit
    }
}

export default useRevisits;
