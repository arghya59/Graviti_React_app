
function Results(props){
    return(
        <>
            <div id="result-section">
                        <div id="result-area">
                            <div id="result" className="shape">
                                <div>Distance</div>
                                <div id="result-parameter">{props.distance} kms</div>
                            </div>

                        {/* {ETA feature} */}
                            <div id="result2" className="shape">
                                <div id="est-time-txt">Estimated Time</div>
                                <div id="result-parameter2">{props.duration}
                                </div>
                            </div>

                            <div className="shape" id="Inside_auto_layout">
                                <div>The distance between <span id="originName">{props.origin}</span> and <span id="destName"> {props.destination} </span> via the seleted route is <span id="distValue2">{props.distance} kms</span></div>
                            </div>
                        </div>
                    </div>

        </>
    )
}
export default Results