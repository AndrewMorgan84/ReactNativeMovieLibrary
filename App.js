import React from 'react';
import {View, StyleSheet} from 'react-native';
import Home from './screens/Home';

const App = () => {
  return (
    <View style={styles}>
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'black',
});
export default App;
