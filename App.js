import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const url = "https://rwl.artport.pro/commercialAgent/hs/CarrWorkApp/VagonInfo";

const fetchVagons = async () => {
    const response = await fetch(url);
    const { Vagons } = await response.json();
    return Vagons;
};

const App = () => {
  const [vagons, setVagons] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchVagons().then(data => {
      setVagons(data);
    });
  }, []);

  const displayVagons = () => {
    const totalWeight = vagons.reduce((accumulator, vagon) => accumulator + vagon.WeightNet, 0);
    const averageWeight = totalWeight / vagons.length;

    return (
      <View style={styles.vagonContainer}>
        <Text style={styles.averageWeight}>Average WeightNet: {averageWeight}</Text>
        {vagons.map((vagon) => (
          <View style={styles.vagonCard}>
            <Text>Vagon Number: {vagon.VagonNumber}</Text>
            <Text>Vagon Type: {vagon.VagonType}</Text>
            <Text>Cargo Name: {vagon.CargoName}</Text>
            <Text>Owner Name: {vagon.OwnerName}</Text>
            <Text>Departure Station Name: {vagon.DepartureStationName}</Text>
          </View>
        ))}
      </View>
    );
  };

  const sortByNumber = async () => {
    const vagons = await fetchVagons();
    const sortedVagons = [...vagons].sort((a, b) => a.VagonNumber - b.VagonNumber);
    setVagons(sortedVagons);
  };
  
  const sortByStation = async () => {
    const vagons = await fetchVagons();
    const sortedVagons = [...vagons].sort((a, b) => a.DepartureStationName.localeCompare(b.DepartureStationName));
    setVagons(sortedVagons);
  };
  
  const search = async () => {
    const vagons = await fetchVagons();
    const filteredVagons = vagons.filter(vagon => vagon.VagonNumber.includes(searchValue));
    setVagons(filteredVagons); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by Vagon Number"
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <Button title="Search" onPress={search} />
      <Button title="Sort by Number" onPress={sortByNumber} />
      <Button title="Sort by Station" onPress={sortByStation} />
      {displayVagons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  averageWeight: {
    fontWeight: 'bold',
    margin: 10,
  },
  vagonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  vagonCard: {
    backgroundColor: 'grey',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default App;