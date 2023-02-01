import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    sectionStyle: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        width: '100%'
    },

    sectionSubTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 10
    },

    imageText: {
        fontSize: 16,
        marginTop: 10
    },

    dateCreatedText: {
        bottom: 20,
        fontSize: 16,
        position: 'absolute',
        right: 20,
    },

    cardContainer: {
        borderWidth: 0.5,
        width: '100%'
    },

    cardHeaderText: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center'
    },

    cardContentText: {
        fontSize: 19,
        padding: 22
    }
});

export default styles;