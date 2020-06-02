import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Form() {
  return (
    <View style={styles.container}>
      <Text>Form</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
