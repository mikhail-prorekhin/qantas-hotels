import React from "react";
import { ITEMS_PER_PAGE } from "src/state/reducer";
import HotelDetailsPlaceHolder from "./HotelDetailsPlaceHolder";



const HotelListPlaceHolder = () => {
    return (
        <div data-testid="hotel-list-placeholder">
            {
                Array.from({ length: ITEMS_PER_PAGE }, (_, index) =>
                     <HotelDetailsPlaceHolder key={index} />
                )
            }
        </div>
    )
}
export default HotelListPlaceHolder;