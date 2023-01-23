
// import { GoogleMap, useJsApiLoader, Autocomplete, DirectionsRenderer, useLoadScript, Marker } from '@react-google-maps/api'
import Results from "./Results"
import React, { useRef, useState, Spinner } from 'react'

import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import AddWayPoints from "./AddWayPoints";
import AddButton from "./AddButton";

//Google Maps Values
const zoom = 6
const librariesAdded = ['places']
const labels = ['Origin', "Stop", "Destination"]
const OptionsForTravel = ["DRIVING", "WALKING", "TRANSIT", "BICYCLING"]
const containerStyle = {
    width: '100%',
    height: '100%'
};

export default function Display() {
    //Logics
    const center = useMemo(() => ({ lat: 20.5937, lng: 78.9629 }), []);
    const originRef = useRef()
    const destinationRef = useRef()
    const travelMode = useRef()
    const wayPoint = useRef()
    //Origin, Destination states and hooks
    var [origin, setOrigin] = useState("")
    var [dest, setDest] = useState("")
    //Value states and hooks
    var [distance, setDistance] = useState(null)
    var [distanceShow, setDistanceShow] = useState(0)
    //Waypoint states and hooks
    const [waypointsArr, setTodos] = useState([]);
    const [temp, setTemp] = useState(0)
    const [durations, setDuration] = useState([])

    var addedWayPoints = [];


    //Load Map
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAolXVBph__8LXk-JukgnxDUI4LPDQAsxQ",
        libraries: librariesAdded
    });
    //console.log(isLoaded)

    if (!isLoaded) return <div>Erroor loading Map</div>

    var mapOptions = {
        zoom: 6,
        center: { lat: 20.5937, lng: 78.9629 }
    }

    const addWayPoint = () => {
        setTodos((t) => [...t, 'Waypoint']);
    };

    //Calculate values
    function calculateDistance() {

        setOrigin(originRef.current.value)
        setDest(destinationRef.current.value)
        setDistance(null)
        setDuration([])

        //eslint-disable-next-line no-undef
        var DirectionService = new google.maps.DirectionsService()
        //eslint-disable-next-line no-undef
        var directionsDisplay = new google.maps.DirectionsRenderer()
        //eslint-disable-next-line no-undef
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        directionsDisplay.setMap(map);

        if (originRef.current.value === "" || destinationRef.current.value === "") {
            return console.log("mistake")
        }
        else {
            //Waypoints....
            var WaypointsField = document.getElementById('Waypoints-field')
            var lengthOfWayPoints = WaypointsField.children.length

            if (wayPoint.current.value === "") {
                console.log("User didn't opt any waypoint")
                addedWayPoints = []
            } else {
                for (let i = 0; i < lengthOfWayPoints; i++) {
                    addedWayPoints.push({
                        location: WaypointsField.children[i].children[0].value,
                        stopover: true
                    })
                }
            }
            //Route Render
            DirectionService.route({
                origin: originRef.current.value,
                destination: destinationRef.current.value,
                waypoints: addedWayPoints,
                travelMode: travelMode.current.value
            }, function (response, status) {
                if (status === 'OK') {
                    //show direction
                    directionsDisplay.setDirections(response)
                    if (addedWayPoints.length == 0) {
                        setDistance(response.routes[0].legs[0].distance.value)
                        setDuration((D) => [...D, (response.routes[0].legs[0])])
                    }
                    else {
                        var durationArray = response.routes[0].legs
                        //var objToArr = Object.keys(arr)
                        //setDistance(null)

                        durationArray.map((value, index) => {
                            //console.log(index + " " + response.routes[0].legs[index].duration)
                            setDuration((D) => [...D, (response.routes[0].legs[index])])
                            setDistance((SD) => SD + response.routes[0].legs[index].distance.value)
                        })
                    }
                }
            })

        }
    }

    return (

        //Elements
        <>
            <div id="card1" className="card">
                <div id="card1-prop">
                    {/* Form section */}
                    <form action="">
                        <div id="inputs">
                            <div className="input-divs">
                                <label>{labels[0]}</label>
                                <div className="logo-for-inputs">
                                    {/* { Rather using font awesome logos, i prefere to do it like this} */}
                                    <span id="input-logo-origin"></span>
                                    <Autocomplete><input id="origin" className="user_Input" type="text" placeholder="Origin" ref={originRef} /></Autocomplete>
                                </div>

                            </div>

                            <div className="input-divs">
                                <label>{labels[1]}</label>
                                <div id="anotherWaypoint" className="logo-for-inputs">
                                    <span id="input-logo-stop"></span>
                                    <div id="Waypoints-field">
                                        <Autocomplete>
                                            {/* { <Waypoints id={id} />} */}
                                            <input type="text" className="user_Input" name="" id="waypoint" placeholder="Waypoint" ref={wayPoint} />
                                        </Autocomplete>

                                        <AddWayPoints waypoints={waypointsArr} />

                                    </div>
                                </div>

                                <AddButton addWayPoint={addWayPoint} />

                            </div>


                            <div id="destDiv" className="input-divs">
                                <label>{labels[2]}</label>
                                <div className="logo-for-inputs">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <Autocomplete>
                                        <input type="text" name="" id="dest" className="user_Input" placeholder="Destination" ref={destinationRef} />
                                    </Autocomplete>
                                </div>
                            </div>
                        </div>

                        <div id="btn-div">
                            {/* {extra mode feature } */}
                            <span id="modes-area">
                                <label className="modes-area" forhtml="mode">Choose a Mode:</label>

                                <select className="modes-area" name="" id="modes" ref={travelMode}>
                                    <option value="DRIVING">{OptionsForTravel[0]}</option>
                                    <option value="WALKING">{OptionsForTravel[1]}</option>
                                    <option value="TRANSIT">{OptionsForTravel[2]}</option>
                                    <option value="BICYCLING">{OptionsForTravel[3]}</option>

                                </select>
                            </span>

                            <span onClick={calculateDistance} id="btn">Calculate</span>
                        </div>

                    </form>
                    {/* Result Section  */}

                    <Results
                        distance={Math.floor(distance / 1000)}
                        duration={durations}
                        origin={origin}
                        destination={dest}
                    />
                </div>
            </div>

            <div id="map" className="card">
                <GoogleMap zoom={zoom} center={center} mapContainerStyle={containerStyle}>
                </GoogleMap>
            </div>

        </>
    )
}
