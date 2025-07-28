import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import CustomInput from '../../component/input'
import CustomButton from '../../component/button'
import TimerText from '../../component/timerTxt';
import style from './style';

const OtpVerify: React.FC<any> = ({ route, navigation }) => {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(59);

    const { phoneNumber } = route.params;

    useEffect(() => {
        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleVerify = async () => {
        if (!otp) {
            Alert.alert('Error', 'Please enter OTP');
            return;
        }

        try {
            const response = await axios.post(
                'https://cab-booking-be-4hef.onrender.com/api/user/verify-otp',
                {
                    phoneNumber: phoneNumber,
                    otp: otp
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('OTP Verified:', response.data);
            Alert.alert('Success', 'OTP Verified Successfully');
            navigation.navigate('Home');

        } catch (error: any) {
            console.log('OTP Verification Failed:', error.response?.data || error.message);
            Alert.alert('Error', error.response?.data?.message || 'OTP Verification Failed');
        }
    };

    return (
        <SafeAreaView style={style.container}>
            <View style={style.card}>
                <Text style={style.title}>Verify Phone Number</Text>
                <Text style={style.subText}>
                    Code sent to <Text style={style.bold}>{phoneNumber}</Text>. Please enter the code below
                </Text>

                <CustomInput
                    placeholder="Enter OTP"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="numeric"
                />

                <CustomButton title="Verify" onPress={handleVerify} />

                <View style={style.resendContainer}>
                    <Text style={style.normalText}>Didn't receive code? </Text>
                    <TouchableOpacity onPress={() => setTimer(59)} disabled={timer > 0}>
                        <Text style={style.resend}>Resend code</Text>
                    </TouchableOpacity>
                </View>

                <TimerText timer={timer} />
            </View>
        </SafeAreaView>
    )
}
export default OtpVerify;