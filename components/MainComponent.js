import React from 'react';
import {connect} from 'react-redux';
import {fetchData} from '../redux/actionCreators';
import Form from './Form';
import FakeData from './FakeDataScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Button, Icon} from 'react-native-elements';
import {StyleSheet} from 'react-native';

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
              headerTitleStyle: {
                fontSize: 25,
                fontWeight: '700',
                paddingHorizontal: 12,
              },
              headerStyle: {elevation: 0},
              headerRight: () =>
                this.props.data.data.page < this.props.data.data.total_pages ? (
                  <Button
                    title="Next"
                    titleStyle={{fontSize: 13}}
                    iconRight
                    icon={
                      <Icon
                        name="arrow-right-circle"
                        type="feather"
                        size={15}
                        color="white"
                        containerStyle={styles.arrowRightContainer}
                      />
                    }
                    containerStyle={styles.nextBtnContainer}
                    buttonStyle={styles.nextBtn}
                    onPress={() => {
                      this.props.fetchData(this.props.data.data.page + 1);
                    }}
                  />
                ) : (
                  <Button
                    title="Prev"
                    titleStyle={{fontSize: 13}}
                    icon={
                      <Icon
                        name="arrow-left-circle"
                        type="feather"
                        size={15}
                        color="white"
                        containerStyle={styles.arrowLeftContainer}
                      />
                    }
                    containerStyle={styles.nextBtnContainer}
                    buttonStyle={styles.nextBtn}
                    onPress={() => {
                      this.props.fetchData(this.props.data.data.page - 1);
                    }}
                  />
                ),
            }}
          />
          <Stack.Screen
            name="Form"
            component={Form}
            options={{
              headerTitle: 'Form',
              headerTitleStyle: {fontSize: 22, fontWeight: '700'},
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
  arrowRightContainer: {paddingTop: 2, paddingLeft: 8},
  arrowLeftContainer: {paddingTop: 2, paddingRight: 8},
  nextBtn: {
    borderRadius: 30,
    maxHeight: 35,
    backgroundColor: '#008cff',
    padding: 5,
    minWidth: 75,
  },
  nextBtnContainer: {
    paddingHorizontal: 28,
    borderRadius: 10,
  },
});
