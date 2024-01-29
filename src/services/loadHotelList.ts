import { ActionType, ActionTypes } from "src/state/reducer";
 import axios from "axios";
import { DecodedUrlList } from "src/types/UrlDefenceTypes";
import { HotelDataList } from "src/types/HotedDataTypes";

export const requestHotelList =
  async (dispatch: React.Dispatch<ActionType>) => {

    dispatch({
        type: ActionTypes.RequestInProgress,
    });


    let  hotels;
    try {
      const hotelsResponse = await axios.get("/api/hotels");
      hotels = hotelsResponse.data;
      dispatch({
        type: ActionTypes.RequestSuccessed,
        payload:{hotels}
      });
    } catch (_) {
      dispatch({
        type: ActionTypes.RequestFailed
      });
      return;
    }
    try {
      const urls :string[] = (hotels as HotelDataList).map(itm=>itm.heroImage)
      const urlResponse = await axios.post("/api/decode"  , {urls} );
      dispatch({
        type: ActionTypes.SetImmageList,
        payload:{images:urlResponse.data as DecodedUrlList}
      });
    } catch (_) {
     // nothing to do
    }
    return;
  }