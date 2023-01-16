import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { DeleteModal } from '../../../screens/ui';

import { Fab } from '../../ui';

import { useCourses, useTheme } from '../../../hooks';

import { RevisitHeaderProps } from './interfaces';

export const CourseHeader: FC<RevisitHeaderProps> = ({ deleteButton, editButton }) => {
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { state: { isCourseDeleting }, deleteCourse } = useCourses();
    const { state: { colors }, BUTTON_TRANSPARENT_COLOR } = useTheme();

    const handleDeleteConfirm = () => {
        deleteCourse(true, () => setShowModal(false));
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
                            onPress={ () => navigate('AddOrEditCourseScreen' as never) }
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
                isLoading={ isCourseDeleting }
                isOpen={ showModal }
                onClose={ () => setShowModal(false) }
                onConfirm={ handleDeleteConfirm }
                text="¿Estás seguro de eliminar este curso?"
            />
        </>
    );
}