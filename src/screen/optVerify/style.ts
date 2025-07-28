import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7941d', justifyContent: 'flex-end' },
    card: {
        flex : 0.7,
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 3
    },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    subText: {fontSize: 16, textAlign: 'center', color: '#555', marginBottom: 20 },
    bold: { fontWeight: 'bold' },
    resendContainer: { flexDirection: 'row', marginTop: 15 },
    normalText: { color: '#555' },
    resend: { color: '#f7941d', fontWeight: 'bold' }
});
