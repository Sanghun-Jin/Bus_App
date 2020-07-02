import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import ViewMap from "./KaKaoMap";

export default class extends React.Component {
  state = {
    isLoading: true
  };
  location = {
    latitude: 0,
    longitude: 0
  }
  setlocation = async (latitude, longitude) => {
   this.latitude = latitude;
   this.longitude = longitude;
  }
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const{
        coords: {latitude, longitude}
      } = await Location.getCurrentPositionAsync();
      this.setlocation(latitude, longitude);
      this.setState({ isLoading: false });
    } catch (error) {
      Alert.alert("위치정보를 찾지 못했습니다.", "설정에서 위치권한을 허용해 주세요.");
    }
  };
  componentDidMount(){
    this.getLocation(); 
  };
  render(){
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : <ViewMap lati = {this.latitude} long = {this.longitude} />;
  };
}