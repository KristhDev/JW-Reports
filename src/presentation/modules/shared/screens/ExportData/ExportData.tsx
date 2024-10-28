import React from 'react';
import { Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Modules */
import { Button, Title } from '@ui';

/* Theme */
import { themeStylesheet } from '@theme';

const ExportDataScreen = (): JSX.Element => {
    const { styles: themeStyles, theme: { fontSizes, margins } } = useStyles(themeStylesheet);

    return (
        <View style={ themeStyles.screenContainer }>
            <Title
                text="EXPORTAR INFORMACIÓN"
                textStyle={{ fontSize: fontSizes.md }}
            />

            <Text style={ themeStyles.detailText }>
                Aquí puede exportar su información de la aplicación en pdf, tanto informes de predicación, revisitas y cursos biblícos.
            </Text>

            <View style={{ gap: margins.md, flex: 1, justifyContent: 'flex-end' }}>
                <Button
                    onPress={ () => {} }
                    text="Exportar informes de predicación"
                />

                <Button
                    onPress={ () => {} }
                    text="Exportar revisitas"
                />

                <Button
                    onPress={ () => {} }
                    text="Exportar cursos biblícos"
                />

                <Button
                    onPress={ () => {} }
                    text="Exportar todo"
                />
            </View>
        </View>
    );
}

export default ExportDataScreen;