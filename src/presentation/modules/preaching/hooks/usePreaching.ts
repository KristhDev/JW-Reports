import { useNavigation } from '@react-navigation/native';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    INIT_PREACHING,
    addPreaching as addPreachingAction,
    clearPreaching as clearPreachingAction,
    removePreaching as removePreachingAction,
    setIsPreachingDeleting as setIsPreachingDeletingAction,
    setIsPreachingLoading as setIsPreachingLoadingAction,
    setIsPreachingsLoading as setIsPreachingsLoadingAction,
    setPreachings as setPreachingsAction,
    setSelectedDate as setSelectedDateAction,
    setSelectedPreaching as setSelectedPreachingAction,
    updatePreaching as updatePreachingAction
} from '@application/features';

/* Dtos */
import { CreatePreachingDto, UpdatePreachingDto } from '@domain/dtos';

/* Entities */
import { PreachingEntity } from '@domain/entities';

/* Errors */
import { RequestError } from '@domain/errors';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Services */
import { PreachingService } from '../services';

/* Hooks */
import { useNetwork, useStatus } from '@shared';

/* Interfaces */
import { PreachingFormValues } from '../interfaces';

/* Utils */
import { authMessages } from '@auth';
import { preachingMessages } from '../utils';

/**
 * Hook to management preaching of store with state and actions
 */
const usePreaching = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const state = useAppSelector(store => store.preaching);
    const { user, isAuthenticated } = useAppSelector(store => store.auth);

    const { setStatus, setTranslatedError, setUnauthenticatedError, setNetworkError } = useStatus();
    const { wifi } = useNetwork();

    const addPreaching = (preaching: PreachingEntity) => dispatch(addPreachingAction({ preaching }));
    const removePreaching = (id: string) => dispatch(removePreachingAction({ id }));
    const clearPreaching = () => dispatch(clearPreachingAction());
    const setIsPreachingsLoading = (isLoading: boolean) => dispatch(setIsPreachingsLoadingAction({ isLoading }));
    const setIsPreachingLoading = (isLoading: boolean) => dispatch(setIsPreachingLoadingAction({ isLoading }));
    const setSelectedDate = (date: Date) => dispatch(setSelectedDateAction({ selectedDate: date }));
    const setPreachings = (preachings: PreachingEntity[]) => dispatch(setPreachingsAction({ preachings }));
    const setSelectedPreaching = (preaching: PreachingEntity) => dispatch(setSelectedPreachingAction({ preaching }));
    const setIsPreachingDeleting = (isDeleting: boolean) => dispatch(setIsPreachingDeletingAction({ isDeleting }));
    const updatePreachingState = (preaching: PreachingEntity) => dispatch(updatePreachingAction({ preaching }));

    const resetSelectedPreaching = () => {
        setSelectedPreaching({
            ...INIT_PREACHING,
            day: new Date().toString(),
            initHour: new Date().toString(),
            finalHour: new Date().toString()
        });
    }

    /**
     * This function is to delete a preaching day and return to the previous screen.
     *
     * @param {Function} onFinish - This callback executed when the process is finished (success or failure)
     * @return {Promise<void>} This function does not return anything.
     */
    const deletePreaching = async (onFinish?: () => void): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        if (!isAuthenticated) {
            setUnauthenticatedError(() => onFinish && onFinish());
            return;
        }

        if (state.seletedPreaching.id === '') {
            onFinish && onFinish();
            setStatus({ code: 400, msg: preachingMessages.UNSELECTED_DELETE });

            return;
        }

        if (state.seletedPreaching.userId !== user.id) {
            onFinish && onFinish();
            setStatus({ code: 400, msg: authMessages.UNAUTHORIZED });

            return;
        }

        setIsPreachingDeleting(true);

        const result = await PreachingService.delete(state.seletedPreaching.id, user.id);

        if (result instanceof RequestError) {
            setIsPreachingDeleting(false);
            onFinish && onFinish();
            setTranslatedError(result.status, result.message);

            return;
        }

        removePreaching(state.seletedPreaching.id);
        onFinish && onFinish();
        navigation.goBack();

        resetSelectedPreaching();
        setStatus({ code: 200, msg: preachingMessages.DELETED_SUCCESS });
    }

    /**
     * Load preachings from the database and set them in the state.
     *
     * @param {Date} date - Date of preaching (month)
     * @return {Promise<void>} This function does not return anything.
     */
    const loadPreachings = async (date: Date): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        if (!isAuthenticated) {
            setUnauthenticatedError();
            return;
        }

        setIsPreachingsLoading(true);

        const result = await PreachingService.getByUserIdAndMonth(user.id, date);

        if (result instanceof RequestError) {
            setTranslatedError(result.status, result.message);
            setIsPreachingsLoading(false);
            return;
        }

        setPreachings(result);
    }

    /**
     * This function is to save the preaching day and return to the previous screen.
     *
     * @param {PreachingFormValues} preachingValues - The values for save preaching day
     * @return {Promise<void>} This function does not return anything.
     */
    const savePreaching = async (preachingValues: PreachingFormValues): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        if (!isAuthenticated) {
            setUnauthenticatedError();
            return;
        }

        setIsPreachingLoading(true);

        const createDto = CreatePreachingDto.create({ ...preachingValues, userId: user.id });
        const result = await PreachingService.create(createDto);

        if (result instanceof RequestError) {
            setTranslatedError(result.status, result.message);
            setIsPreachingLoading(false);
            return;
        }

        if (Time.format(result.day, 'MMMM') === Time.format(state.selectedDate, 'MMMM')) addPreaching(result);

        setStatus({ code: 201, msg: preachingMessages.ADDED_SUCCESS });
        navigation.goBack();
    }

    /**
     * This function is to update the preaching day and return to the previous screen.
     *
     * @param {PreachingFormValues} preachingValues - Values to update preaching day
     * @return {Promise<void>} This function does not return anything.
     */
    const updatePreaching = async (preachingValues: PreachingFormValues): Promise<void> => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        if (!isAuthenticated) {
            setUnauthenticatedError();
            return;
        }

        if (state.seletedPreaching === undefined || state.seletedPreaching.id === '') {
            setStatus({ code: 400, msg: preachingMessages.UNSELECTED_UPDATE });
            return;
        }

        setIsPreachingLoading(true);

        const updateDto = UpdatePreachingDto.create(preachingValues);
        const result = await PreachingService.update(state.seletedPreaching.id, user.id, updateDto);

        if (result instanceof RequestError) {
            setTranslatedError(result.status, result.message);
            setIsPreachingLoading(false);
            return;
        }

        updatePreachingState(result);
        setStatus({ code: 200, msg: preachingMessages.UPDATED_SUCCESS });

        resetSelectedPreaching();
        navigation.goBack();
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
