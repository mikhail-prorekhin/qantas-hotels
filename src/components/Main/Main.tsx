import React from "react";
import { AppContext } from "../../contexts/AppContext";
import { isRequestFailed, isRequestInProgress, isRequestSuccessed } from "../../state/reducer";
import NetworkError from "../NetworkError";
import { requestHotelList } from "src/services/loadHotelList";
import HotelListPlaceHolder from "../HotelListPlaceHolder";
import HoteDatelList from "../HotelList";
import { AsyncContext } from "src/contexts/AsyncContext";

const Main = () => {
    const { state, dispatch } = React.useContext(AppContext);
    React.useEffect(() => {
        requestHotelList(dispatch)
    }, [dispatch])
    const {isPending} = React.useContext(AsyncContext);
    
    return (
        <main data-testid="main-container"  className="basis-full max-w-[50rem] w-full mx-auto px-2 overflow-y-auto my-2">
            {isRequestFailed(state) && <NetworkError />}
            {(isRequestInProgress(state) || isPending) && <HotelListPlaceHolder />}
            {isRequestSuccessed(state) && !isPending &&
                    <HoteDatelList />
            }

        </main>
    )
}
export default Main;