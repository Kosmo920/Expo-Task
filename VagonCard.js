import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const VagonCard = ({ vagon }) => {
  return (
    <View style={styles.vagonCard}>
      <Text>Vagon Number: {vagon.VagonNumber}</Text>
      <Text>Vagon Type: {vagon.VagonType}</Text>
      <Text>Cargo Name: {vagon.CargoName}</Text>
      <Text>Owner Name: {vagon.OwnerName}</Text>
      <Text>Departure Station Name: {vagon.DepartureStationName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  vagonCard: {
    backgroundColor: 'grey',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default VagonCard;