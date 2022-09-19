import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

import { useAuth } from '../../../hooks';

const Home = () => {
    const { state: { user } } = useAuth();

    useEffect(() => {
        console.log(user);
    }, [ user ]);

    return (
        <View>
            <Text>Home</Text>
        </View>
    );
}

export default Home;