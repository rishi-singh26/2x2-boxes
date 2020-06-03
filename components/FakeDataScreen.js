import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import {postData, fetchData, deleteSingleData} from '../redux/actionCreators';

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: (paageNum) => dispatch(fetchData(paageNum)),
  postData: (name, year, color, pantone_value, pageNum) =>
    dispatch(postData(name, year, color, pantone_value, pageNum)),
  deleteSingleData: (id, pageNum) => dispatch(deleteSingleData(id, pageNum)),
});

const SCREEN_WIDTH = Math.floor(Dimensions.get('screen').width);

class FakeData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedData: '',
      refreshing: false,
    };
  }

  onOpenActionSheet = () => {
    const options = ['Delete', 'Edit', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;
    const title = 'Options';
    const titleTextStyle = {fontSize: 20, fontWeight: '700', color: '#333'};
    // const icons = [
    //   <Icon name="trash" type="feather" size={18} />,
    //   <Icon name="edit-2" type="feather" size={18} />,
    //   <Icon name="x" type="feather" size={18} />,
    // ];

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        title,
        titleTextStyle,
        // icons,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Alert.alert(
              'Do you want to delete this item?',
              this.state.selectedData.name,
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    console.log('Ok Pressed');
                    let id = this.state.selectedData.id.toString();
                    this.props.deleteSingleData(id, this.props.data.data.page);
                  },
                },
              ],
              {cancelable: false},
            );
            break;
          case 1:
            this.props.navigation.navigate('Form', {
              title: 'Edit ' + this.state.selectedData.name,
              dataToBeEedited: this.state.selectedData,
            });
            break;
          default:
            return;
        }
      },
    );
  };

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
                Pantone: {item.pantone_value}
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
              this.setState({selectedData: item});
              this.onOpenActionSheet();
            }}
          />
        </View>
      </View>
    );
  };

  render() {
    const {navigation} = this.props;

    const state = this.props.data;
    console.log(state.data);

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View>
          {state.isLoading && !state.errMess && (
            <ActivityIndicator
              size={40}
              color="#000"
              style={styles.activityIndicator}
            />
          )}
          {!state.errMess && (
            <FlatList
              data={state.data.data}
              renderItem={this.renderFakeData}
              keyExtractor={(item) => item.name}
              onRefresh={() => {
                this.props.fetchData(this.props.data.data.page);
              }}
              refreshing={this.state.refreshing}
            />
          )}
          {!state.isLoading && state.errMess !== null && <Text>err</Text>}
        </View>
        {!state.errMess && (
          <Icon
            reverse
            name="plus"
            type="feather"
            color="#008cff"
            containerStyle={styles.addBtn}
            onPress={() =>
              navigation.navigate('Form', {
                title: 'Create Color',
                dataToBeEedited: {},
              })
            }
          />
        )}
      </View>
    );
  }
}

const ConnectedApp = connectActionSheet(FakeData);
export default connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  fakeDataBox: {
    padding: 20,
    marginTop: 18,
    width: '89%',
    marginRight: '5.5%',
    marginLeft: '5.5%',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fakeDataBoxText: {color: '#fff', fontSize: 13},
  fakeDataBoxHeadText: {color: '#fff', fontSize: 19, paddingBottom: 10},
  activityIndicator: {
    position: 'absolute',
    zIndex: 1000,
    alignSelf: 'center',
    marginVertical: 30,
  },
  addBtn: {position: 'absolute', bottom: 15, right: 15},
  label: {
    fontSize: 15,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
