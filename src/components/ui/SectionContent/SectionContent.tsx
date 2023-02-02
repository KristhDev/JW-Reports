import React, { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';

/* Components */
import { InfoText } from '../InfoText';

/* Hooks */
import { useTheme } from '../../../hooks';

/* Interfaces */
import { SectionContentProps } from './interfaces';

/* Styles */
import styles from './styles';

/**
 * This component renders the content of a section with title that
 * describe the content of the section
 * @param {SectionContentProps} props - { containerStyle, children, title }
 */
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