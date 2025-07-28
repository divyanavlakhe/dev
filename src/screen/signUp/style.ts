import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginBottom: 40,
    marginTop : 10,
  },
  loginView :{
    flexDirection : 'row', 
    alignSelf :'center',
    marginTop :20,
  },
  alreadyTxt : {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
});

export default styles;
