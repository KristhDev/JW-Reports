import React from 'react';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Fab, Title } from '../../../components/ui';

import { useTheme } from '../../../hooks';

import themeStyles from '../../../theme/styles';

const Courses = () => {
    const { state: { colors } } = useTheme();

    return (
        <>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}
                overScrollMode="never"
                style={{ flex: 1 }}
            >
                <Title
                    containerStyle={ themeStyles.titleContainerSpacingVertical }
                    text="CURSOS QUE DIRIGES"
                    textStyle={{ fontSize: 24 }}
                />
            </ScrollView>

            <Fab
                color={ colors.button }
                icon={
                    <Icon
                        color={ colors.contentHeader }
                        name="add-circle-outline"
                        size={ 40 }
                        style={{ marginLeft: 3 }}
                    />
                }
                onPress={ () => {} }
                style={ themeStyles.fabBottomRight }
                touchColor="rgba(0, 0, 0, 0.15)"
            />
        </>
    );
}

export default Courses;