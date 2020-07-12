import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import Marker_Image from './marker.png';
import axios from 'axios';
import { render } from 'react-dom';

const API_KEY =
	'mBfTDcuyQo%2BUjXTESvcKm6%2FKtP3CoECKspX7%2Boc9A%2FB7U1qqsA6I%2BbpWhjnbu%2FSdMXczS7wGh4x5MJPG%2FioBDA%3D%3D';

class BusData extends Component {
	/*Marking_BusStop = async (lati, long, tit) => {
		return (
			<Viewmap.MapView.Marker
				coordinate={{ latitude: lati, longitude: long }}
				title={tit}
			>
				<Image source={Marker_Image} style={{ width: 30, height: 30 }} />
			</Viewmap.MapView.Marker>
		);
	};

	getBusRoute = (routeID) => {
		const { BusRouteData } = axios.get(
			`http://openapi.gbis.go.kr/ws/rest/busrouteservice/station?serviceKey=${API_KEY}&routeId=${routeID}`,
		);
	};*/
	constructor(props) {
		super(props);
		this.state = { children: [] };
	}

	test = () => {
		axios
			.get(`https://www.reddit.com/.json?sort=new&limit=10`)
			.then((response) => {
				this.setState({ children: response.data.data.children });
			});
		console.log(this.state.children);
	};
	/*
	getComeBus = () => {		
		axios
			.get(
				`http://openapi.gbis.go.kr/ws/rest/busstationservice/route?serviceKey=${API_KEY}&stationId=202000230`,
			)
			.then((response) => {
				this.setState({ data: response.msgBody.busRouteStationList });
			});
		console.log(this.state.data);
		for(var i = 0;; i++){
            if(ComeBusData[i].stationSeq == (i + 1)){
                getBusRoute(ComeBusData[i].routeId)
                Marking_BusStop(BusRouteData.x, BusRouteData.y, BusRouteData.stationName)
            }
        };
	};*/
}

export default function Viewmap({ lati, long }) {
	const bus = new BusData();
	bus.test();
	return (
		<View style={styles.container}>
			<View style={styles.mapStyle}>
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: lati,
						longitude: long,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
					provider={'google'}
					showsUserLocation
					//followsUserLocation
				/>
			</View>
			<View style={styles.text}>
				<Text>{lati}</Text>
				<Text>{long}</Text>
			</View>
		</View>
	);
}

Viewmap.propTypes = {
	lati: PropTypes.number.isRequired,
	long: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		flex: 1,
	},
	mapStyle: {
		marginTop: 50,
		flex: 3,
	},
	map: {
		width: 300,
		height: 400,
	},
});
