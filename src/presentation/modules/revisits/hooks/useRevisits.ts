import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-image-crop-picker';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    INIT_REVISIT,
    Pagination,
    addRevisit as addRevisitAction,
    addRevisits as addRevisitsAction,
    clearRevisits as clearRevisitsAction,
    removeRevisit as removeRevisitAction,
    removeRevisits as removeRevisitsAction,
    setHasMoreRevisits as setHasMoreRevisitsAction,
    setIsLastRevisitLoading as setIsLastRevisitLoadingAction,
    setIsRevisitDeleting as setIsRevisitDeletingAction,
    setIsRevisitLoading as setIsRevisitLoadingAction,
    setIsRevisitsLoading as setIsRevisitsLoadingAction,
    setLastRevisit as setLastRevisitAction,
    setRefreshRevisits as setRefreshRevisitsAction,
    setRevisitFilter as setRevisitFilterAction,
    setRevisits as setRevisitsAction,
    setRevisitsPagination as setRevisitsPaginationAction,
    setRevisitsScreenHistory as setRevisitsScreenHistoryAction,
    setSelectedRevisit as setSelectedRevisitAction,
    updateRevisit as updateRevisitAction
} from '@application/features';

/* Dtos */
import { CompleteRevisitDto, CreateRevisitDto, UpdateRevisitDto } from '@domain/dtos';

/* Entities */
import { RevisitEntity } from '@domain/entities';

/* Errors */
import { ImageError, RequestError } from '@domain/errors';

/* Hooks */
import { useImage, useNetwork, useStatus } from '@shared';

/* Interfaces */
import { loadRevisitsOptions, RevisitFilter, RevisitFormValues, SaveRevisitOptions } from '../interfaces';

/* Services */
import { RevisitsService } from '../services';
import { LoggerService } from '@services';

