import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import FontStyles from '../utils/fontsHelper'
import { RadioButton } from "react-native-paper";

const Write = () => {
    const [Power, setPower] = useState('Off');
    const [IndicatorLeft, setIndicatorLeft] = useState('Off');
    const [IndicatorRight, setIndicatorRight] = useState('Off');
    const [Headlamp, setHeadlamp] = useState('Off');
    const [Buzzer, setBuzzer] = useState('Off');

    return(
        <View>
            <Text style={[FontStyles.subHeading,styles.subHeading]}>Start Testing the hoverBoard</Text>
            <View style={styles.childView}>
                <View style={styles.buttonView}>
                    <View>
                        <Text style={[FontStyles.paragraphRadio, FontStyles.paragraph1]}>Power : </Text>
                    </View>
                    <View style={styles.buttonView}>
                        <RadioButton value="On" status={Power === 'On' ? 'checked' : 'unchecked'} onPress={() => setPower('On')} />
                        <Text style={[FontStyles.RadioText, FontStyles.slaboText,, styles.textView]}>On</Text>
                        <RadioButton value="Off" status={Power === 'Off' ? 'checked' : 'unchecked'} onPress={() => setPower('Off')} />
                        <Text style={[FontStyles.RadioText, FontStyles.slaboText,, styles.textView]}>Off</Text> 
                    </View>
                </View>
            </View>
            <View style={styles.childView}>
                <View style={styles.buttonView}>
                    <View>
                        <Text style={[FontStyles.paragraphRadio, FontStyles.paragraph1]}>Indicator(L) Status : </Text>
                    </View>
                    <View style={styles.buttonView}>
                        <RadioButton value="On" status={IndicatorLeft === 'On' ? 'checked' : 'unchecked'} onPress={() => setIndicatorLeft('On')} />
                        <Text style={[FontStyles.RadioText, FontStyles.slaboText,, styles.textView]}>On</Text>
                        <RadioButton value="Off" status={IndicatorLeft === 'Off' ? 'checked' : 'unchecked'} onPress={() => setIndicatorLeft('Off')} />
                        <Text style={[FontStyles.RadioText, FontStyles.slaboText,, styles.textView]}>Off</Text> 
                    </View>
                </View>
            </View>
            <View style={styles.childView}>
                <View style={styles.buttonView}>
                    <View>
                        <Text style={[FontStyles.paragraphRadio, FontStyles.paragraph1]}>Indicator(R) Status : </Text>
                    </View>
                    <View style={styles.buttonView}>
                        <RadioButton value="On" status={IndicatorRight === 'On' ? 'checked' : 'unchecked'} onPress={() => setIndicatorRight('On')} />
                        <Text style={[FontStyles.RadioText, FontStyles.slaboText,, styles.textView]}>On</Text>
                        <RadioButton value="Off" status={IndicatorRight === 'Off' ? 'checked' : 'unchecked'} onPress={() => setIndicatorRight('Off')} />
                        <Text style={[FontStyles.RadioText, FontStyles.slaboText,, styles.textView]}>Off</Text> 
                    </View>
                </View>
            </View>
            <View style={styles.childView}>
                <View style={styles.buttonView}>
                    <View>
                        <Text style={[FontStyles.paragraphRadio, FontStyles.paragraph1]}>Headlamp status : </Text>
                    </View>
                    <View style={styles.buttonView}>
                        <RadioButton value="On" status={Headlamp === 'On' ? 'checked' : 'unchecked'} onPress={() => setHeadlamp('On')} />
                        <Text style={[FontStyles.RadioText, FontStyles.slaboText,, styles.textView]}>On</Text>
                        <RadioButton value="Off" status={Headlamp === 'Off' ? 'checked' : 'unchecked'} onPress={() => setHeadlamp('Off')} />
                        <Text style={[FontStyles.RadioText, FontStyles.slaboText,, styles.textView]}>Off</Text> 
                    </View>
                </View>
            </View>
            <View style={styles.childView}>
                <View style={styles.buttonView}>
                    <View>
                        <Text style={[FontStyles.paragraphRadio, FontStyles.paragraph1]}>Buzzer : </Text>
                    </View>
                    <View style={styles.buttonView}>
                        <RadioButton value="On" status={Buzzer === 'On' ? 'checked' : 'unchecked'} onPress={() => setBuzzer('On')} />
                        <Text style={[FontStyles.RadioText, FontStyles.slaboText,, styles.textView]}>On</Text>
                        <RadioButton value="Off" status={Buzzer === 'Off' ? 'checked' : 'unchecked'} onPress={() => setBuzzer('Off')} />
                        <Text style={[FontStyles.RadioText, FontStyles.slaboText,, styles.textView]}>Off</Text> 
                    </View>
                </View>
            </View>
        </View>
    )
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

export default Write;