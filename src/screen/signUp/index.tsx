import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, Text, View } from 'react-native';
import styles from './style';
import CustomInput from '../../component/input';
import CustomButton from '../../component/button';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const SignUp: React.FC<any> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [mobileError, setMobileError] = useState<string>('');

  const nameRegex = /^[A-Za-z\s]{3,}$/;
  const mobileRegex = /^[6-9]\d{9}$/;

  const handleNameChange = (text: string) => {
    setName(text);
    if (!nameRegex.test(text)) {
      setNameError('Name must be at least 3 letters and only alphabets allowed');
    } else {
      setNameError('');
    }
  };

  const handleMobileChange = (text: string) => {
    setMobile(text);
    if (!mobileRegex.test(text)) {
      setMobileError('Enter valid 10-digit mobile number');
    } else {
      setMobileError('');
    }
  };

  const handleSendOTP = async () => {
    if (nameError || mobileError || !name || !mobile) {
      Alert.alert('Validation Error', 'Please enter valid details');
      return;
    }
    try {
      const response = await axios.post(
        'https://cab-booking-be-4hef.onrender.com/api/user/register',
        {
          fullName: name,
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
      navigation.navigate('OtpVerify', { phoneNumber: mobile });

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

  const handleSignin = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Register Here!</Text>

      <CustomInput
        label="Enter Name"
        placeholder="Enter name here"
        value={name}
        onChangeText={handleNameChange}
      />
      {nameError ? <Text style={{ color: 'red', fontSize: 12 }}>{nameError}</Text> : null}

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
        <Pressable onPress={handleSignin}>
          <Text style={[styles.alreadyTxt, { color: '#FF7A00', marginLeft: 2 }]}>Sign up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
