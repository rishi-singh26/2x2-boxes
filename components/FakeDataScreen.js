import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const SCREEN_WIDTH = Math.floor(Dimensions.get('screen').width);

class FakeData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(JSON.stringify(this.props.data.data.data));
    console.log('\n\n', SCREEN_WIDTH);
  }

  renderFakeData = ({item, index}) => {
    return (
      <View
        key={item.id}
        style={[styles.fakeDataBox, {backgroundColor: item.color}]}>
        <View>
          <View style={{flex: 1}}>
            <View>
              <Text style={styles.fakeDataBoxHeadText}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Text>
            </View>
            <View>
              <Text style={styles.fakeDataBoxText}>Year: {item.year}</Text>
              <Text style={styles.fakeDataBoxText}>Color: {item.color}</Text>
              <Text style={styles.fakeDataBoxText}>
                Phantone Value: {item.pantone_value}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Icon
            type="feather"
            color="#fff"
            name="more-vertical"
            onPress={() => {
              Alert.alert('hola');
            }}
          />
        </View>
      </View>
    );
  };

  render() {
    const {navigation} = this.props;

    const data = this.props.data.data;

    return (
      <View ref={(ref) => (this.rootView = ref)} style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0069bf" />
        {/* <Button
          icon="camera"
          mode="contained"
          onPress={() => navigation.navigate('Form')}>
          Form
        </Button> */}
        <View>
          <FlatList
            data={data.data}
            renderItem={this.renderFakeData}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(FakeData);

const styles = StyleSheet.create({
  container: {flex: 1},
  fakeDataBox: {
    padding: 20,
    marginTop: 10,
    width: '95%',
    marginHorizontal: '2.5%',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fakeDataBoxText: {color: '#fff', fontSize: 13},
  fakeDataBoxHeadText: {color: '#fff', fontSize: 19, paddingBottom: 10},
});
