import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput, Switch, Button } from 'react-native';
import { login } from '../services/api'
const Login = ({ setFakeState }) => {
    const [loginLoader, setLoginLoaded] = useState(false)
    const [username, setUsername] = useState('Username');
    const [password, setPassword] = useState('Password');
    const [translates] = useState({});
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const evalResponse = (response) => {
        if (response.code === 400) {
            return null
        } else {
            setFakeState(2)
        }
        setLoginLoaded(false)
    }
    const handleClick = async () => {
        try {
            setLoginLoaded(true)
            const response = await login({ username, password })
            evalResponse(response)
        } catch (err) {
            console.log("err", err)
        }
    }
    return (
        <View style={styles.formBox}>
            <TextInput
                style={styles.input}
                onChangeText={text => setUsername(text)}
                name="username"
                id="username"
                placeholder={"username"}
            />
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                onChangeText={text => setPassword(text)}
                name="password"
                id="password"
                placeholder={"password"}
            />
            <View style={styles.termsAndConditions}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    style={styles.switch}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Text style={styles.textTermsAndConditions} onPress={toggleSwitch}>Remeber me</Text>
            </View>

            {loginLoader ?
                <ActivityIndicator size="large" />
                :
                <Button
                    stlye={styles.button}
                    title={translates["login-title"] ? translates["login-title"] : "login-translate"}
                    onPress={handleClick}
                />
            }
            <Text>Or loggin with</Text>
            <Button
                stlye={styles.button}
                title={"Facebook"}
                onPress={handleClick}
            />
            <Button
                stlye={styles.button}
                title={"Google"}
                onPress={handleClick}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    formBox: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        margin: 'auto',
        padding: 20,
        width: '80%',
        height: '50%',
        backgroundColor: '#fff',
        borderRadius: 8
    },
    input: {
        borderRadius: 4,
        height: 40,
        width: '98%',
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        paddingLeft: 10,
        display: 'flex'
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
        fontWeight: "400"
    },
    button: {
        marginVertical: 50
    }
});
export default Login;
