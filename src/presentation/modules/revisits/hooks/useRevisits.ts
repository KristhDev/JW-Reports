import { useNavigation } from '@react-navigation/native';

/* Config */
import { env } from '@config';

/* Constants */
import { authMessages, precursors, revisitsMessages } from '@application/constants';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    INIT_REVISIT,
    addRevisit as addRevisitAction,
    addRevisits as addRevisitsAction,
    clearRevisits as clearRevisitsAction,
    Pagination,
    removeRevisit as removeRevisitAction,
    removeRevisits as removeRevisitsAction,
    setHasMoreRevisits as setHasMoreRevisitsAction,
    setIsLastRevisitLoading as setIsLastRevisitLoadingAction,
    setIsRevisitDeleting as setIsRevisitDeletingAction,
    setIsRevisitLoading as setIsRevisitLoadingAction,
    setIsRevisitsExporting as setIsRevisitsExportingAction,
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

/* Templates */
import { PdfRevisitsTemplate } from '@domain/templates';

/* Services */
import { RevisitsService } from '@domain/services';

/* Adapters */
import { FileSystem, PDF } from '@infrasturcture/adapters';

/* Hooks */
import { useAuth } from '@auth';
import { useImage, useNetwork, useStatus } from '@shared';

/* Interfaces */
import { loadRevisitsOptions, RevisitFilter, SaveRevisitOptions, UpdateRevisitOptions } from '../interfaces';
import { DeleteOptions } from '@infrasturcture/interfaces';
import { RevisitsStackNavigationType } from '@ui';

/**
 * Hook to management revisits of store with state and actions
 */
