/* eslint-disable */

import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import firebase from '../firebase.js';
import {connect, useDispatch} from 'react-redux'
import {map_click, map_unclick} from '../actions';
import { getDistance } from 'geolib';

const gothenburgLocation = {
  lat: 57.70513272424163,
  lng: 11.96774205423531
};

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      newLocations: [],
      showingInfoWindow: false,
      activeMarker: {},
      tempMarker: false,
      activeFilter: 120,
      animation: null,
      userInfo: ["Empty"],
      userLocation: {
        lat: null,
        lng: null
      },
      initialMapCenter: {
        lat: 57.70513272424163,
        lng: 11.96774205423531
      }
    };

    this.map = React.createRef();
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.getPosition = this.getPosition.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
    this.loadMap(this.state.activeFilter);

}
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getPosition);
    }
    this.loadMap(this.state.activeFilter);
  }

  componentDidUpdate(prevProps) {
    if (this.state.mapClicked !== prevProps.mapClicked) {
      this.map.current.map.panTo({ lat: this.state.userLocation.lat, lng: this.state.userLocation.lng });
      this.props.mapUnclick();
    }
  }

 
 getPosition = (position) => {
  this.setState(prevState => {
    let userLocation = Object.assign({}, prevState.userLocation); 
    userLocation.lng = position.coords.longitude;   
    userLocation.lat = position.coords.latitude;                                  
    return { userLocation };                                
  });

  if (getDistance(
    { latitude: position.coords.latitude, longitude: position.coords.longitude },
    { latitude: gothenburgLocation.lat, longitude: gothenburgLocation.lng }) > 80000 )
    {
    }
    else {
      this.setState(prevState => {
        let initialMapCenter = Object.assign({}, prevState.initialMapCenter); 
        initialMapCenter.lng = position.coords.longitude - 0.015;   
        initialMapCenter.lat = position.coords.latitude;                                  
        return { initialMapCenter };                                
      });
    }
}

  loadMap = (filterValue) => {

    const itemsRef = firebase.database().ref('markers');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];

      var dateFilter = new Date();
      dateFilter.setMinutes(dateFilter.getMinutes() - filterValue)
      
      for (let item in items) {
        var itemDate = new Date(items[item].date);
        if (itemDate.getTime() > dateFilter.getTime())
        {
          newState.push({
            lat: items[item].lat,
            lng: items[item].lng,
            stop_or_bus: items[item].stopOrBus,
            amount: items[item].amount,
            description: items[item].description,
            date: items[item].date
          });
        }
      }
      this.setState({
        locations: newState
      });
    });
  }

  handleMarkerClick = (props, marker, ev) => { 
    this.setState(
    { activeMarker: marker,                                 
      showingInfoWindow: true
    });

  if (this.state.tempMarker) {
    var array = [...this.state.newLocations];
    array.splice(array.length - 1, 1);
    this.setState({ newLocations: array,
        tempMarker: false });
  }    
};

  render() {

    return (
        <Map
          ref={this.map}
          google={this.props.google}
          className={"map"}
          zoom={13}
          minZoom={10}
          maxZoom={18}
          initialCenter={this.state.initialMapCenter}
          disableDefaultUI={true}
        >
        
          {this.state.locations.map((location, i) => {
            return (
              <Marker
                animation={this.state.animation}
                key={i}
                onClick={this.handleMarkerClick}
                description={location.description}
                amount={location.amount}
                stop_or_bus={location.stop_or_bus}
                date={location.date.substring(0, 10)}
                time={location.date.substring(10, 16)}
                position={{ lat: location.lat, lng: location.lng }}
              />
              
            );
          })}

        <Marker
          animation={1}
          clickable={false}
          icon="https://www.robotwoods.com/dev/misc/bluecircle.png"
          position={this.state.userLocation}
        /> 
        <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <p className="px-1 py-1 text-center font-bold underline text-xl">{this.state.activeMarker.time}</p>
          </InfoWindow>
        </Map>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mapClicked: state.mapClicked
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    mapClick: () => dispatch(map_click()),
    mapUnclick: () => dispatch({ type: 'MAP_UNCLICK' }),
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(
  GoogleApiWrapper({
      apiKey: process.env.REACT_APP_GOOGLEKEY
  })(MapContainer)
)