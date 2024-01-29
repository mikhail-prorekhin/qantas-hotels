import axios from "axios";
import { requestHotelList } from "./loadHotelList";
import { ActionTypes } from "src/state/reducer";

jest.mock("axios");
describe("requestBalanceSheet", () => {
  const dispatch = jest.fn();

  it("hotel api error", async () => {
    axios.get = jest.fn().mockReturnValueOnce(Promise.reject("error happends"));
    await requestHotelList(dispatch);
    expect(dispatch.mock.calls).toEqual([
      [{ type: ActionTypes.RequestInProgress }],
      [
        {
          type: ActionTypes.RequestFailed,
        },
      ],
    ]);
    expect(axios.get).toHaveBeenCalledWith("/api/hotels");
  });

  it("set hotel info with images", async () => {
    axios.get = jest.fn().mockReturnValueOnce(Promise.resolve({data:[{heroImage:"heroImage1"},{heroImage:"heroImage2"}]}));

    axios.post = jest
    .fn()
    .mockReturnValueOnce(Promise.resolve({data:{ "urls": [10,12,13] }}));

    await requestHotelList(dispatch);
    expect(dispatch.mock.calls).toEqual([
      [{ type: ActionTypes.RequestInProgress }],
      [
        {
          type: ActionTypes.RequestSuccessed,
          payload:{hotels:[{heroImage:"heroImage1"},{heroImage:"heroImage2"}]}
        },
      ],
      [
        {
          type: ActionTypes.SetImmageList,
          payload:{images:{urls:[10,12,13]}}
        },
      ],
    ]);
    expect(axios.get).toHaveBeenCalledWith("/api/hotels");
    expect(axios.post).toHaveBeenCalledWith("/api/decode",  {"urls": ["heroImage1", "heroImage2"]});
  });


  it("ignore if image service failed", async () => {
    axios.get = jest.fn().mockReturnValueOnce(Promise.resolve({data:[{heroImage:"heroImage1"},{heroImage:"heroImage2"}]}));

    axios.post = jest
    .fn()
    .mockReturnValueOnce(Promise.resolve(Promise.reject("error happends")));

    await requestHotelList(dispatch);
    expect(dispatch.mock.calls).toEqual([
      [{ type: ActionTypes.RequestInProgress }],
      [
        {
          type: ActionTypes.RequestSuccessed,
          payload:{hotels:[{heroImage:"heroImage1"},{heroImage:"heroImage2"}]}
        },
      ]
    ]);
    expect(axios.get).toHaveBeenCalledWith("/api/hotels");
    expect(axios.post).toHaveBeenCalledWith("/api/decode",  {"urls": ["heroImage1", "heroImage2"]});
  });

});
