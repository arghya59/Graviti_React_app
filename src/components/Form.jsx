import { Autocomplete } from "@react-google-maps/api"
import React, { useRef, useState } from 'react'
import Results from "./Results"

const labels = ['Origin', "Stop", "Destination"]
const OptionsForTravel = ["DRIVING", "WALKING", "TRANSIT", "BICYCLING"]

//Set Map

//eslint-disable-next-line no-undef
var DirectionService = new google.maps.DirectionsService()
//eslint-disable-next-line no-undef
var directionsDisplay = new google.maps.DirectionsRenderer()
var mapOptions = {
    zoom: 7,
    center: { lat: 20.5937, lng: 78.9629 }
}
//eslint-disable-next-line no-undef
var map = new google.maps.Map(document.getElementById('map'), mapOptions);
directionsDisplay.setMap(map);


function Form(props) {
    // const [count, setCount] = useState(0)
    // setCount(count+1)
    let updateCount = () => {

    }

    // Map Directions and durations
    //const [directionResponse, setDirectionResponse] = useState(null)
    var [duration, setDuration] = useState('')
    var [distance, setDistance] = useState(0)
    var [distanceShow, setDistanceShow] = useState(0)
    var [origin, setOrigin] = useState("")
    var [dest, setDest] = useState("")

    const originRef = useRef()
    const destinationRef = useRef()
    const travelMode = useRef()



    //Calculate Distance function...
    // if (isLoaded == true) {
    var calculateDistance = () => {

        //way points
        var waypoints1 = [];
        var waypointArray = []
        try {
            if (originRef.current.value === "" || destinationRef.current.value === "") {
                return console.log("mistake")
            }
            else {
                var WaypointsField = document.getElementById('Waypoints-field')
                var lengthOfWayPoints = WaypointsField.children.length
                //console.log(WaypointsField.children[0].children[0].value)

                var checkwaypoint = document.getElementById('waypoint').value
                //console.log(checkwaypoint)
                if (checkwaypoint === "") {
                    // window.alert("No Stops found! Do you want to proceed?")
                    console.log("User didn't opt any waypoint")

                } else {

                    for (let i = 0; i < lengthOfWayPoints; i++) {
                        waypoints1.push({
                            location: WaypointsField.children[0].children[i].value,
                            stopover: true
                        })

                        console.log(waypoints1[0])
                        //waypointArray.push(WaypointsField.children[i].value)
                    }
                }

                DirectionService.route({
                    origin: originRef.current.value,
                    destination: destinationRef.current.value,
                    waypoints: waypoints1,
                    travelMode: travelMode.current.value
                }, function (response, status) {
                    if (status === 'OK') {
                        console.log(response)
                        directionsDisplay.setDirections(response)
                        setOrigin(originRef.current.value)
                        setDest(destinationRef.current.value)
                        if (waypoints1.length == 0) {
                            setDistance(response.routes[0].legs[0].distance.text)
                            setDuration(response.routes[0].legs[0].duration.text)
                        }
                        // else {
                        //     for (var i = 0; i <= waypoints1.length; i++) {
                        //         setDistance(distance + response.routes[0].legs[i].distance.value)
                        //     }
                        //     //console.log(dist)
                        //     var dis = Math.floor(distance / 1000)
                        //     setDistanceShow(dis)
                        //     setDistance(null)
                        //     setDistanceShow(null)
                        // }

                    }

                })

            }
        } catch (e) {
            console.log(e)
        }

    }


    return (
        <>
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
                                    <input type="text" className="user_Input" name="" id="waypoint" placeholder="Waypoint" />
                                </Autocomplete>

                            </div>
                        </div>
                        <div onClick={updateCount} id="add-another"><span><i
                            className="fa-sharp fa-solid fa-circle-plus"></i></span> Add Another Stop</div>
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
                distance={distanceShow}
                duration={duration}
                origin={origin}
                destination={dest}
            />
        </>
    )

}
export default Form

