import React from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';

const boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const numOfBoxesInARow = 2;

const SCREEN_WIDTH = Math.floor(Dimensions.get('window').width);

export default class Main extends React.Component {
  renderBoxes = ({item, index}) => {
    if (typeof item !== 'string') {
      return (
        <View style={[styles.boxView, {backgroundColor: '#0f0'}]} key={index}>
          <Text>{item}</Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.boxView, {backgroundColor: '#fff'}]} key={index} />
      );
    }
  };

  makeNoOfBoxesComplete = (data, numOfColumns) => {
    const numOfFullRows = Math.floor(data.length / numOfColumns);

    let numOfBoxesInLastRow = data.length - numOfFullRows * numOfColumns;
    while (numOfBoxesInLastRow < numOfColumns && numOfBoxesInLastRow !== 0) {
      data.push('new');
      numOfBoxesInLastRow += 1;
    }
    return data;
  };

  render() {
    const data = this.makeNoOfBoxesComplete(boxes, numOfBoxesInARow);
    return (
      <FlatList
        data={data}
        style={styles.box}
        keyExtractor={(item) => item}
        renderItem={this.renderBoxes}
        numColumns={numOfBoxesInARow}
      />
    );
  }
}

const styles = StyleSheet.create({
  boxView: {
    flex: 1,
    marginVertical: SCREEN_WIDTH / 200,
    marginRight: SCREEN_WIDTH / 100,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'stretch',
  },
  box: {
    marginLeft: SCREEN_WIDTH / 100,
    backgroundColor: '#fff',
  },
});
