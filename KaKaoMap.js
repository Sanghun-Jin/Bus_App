import React from "react";
import {View, Text, StyleSheet, Dimensions } from "react-native";
import PropTypes from "prop-types";
import MapView, { Marker } from "react-native-maps";

const API_KEY = "1e01caddfd42eef0c0788411547967f4";

export default function Viewmap({lati, long}){
    
    return <View style ={ styles.container }>
        <View style = {styles.mapStyle}>
            <MapView style = {styles.map}
                initialRegion = {{latitude: lati, longitude: long, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
                showsUserLocation
                followsUserLocation
            >
                <Marker
                    coordinate={{
                        latitude: lati,
                        longitude: long
                    }}
                    //image={require('assets/Map_Marker.png')}
                    title="미디어코어"
                    description="회사"
                />
            </MapView>
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
        marginTop: 50,
        flex: 3
    },
    map: {
        width: 300,
        height: 400
    }
})