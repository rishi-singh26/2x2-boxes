import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
  ToastAndroid,
} from 'react-native';
import {Button, colors} from 'react-native-elements';
import {postData, editData} from '../redux/actionCreators';
import {connect} from 'react-redux';
import ModelAlert from './ConfermationModel';
const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData()),
  postData: (name, year, color, pantone_value, pageNum) =>
    dispatch(postData(name, year, color, pantone_value, pageNum)),
  editData: (name, year, color, pantone_value, pageNum, id) =>
    dispatch(editData(name, year, color, pantone_value, pageNum, id)),
});

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      year: '',
      color: '',
      pantone: '',
      nameErr: '',
      yearErr: '',
      colorErr: '',
      pantoneErr: '',
      modelAlertActive: false,
    };
  }

  closeModal = () => {
    this.setState({modelAlertActive: false});
  };

  validate = (type) => {
    const {name, year, color, pantone} = this.state;

    if (type === 'name') {
      name.length < 3
        ? this.setState({nameErr: 'Name should have atleast 3 characters'})
        : this.setState({nameErr: ''});
    } else if (type === 'year') {
      year.length === 4 && typeof parseInt(year, 10) === 'number'
        ? this.setState({yearErr: ''})
        : this.setState({
            yearErr: 'Enter a valid year! (should have 4 digits)',
          });
    } else if (type === 'color') {
      var re = /[0-9A-Fa-f]{6}/g;
      color.length === 7 && re.test(color)
        ? this.setState({colorErr: ''})
        : this.setState({colorErr: 'Enter correct color format'});
    } else if (type === 'pantone') {
      const splitPantone = pantone.split('-');
      pantone.length === 7 &&
      splitPantone[0].length === 2 &&
      splitPantone[1].length === 4 &&
      /^\d+$/.test(splitPantone[0]) &&
      /^\d+$/.test(splitPantone[1])
        ? this.setState({pantoneErr: ''})
        : this.setState({pantoneErr: 'Enter a valid pantone value!'});
    }
    return;
  };

  checkValidity = (text, type) => {
    if (type === 'name') {
      this.setState({name: text});
      text.length < 3 ? null : this.setState({nameErr: ''});
    } else if (type === 'year') {
      this.setState({year: text.replace(/[^+\d]/g, '')});
      text.length === 4 && typeof parseInt(text, 10) === 'number'
        ? this.setState({yearErr: ''})
        : null;
    } else if (type === 'color') {
      this.setState({color: text});
      var re = /[0-9A-Fa-f]{6}/g;
      text.length === 7 && re.test(text) ? this.setState({colorErr: ''}) : null;
    } else if (type === 'pantone') {
      this.setState({pantone: text});
      const splitPantone = text.split('-');
      text.length === 7 &&
      splitPantone[0].length === 2 &&
      splitPantone[1].length === 4 &&
      /^\d+$/.test(splitPantone[0]) &&
      /^\d+$/.test(splitPantone[1])
        ? this.setState({pantoneErr: ''})
        : null;
    }
    return;
  };

  showModel = () => {
    const {
      nameErr,
      yearErr,
      colorErr,
      pantoneErr,
      name,
      year,
      color,
      pantone,
    } = this.state;
    name.length === 0 ||
    year.length === 0 ||
    color.length === 0 ||
    pantone.length === 0 ||
    nameErr.length !== 0 ||
    yearErr.length !== 0 ||
    colorErr.length !== 0 ||
    pantoneErr.length !== 0
      ? ToastAndroid.showWithGravity(
          'Fill the form',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        )
      : this.setState({modelAlertActive: true});
  };

  render() {
    const {
      nameErr,
      yearErr,
      colorErr,
      pantoneErr,
      name,
      year,
      color,
      pantone,
    } = this.state;
    const {title, dataToBeEedited} = this.props.route.params;
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {Object.keys(dataToBeEedited).length > 0 && (
              <View
                style={[
                  styles.fakeDataBox,
                  {backgroundColor: dataToBeEedited.color},
                ]}>
                <View>
                  <Text style={styles.fakeDataBoxHeadText}>
                    {dataToBeEedited.name.charAt(0).toUpperCase() +
                      dataToBeEedited.name.slice(1)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.fakeDataBoxText}>
                    Year: {dataToBeEedited.year}
                  </Text>
                  <Text style={styles.fakeDataBoxText}>
                    Color: {dataToBeEedited.color}
                  </Text>
                  <Text style={styles.fakeDataBoxText}>
                    Pantone: {dataToBeEedited.pantone_value}
                  </Text>
                </View>
              </View>
            )}
            <View>
              <Text style={styles.label}>Name</Text>
              <TextInput
                placeholder="Name"
                onChangeText={(text) => this.checkValidity(text, 'name')}
                style={styles.textInput}
                value={this.state.name}
                onBlur={() => this.validate('name')}
              />
              {nameErr !== '' && <Text style={styles.errText}>{nameErr}</Text>}
            </View>
            <View>
              <Text style={styles.label}>Year</Text>
              <TextInput
                placeholder="YYYY"
                onChangeText={(text) => this.checkValidity(text, 'year')}
                style={styles.textInput}
                value={this.state.year}
                onBlur={() => this.validate('year')}
              />
              {yearErr !== '' && <Text style={styles.errText}>{yearErr}</Text>}
            </View>
            <View>
              <Text style={styles.label}>Color</Text>
              <Text style={styles.caption}>
                Must be of the hexadecimal format ex."#BF1932"
              </Text>
              <TextInput
                placeholder="#AAAAAA"
                onChangeText={(text) => this.checkValidity(text, 'color')}
                style={styles.textInput}
                value={this.state.color}
                onBlur={() => this.validate('color')}
              />
              {colorErr !== '' && (
                <Text style={styles.errText}>{colorErr}</Text>
              )}
            </View>
            <View>
              <Text style={styles.label}>Pantone Value</Text>
              <Text style={styles.caption}>
                Must be a pantone value. ex."19-1664"
              </Text>
              <TextInput
                placeholder="NN-NNNN"
                onChangeText={(text) => this.checkValidity(text, 'pantone')}
                style={styles.textInput}
                value={this.state.pantone}
                onBlur={() => this.validate('pantone')}
              />
              {pantoneErr !== '' && (
                <Text style={styles.errText}>{pantoneErr}</Text>
              )}
            </View>
            <Button
              title={
                Object.keys(dataToBeEedited).length > 0 ? 'Edit' : 'Create'
              }
              type="solid"
              containerStyle={styles.btnContainer}
              onPress={this.showModel}
            />
          </View>
          <ModelAlert
            isActive={this.state.modelAlertActive}
            mainAction={() => {
              Object.keys(dataToBeEedited).length > 0
                ? this.props.editData(
                    name,
                    year,
                    color,
                    pantone,
                    this.props.data.data.page,
                    dataToBeEedited.id.toString(),
                  )
                : this.props.postData(
                    name,
                    year,
                    color,
                    pantone,
                    this.props.data.data.page,
                  );
              this.setState({modelAlertActive: false});
            }}
            onClose={this.closeModal}>
            <>
              <View style={[styles.fakedataview, {backgroundColor: color}]}>
                <Text style={styles.fakeDataBoxHeadText}>{name}</Text>
                <Text style={styles.fakeDataBoxText}>{year}</Text>
                <Text style={styles.fakeDataBoxText}>{color}</Text>
                <Text style={styles.fakeDataBoxText}>{pantone}</Text>
              </View>
              <Text style={styles.label}>Do you want to create this?</Text>
            </>
          </ModelAlert>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: '#fff',
    minHeight: Dimensions.get('window').height,
  },
  textInput: {
    height: 50,
    backgroundColor: '#efefef',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 17,
    color: '#222',
    borderColor: '#fff',
    borderWidth: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  caption: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 20,
    color: '#888',
  },
  errText: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingVertical: 0,
    color: '#f00',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingVertical: 0,
    color: '#333',
  },
  btnContainer: {
    width: '80%',
    margin: '10%',
    borderRadius: 10,
    backgroundColor: '#008cff',
  },
  fakeDataBoxText: {color: '#fff', fontSize: 13},
  fakeDataBoxHeadText: {color: '#fff', fontSize: 19, paddingBottom: 10},
  fakedataview: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
  },
  fakeDataBox: {
    padding: 20,
    marginTop: 10,
    width: '93%',
    marginHorizontal: '3.5%',
    borderRadius: 10,
  },
});
