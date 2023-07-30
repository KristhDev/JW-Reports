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
 * describe the content of the section.
 *
 * @param {SectionContentProps} props { containerStyle: StyleProp<ViewStyle>, children: ReactNode, title: string } - This is the
 * props for functionality of the component
 * - containerStyle: This is the style of the container, default is `undefined`
 * - children: This is the children of the section
 * - title: This is the title of the section
 * @return {JSX.Element} Return jsx element to render section
 */
export const SectionContent: FC<PropsWithChildren<SectionContentProps>> = ({ containerStyle, children, title }): JSX.Element => {
    const { state: { colors } } = useTheme();

    return (
        <View
            style={[
                { borderBottomColor: colors.header, ...styles.sectionContainer },
                containerStyle
            ]}
        >
            <InfoText
                containerStyle={{ padding: 16, paddingTop: 0 }}
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