/* Utils */
import { revisitsMessages } from '../utils';

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
    const { setStatus, setTranslatedError, setUnauthenticatedError, setNetworkError } = useStatus();
    const { wifi } = useNetwork();

    const addRevisit = (revisit: RevisitEntity) => dispatch(addRevisitAction({ revisit }));
    const addRevisits = (revisits: RevisitEntity[]) => dispatch(addRevisitsAction({ revisits }));
    const clearRevisits = () => dispatch(clearRevisitsAction());
    const removeRevisit = (id: string) => dispatch(removeRevisitAction({ id }));
    const removeRevisits = () => dispatch(removeRevisitsAction());
    const setHasMoreRevisits = (hasMore: boolean) => dispatch(setHasMoreRevisitsAction({ hasMore }));
    const setIsLastRevisitLoading = (isLoading: boolean) => dispatch(setIsLastRevisitLoadingAction({ isLoading }));
    const setIsRevisitDeleting = (isDeleting: boolean) => dispatch(setIsRevisitDeletingAction({ isDeleting }));
    const setIsRevisitLoading = (isLoading: boolean) => dispatch(setIsRevisitLoadingAction({ isLoading }));
    const setIsRevisitsLoading = (isLoading: boolean) => dispatch(setIsRevisitsLoadingAction({ isLoading }));
    const setLastRevisit = (revisit: RevisitEntity) => dispatch(setLastRevisitAction({ revisit }));
    const setRefreshRevisits = (refresh: boolean) => dispatch(setRefreshRevisitsAction({ refresh }));
    const setRevisitFilter = (filter: RevisitFilter) => dispatch(setRevisitFilterAction({ filter }));
    const setRevisits = (revisits: RevisitEntity[]) => dispatch(setRevisitsAction({ revisits }));
    const setRevisitsPagination = (pagination: Pagination) => dispatch(setRevisitsPaginationAction({ pagination }));
    const setRevisitsScreenHistory = (newScreen: string) => dispatch(setRevisitsScreenHistoryAction({ newScreen }));
    const setSelectedRevisit = (revisit: RevisitEntity) => dispatch(setSelectedRevisitAction({ revisit }));
    const updateRevisitActionState = (revisit: RevisitEntity) => dispatch(updateRevisitAction({ revisit }));

    /**
     * This function is to mark a revisit as complete.
     *
     * @param {Function} onFail - This callback executed when the process is failed
     * @return {Promise<string | void>} This function returns a string
     */
    const completeRevisit = async (onFail?: () => void): Promise<string> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return '';
        }


        if (!isAuthenticated) {
            setUnauthenticatedError(() => onFail && onFail());
            return '';
        }

        /* Should not update if selectedRevisit.id is an empty string */
        if (state.selectedRevisit.id === '') {
            onFail && onFail();
            setStatus({ code: 400, msg: revisitsMessages.UNSELECTED_COMPLETE });
            return '';
        }

        setIsRevisitLoading(true);

        const completeDto = CompleteRevisitDto.create(true);
        const result = await RevisitsService.complete(state.selectedRevisit.id, user.id, completeDto);

        if (result instanceof RequestError) {
            LoggerService.error(result);
            onFail && onFail();
            setIsRevisitLoading(false);
            setTranslatedError(result.status, result.message);
            return '';
        }

        updateRevisitActionState(result);
        setSelectedRevisit(result);

        if (user.precursor === 'ninguno' && state.lastRevisit.id === state.selectedRevisit.id) setLastRevisit(result);

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


        if (!isAuthenticated) {
            setUnauthenticatedError(() => onFinish && onFinish());
            return;
        }

        /* Should not delete if selectedRevisit.id is an empty string */
        if (state.selectedRevisit.id === '') {
            onFinish && onFinish();
            setStatus({ code: 400, msg: revisitsMessages.UNSELECTED_DELETE });

            return;
        }

        setIsRevisitDeleting(true);

        /* If revisit has a photo you have to delete it */
        if (state.selectedRevisit.photo) {
            const imageResult = await deleteImage(state.selectedRevisit.photo);
            let hasError = false;

            if (imageResult instanceof RequestError) {
                setIsRevisitDeleting(false);
                onFinish && onFinish();
                setTranslatedError(imageResult.status, imageResult.message);
                hasError = true;
            }

            if (hasError) return;
        }

        const result = await RevisitsService.delete(state.selectedRevisit.id, user.id);

        if (result instanceof RequestError) {
            setIsRevisitDeleting(false);
            onFinish && onFinish();
            setTranslatedError(result.status, result.message);
        }

        removeRevisit(state.selectedRevisit.id);
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

        if (!isAuthenticated) {
            setUnauthenticatedError();
            return;
        }

        setIsLastRevisitLoading(true);
        const result = await RevisitsService.getLastByUserId(user.id);

        if (result instanceof RequestError) {
            setIsLastRevisitLoading(false);
            setTranslatedError(result.status, result.message);
            return;
        }

        setLastRevisit(result);
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
        setRevisitFilter(filter);

        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        if (!isAuthenticated) {
            setUnauthenticatedError();
            return;
        }

        setIsRevisitsLoading(true);

        const options = {
            filter,
            search,
            pagination: {
                from: (refresh) ? 0 : state.revisitsPagination.from,
                to: (refresh) ? 9 : state.revisitsPagination.to
            }
        }

        const result = await RevisitsService.getAllByUserId(user.id, options);

        if (result instanceof RequestError) {
            setIsRevisitsLoading(false)
            setTranslatedError(result.status, result.message);
            return;
        }

        if (result.length >= 10) {
            setRevisitsPagination({
                from: (refresh) ? 10 : state.revisitsPagination.from + 10,
                to: (refresh) ? 19 : state.revisitsPagination.to + 10
            });
        }

        setHasMoreRevisits(result.length >= 10);
        (loadMore) ? addRevisits(result) : setRevisits(result);
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

        if (!isAuthenticated) {
            setUnauthenticatedError(() => onFinish && onFinish());
            return;
        }

        setIsRevisitLoading(true);

        let photo = null;

        /* If image is other than undefined, an attempt is made to upload */
        if (image) {
            const uploadResult = await uploadImage(image, SUPABASE_REVISITS_FOLDER);
            let hasError = false;

            if (uploadResult instanceof ImageError) {
                setIsRevisitLoading(false);
                onFinish && onFinish();
                setTranslatedError(400, uploadResult.message);
                hasError = true;

                return;
            }

            if (hasError) return;
            photo = uploadResult;
        }

        const createDto = CreateRevisitDto.create({ ...revisitValues, userId: user.id, photo });
        const result = await RevisitsService.create(createDto);

        if (result instanceof RequestError) {
            setTranslatedError(result.status, result.message);
            setIsRevisitLoading(false);
            return;
        }

        addRevisit(result);
        onFinish && onFinish();

        const successMsg = (back)
            ? revisitsMessages.ADDED_SUCCESS
            : `Has agregado correctamente a ${ result.personName } para volverla a visitar.`

        setStatus({ code: 201, msg: successMsg });

        back && navigation.navigate('RevisitsTopTabsNavigation' as never);
        if (user.precursor === 'ninguno') await loadLastRevisit();
    }

    /**
     * This function is responsible for updating a revisit and returns to the previous screen.
     *
     * @param {RevisitFormValues} revisitValues - RevisitEntity values to update
     * @param {Image | null} image - Image to upload, default is `undefined`
     * @return {Promise<void>} This function does not return anything
     */
    const updateRevisit = async (revisitValues: RevisitFormValues, image: Image | null): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }
        if (!isAuthenticated) {
            setUnauthenticatedError();
            return;
        }

        if (state.selectedRevisit.id === '') {
            setStatus({ code: 400, msg: revisitsMessages.UNSELECTED_UPDATE });
            return;
        }

        setIsRevisitLoading(true);

        let photo = state.selectedRevisit.photo;

        /* If image is other than undefined, an attempt is made to upload */
        if (image) {

            /* If revisit has an image you have to delete it to update it with the new one */
            if (photo && photo.trim().length > 0) {
                const imageResult = await deleteImage(photo);
                let hasError = false;

                if (imageResult instanceof ImageError) {
                    setIsRevisitLoading(false);
                    setTranslatedError(400, imageResult.message);
                    hasError = true;

                    return;
                }

                if (hasError) return;
            }

            const uploadResult = await uploadImage(image, SUPABASE_REVISITS_FOLDER);
            let hasError = false;

            if (uploadResult instanceof ImageError) {
                setIsRevisitLoading(false);
                setTranslatedError(400, uploadResult.message);
                hasError = true;

                return;
            }

            if (hasError) return;
            photo = uploadResult;
        }

        const updateDto = UpdateRevisitDto.create({ ...revisitValues, photo, updatedAt: new Date() });
        const result = await RevisitsService.update(state.selectedRevisit.id, user.id, updateDto);

        if (result instanceof RequestError) {
            setIsRevisitLoading(false);
            setTranslatedError(result.status, result.message);
            return;
        }

        updateRevisitActionState(result);
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