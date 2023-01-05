import React, { FC, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { DeleteModal } from '../../../screens/ui';

import { Fab } from '../../ui';

import { usePreaching, useTheme } from '../../../hooks';

import { PreachingHeaderProps } from './interfaces';

export const PreachingHeader: FC<PreachingHeaderProps> = ({ deleteButton = false }) => {
    const [ showModal, setShowModal ] = useState<boolean>(false);

    const { state: { isPreachingDeleting }, deletePreaching } = usePreaching();
    const { state: { colors, theme } } = useTheme();

    const handleConfirm = () => {
        deletePreaching();
        setShowModal(false);
    }

    return (
        <>
            <View style={{ flexDirection: 'row' }}>
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
                            touchColor={ (theme === 'dark') ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'  }
                        />
                    )
                }
            </View>

            <DeleteModal
                isLoading={ isPreachingDeleting }
                isOpen={ showModal }
                onClose={ () => setShowModal(false) }
                onConfirm={ handleConfirm }
                text="¿Estás seguro de eliminar este día de predicación?"
            />
        </>
    );
}