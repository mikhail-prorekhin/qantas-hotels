import React from "react";
import { AppContext } from "src/contexts/AppContext";
import HotelDetails from "./HotelDetails";
import { getPageItems } from "src/state/reducer";

const HoteDatelList = () => {
    const { state } = React.useContext(AppContext);
    return (
        <>
            {[ ...(getPageItems(state).map(hotel=><HotelDetails key={hotel.id}  hotel={hotel} images={state.images}/>))]}     
        </>

    )
}
export default HoteDatelList;