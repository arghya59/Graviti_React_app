import React, { memo } from 'react'
import { Autocomplete } from "@react-google-maps/api"

export default function AddWayPoints({ waypoints, increment }) {
  //console.log("child rendering success");
  return (
    <>
      {waypoints.map((waypoint, index) => {
        return (
          <>
            <Autocomplete key={index}><input key={index} type="text" className="user_Input" name="" placeholder={`${waypoint} ${index + 2}`} /></Autocomplete>
          </>
        )
      })}
    </>
  )
}

