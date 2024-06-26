import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import VagonCard from './VagonCard';

const VagonList = ({ vagons }) => {
  const totalWeight = vagons.reduce((accumulator, vagon) => accumulator + vagon.WeightNet, 0);
  const averageWeight = totalWeight / vagons.length;

  return (
    <View>
      <Text style={styles.averageWeight}>Average WeightNet: {averageWeight}</Text>
      <FlatList
        contentContainerStyle={styles.vagonContainer}
        data={vagons}
        keyExtractor={(item) => item.VagonNumber.toString()}
        renderItem={({ item }) => <VagonCard vagon={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  vagonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  averageWeight: {
    fontWeight: 'bold',
    margin: 10,
  },
});

export default VagonList;
