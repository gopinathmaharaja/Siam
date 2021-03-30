import React, { Component } from 'react';
import Navigation from "./RootNav";
import { Provider } from 'react-redux'
import Store from "./store";
import { StatusBar } from 'react-native';

function App() {
    return (
        <Provider store={Store}>
            <StatusBar barStyle="light-content" backgroundColor="#12bcd1" />
            <Navigation />
        </Provider>
    );
}

export default App;