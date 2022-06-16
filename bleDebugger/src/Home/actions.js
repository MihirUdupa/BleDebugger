import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import FontStyles from '../utils/fontsHelper'
import WriteData from "./write";

const Write = () => {
    return(
        <WriteData />
    )
}
const Config = () => {
    const [Gyro, setGyro] = useState('')
    const [BCutOff1, setBCutOff1] = useState('')
    const [BCutOff2, setBCutOff2] = useState('')
    const [BCutOff3, setBCutOff3] = useState('')

    return (
        <View>
            <Text style={[FontStyles.subHeading, styles.subHeading]}>Configure the hoverboard</Text>
            <View style={styles.childView}>
                <View style={styles.buttonView}>
                    <Text style={FontStyles.paragraph1}>Gyro Response Rate : </Text>
                    <TextInput defaultValue={Gyro} onChange={(e) => setGyro(e)} style={[styles.textBox, FontStyles.textInput, FontStyles.slaboText]} placeholder="Gyro Response Rate"/>
                </View>
                <View style={[styles.HineTextView,styles.buttonView]}>
                    <Text style={FontStyles.hintTextView}>Min = 0</Text>
                    <Text style={FontStyles.hintTextView}>Max = 2</Text>
                    <Text style={FontStyles.hintTextView}>Default = 1</Text>
                </View>
            </View>
            <View style={styles.childView}>
                <View style={styles.buttonView}>
                    <Text style={FontStyles.paragraph1}>Battery Cuttoff Limit 1 : </Text>
                    <TextInput defaultValue={BCutOff1} onChange={(e) => setBCutOff1(e)} style={[styles.textBox, FontStyles.textInput, FontStyles.slaboText]} placeholder="Set Battery CutOff level 1" />
                </View>
                <View style={[styles.HineTextView,styles.buttonView]}>
                    <Text style={FontStyles.hintTextView}>Min = 0</Text>
                    <Text style={FontStyles.hintTextView}>Max = 10</Text>
                    <Text style={FontStyles.hintTextView}>Default = 10</Text>
                </View>
            </View>
            <View style={styles.childView}>
                <View style={styles.buttonView}>
                    <Text style={FontStyles.paragraph1}>Battery Cuttoff Limit 2 : </Text>
                    <TextInput defaultValue={BCutOff2} onChange={(e) => setBCutOff2(e)} style={[styles.textBox, FontStyles.textInput, FontStyles.slaboText]} placeholder="Set Battery CutOff level 2"/>
                </View>
                <View style={[styles.HineTextView,styles.buttonView]}>
                    <Text style={FontStyles.hintTextView}>Min = 11</Text>
                    <Text style={FontStyles.hintTextView}>Max = 30</Text>
                    <Text style={FontStyles.hintTextView}>Default = 30</Text>
                </View>
            </View>
            <View style={styles.childView}>
                <View style={styles.buttonView}>
                    <Text style={FontStyles.paragraph1}>Battery Cuttoff Limit 3 : </Text>
                    <TextInput defaultValue={BCutOff3} onChange={(e) => setBCutOff3(e)} style={[styles.textBox, FontStyles.textInput, FontStyles.slaboText]} placeholder="Set Battery CutOff level 3"/>
                </View>
                <View style={[styles.HineTextView,styles.buttonView]}>
                    <Text style={FontStyles.hintTextView}>Min = 31 &nbsp;</Text>
                    <Text style={FontStyles.hintTextView}>Max = 99 &nbsp;</Text>
                    <Text style={FontStyles.hintTextView}>Default = 99</Text>
                </View>
            </View>
            <View style={[styles.sendButtonView]}>
                <TouchableOpacity style={styles.buttons}>
                    <Text style={[FontStyles.buttonText, styles.subHeading]}>Send Data</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const defaultData = () => {
    return (
        <>
            <View>
                <Text>The Selected action is :</Text>
            </View>
            <View style={styles.defaultDataContainer}>

            </View>
        </>
    )
}


const Actoions = (props) => {
    if (props.screen === 'Write') {
        return (Write())
    } else if (props.screen === 'Config') {
        return (Config())
    } else {
        return (defaultData())
    }
}

const styles = StyleSheet.create({
    childView:{
        margin: '5%'
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttons: {
        borderWidth: 1,
        padding: '2%'
    },
    sendButtonView: {
        margin: '5%'
    },
    defaultDataContainer: {
        flex: 0.8,
        padding: '5%'
    },
    subHeading: {
        textAlign: 'center'
    },
    textBox: {
        borderWidth: 1,
        width: '50%',
        padding: '0.1%',
    },
    HineTextView:{
        paddingLeft:'25%',
        paddingRight:'25%'
    },
    textView:{
        padding:'1.5%'
    }
})

export default Actoions