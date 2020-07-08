import React from "react";
import {View, Text, StyleSheet, Image, Alert } from "react-native";
import PropTypes from "prop-types";
import MapView, { Marker } from "react-native-maps";
import Marker_Image from "./marker.png";
import axios from "axios";

const API_KEY = "1234567890";

class Mark_BusStop extends React.Component{
    Data = {
        ComeBusData,
        BusRouteData
    };

    Marking_BusStop = async(lati, long, tit) => {
        return(<Viewmap.MapView.Marker
            coordinate = {{latitude: lati, longitude: long}}
            title = {tit}
        >
            <Image source={Marker_Image} style={{width: 30, height: 30}} />
        </Viewmap.MapView.Marker>
        );
    };

    getBusRoute = async(routeID) => {
        this.BusRouteData = await axios.get(`http://openapi.gbis.go.kr/ws/rest/busstationservice/route?serviceKey=${API_KEY}&routeId=${routeID}`);
    };
};

function getComeBus(props){  
    MB = new Mark_BusStop()
    MB.ComeBusData = axios.get(`http://openapi.gbis.go.kr/ws/rest/busstationservice/route?serviceKey=${API_KEY}&stationId=202000230`);
    for(var i = 0;; i++){
        if(MB.ComeBusData[i].stationSeq == (i + 1)){
            MB.getBusRoute(MB.ComeBusData[i].routeId)
            MB.Marking_BusStop(MB.BusRouteData.x, MB.BusRouteData.y, MB.BusRouteData.stationName)
        }
    };
};

export default function Viewmap({lati, long}){
    getComeBus()
    return <View style ={ styles.container }>
        <View style = {styles.mapStyle}>
            <MapView style = {styles.map}
                initialRegion = {{latitude: lati, longitude: long, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
                provider={'google'}
                showsUserLocation
                //followsUserLocation
            />
        </View>
        <View style = {styles.text}>
            <Text>{lati}</Text>
            <Text>{long}</Text>
        </View>
    </View>
};

Viewmap.propTypes = {
    lati:PropTypes.number.isRequired,
    long:PropTypes.number.isRequired
};

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