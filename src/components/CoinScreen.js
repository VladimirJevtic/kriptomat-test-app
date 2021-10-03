import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Linking
  } from 'react-native';

  import {
    LineChart
  } from "react-native-chart-kit";
import magnifyingGlass from './../images/magnifying-glass-black.jpg';
import arrow from './../images/arrow.jpg';
import NavigationService  from './../services/navigation/NavigationService';
import navigationConstants from '../constants/navigationConstants';
import green_up from './../images/green-up.png';
import red_down from './../images/red-down.png';
import moment from 'moment';
import styles from './styles/CoinScreenStyles';

class CoinScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          coinData: this.props.navigation.state.params.element,
          chartData: [],
          valuesArray: [0],
          isLoading: false,
          clickedHours: false, 
          clickedWeek: false, 
          clickedMonth: true, 
          clickedYear: false,
          clickedAll: false
        };
      }

      async componentDidMount() {
        await this.getChartData('eur', 'month');
      }

      handleChartPeriod(period) {
        let fromDate = null;
        switch(period) {
          case 'All':
            fromDate = moment().subtract(15, 'years').unix();
            break;
          case 'year':
            fromDate = moment().subtract(1, 'years').unix();
            break;
          case 'week':
            fromDate = moment().subtract(7, 'days').unix();
            break;
          case 'hours':
            fromDate = moment().subtract(24, 'hours').unix();
            break;
          case 'month':
            fromDate = moment().subtract(1, 'months').unix();
            break;
          }
        return fromDate;
      }

      onButtonPress = async () => {
        const supported = await Linking.canOpenURL('https://app.kriptomat.io');
        if (supported) {
          await Linking.openURL('https://app.kriptomat.io');
        } 
      }
      
      getChartData = async (currency, chartPeriod) => {
        let fromDate = this.handleChartPeriod(chartPeriod);
        let toDate = moment.now();
        let currencyId = this.state.coinData.id;
        this.setState({isLoading: true});
        fetch(`https://api.coingecko.com/api/v3/coins/${currencyId}/market_chart/range?vs_currency=${currency}&from=${fromDate}&to=${toDate}`)
        .then((response) => response.json())
        .then((json) => {this.setState({ chartData: json }); this.handleChartData()})
        .catch((error) => console.warn(error))
        .finally(() => {this.setState({ isLoading: false })});
      }

      handleChartData = () => {
        let chartArray = []
        if (this.state.chartData) this.state.chartData.prices.map(element => {
          chartArray.push(+element[1].toFixed(2));
        })
        if (chartArray.length === 1) {
          chartArray = [chartArray[0], chartArray[0]]
        }
        this.setState({valuesArray: chartArray});
      }

      header = () => {
        let ScreenWidth = Dimensions.get("window").width;
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: ScreenWidth, paddingHorizontal: 20 }}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <TouchableOpacity style={{marginRight: 15}} onPress={() => NavigationService.navigate(navigationConstants.HOME_SCREEN)}>
                        <Image style={{height: 24, width: 28}} source={arrow} />
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                        <Image style={{height: 26, width: 26, marginRight: 10}} source={{uri: this.state.coinData.image}} />
                        <Text style={styles.textStyle}>{this.state.coinData.name}</Text>
                    </View>
                </View>
                <View style={{justifyContent: 'flex-end'}}>
                    <TouchableOpacity onPress={() => NavigationService.navigate(navigationConstants.SEARCH_SCREEN, {data: this.state.coinData})}>
                        <Image style={{height: 24, width: 24}} source={magnifyingGlass}  />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    clickedOnChartButton = async (period) => {
      switch(period) {
        case 'All':
          this.setState({clickedAll: true, clickedHours: false, clickedMonth: false, clickedWeek: false, clickedYear: false})
          break;
        case 'year':
          this.setState({clickedYear: true, clickedHours: false, clickedMonth: false, clickedWeek: false, clickedAll: false})
          break;
        case 'week':
          this.setState({clickedWeek: true, clickedHours: false, clickedMonth: false, clickedAll: false, clickedYear: false})
          break;
        case 'hours':
          this.setState({clickedHours: true, clickedAll: false, clickedMonth: false, clickedWeek: false, clickedYear: false})
          break;
        case 'month':
          this.setState({clickedMonth: true, clickedHours: false, clickedAll: false, clickedWeek: false, clickedYear: false})
          break;
        }
        await this.getChartData('eur', period);
      }
    
    formatNumber = (number) => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    

    renderButtons = (ScreenWidth) => {
      const { clickedAll, clickedHours, clickedMonth, clickedWeek, clickedYear} = this.state;
      return (
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: ScreenWidth, paddingHorizontal: 20 }}>
              <TouchableOpacity onPress={() => {this.clickedOnChartButton('hours')}} style={[styles.chartButtonStyle , { backgroundColor: clickedHours ? '#0E80D5' : 'white'} ]}>
                <Text style={[styles.chartButtonTextStyle, { color: clickedHours ? 'white' : '#0E80D5' }]}>24h</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => {this.clickedOnChartButton('week')}}  style={[styles.chartButtonStyle  , {backgroundColor: clickedWeek ? '#0E80D5' : 'white'}]}>
                <Text style={[styles.chartButtonTextStyle, { color: clickedWeek ? 'white' : '#0E80D5' }]}>1W</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => {this.clickedOnChartButton('month')}}  style={[styles.chartButtonStyle  , {backgroundColor: clickedMonth ? '#0E80D5' : 'white'}]}>
                <Text style={[styles.chartButtonTextStyle, { color: clickedMonth ? 'white' : '#0E80D5' }]}>1M</Text> 
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => {this.clickedOnChartButton('year')}}  style={[styles.chartButtonStyle  , {backgroundColor: clickedYear ? '#0E80D5' : 'white'}]}>
                <Text style={[styles.chartButtonTextStyle , { color: clickedYear ? 'white' : '#0E80D5' }]}>1Y</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => {this.clickedOnChartButton('All')}}  style={[styles.chartButtonStyle , {backgroundColor: clickedAll ? '#0E80D5' : 'white'}]}>
                <Text style={[styles.chartButtonTextStyle , { color: clickedAll ? 'white' : '#0E80D5' }]}>All</Text> 
              </TouchableOpacity>
          </View>
      )
  }

  render() {

    let ScreenHeight = Dimensions.get("window").height;
    let ScreenWidth = Dimensions.get("window").width;
    let isValuePositive =  this.state.coinData.price_change_percentage_24h > 0 ? true : false;

    return (
        <View style={[styles.containerMain, { height: ScreenHeight, width: ScreenWidth }]}>
            <View>
                <View style={{flexDirection: 'row', paddingTop: 20}}>{this.header()}</View>
                <View style={{height: "100%", maxHeight: ScreenHeight}}>
                  <ScrollView>
                  <View>
                    <View style={{justifyContent: 'center', paddingTop: 35 , flexDirection: 'row', justifyContent: 'space-between'}}>
                      <View style={{paddingLeft: 20}}>
                        <Text style={styles.priceStyle}>€ {this.state.coinData.current_price}</Text>
                      </View>
                      <View style={[styles.priceFluctuationBox, {backgroundColor: isValuePositive === true ? 'rgba(13, 234, 169, 0.2)' : "rgba(255, 150, 150, 0.2)"}]}>
                        <Image style={{ height: 8, width: 8, marginRight: 5, marginLeft: 5}} source={ isValuePositive === true ? green_up : red_down }  />
                        <Text style={[styles.textStyle, {color: isValuePositive === true ? "#0DEAA9" : "#FF9696", fontWeight: 'normal', marginRight: 5}]}>{this.state.coinData.price_change_percentage_24h}%</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', paddingTop: 10}}>
                      <View style={{flexDirection: 'row', paddingLeft: 20}}>
                        <Text style={styles.labelStyle}>24h Low</Text>
                        <Text style={[styles.labelStyle, {paddingLeft: 7, fontWeight: 'bold'}]}>€ {this.state.coinData.low_24h}</Text>
                      </View>
                      <View style={{flexDirection: 'row', paddingLeft: 25}}>
                        <Text style={styles.labelStyle}>24h High</Text>
                        <Text style={[styles.labelStyle, {paddingLeft: 7, fontWeight: 'bold'}]}>€ {this.state.coinData.high_24h}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{paddingTop: 20, height: 300 }}>
                    {this.state.isLoading ? 
                      <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center', height: 250 }}>
                          <Text style={styles.loadingStyle}>Loading data...</Text>
                      </View> 
                      :
                      <View>
                          <LineChart
                              data={{
                                datasets: [
                                  {
                                    data: this.state.valuesArray,
                                    color: (opacity = 1) => `#0E80D5`,
                                    strokeWidth: 5
                                  }
                                ]
                              }}
                              width={ScreenWidth}
                              height={220}
                              chartConfig={{
                                barPercentage: 0.5,
                                backgroundColor: "white",
                                backgroundGradientFrom: "white",
                                backgroundGradientTo: "white",
                                color: () => "#C4C4C4",
                                labelColor: () => `white`,
                                style: {
                                },
                                propsForDots: {
                                  r: "0"
                                }
                              }}
                              bezier
                              style={{
                                marginRight: 40,
                                marginLeft: -10,
                                marginTop: 20
                              }}
                          />
                          <View style={{width: ScreenWidth}}>
                            {this.renderButtons(ScreenWidth)}
                          </View>
                      </View>    
                    }  
                  </View>
                  <View style={{width: '100%', height: 80, alignItems: 'center', paddingTop: 15}}>
                    <TouchableOpacity  transparent onPress={() => this.onButtonPress()}>
                      <View style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>Buy, Sell or Exchange Bitcoin</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  
                  <View>
                    <View style={{justifyContent: 'flex-start', paddingLeft: 20, paddingTop: 20}}>
                      <Text style={styles.overviewLabelStyle}>Overview</Text>
                    </View>
                    <View style={{width: ScreenWidth, paddingTop: 20}}>
                      <View style={{ flexDirection: 'row', justifyContent:'center'}}>
                        <View style={styles.borderViewStyle}>
                          <View style={styles.borderBoxStyle}>
                            <Text style={styles.grayLabel}>Volume (1d):</Text>
                            <Text style={styles.blackLabel}>€ {this.formatNumber(this.state.coinData.total_volume)}</Text>
                          </View>
                        </View>
                        <View style={styles.borderViewStyle}>
                        <View style={styles.borderBoxStyle}>
                            <Text style={styles.grayLabel}>Market Cap:</Text>
                            <Text style={styles.blackLabel}>€ {this.formatNumber(this.state.coinData.market_cap)}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent:'center'}}>
                        <View  style={styles.borderViewStyle}>
                          <View style={styles.borderBoxStyle}>
                            <Text style={styles.grayLabel}>Circulating supply:</Text>
                            <Text style={styles.blackLabel}>{this.formatNumber(this.state.coinData.circulating_supply)} {this.state.coinData.symbol.toUpperCase()}</Text>
                          </View>
                        </View>
                        <View  style={styles.borderViewStyle}></View>
                      </View>
                    </View>
                  </View>
                  <View style={{height: 350}}></View>
                  </ScrollView>
                </View>
            </View>
            <View style={styles.bottomContainer}>
              <TouchableOpacity  transparent onPress={() => this.onButtonPress()}>
                  <View style={styles.buttonStyle}>
                  <Text style={styles.buttonTextStyle}>Kriptomat account</Text>
                  </View>
              </TouchableOpacity>
            </View>
        </View>
    );
  }
}


export default CoinScreen;