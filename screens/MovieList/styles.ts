import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#593EFF',
  },
  movieItem: {
    width: '46%',
    margin: '2%',
    backgroundColor: 'white',
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
    resizeMode: "cover",
  },
  titleContainer: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    color: "#999",
  },
  paginationContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#593EFF',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  pageButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  pageButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  currentPage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default styles;
