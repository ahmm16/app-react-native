import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, Button, ActivityIndicator } from 'react-native';
import { findAllUsers } from '../services/api'

const Profile = () => {
    const [formData, setFormData] = useState({});
    const [users, setUsers] = useState({})
    const [profileLoader, setProfileLoader] = useState(false)

    const evalResponse = (response) => {
        setProfileLoader(false)
        setUsers(response.data)
    }
    const handleClick = async () => {
        try {
            setProfileLoader(true)
            const response = await findAllUsers()
            evalResponse(response)
        } catch (err) {
            console.log("err", err)
        }
    }
    useEffect(() => {
        findAllUsers().then(response =>
            evalResponse(response))
    }, [])
    return (
        <View style={styles.formBox}>
            <FlatList
                data={users}
                renderItem={({ item, index }) => (
                    <TouchableHighlight
                        key={index}>
                        <View style={{ padding: 5 }}>
                            <Text>{`${item._id} - ${item.username} ${item.country ? '- ' + item.country : ''}`}</Text>
                        </View>
                    </TouchableHighlight>
                )}
            />
            {profileLoader ?
                <ActivityIndicator size="large" />
                :
                <Button
                    stlye={styles.button}
                    title={"Get Users"}
                    onPress={handleClick}
                />
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
    button: {
        marginVertical: 50
    }
});
export default Profile;
