import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    sectionStyle: {
        paddingBottom: 24,
        width: '100%'
    },

    sectionSubTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 8
    },

    dateCreatedText: {
        bottom: 24,
        fontSize: 16,
        position: 'absolute',
        right: 24,
    },

    cardContainer: {
        borderWidth: 0.5,
    },

    cardHeaderText: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 8,
        textAlign: 'center'
    },

    cardContentText: {
        fontSize: 19,
        padding: 24
    }
});

export default styles;