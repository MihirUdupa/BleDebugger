import React from 'react';
import { StyleSheet } from 'react-native';

const FontStyles = StyleSheet.create({
    Mainheading:{
        fontSize:20
    },
    heading:{
        fontFamily:'PTSans-Regular'
    },
    subHeading:{
        fontFamily:'PlayfairDisplay-Italic-VariableFont_wght'
    },
    paragraph1:{
        fontFamily:'PlayfairDisplay-VariableFont_wght'
    },
    paragraph2:{
        fontFamily:'SourceSansPro-Regular'
    },
    buttonText:{
        fontFamily:'PTSans-Regular'
    },
    textInput:{
        paddingLeft:'2%'
    },
    hintTextView:{
        fontFamily:'PlayfairDisplay-Italic-VariableFont_wght',
        fontSize:11
    },
    RadioText:{
        fontSize:15
    },
    paragraphRadio:{
        fontSize:15
    },
    slaboText:{
        fontFamily:'Slabo27px-Regular',
    },
    listItemName:{
        fontSize: 16, 
        textAlign: 'center', 
        color: '#333333', 
        padding: 10
    },
    listItemRSSI:{
        fontSize: 12, 
        textAlign: 'center', 
        color: '#333333', 
        padding: 2
    },
    listItemId:{
        fontSize: 10, 
        textAlign: 'center', 
        color: '#333333', 
        padding: 2, 
        paddingBottom: 20
    }
})

export default FontStyles