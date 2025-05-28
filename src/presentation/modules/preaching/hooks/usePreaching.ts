/* DI */
import {
    externalStorageAdapter,
    pdfAdapter,
    timeAdapter,
    preachingService,
    preachingReportService,
    messagesService,
    pdfPreachingsTemplateService
} from '@config/di';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    INIT_PREACHING,
    addPreaching as addPreachingAction,
    clearPreaching as clearPreachingAction,
    removePreaching as removePreachingAction,
    setIsPreachingDeleting as setIsPreachingDeletingAction,
    setIsPreachingsExporting as setIsPreachingsExportingAction,
    setIsPreachingsLoading as setIsPreachingsLoadingAction,
    setPreachings as setPreachingsAction,
    setSelectedDate as setSelectedDateAction,
    setSelectedPreaching as setSelectedPreachingAction,
    updatePreaching as updatePreachingAction
} from '@application/features/preaching';

/* Dtos */
import { CreatePreachingDto, UpdatePreachingDto } from '@domain/dtos';

/* Entities */
import { PreachingEntity } from '@domain/entities';

/* Hooks */
import { useAuth } from '@auth/hooks';
import { useNetwork } from '@shared/hooks';
import { useToaster, useTranslation } from '@ui/hooks';

/* Interfaces */
import { PreachingFormValues } from '../interfaces';
import { UtilFunctions } from '@shared/interfaces';

/**
 * Hook to management preaching of store with state and actions
 */
