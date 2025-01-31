import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  addButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#593EFF',
  },
  actorsContainer: {
    width: '100%',
    marginTop: 20,
    padding: 15,
  },
  actorsTitle: {
    color: '#fafafa',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 40,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  iconButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#2496ff',
  },
  detailsContainer: {
    marginTop: 200,
  },
  detailsBackground: {
    width: '100%',
    height: '100%',
  },
  detailsContent: {
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  additionalDetailsText: {
    fontSize: 16,
    color: 'white',
    margin: 5,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  showMoreText: {
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'underline',
  },
  playerContainer: {
    marginTop: 20,
  },
});

export default styles;
