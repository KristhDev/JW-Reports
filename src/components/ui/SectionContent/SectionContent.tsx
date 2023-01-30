import React, { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';

import { InfoText } from '../InfoText';

import { useTheme } from '../../../hooks';

import { SectionContentProps } from './interfaces';

import styles from './styles';

export const SectionContent: FC<PropsWithChildren<SectionContentProps>> = ({ containerStyle, children, title }) => {
    const { state: { colors } } = useTheme();

    return (
        <View
            style={[
                { borderBottomColor: colors.header, ...styles.sectionContainer },
                containerStyle
            ]}
        >
            <InfoText
                containerStyle={{ marginHorizontal: 8 }}
                text={ title }
                textStyle={{
                    color: colors.titleSecondary,
                    ...styles.sectionTitle
                }}
            />

            { children }
        </View>
    );
}