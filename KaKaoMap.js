import React from "react";
import {View, Text, StyleSheet, Dimensions } from "react-native";
import PropTypes from "prop-types";
import MapView from "react-native-maps";

const API_KEY = "1e01caddfd42eef0c0788411547967f4";

export default function Viewmap({lati, long}){
    
    return <View style ={ styles.container }>
        <View style = {styles.mapStyle}>
            <MapView style = {styles.map} />
        </View>
        <View style = {styles.text}>
            <Text>{lati}</Text>
            <Text>{long}</Text>
        </View>
    </View>
};

Viewmap.propTypes = {
    lati:PropTypes.number.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        flex: 1
    },
    mapStyle: {
        flex: 3
    },
    map: {
        width: 1000,
        height: 500
    }
})