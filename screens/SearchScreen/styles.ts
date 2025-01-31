// styles.ts
import { StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  searchContainer: {
    marginTop: StatusBar.currentHeight,
    flexDirection: 'row',
    padding: '1.6%',
    alignItems: "center",
    backgroundColor: 'rgba(89, 62, 255, 0.5)',
    borderRadius: 10,
  },
  textInput: {
    width: "90%",
    justifyContent: 'space-between',
    height: "100%",
    marginLeft: '1.6%',
    marginRight: '1.6%',
    padding: '1%',
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
  },
  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(89, 62, 255, 0.5)',
    padding: '2%',
    borderRadius: 10,
    width: '90%',
    marginBottom: '2%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1.6%',
  },
  radioButtonLabel: {
    color: 'white',
  },
  movieItem: {
    width: '46%',
    margin: '2%',
    backgroundColor: '#fafafa',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  poster: {
    width: '100%',
    height: 200,
    resizeMode: "stretch"
  },
  titleContainer: {
    padding: '1%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: 'white',
  },
});

export default styles;
