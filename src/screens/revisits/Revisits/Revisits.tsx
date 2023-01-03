import React from 'react';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { RevisitCard } from '../../../components/preaching';
import { Fab, Title } from '../../../components/ui';

import { useTheme } from '../../../hooks';

import styles from './styles';

const Revisits = () => {
    const { state: { colors } } = useTheme();

    return (
        <>
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 10 }}
                overScrollMode="never"
                style={{ flex: 1 }}
            >
                <Title
                    containerStyle={ styles.titleContainerStyle }
                    text="ÚLTIMAS REVISITAS"
                    textStyle={{ fontSize: 24 }}
                />

                <RevisitCard />
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
                style={ styles.fab }
                touchColor={ colors.buttonDark }
            />
        </>
    );
}

export default Revisits;