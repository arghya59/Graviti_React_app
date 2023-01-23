import React from 'react'

export default function AddButton ({addWayPoint}) {
    return (
        <>
            <div onClick={addWayPoint} id="add-another"><span><i className="fa-sharp fa-solid fa-circle-plus"></i></span> Add Another Stop</div>
        </>
    )
}
