import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Linking,
  } from 'react-native';
import logo from './../images/logo.jpg';
import green_up from './../images/green-up.png';
import red_down from './../images/red-down.png';
import { bindActionCreators } from 'redux';
import NavigationService  from './../services/navigation/NavigationService';
import navigationConstants from '../constants/navigationConstants';
import { SearchBar } from 'react-native-elements';
import vectorUp from './../images/chevron-up.png'
import vectorDown from './../images/chevron-down.png'
import styles from './styles/HomeScreenStyles'
import { addData } from '../services/actions/DataActions';
import { connect } from 'react-redux';

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          coinsData: [],
          isLoading: true,
          search: null,
          dataToRender: [],
          sortedCoinsData: [],
          filteredCoinsData: [],
          isSortedByName: false,
          isSortedByPrice: false,
        };
      }

      async componentDidMount() {
        await this.getCoinsData('eur');
      }

    getCoinsData = async (currency) => {
        this.setState({isLoading: true});
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`)
        .then((response) => response.json())
        .then((json) => {
          this.setState({ coinsData: json, dataToRender: json });
          this.props.addData(json);
        })
        .catch((error) => console.warn(error))
        .finally(() => 
        this.setState({ isLoading: false })
        );
      }

    percentagesRender = (percentages) => {
        let isValuePositive = percentages > 0 ? true : false;
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{ height: 10, width: 10, marginRight: 5 }} source={ isValuePositive === true ? green_up : red_down } />
                <Text style={[styles.textStyle, {color: isValuePositive === true ? "#0DEAA9" : "#FF9696"}]}>{percentages}%</Text>
            </View>
        )
    }

    onButtonPress = async () => {
        const supported = await Linking.canOpenURL('https://app.kriptomat.io');
        if (supported) {
          await Linking.openURL('https://app.kriptomat.io');
        } 
      }
      
    updateSearch = (search) => {
        if (search) {
            this.setState({isLoading: true});
            const newData = this.state.coinsData.filter(
            function (item) {
                const nameData = item.name
                    ? item.name.toUpperCase()
                    : ''.toUpperCase();
                const symbolData = item.symbol
                    ? item.symbol.toUpperCase()
                    : ''.toUpperCase();
                const textData = search.toUpperCase();
                return  nameData.indexOf(textData) > -1 ? true : symbolData.indexOf(textData) > -1;
            }
            );
            this.setState({ dataToRender: newData, filteredCoinsData: newData, isLoading: false })
        } else {
           this.setState({ filteredCoinsData: [], search: null, isSortedByPrice: false, isSortedByName: false, isLoading: false})
        }
    };

    sortByName = async (coinsData) => {
        this.setState({isLoading: true});
        if (this.state.isSortedByName === false) {
            this.setState({ isSortedByName: true })
            let sortedCoinsDataArray = coinsData;
            sortedCoinsDataArray.sort((a, b) => (a.name > b.name) ? 1 : -1);
            this.setState({ sortedCoinsData: sortedCoinsDataArray, dataToRender: sortedCoinsDataArray});
        } 
        else {
            this.setState({ sortedCoinsData: [], isSortedByPrice: false, isSortedByName: false, dataToRender: this.state.filteredCoinsData.length === 0 ? this.state.coinsData : this.state.filteredCoinsData});
            await this.getCoinsData('eur');
        }
        this.setState({isLoading: false});
    }

    sortByPrice = async (coinsData) => {
        this.setState({isLoading: true});
        if (this.state.isSortedByPrice === false) {
            this.setState({ isSortedByPrice: true })
            let sortedCoinsDataArray = coinsData;
            sortedCoinsDataArray.sort((a, b) => (a.current_price < b.current_price) ? 1 : -1);
            this.setState({ sortedCoinsData: sortedCoinsDataArray, dataToRender: sortedCoinsDataArray});
        } 
        else {
            this.setState({ sortedCoinsData: [], isSortedByName: false, isSortedByPrice: false, dataToRender: this.state.filteredCoinsData.length === 0 ? this.state.coinsData : this.state.filteredCoinsData});
            await this.getCoinsData('eur');
        }
        this.setState({isLoading: false});
    }

    renderSort = () => {
        let ScreenWidth = Dimensions.get("window").width;
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: ScreenWidth-50, marginBottom: 20}}>
                <TouchableOpacity onPress={()=> this.sortByName(this.state.filteredCoinsData.length === 0 ? this.state.coinsData : this.state.filteredCoinsData)}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Text style={styles.sortStyle}>Coin</Text>
                    <View style={{flexDirection: 'column', alignItems:'center'}}>
                        <Image style={{height: 9, width: 9, }} source={vectorUp} />
                        <Image style={{height: 9, width: 9}} source={vectorDown} />
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.sortByPrice(this.state.filteredCoinsData.length === 0 ? this.state.coinsData : this.state.filteredCoinsData)}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={styles.sortStyle}>Price</Text>
                    <View>
                        <Image style={{height: 9, width: 9}} source={vectorUp} />
                        <Image style={{height: 9, width: 9}} source={vectorDown} />
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        )
    }
      

    listRender = (dataToRender) => {
        return dataToRender.map((element) => {
          return (
            <View key={element.id} style={{ width: 350, marginBottom: 20}}>
                <TouchableOpacity onPress={() => NavigationService.navigate(navigationConstants.COIN_SCREEN, {element})}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                        <View style={styles.leftContainer}> 
                        <View style={styles.leftSubcontainer}>
                            <Image style={{width: 32, height: 32}} source={{uri: element.image}} />
                        </View>
                        <View>
                            <Text style={styles.textStyle}>{element.name}</Text>
                            <Text style={[styles.textStyle, { color: '#707070', fontWeight: '300' }]}>{element.symbol.toUpperCase()}</Text>
                        </View>
                        </View>
                        <View style={styles.rightContainer}>
                        <Text style={[styles.textStyle, {marginBottom: 5}]}>€{element.current_price}</Text>
                        <View>
                            {this.percentagesRender(element.price_change_percentage_24h)}
                        </View>
                        </View>
                    </View>
                </TouchableOpacity>
              <View style={styles.separator}></View>
            </View>
          );
        });
      };

  render() {
    let ScreenHeight = Dimensions.get("window").height;
    let ScreenWidth = Dimensions.get("window").width;
    const { search } = this.state;

    return (
        <View>
            <View style={[styles.containerMain, { height: ScreenHeight, width: ScreenWidth }]}>
            <View style={[styles.logoContainer, { marginTop: 235 }]}>
                <Image source={logo} style={{ height: 55, width: 250 }} />
            </View>

            <View style={{width: ScreenWidth-30, paddingTop: 15, marginBottom: 35}}>
                <SearchBar
                    containerStyle={{height: 48, backgroundColor: 'white', borderBottomColor: 'white', borderTopColor: 'white'}}
                    placeholder="Search"
                    lightTheme={true}
                    inputContainerStyle={{backgroundColor: 'white', shadowColor: "#000", shadowOffset: {
                        width: 1,
                        height: 1,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 3 }}
                    onChangeText={this.updateSearch}
                    onCancel={() => this.setState({ dataToRender: this.state.coinsData})}
                    onClear={() => this.setState({ dataToRender: this.state.coinsData})}
                    value={search}
                />

            </View>
            <View>{this.renderSort()}</View>
            <View  style={{ paddingBottom: 200 }} >
            <ScrollView contentContainerStyle={{ flexGrow: 1}} >
                <View
                    style={styles.bodyContainer}>
                    <View>
                        {this.state.isLoading ? <View style={{ marginTop: 15 }}>
                            <Text style={styles.textStyle}>Loading data...</Text>
                        </View> : <View>{this.listRender(this.state.dataToRender)}</View>}
                    </View>
                </View>
            </ScrollView>
            </View>


            <View style={styles.bottomContainer}>
            <TouchableOpacity  transparent onPress={() => this.onButtonPress()}>
                <View style={styles.buttonStyle}>
                <Text style={[styles.textStyle, {color: '#FFFFFF'}]}>Kriptomat account</Text>
                </View>
            </TouchableOpacity>
            </View>
        </View>
    </View>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addData,
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(HomeScreen);