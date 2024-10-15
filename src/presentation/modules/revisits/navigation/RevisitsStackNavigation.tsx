import React, { useState } from 'react';
import { useStyles } from 'react-native-unistyles';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

/* Navigation */
import RevisitsTopTabsNavigation from './RevisitsTopTabsNavigation';

/* Modules */
import { AddOrEditRevisit, RevisitDetail, RevisitsStackParamsList, useRevisits } from '@revisits';
import { BackButton, HeaderButtons } from '@ui';

/* Utils */
import { Characters } from '@utils';

const Stack = createStackNavigator<RevisitsStackParamsList>();

/**
 * This is a stack navigation for the revisits.
 *
 * @return {JSX.Element} rendered component to show stack navigation of revisits
 */
const RevisitsStackNavigation = (): JSX.Element => {
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { state: { isRevisitDeleting, selectedRevisit }, deleteRevisit } = useRevisits();
    const { theme: { colors, margins } } = useStyles();

    const revisitDetailTitle = `Revisita ${ selectedRevisit.personName }`;

    /**
     * If the user confirms the delete, then delete the revisit and close the modal.
     *
     * @return {void} This function does not return anything
     */
    const handleDeleteConfirm = () => {
        deleteRevisit(true, () => setShowDeleteModal(false));
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
                    headerTitleStyle: { marginLeft: -margins.xs },
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ true }
                            deleteModalText="¿Está seguro de eliminar esta revisita?"
                            isDeleteModalLoading={ isRevisitDeleting }
                            onCloseDeleteModal={ () => setShowDeleteModal(false) }
                            onConfirmDeleteModal={ handleDeleteConfirm }
                            onShowDeleteModal={ () => setShowDeleteModal(true) }
                            showDeleteModal={ showDeleteModal }

                            editButton={ true }
                            onPressEditButton={ () => navigate('AddOrEditRevisitScreen' as never) }
                        />
                    ),
                    title: Characters.truncate(revisitDetailTitle, 22)
                }}
            />

            <Stack.Screen
                component={ AddOrEditRevisit }
                name="AddOrEditRevisitScreen"
                options={{
                    headerTitleStyle: { marginLeft: -margins.xs },
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ selectedRevisit.id !== '' }
                            deleteModalText="¿Está seguro de eliminar esta revisita?"
                            isDeleteModalLoading={ isRevisitDeleting }
                            onCloseDeleteModal={ () => setShowDeleteModal(false) }
                            onConfirmDeleteModal={ handleDeleteConfirm }
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