const usePreaching = () => {
    const authMessages = messagesService.authMessages;
    const preachingMessages = messagesService.preachingMessages;

    const dispatch = useAppDispatch();

    const state = useAppSelector(store => store.preaching);
    const { user } = useAppSelector(store => store.auth);

    const { isAuthenticated } = useAuth();
    const { showError, showToast } = useToaster();
    const { hasWifiConnection } = useNetwork();
    const { translate } = useTranslation();

    const addPreaching = (preaching: PreachingEntity) => dispatch(addPreachingAction({ preaching }));
    const removePreaching = (id: string) => dispatch(removePreachingAction({ id }));
    const clearPreaching = () => dispatch(clearPreachingAction());
    const setIsPreachingsLoading = (isLoading: boolean) => dispatch(setIsPreachingsLoadingAction({ isLoading }));
    const setIsPreachingsExporting = (isExporting: boolean) => dispatch(setIsPreachingsExportingAction({ isExporting }));
    const setSelectedDate = (date: Date) => dispatch(setSelectedDateAction({ selectedDate: date }));
    const setPreachings = (preachings: PreachingEntity[]) => dispatch(setPreachingsAction({ preachings }));
    const setSelectedPreaching = (preaching: PreachingEntity) => dispatch(setSelectedPreachingAction({ preaching }));
    const setIsPreachingDeleting = (isDeleting: boolean) => dispatch(setIsPreachingDeletingAction({ isDeleting }));
    const updatePreachingState = (preaching: PreachingEntity) => dispatch(updatePreachingAction({ preaching }));

    /**
     * Resets the selected preaching to the initial state with the current date
     * and the current time
     *
     * @return {void} This function does not return anything
     */
    const resetSelectedPreaching = (): void => {
        setSelectedPreaching({
            ...INIT_PREACHING,
            day: new Date().toString(),
            initHour: new Date().toString(),
            finalHour: new Date().toString()
        });
    }

    /**
     * This function checks if the selected preaching can be altered.
     * If there is no selected preaching or the user does not own the preaching, it returns false.
     *
     * @param {string} unSelectMsg - The message to display if no preaching is selected.
     * @param {() => void} onFinish - The callback function to execute when the check is finished.
     * @returns {boolean} Returns true if the preaching can be altered, otherwise false.
     */
    const canAlteratePreaching = (unSelectMsg: string, onFinish?: () => void): boolean => {
        if (state.seletedPreaching.id === '') {
            onFinish && onFinish();
            showToast(unSelectMsg);

            return false;
        }

        if (state.seletedPreaching.userId !== user.id) {
            onFinish && onFinish();
            showToast(authMessages.UNAUTHORIZED);

            return false;
        }

        return true;
    }

    /**
     * This function is to delete a preaching day and return to the previous screen.
     *
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const deletePreaching = async ({ onFail, onFinish, onSuccess }: UtilFunctions): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated(onFail);
        if (!isAuth) return;

        const canAlterate = canAlteratePreaching(preachingMessages.UNSELECTED_DELETE, onFail);
        if (!canAlterate) return;

        setIsPreachingDeleting(true);

        try {
            await preachingService.delete(state.seletedPreaching.id, user.id);
            removePreaching(state.seletedPreaching.id);

            resetSelectedPreaching();
            setIsPreachingDeleting(false);

            showToast(preachingMessages.DELETED_SUCCESS);
            onSuccess?.();
        }
        catch (error) {
            setIsPreachingDeleting(false);
            showError(error);
            onFail?.();
        }
        finally {
            onFinish?.();
        }
    }

    /**
     * Export all preachings to a PDF file and save it to the user's download directory.
     *
     * @param {boolean} showStatusMessage - If true, it will show a status message to the user.
     * @return {Promise<void>} This function does not return anything.
     */
    const exportPreachings = async (showStatusMessage: boolean = true): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        setIsPreachingsExporting(true);

        try {
            const allPreachings = await preachingService.getAllByUserId(user.id);

            const preachingsGrouped = preachingReportService.groupByMonthAndYear(allPreachings);
            const reportsPreaching = preachingsGrouped.map(group => preachingReportService.generatePreachingReportForExport(group));

            const fileName = translate('pdf.fileNames.preaching', { name: `${ user.name }_${ user.surname }` });
            const preachingsTemplate = pdfPreachingsTemplateService.generate({ fullName: `${ user.name } ${ user.surname }`, reports: reportsPreaching });

            const pdfPath = await pdfAdapter.writeFromHTML({ fileName, html: preachingsTemplate, width: 480 });
            await externalStorageAdapter.moveFileOfInternalExtorage({ filePath: pdfPath, mimeType: 'application/pdf' });

            if (showStatusMessage) showToast(preachingMessages.EXPORTED_SUCCESS, { toastStyle: { bottom: 8 } });
        }
        catch (error) {
            showError(error);
        }
        finally {
            setIsPreachingsExporting(false);
        }
    }

    /**
     * Load preachings from the database and set them in the state.
     *
     * @param {Date} date - Date of preaching (month)
     * @return {Promise<void>} This function does not return anything.
     */
    const loadPreachings = async (date: Date): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        setIsPreachingsLoading(true);

        try {
            const preachings = await preachingService.getByUserIdAndMonth(user.id, date);
            setPreachings(preachings);
        }
        catch (error) {
            showError(error);
        }
        finally {
            setIsPreachingsLoading(false);
        }
    }

    /**
     * This function is to save the preaching day and return to the previous screen.
     *
     * @param {PreachingFormValues} values - The values for save preaching day
     * @param {UtilFunctions} utils - The utils functions
     * @return {Promise<void>} This function does not return anything.
     */
    const savePreaching = async (values: PreachingFormValues, utils?: UtilFunctions): Promise<void> => {
        const wifiConnectionAvailable = hasWifiConnection();
        if (!wifiConnectionAvailable) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        try {
            const createDto = CreatePreachingDto.create({ ...values, userId: user.id });
            const result = await preachingService.create(createDto);

            const preachingMonth = timeAdapter.format(result.day, timeAdapter.formats.MONTH_NAME);
            const selectedDateMonth = timeAdapter.format(state.selectedDate, timeAdapter.formats.MONTH_NAME);

            if (preachingMonth === selectedDateMonth) addPreaching(result);

            showToast(preachingMessages.ADDED_SUCCESS);
            utils?.onSuccess?.();
        }
        catch (error) {
            showError(error);
        }
        finally {
            utils?.onFinish?.();
        }
    }

    /**
     * This function is to update the preaching day and return to the previous screen.
     *
     * @param {PreachingFormValues} values - Values to update preaching day
     * @return {Promise<void>} This function does not return anything.
     */
    const updatePreaching = async (values: PreachingFormValues, utils?: UtilFunctions): Promise<void> => {
        const wifi = hasWifiConnection();
        if (!wifi) return;

        const isAuth = isAuthenticated();
        if (!isAuth) return;

        const canAlterate = canAlteratePreaching(preachingMessages.UNSELECTED_UPDATE);
        if (!canAlterate) return;

        try {
            const updateDto = UpdatePreachingDto.create(values);
            const preaching = await preachingService.update(state.seletedPreaching.id, user.id, updateDto);

            updatePreachingState(preaching);
            resetSelectedPreaching();

            showToast(preachingMessages.UPDATED_SUCCESS);
            utils?.onSuccess?.();
        }
        catch (error) {
            showError(error);
        }
        finally {
            utils?.onFinish?.();
        }
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
        exportPreachings,
        loadPreachings,
        savePreaching,
        updatePreaching
    }
}

export default usePreaching;