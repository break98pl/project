import React from "react";
import { View } from "react-native";
import { Image, StyleSheet, Text } from "react-native";

const Header = React.memo(({title, image}) =>{
    console.log({image});
    return(
        <View>
            <Text>{title}</Text>
            <Image
                source={{uri: image}}
                styles={styles.image}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    image:{
        width: 200,
        height: 200,
        backgroundColor: 'red',
        resizeMode: 'contain'
    }
})

export default Header;