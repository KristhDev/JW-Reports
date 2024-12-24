import React, { useState } from 'react';
import { useStyles } from 'react-native-unistyles';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

/* Navigation */
import RevisitsTopTabsNavigation from './RevisitsTopTabsNavigation';

/* Modules */
import { AddOrEditRevisit, RevisitDetail, RevisitsStackParamsList, useRevisits } from '@revisits';
import { BackButton, HeaderButtons, MainTabsBottomNavigationType } from '@ui';

const Stack = createStackNavigator<RevisitsStackParamsList>();

/**
 * This is a stack navigation for the revisits.
 *
 * @return {JSX.Element} rendered component to show stack navigation of revisits
 */
const RevisitsStackNavigation = (): JSX.Element => {
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);
    const navigation = useNavigation<MainTabsBottomNavigationType>();

    const { state: { isRevisitDeleting, selectedRevisit }, deleteRevisit } = useRevisits();
    const { theme: { colors } } = useStyles();

    const revisitDetailTitle = `Revisita ${ selectedRevisit.personName }`;

    /**
     * Navigates to the given screen inside the RevisitsStackNavigation stack.
     *
     * @param {keyof RevisitsStackParamsList} screen - The name of the screen to navigate to.
     * @return {void} This function does not return any value.
     */
    const handleGoTo = (screen: keyof RevisitsStackParamsList): void => {
        navigation.navigate('RevisitsStackNavigation', { screen } as any);
    }

    /**
     * Navigates to the given screen inside the RevisitsStackNavigation stack, and discards all the
     * screens that are above the given screen.
     *
     * @param {keyof RevisitsStackParamsList} screen - The name of the screen to navigate to.
     * @return {void} This function does not return anything.
     */
    const handlePopTo = (screen: keyof RevisitsStackParamsList): void => {
        navigation.popTo('RevisitsStackNavigation', { screen } as any);
    }

    /**
     * If the user confirms the delete, then delete the revisit and close the modal.
     *
     * @return {void} This function does not return anything
     */
    const handleDeleteConfirm = (onSuccess?: () => void): void => {
        deleteRevisit({
            onFinish: () => setShowDeleteModal(false),
            onSuccess
        });
    }

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: {
                    backgroundColor: colors.contentHeader,
                },
                headerStyle: {
                    backgroundColor: colors.header
                },
                headerTintColor: colors.headerText,
                headerShadowVisible: false
            }}
        >
            <Stack.Screen
                component={ RevisitsTopTabsNavigation }
                name="RevisitsTopTabsNavigation"
                options={{ title: 'Revisitas' }}
            />

            <Stack.Screen
                component={ RevisitDetail }
                name="RevisitDetailScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ true }
                            deleteModalText="¿Está seguro de eliminar esta revisita?"
                            isDeleteModalLoading={ isRevisitDeleting }
                            onCloseDeleteModal={ () => setShowDeleteModal(false) }
                            onConfirmDeleteModal={ () => handleDeleteConfirm(() => handlePopTo('RevisitsTopTabsNavigation')) }
                            onShowDeleteModal={ () => setShowDeleteModal(true) }
                            showDeleteModal={ showDeleteModal }

                            editButton={ true }
                            onPressEditButton={ () => handleGoTo('AddOrEditRevisitScreen') }
                        />
                    ),
                    headerTitleContainerStyle: { flexGrow: 1 },
                    headerTitleStyle: { maxWidth: '80%' },
                    title: revisitDetailTitle
                }}
            />

            <Stack.Screen
                component={ AddOrEditRevisit }
                name="AddOrEditRevisitScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ selectedRevisit.id !== '' }
                            deleteModalText="¿Está seguro de eliminar esta revisita?"
                            isDeleteModalLoading={ isRevisitDeleting }
                            onCloseDeleteModal={ () => setShowDeleteModal(false) }
                            onConfirmDeleteModal={ () => handleDeleteConfirm(() => handlePopTo('RevisitsTopTabsNavigation')) }
                            onShowDeleteModal={ () => setShowDeleteModal(true) }
                            showDeleteModal={ showDeleteModal }

                            editButton={ false }
                        />
                    ),
                    title: `${ selectedRevisit.id !== '' ? 'Editar' : 'Agregar' } revisita`
                }}
            />
        </Stack.Navigator>
    );
}

export default RevisitsStackNavigation;