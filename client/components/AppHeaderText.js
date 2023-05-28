import { StyleSheet, Text, View } from 'react-native';

export default function AppHeaderText(props) {
    return(
        <View>
            <Text style={styles.text}>{props.children}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        color: '#FFF',
        fontFamily: 'Roboto,sans-serif',
        fontSize: '56px',
        fontWeight: ' 600',
        lineHeight: '60px'
    }
})