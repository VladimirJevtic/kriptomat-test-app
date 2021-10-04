import { StyleSheet, Platform, Dimensions } from "react-native";

export default (styles = StyleSheet.create({
    containerMain: {
      },
      bodyContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      logoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      leftContainer: { 
        flexDirection: 'row' 
      },
      leftSubcontainer: { 
        marginRight: 10,
        marginLeft: 10
      },
      rightContainer: {
        alignItems: 'flex-end'
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
      },
      sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
      },
      highlight: {
        fontWeight: '700',
      },
      buttonContainer: {
        position: 'absolute',
        alignItems: 'center',
        width: 375,
        height: 80
      },
      buttonStyle: {  
        width: 343,
        height: 48,
        borderRadius: 10,
        backgroundColor: '#0E80D5',
        justifyContent: 'center',
        alignItems: 'center'
      },
      bottomContainer: {
        width: '100%',
        height: 80,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#cbcbcb',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
      }, 
      textStyle: {
        fontFamily: 'montserrat',
        fontWeight: "bold",
        color: '#2F314B',
        fontSize: 18
      },
      loadingStyle: {
        fontFamily: 'montserrat',
        fontWeight: "600",
        color: '#2F314B',
        fontSize: 14
      },
      separator: {
          height: 1,
          backgroundColor: '#cbcbcb',
          marginTop: 15
      },
      priceStyle: {
        fontFamily: 'montserrat',
        fontSize: 28,
        fontWeight: 'bold',
        lineHeight: 34.13,
        color: '#2F314B'
      },
      priceFluctuationBox: {
        flexDirection: 'row',
        backgroundColor: '#4CB294',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fff'
      },
      labelStyle: {
        fontFamily: 'montserrat',
        fontWeight: "normal",
        color: '#2F314B',
        fontSize: 12
      },
      buttonTextStyle: {  
        fontFamily: 'montserrat',
        fontWeight: "600",
        color: '#FFFFFF',
        fontSize: 14
      },
      chartButtonTextStyle:{
        fontFamily: 'montserrat',
        fontSize: 12,
        color: '#0E80D5',
      },
      chartButtonStyle: {
        height: 22,
        width: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
      },
      overviewLabelStyle: {
        fontFamily: 'montserrat',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2F314B',
      },
      grayLabel: {
        fontFamily: 'montserrat',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#A2A6AE',
      },
      blackLabel: {
        fontFamily: 'montserrat',
        fontSize: 14,
        fontWeight: '600',
        color: '#2F314B',
        paddingTop: 5
      },
      borderViewStyle: {
        height: 60, 
        width: Dimensions.get("window").width/2, 
        borderColor: 'rgba(162, 166, 174, 0.5)', 
        borderWidth: 1
      },
      borderBoxStyle: {
        paddingLeft: 10, 
        paddingVertical: 5, 
        justifyContent: 'space-between'}
}));