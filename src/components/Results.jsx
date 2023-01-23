
export default function Results(props) {
    return (
        <>
            <div id="result-section">
                <div id="result-area">
                    <div id="result" className="shape">
                        <div>Distance</div>
                        <div id="result-parameter">{props.distance} Kms</div>
                    </div>

                    {/* {ETA feature} */}
                    <div id="result2" className="shape">
                        <div id="est-time-txt">Estimated Time</div>
                        {props.duration.map((duration, index) => {
                            //console.log(duration.duration.text)
                            return <div key={index} id="result-parameter2">{`${(duration.start_address.split(",")[0])} to ${duration.end_address.split(",")[0]} : ${duration.duration.text}`}</div>
                        })}

                    </div>

                    <div className="shape" id="Inside_auto_layout">
                        <div>The distance between <span id="originName">{props.origin.split(",")[0]}</span> and <span id="destName"> {props.destination.split(",")[0]} </span> via the seleted route is <span id="distValue2">{props.distance} Kms</span></div>
                    </div>
                </div>
            </div>
        </>
    )
}