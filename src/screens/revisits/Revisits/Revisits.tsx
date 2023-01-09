import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { RevisitsList } from '../../../components/revisits';
import { Fab } from '../../../components/ui';

import { useTheme } from '../../../hooks';

import themeStyles from '../../../theme/styles';

const Revisits = () => {
    const { navigate } = useNavigation();
    const { state: { colors } } = useTheme();

    return (
        <>
            <RevisitsList />

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
                onPress={ () => navigate('AddOrEditRevisitScreen' as never) }
                style={ themeStyles.fabBottomRight }
                touchColor={ colors.buttonDark }
            />
        </>
    );
}

export default Revisits;