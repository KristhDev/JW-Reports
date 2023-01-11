import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { DeleteModal } from '../../../screens/ui';

import { Fab } from '../../ui';

import { useRevisits, useTheme } from '../../../hooks';

import { RevisitHeaderProps } from './interfaces';

export const RevisitHeader: FC<RevisitHeaderProps> = ({ deleteButton, editButton }) => {
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { state: { isRevisitDeleting }, deleteRevisit } = useRevisits();
    const { state: { colors }, BUTTON_TRANSPARENT_COLOR } = useTheme();

    const handleDeleteConfirm = () => {
        deleteRevisit(true, () => setShowModal(false));
    }

    return (
        <>
            <View style={{ flexDirection: 'row' }}>
                {
                    (editButton) && (
                        <Fab
                            color={ 'transparent' }
                            icon={
                                <Icon
                                    color={ colors.button }
                                    name="pencil-outline"
                                    size={ 26 }
                                    style={{ marginLeft: 2 }}
                                />
                            }
                            onPress={ () => navigate('AddOrEditRevisitScreen' as never) }
                            style={{ marginRight: -2 }}
                            touchColor={ BUTTON_TRANSPARENT_COLOR }
                        />
                    )
                }

                {
                    (deleteButton) && (
                        <Fab
                            color={ 'transparent' }
                            icon={
                                <Icon
                                    color={ colors.button }
                                    name="trash-outline"
                                    size={ 30 }
                                    style={{ marginLeft: 2 }}
                                />
                            }
                            onPress={ () => setShowModal(true) }
                            style={{ marginRight: 6 }}
                            touchColor={ BUTTON_TRANSPARENT_COLOR }
                        />
                    )
                }
            </View>

            <DeleteModal
                isLoading={ isRevisitDeleting }
                isOpen={ showModal }
                onClose={ () => setShowModal(false) }
                onConfirm={ handleDeleteConfirm }
                text="¿Estás seguro de eliminar está revisita?"
            />
        </>
    );
}