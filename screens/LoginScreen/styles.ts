import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor: '#593EFF',  
    }, 
    scrollContainer: { 
        flexGrow: 1, 
        justifyContent: 'center', 
        padding: '3%',
    }, 
    border: { 
        backgroundColor: '#fff',  
        padding: '5%',  
        borderRadius: 10, 
        elevation: 5, 
        shadowColor: '#000', 
        shadowOpacity: 0.1, 
        shadowRadius: 4, 
    }, 
    title: { 
        textAlign: 'center', 
        marginBottom: '5%',
        fontSize: 24, 
        color: '#593EFF', 
    }, 
    errorText: { 
        color: 'red', 
        marginBottom: '5%',
    }, 
    input: { 
        marginBottom: '5%', 
        paddingHorizontal: '5%', 
        borderRadius: 10, 
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: '#ccc',
    }, 
    button: { 
        backgroundColor: '#593EFF', 
        paddingVertical: '3%',
        paddingHorizontal: '5%',
        borderRadius: 10, 
        alignItems: 'center', 
    }, 
    buttonText: { 
        color: '#fff', 
        fontWeight: 'bold', 
    }, 
    registerButton: { 
        marginTop: '5%',
        alignItems: 'center', 
    }, 
    showMoreText: { 
        color: '#593EFF', 
        textDecorationLine: 'underline', 
    }, 
});

export default styles;
