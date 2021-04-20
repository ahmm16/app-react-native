import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, Button, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { register } from '../services/api'

const Register = () => {
    const [formData, setFormData] = useState({});
    const [registerLoader, setRegisterLoaded] = useState(false)
    const [registerResponse, setRegisterResponse] = useState(null)

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const evalResponse = (response) => {
        if (response.code === 400) {
            setRegisterResponse(response.message)
        } else {
            setRegisterResponse("Usuario creado correctamente")
        }
        setRegisterLoaded(false)
    }
    const handleClick = async (formData) => {
        try {
            setRegisterLoaded(true)
            const response = await register({ ...formData })
            evalResponse(response)
        } catch (err) {
            console.log("err", err)
        }
    }
    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value })
    }

    return (
        <View style={styles.formBox}>
            <TextInput
                style={styles.input}
                onChangeText={(e) => handleChange('username', e)}
                name="username"
                id="username"
                placeholder={"username"}
            />
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(e) => handleChange('password', e)}
                name="password"
                id="password"
                placeholder={"password"}
            />
            <DateTimePicker
                testID="dateTimePicker"
                mode={'date'}
                value={formData?.dob ? formData.dob : new Date()}
                display="calendar"
                onChange={(e, selectedDate) => handleChange('dob', selectedDate)}
            />
            <Picker
                selectedValue={formData?.country}
                onValueChange={(e) => handleChange('country', e)}>
                <Picker.Item label="Spain" value="Spain" />
                <Picker.Item label="Venezuela" value="Venezuela" />
            </Picker>
            <View style={styles.termsAndConditions}>
                <Switch
                    ios_backgroundColor="#3e3e3e"
                    style={styles.switch}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Text style={styles.textTermsAndConditions} onPress={toggleSwitch}>Aceptar términos y condiciones.</Text>
            </View>
            {registerLoader ?
                <ActivityIndicator size="large" />
                :
                <Button
                    stlye={styles.button}
                    title={"Register"}
                    onPress={() => handleClick(formData)}
                />
            }
            {registerResponse !== null &&
                <Text>{registerResponse}</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    formBox: {
        position: 'absolute',
        left: "10%",
        justifyContent: 'center',
        padding: 20,
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8
    },
    input: {
        borderRadius: 4,
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        paddingLeft: 10,
    },
    termsAndConditions: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginVertical: 5,
    },
    switch: {
    },
    textTermsAndConditions: {
        marginLeft: 10,
        marginTop: 5,
        fontWeight: "400"
    },
    button: {
        marginVertical: 50
    }
});
export default Register;
