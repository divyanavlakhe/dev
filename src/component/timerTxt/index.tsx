import React from 'react';
import { Text } from 'react-native';

interface Props {
    timer: number;
}

const TimerText: React.FC<Props> = ({ timer }) => {
    return (
        <Text style={{
            marginTop: 5,
            color: '#555'
        }}>
            Resend code in {`00:${timer < 10 ? `0${timer}` : timer}`}
        </Text>
    );
};

export default TimerText;
