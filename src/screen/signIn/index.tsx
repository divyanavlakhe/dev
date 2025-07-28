import { View, Text, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './style'
import CustomInput from '../../component/input'
import CustomButton from '../../component/button'
import axios from 'axios'
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const SignIn: React.FC<any> = ({ navigation }) => {
    const [mobile, setMobile] = useState<string>('');
    const [mobileError, setMobileError] = useState<string>('');

    const mobileRegex = /^[6-9]\d{9}$/;

    const handleMobileChange = (text: string) => {
        setMobile(text);
        if (!mobileRegex.test(text)) {
            setMobileError('Enter valid 10-digit mobile number');
        } else {
            setMobileError('');
        }
    };

    const handleSendOTP = async () => {
        if (mobileError || !mobile) {
            Alert.alert('Validation Error', 'Please enter valid details');
            return;
        }
        try {
            const response = await axios.post(
                'https://cab-booking-be-4hef.onrender.com/api/user/login',
                {
                    phoneNumber: mobile,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Response:', response.data);
            Alert.alert('Success', 'OTP sent successfully!');

        } catch (error: any) {
            if (error.response) {
                console.log('Error Response:', error.response.data);
                Alert.alert('Error', error.response.data.message || 'Registration failed');
            } else {
                console.log('Error:', error.message);
                Alert.alert('Error', 'Something went wrong');
            }
        }
    };

    const handleSignUp = () => {
        navigation.navigate('Home');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Sign in</Text>
            <Text style={styles.subtitle}>Sign in using your registered phone number</Text>

            <CustomInput
                label="Mobile Number"
                placeholder="Enter mobile number"
                value={mobile}
                onChangeText={handleMobileChange}
                keyboardType="phone-pad"
                maxLength={10}
            />
            {mobileError ? <Text style={{ color: 'red', fontSize: 12 }}>{mobileError}</Text> : null}

            <CustomButton title="Send OTP" onPress={handleSendOTP} />
            <View style={styles.loginView}>
                <Text style={styles.alreadyTxt}>Already have an account ?</Text>
                <Pressable onPress={handleSignUp}>
                    <Text style={[styles.alreadyTxt, { color: '#FF7A00', marginLeft: 2 }]}>Sign in</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}
export default SignIn