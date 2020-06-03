import React from 'react';
import Main from './components/MainComponent';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

const store = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <ActionSheetProvider>
        <Main />
      </ActionSheetProvider>
    </Provider>
  );
}
