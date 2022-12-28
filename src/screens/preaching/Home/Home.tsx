import React from 'react';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { PreachingTable } from '../../../components/preaching';
import { Fab, Title } from '../../../components/ui';

import { useTheme } from '../../../hooks';

import styles from './styles';

const Home = () => {
    const { state: { colors } } = useTheme();

    return (
        <>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center' }}
                style={{ flex: 1 }}
                overScrollMode="never"
            >
                <Title
                    containerStyle={ styles.titleContainerStyle }
                    text="INFORME DE DICIEMBRE 2022"
                    textStyle={{ fontSize: 24 }}
                />

                <PreachingTable />
            </ScrollView>

            <Fab
                color={ colors.button }
                icon={
                    <Icon
                        color={ colors.contentHeader }
                        name="add-circle-outline"
                        size={ 40 }
                        style={{ marginLeft: 4 }}
                    />
                }
                onPress={ () => {} }
                style={ styles.fab }
                touchColor={ colors.buttonDark }
            />
        </>
    );
}

export default Home;