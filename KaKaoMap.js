import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import Marker_Image from './marker.png';
import axios from 'axios';

var DOMParser = require('xmldom').DOMParser;

const API_KEY = '1234567890';
const ALLBus = [];

class BusData extends Component {
	Marking_BusStop = (lati, long, tit) => {};

	getbusroute = (busname, busroute) => {
		axios
			.get(
				`http://openapi.gbis.go.kr/ws/rest/busrouteservice/station?serviceKey=${API_KEY}&routeId=${busroute}`,
			)
			.then((response) => {
				const { data } = response;
				let XmlDoc = new DOMParser().parseFromString(data, 'text/xml');
				let x = XmlDoc.getElementsByTagName('x');
				let y = XmlDoc.getElementsByTagName('y');
				let stationName = XmlDoc.getElementsByTagName('stationName');
				let BusStationName = [];
				let BusX = [];
				let BusY = [];
				let BusALLData = [];
				for (let i = 0; i < x.length; i++) {
					BusStationName.push(stationName[i].firstChild.data);
					BusX.push(x[i].firstChild.data);
					BusY.push(y[i].firstChild.data);
				}
				BusALLData.push(BusStationName);
				BusALLData.push(BusX);
				BusALLData.push(BusY);
				ALLBus.push(BusALLData);
				//console.log(ALLBus);
			});
	};

	getcomebus = () => {
		axios
			.get(
				`http://openapi.gbis.go.kr/ws/rest/busstationservice/route?serviceKey=${API_KEY}&stationId=202000230`,
			)
			.then((response) => {
				const { data } = response;
				let XmlDoc = new DOMParser().parseFromString(data, 'text/xml');
				let routeid = XmlDoc.getElementsByTagName('routeId');
				let routeName = XmlDoc.getElementsByTagName('routeName');
				for (let i = 0; i < routeid.length; i++) {
					this.getbusroute(
						routeName[i].firstChild.data,
						routeid[i].firstChild.data,
					);
				}
			});
	};
}

export default function Viewmap({ lati, long }) {
	const Bus = new BusData();
	Bus.getcomebus();
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
				>
					<Marker
						coordinate={{
							latitude: 37.28675,
							longitude: 127.0153667,
						}}
						title="this is a marker"
						description="this is a marker example"
					>
						<Image source={Marker_Image} style={{ width: 30, height: 30 }} />
					</Marker>
				</MapView>
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
