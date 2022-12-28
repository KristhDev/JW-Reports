import React from 'react';
import { ScrollView } from 'react-native';

import { RevisitCard } from '../../../components/preaching';
import { Title } from '../../../components/ui';

import styles from './styles';

const Revisits = () => {
    return (
        <ScrollView
            contentContainerStyle={{ paddingHorizontal: 5 }}
            overScrollMode="never"
            style={{ flex: 1 }}
        >
            <Title
                containerStyle={ styles.titleContainerStyle }
                text="ÚLTIMAS REVISITAS"
                textStyle={{ fontSize: 24 }}
            />

            <RevisitCard />

            <RevisitCard />

            <RevisitCard />

            <RevisitCard />
        </ScrollView>
    );
}

export default Revisits;