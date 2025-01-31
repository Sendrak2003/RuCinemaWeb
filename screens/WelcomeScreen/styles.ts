import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "80%",
    paddingBottom: 40,
  },
  titleBox: {
    backgroundColor: "#593EFF",
    padding: 20,
    borderRadius: 35,
  },
  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 10,
  },
  movieCinemaTitle: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#593EFF",
    padding: 16,
    borderRadius: 35, 
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default styles;
