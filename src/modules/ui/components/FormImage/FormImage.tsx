import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Image, Text, useWindowDimensions, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button } from '../Button';

/* Hooks */
import { useImage } from '@shared';

/* Interfaces */
import { FormImageProps, FormImageRef } from './interfaces';

/* Theme */
import { themeStylesheet } from '@theme';
import { stylesheet } from './styles';

/**
 * Renders a form image component with the ability to select an image from the gallery or camera.
 *
 * @param {FormImageProps} props - The component props.
 * @param {string} props.defaultImage - The default image to display if no image is selected.
 * @param {boolean} props.disabled - Whether the component is disabled.
 * @param {StyleProp<ViewStyle>} props.imageStyle - The style to apply to the image.
 * @param {string} props.imageUrl - The URL of the image to display if no image is selected.
 * @param {string} props.label - The label to display above the image.
 * @param {StyleProp<TextStyle>} props.labelStyle - The style to apply to the label.
 * @param {Function} props.onSelectImage - The callback function to call when an image is selected.
 * @param {StyleProp<ViewStyle>} props.style - The style to apply to the component container.
 * @return {JSX.Element} The rendered form image component.
 */
export const FormImage  = forwardRef<FormImageRef, FormImageProps>(({
    cameraButtonText = 'Cámara',
    label,
    onSelectImage,
    defaultImage,
    disabled,
    galleryButtonText = 'Galería',
    imageStyle,
    imageUrl,
    labelStyle,
    showCameraButton,
    showGalleryButton,
    style,
}, ref): JSX.Element => {
    const [ imageHeight, setImageHeight ] = useState<number>(0);
    const [ imageUri, setImageUri ] = useState<string>('https://local-image.com/images.jpg');

    const { width: windowWidth } = useWindowDimensions();

    const { styles: themeStyles, theme: { colors, fontSizes } } = useStyles(themeStylesheet);
    const { styles } = useStyles(stylesheet);

    const { image, clearImage, takeImageToGallery, takePhoto } = useImage();

    useEffect(() => {
        onSelectImage(image);
    }, [ image ]);

    /**
     * Effect to set imageHeight and imageUri when the component is
     * mounted taking the default image or the revisit photo
     */
    useEffect(() => {
        if (!imageUrl) {
            const { height, width, uri } = Image.resolveAssetSource(defaultImage);
            const h = windowWidth / width * height;
            setImageHeight(h);
            setImageUri(uri);
        }
        else {
            Image.getSize(imageUrl, (width, height) => {
                const h = windowWidth / width * height;
                setImageHeight(h);
                setImageUri(imageUrl);
            });
        }
    }, []);

    /**
     * Effect to set imageHeight and imageUri every time
     * image changes value
     */
    useEffect(() => {
        if (image?.path) {
            const h = windowWidth / (image?.width || windowWidth) * (image?.height || 200);
            setImageHeight(h);
            setImageUri(image.path);
        }
        else {
            const { height, width, uri } = Image.resolveAssetSource(defaultImage);
            const h = windowWidth / width * height;
            setImageHeight(h);
            setImageUri(uri);
        }
    }, [ image ]);

    useImperativeHandle(ref, () => ({ clearImage }));

    return (
        <View style={[ themeStyles.formField, style ]}>
            <Text
                style={[ themeStyles.formLabel, labelStyle ]}
                testID="form-image-label"
            >
                { label }
            </Text>

            {/* Default image or revisit photo */}
            <Image
                resizeMode="contain"
                source={{ uri: imageUri }}
                style={[ styles.image(imageHeight), imageStyle ]}
                testID="form-image-image"
            />

            <View style={ styles.actions }>

                {/* Gallery button */}
                { (showGalleryButton) && (
                    <Button
                        containerStyle={{ minWidth: 0 }}
                        disabled={ disabled }
                        icon={
                            <Ionicons
                                color={ colors.contentHeader }
                                name="image-outline"
                                size={ fontSizes.icon }
                            />
                        }
                        onPress={ takeImageToGallery }
                        style={{ flex: 1 }}
                        text={ galleryButtonText }
                    />
                ) }

                {/* Camera button */}
                { (showCameraButton) && (
                    <Button
                        containerStyle={{ minWidth: 0 }}
                        disabled={ disabled }
                        icon={
                            <Ionicons
                                color={ colors.contentHeader }
                                name="camera-outline"
                                size={ fontSizes.icon }
                            />
                        }
                        onPress={ takePhoto }
                        style={{ flex: 1 }}
                        text={ cameraButtonText }
                    />
                ) }
            </View>
        </View>
    );
});