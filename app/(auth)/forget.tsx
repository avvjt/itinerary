import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const Forget = () => {
  return (
    <View>
      <Text>forget page</Text>
      <Link href={'/(tabs)/home'}>Home</Link>
    </View>
  );
};

export default Forget;