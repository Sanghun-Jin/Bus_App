import React from "react";
import {View, Text, StyleSheet, Image, Alert } from "react-native";
import PropTypes from "prop-types";
import MapView, { Marker } from "react-native-maps";
import Marker_Image from "./marker.png";
import axios from "axios";

const API_KEY = "1234567890";

getData = async(Keyword) => {
    const Find_Keyword = Keyword;
    const { data } = await axios.get(`http://openapi.gbis.go.kr/ws/rest/busstationservice?serviceKey=${API_KEY}&keyword=${Find_Keyword}`);
    console.log(data);
}
export default function Viewmap({lati, long}){
    try {
        this.getData("수원전통문화관");
    } catch (error) {
        Alert.alert("에러");
    }    
    return <View style ={ styles.container }>
        <View style = {styles.mapStyle}>
            <MapView style = {styles.map}
                initialRegion = {{latitude: lati, longitude: long, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
                showsUserLocation
                followsUserLocation
            >
                <Marker
                    coordinate={{
                        latitude: 37.26025,
                        longitude: 127.0314833
                    }}
                    title="미디어코어"
                    description="회사"
                    >
                    <Image
                        source={Marker_Image}
                        style={{width: 26, height: 28}}
                        resizeMode="contain"
                    />
                </Marker>
                <Marker
                    coordinate={{
                        latitude: 37.2865833,
                        longitude: 127.0151
                    }}
                    title="미디어코어"
                    description="회사"
                    >
                    <Image
                        source={Marker_Image}
                        style={{width: 26, height: 28}}
                        resizeMode="contain"
                    />
                </Marker>
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