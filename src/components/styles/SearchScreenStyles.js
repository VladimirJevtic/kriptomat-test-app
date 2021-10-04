import { StyleSheet, Platform, Dimensions } from "react-native";

export default (styles = StyleSheet.create({
    containerMain: {
        justifyContent: 'center',
      },
      bodyContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerContainer: {
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
        fontWeight: "600",
        color: '#2F314B',
        fontSize: 14
      },
      separator: {
          height: 1,
          backgroundColor: '#cbcbcb',
          marginTop: 15
      },
      sortStyle: {
          color: '#707070',
          fontSize: 14,
          fontFamily: 'montserrat',
          fontWeight: 'bold',
          lineHeight: 16,
      },
      searchLabel: {
        fontFamily: 'montserrat',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#2F314B'
      }
}));