import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Login from './src/views/Login'
import Register from './src/views/Register'
import Profile from './src/views/Profile'

export default function App() {
  const [fakeState, setFakeState] = useState(0)
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#020024', '#090979', '#090979', '#00d4ff']}
        start={[0, 0]}
        end={[1, 1]}
        location={[0, 0, 1]}
        style={styles.background}
      >
        <SafeAreaView style={styles.areaView}>
          <ScrollView >
            {fakeState === 0 && <Register setFakeState={setFakeState} />}
            {fakeState === 1 && <Login setFakeState={setFakeState} />}
            {fakeState === 2 && <Profile setFakeState={setFakeState} />}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  areaView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  background: {
    padding: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  }
});