const useRevisits = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<RevisitsStackNavigationType>();

    const state = useAppSelector(store => store.revisits);
    const { user } = useAppSelector(store => store.auth);

    const { isAuthenticated } = useAuth();
    const { uploadImage, deleteImage } = useImage();
    const { setStatus, setError } = useStatus();
    const { hasWifiConnection } = useNetwork();

    const addRevisit = (revisit: RevisitEntity) => dispatch(addRevisitAction({ revisit }));
    const addRevisits = (revisits: RevisitEntity[]) => dispatch(addRevisitsAction({ revisits }));
    const clearRevisits = () => dispatch(clearRevisitsAction());
    const removeRevisit = (id: string) => dispatch(removeRevisitAction({ id }));
    const removeRevisits = () => dispatch(removeRevisitsAction());
    const setHasMoreRevisits = (hasMore: boolean) => dispatch(setHasMoreRevisitsAction({ hasMore }));
    const setIsLastRevisitLoading = (isLoading: boolean) => dispatch(setIsLastRevisitLoadingAction({ isLoading }));
    const setIsRevisitDeleting = (isDeleting: boolean) => dispatch(setIsRevisitDeletingAction({ isDeleting }));
    const setIsRevisitLoading = (isLoading: boolean) => dispatch(setIsRevisitLoadingAction({ isLoading }));
    const setIsRevisitsExporting = (isExporting: boolean) => dispatch(setIsRevisitsExportingAction({ isExporting }));
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
     * This function checks if the user can alterate a revisit.
     *
     * @param {string} unSelectedMsg - The message to display if the revisit is not selected.
     * @param {Function} onError - The callback that will be executed if the user can't alterate the revisit.
     * @return {boolean} This function returns `true` if the user can alterate the revisit, `false` otherwise.
     */
    const canAlterateRevisit = (unSelectedMsg: string, onError?: () => void): boolean => {
        if (state.selectedRevisit.id === '') {
            onError && onError();
            setStatus({ code: 400, msg: unSelectedMsg });

            return false;
        }

        if (state.selectedRevisit.userId !== user.id) {
            onError && onError();
            setStatus({ code: 400, msg: authMessages.UNAUTHORIZED });

            return false;
        }

        return true;
    }

    /**
     * This function is to mark a revisit as complete.
     *
     * @param {Function} onError - This callback executed when the process is failed
     * @return {Promise<string | void>} This function returns a string
     */
    const completeRevisit = async (onError?: () => void): Promise<string> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return '';

        const isAuth = isAuthenticated(onError);
        if (!isAuth) return '';

        const canAlterate = canAlterateRevisit(revisitsMessages.UNSELECTED_COMPLETE, onError);
        if (!canAlterate) return '';

        setIsRevisitLoading(true);

        try {
            const completeDto = CompleteRevisitDto.create(true);
            const revisit = await RevisitsService.complete(state.selectedRevisit.id, user.id, completeDto);

            updateRevisitActionState(revisit);
            setSelectedRevisit(revisit);

            if (user.precursor === precursors.NINGUNO && state.lastRevisit.id === state.selectedRevisit.id) setLastRevisit(revisit);

            return revisitsMessages.COMPLETED_SUCCESS;
        }
        catch (error) {
            setIsRevisitLoading(false);
            onError && onError();

            setError(error);
            return '';
        }
    }

    /**
     * This function deletes a revisit.
     *
     * @param {{ onFinish: Function, onSuccess: Function }} options - The options of the function.
     * @param {Function} options.onFinish - This callback is executed when the function finish.
     * @param {Function} options.onSuccess - This callback is executed when the function success.
     * @return {Promise<void>} This function returns a promise that resolves when the function finish.
     */
    const deleteRevisit = async ({ onFinish, onSuccess }: DeleteOptions): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated(onFinish);
        if (!isAuth) return;

        const canAlterate = canAlterateRevisit(revisitsMessages.UNSELECTED_DELETE, onFinish);
        if (!canAlterate) return;

        setIsRevisitDeleting(true);

        try {
            /* If revisit has a photo you have to delete it */
            if (state.selectedRevisit.photo) await deleteImage(state.selectedRevisit.photo, env.SUPABASE_REVISITS_FOLDER);
            await RevisitsService.delete(state.selectedRevisit.id, user.id);

            removeRevisit(state.selectedRevisit.id);

            if (user.precursor === precursors.NINGUNO && state.lastRevisit.id === state.selectedRevisit.id) {
                await loadLastRevisit();
            }

            setIsRevisitDeleting(false);
            setSelectedRevisit(INIT_REVISIT);

            onFinish && onFinish();
            onSuccess && onSuccess();

            setStatus({ code: 200, msg: revisitsMessages.DELETED_SUCCESS });
        }
        catch (error) {
            setIsRevisitDeleting(false);
            onFinish && onFinish();

            setError(error);
        }
    }

    /**
     * This function exports all the revisits of the user to a PDF file.
     *
     * @param {boolean} showStatusMessage - This is a flag to indicate whether to show the status message or not, default is `true`
     * @return {Promise<void>} This function does not return anything
     */
    const exportRevisits = async (showStatusMessage: boolean = true): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        setIsRevisitsExporting(true);

        try {
            const allRevisits = await RevisitsService.getAllByUserId(user.id);

            const revisitsTemplate = await PdfRevisitsTemplate.generate({
                fullName: `${ user.name } ${ user.surname }`,
                revisits: allRevisits
            });

            const fileName = `Revisitas_de_${ user.name }_${ user.surname }`;

            const pdfPath = await PDF.writeFromHTML({
                directory: 'Exports',
                fileName,
                html: revisitsTemplate
            });

            await FileSystem.moveFile({
                from: pdfPath,
                to: `${ FileSystem.downloadDir }/${ fileName }.pdf`
            });

            if (showStatusMessage) setStatus({ code: 200, msg: revisitsMessages.EXPORTED_SUCCESS });
        }
        catch (error) {
            setError(error);
        }
        finally {
            setIsRevisitsExporting(false);
        }
    }

    /**
     * Loads the last revisit from the database.
     *
     * @return {Promise<void>} - Returns a promise that resolves when the last revisit is loaded.
     */
    const loadLastRevisit = async (): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        setIsLastRevisitLoading(true);

        try {
            const lastRevisit = await RevisitsService.getLastByUserId(user.id);
            setLastRevisit(lastRevisit);
        }
        catch (error) {
            setIsLastRevisitLoading(false);
            setError(error);
        }
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

        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        setIsRevisitsLoading(true);

        const options = {
            filter,
            search,
            pagination: {
                from: (refresh) ? 0 : state.revisitsPagination.from,
                to: (refresh) ? 9 : state.revisitsPagination.to
            }
        }

        try {
            const revisits = await RevisitsService.paginateByUserId(user.id, options);

            if (revisits.length >= 10) {
                setRevisitsPagination({
                    from: (refresh) ? 10 : state.revisitsPagination.from + 10,
                    to: (refresh) ? 19 : state.revisitsPagination.to + 10
                });
            }

            setHasMoreRevisits(revisits.length >= 10);
            (loadMore) ? addRevisits(revisits) : setRevisits(revisits);
        }
        catch (error) {
            setIsRevisitsLoading(false);
            setError(error);
        }
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
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated(onFinish);
        if (!isAuth) return;

        setIsRevisitLoading(true);

        try {
            let photo = null;

            /* If image is other than undefined, an attempt is made to upload */
            if (image) photo = await uploadImage(image, env.SUPABASE_REVISITS_FOLDER);
            const createDto = CreateRevisitDto.create({ ...revisitValues, userId: user.id, photo });
            const revisit = await RevisitsService.create(createDto);

            addRevisit(revisit);

            setIsRevisitLoading(false);
            onFinish && onFinish();

            const successMsg = (back)
                ? revisitsMessages.ADDED_SUCCESS
                : `Has agregado correctamente a ${ revisit.personName } para volverla a visitar.`

            setStatus({ code: 201, msg: successMsg });

            back && navigation.popTo('RevisitsTopTabsNavigation');
            if (user.precursor === precursors.NINGUNO) await loadLastRevisit();
        }
        catch (error) {
            setIsRevisitLoading(false);
            onFinish && onFinish();

            setError(error);
        }
    }

    /**
     * Updates a revisit with the given values and image.
     *
     * @param {UpdateRevisitOptions} { image: Image, revisitValues: RevisitFormValues } - The options to update the revisit.
     * - image: The image to be uploaded, default is `null`.
     * - revisitValues: The values of the revisit to be updated.
     * @return {Promise<void>} This function does not return anything.
     */
    const updateRevisit = async ({ image = null, revisitValues }: UpdateRevisitOptions): Promise<void> => {
        const wifi = hasWifiConnection();
        if (!wifi) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        const canAlterate = canAlterateRevisit(revisitsMessages.UNSELECTED_UPDATE);
        if (!canAlterate) return;

        setIsRevisitLoading(true);

        try {
            let photo = state.selectedRevisit.photo;

            /* If image is other than undefined, an attempt is made to upload */
            if (image) {

                /* If revisit has an image you have to delete it to update it with the new one */
                if (photo && photo.trim().length > 0) await deleteImage(photo, env.SUPABASE_REVISITS_FOLDER);
                photo = await uploadImage(image, env.SUPABASE_REVISITS_FOLDER);
            }

            const updateDto = UpdateRevisitDto.create({ ...revisitValues, photo });
            const revisit = await RevisitsService.update(state.selectedRevisit.id, user.id, updateDto);

            updateRevisitActionState(revisit);
            setStatus({ code: 200, msg: revisitsMessages.UPDATED_SUCCESS });

            if (user.precursor === precursors.NINGUNO) await loadLastRevisit();

            navigation.goBack();
        }
        catch (error) {
            setIsRevisitLoading(false);
            setError(error);
        }
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
        exportRevisits,
        loadLastRevisit,
        loadRevisits,
        saveRevisit,
        updateRevisit
    }
}

export default useRevisits;