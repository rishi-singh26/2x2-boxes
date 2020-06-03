import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  childern,
} from 'react-native';

class ModelAlert extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {isActive, onClose, mainAction, children} = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isActive}
        onRequestClose={() => {
          onClose();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {children}
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={mainAction}>
              <Text style={styles.textStyle}>Yes</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                onClose();
              }}>
              <Text style={styles.textStyle}>No</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ModelAlert;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    paddingBottom: 10,
    alignItems: 'center',
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    minWidth: 70,
    marginTop: 8,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginVertical: 15,
    textAlign: 'center',
    fontWeight: '700',
  },
});
