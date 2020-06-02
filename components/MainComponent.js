import React from 'react';
import {Alert, Platform} from 'react-native';
import {connect} from 'react-redux';
import {fetchData} from '../redux/actionCreators';
import Form from './FakeDataForm';
import FakeData from './FakeDataScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Button} from 'react-native-elements';

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: (pageNum) => dispatch(fetchData(pageNum)),
});

const Stack = createStackNavigator();

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="FakeData"
            component={FakeData}
            options={{
              headerTitle: 'Fake Data',
              headerStyle: {
                backgroundColor: Platform.OS === 'android' ? '#008cff' : '#fff',
              },
              headerTintColor: Platform.OS === 'android' ? '#fff' : '#008cff',
            }}
          />
          <Stack.Screen
            name="Form"
            component={Form}
            options={{
              headerTitle: 'Fake Data',
              headerStyle: {backgroundColor: '#008cff'},
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
