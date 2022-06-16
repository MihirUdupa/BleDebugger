import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Actoions from "./actions";
import FontStyles from "../utils/fontsHelper";
import {Divider} from "react-native-paper"

const TransactionScreen = (props) => {
    let deviceName = props.name
    let id = props.id 
    const [Action, updateAction] = useState('')
    
    return (
        <View style={styles.container}>
            <View style={styles.headerTextView}>
                <Text style={[FontStyles.Mainheading, FontStyles.slaboText, styles.mainHeadig]}>Connected to Device : {deviceName} </Text>
                <Text style={[FontStyles.Mainheading, FontStyles.slaboText, styles.mainHeadig]}> Device Id - {id}</Text>
                <Divider />
            </View>
            <View style={styles.headerButtonsView}>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.buttons} onPress={() => updateAction('Read')}>
                        <Text style={FontStyles.buttonText}>Read Data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={() => updateAction('Config')}>
                        <Text style={FontStyles.buttonText}>configure Data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={() => updateAction('Write')}>
                        <Text style={FontStyles.buttonText}>Write Data</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bodyView}>
                <Actoions screen={Action}/>
            </View>
            <Divider />
            <View style={styles.terminateButtonView}>
                <TouchableOpacity style={[styles.buttons]} onPress={() => {
                    props.op(props.id)
                }}>
                    <Text style={[FontStyles.buttonText, styles.TerminateText]}>Terminate connection</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    headerTextView:{
        flex:0.1
    },
    headerButtonsView:{
        flex:0.1
    },
    bodyView:{
        flex:0.7
    },
    terminateButtonView:{
        flex:0.1,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '5%'
    },
    buttons: {
        borderWidth: 1,
        padding:'2%'
    },
    sendButtonView: {
        margin: '5%'
    },
    mainHeadig:{
        textAlign:'center'
    },
    TerminateText:{
        textAlign:'center',
    }
})

export default TransactionScreen