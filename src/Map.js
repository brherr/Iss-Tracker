import React from 'react';
import GoogleMapReact from 'google-map-react';

const ISS_URL = 'http://api.open-notify.org/iss-now.json';
// const MAP_KEY = process.env.REACT_APP_MAP_KEY;
const img = <img src = "./iss.svg" alt = "iss" height = "30px"/>
const SpaceStation = ({ img }) => <div>{img}</div>


class Map extends React.Component{
    state = {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 1
    }

    componentDidMount(){
        this.getCoordinates()
        this.interval = setInterval(this.getCoordinates, 3000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    getCoordinates = () => {
        fetch(ISS_URL)
            .then(res => res.json())
            .then(data => this.setState({
                center: {
                    lat: data.iss_position.latitude,
                    lng: data.iss_position.longitude
                }
            }))
    }

    render() {
        console.log("LAT:", this.state.center.lat)
        console.log("LNG:", this.state.center.lng)
        return(
            <div>
                <p>Latitude: {this.state.center.lat}</p>
                <p>Longitude: {this.state.center.lng}</p>
                <div className = "Map" style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact className = "Map"
                        bootstrapURLKeys={{key: 'AIzaSyAB6s5GAfN0KI8ksOYnovN1tOEQQyVXcOI'}}
                        center={this.state.center}
                        zoom={this.state.zoom}
                    >
                    <SpaceStation

                        lat = {this.state.center.lat}
                        lng = {this.state.center.lng}
                        img = {img}
                    />
                    </GoogleMapReact>
                </div>
            </div>
        )
        
    }
}

export default Map