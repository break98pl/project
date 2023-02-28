import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Image, StyleSheet, Text } from "react-native";

const ItemNews = (props) =>{
    const {isReaded, data, onPressItem} = props || {};
    const {title, id} = data || {}
    return(
        <TouchableOpacity
            style={[styles.container, isReaded && styles.readed]}
            onPress={onPressItem(id)}
        >
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image:{
        width: 200,
        height: 200,
        backgroundColor: 'red'
    },
    container:{
        padding: 10,
        backgroundColor: 'tomato',
        borderRadius: 10,
        margin: 10
    },
    readed:{
        backgroundColor: 'blue'
    }
})

export default ItemNews;