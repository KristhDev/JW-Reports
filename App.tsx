import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/lib/integration/react';
import { NavigationContainer } from '@react-navigation/native';

import store, { persistor } from './src/features/store';

import Navigation from './src/navigation/Navigation';

const App = () => {
  return (
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;