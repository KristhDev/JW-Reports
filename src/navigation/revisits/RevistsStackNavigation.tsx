import React, { useState } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import RevisitsTopTabsNavigation from './RevisitsTopTabsNavigation';

import { AddOrEditRevisit, RevisitDetail } from '../../screens/revisits';

import { BackButton, HeaderButtons } from '../../components/ui';

import { useRevisits, useTheme } from '../../hooks';

import { RevisitsStackParamsList } from '../../interfaces/revisits';

const Stack = createStackNavigator<RevisitsStackParamsList>();

const RevisitsStackNavigation = () => {
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { state: { isRevisitDeleting, selectedRevisit }, deleteRevisit } = useRevisits();
    const { state: { colors } } = useTheme();

    const revisitDetailTitle = `Revisita ${ selectedRevisit.person_name }`;

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
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ true }
                            deleteModalText="¿Estás seguro de eliminar está revisita?"
                            isDeleteModalLoading={ isRevisitDeleting }
                            onCloseDeleteModal={ () => setShowDeleteModal(false) }
                            onConfirmDeleteModal={ handleDeleteConfirm }
                            onShowDeleteModal={ () => setShowDeleteModal(true) }
                            showDeleteModal={ showDeleteModal }

                            editButton={ true }
                            onPressEditButton={ () => navigate('AddOrEditRevisitScreen' as never) }
                        />
                    ),
                    title: (revisitDetailTitle.length >= 22) ? revisitDetailTitle.slice(0, 22) + '...' : revisitDetailTitle
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
                            deleteModalText="¿Estás seguro de eliminar está revisita?"
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