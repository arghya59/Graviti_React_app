import Form from "./Form"

//Google Maps Values
const API_KEY = "AIzaSyAolXVBph__8LXk-JukgnxDUI4LPDQAsxQ"
const center = {lat: 20.5937, lng: 78.9629}
const zoom = 6
const librariesAdded = 'places'

function Card1(){
return(
    <>
        <div id="card1" className="card">
                <div id="card1-prop">
                    {/* Form section */}
                    <Form 
                        mapAPI_KEY = {API_KEY}
                        mapLibraries = {librariesAdded}
                        zoom= {zoom}
                        center= {center}
                    />

                </div>
            </div>
    </>
)
}
export default Card1