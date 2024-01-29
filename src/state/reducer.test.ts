import { HotelDataList } from "src/types/HotedDataTypes";
import {
  appReducer,
  isRequestInProgress,
  isRequestFailed,
  isRequestSuccessed,
  getPageItems,
  ActionTypes,
  sortHotelList,
} from "./reducer";
describe("appReducer", () => {
  describe("redux", () => {
    it("clean", () => {
      expect(
        appReducer(
          {
            requestInProgress: true,
            requestStatusSeccessed: true,
            hotels: [11, 12, 13, 14, 15, 16] as unknown as HotelDataList,
            sortedList: [1, 2, 3, 4, 5] as unknown as HotelDataList,
            images: new Map(),
            settings: {
              sort: "descendant",
            },
            page: 1,
          },
          { type: ActionTypes.Clean }
        )
      ).toEqual({
        requestInProgress: false,
        page: 0,
        sortedList: [],
        settings: { sort: "" },
      });
    });

    it("request in progress", () => {
      expect(
        appReducer(
          {
            requestInProgress: false,
            requestStatusSeccessed: true,
            hotels: [11, 12, 13, 14, 15, 16] as unknown as HotelDataList,
            sortedList: [1, 2, 3, 4, 5] as unknown as HotelDataList,
            images: new Map(),
            settings: {
              sort: "descendant",
            },
            page: 1,
          },
          { type: ActionTypes.RequestInProgress }
        )
      ).toEqual({
        hotels: undefined,
        images: undefined,
        requestInProgress: true,
        requestStatusSeccessed: undefined,
        page: 0,
        sortedList: [],
        settings: { sort: "" },
      });
    });

    it("request failed", () => {
      expect(
        appReducer(
          {
            requestInProgress: true,
            requestStatusSeccessed: true,
            sortedList: [],
            settings: {
              sort: "descendant",
            },
            page: 1,
          },
          { type: ActionTypes.RequestFailed }
        )
      ).toEqual({
        requestInProgress: false,
        requestStatusSeccessed: false,
        page: 1,
        sortedList: [],
        settings: { sort: "descendant" },
      });
    });

    it("request successed", () => {
      expect(
        appReducer(
          {
            requestInProgress: true,
            sortedList: [],
            settings: {
              sort: "descendant",
            },
            page: 1,
          },
          {
            type: ActionTypes.RequestSuccessed,
            payload: {
              hotels: [
                { price: { total: { amount: 10 } } },
                { price: { total: { amount: 5 } } },
                { price: { total: { amount: 15 } } },
              ] as unknown as HotelDataList,
            },
          }
        )
      ).toEqual({
        requestInProgress: false,
        requestStatusSeccessed: true,
        page: 1,
        sortedList: [
          { price: { total: { amount: 15 } } },
          { price: { total: { amount: 10 } } },
          { price: { total: { amount: 5 } } },
        ],
        hotels: [
          { price: { total: { amount: 10 } } },
          { price: { total: { amount: 5 } } },
          { price: { total: { amount: 15 } } },
        ],
        settings: { sort: "descendant" },
      });
    });

    it("set immage list", () => {
      expect(
        appReducer(
          {
            requestInProgress: false,
            requestStatusSeccessed: true,
            sortedList: [],
            hotels: [],
            settings: {
              sort: "descendant",
            },
            page: 1,
          },
          {
            type: ActionTypes.SetImmageList,
            payload: {
              images: {
                urls: [
                  {
                    success: false,
                    encodedUrl: "-encodedUrl-1-",
                    decodedUrl: "-decodedUrl-1-",
                  },
                  {
                    success: true,
                    encodedUrl: "-encodedUrl-2-",
                    decodedUrl: "-decodedUrl-2-",
                  },
                  {
                    success: true,
                    encodedUrl: "-encodedUrl-3-",
                    decodedUrl: "-decodedUrl-3-",
                  },
                ],
              },
            },
          }
        )
      ).toEqual({
        requestInProgress: false,
        requestStatusSeccessed: true,
        page: 1,
        sortedList: [],
        hotels: [],
        settings: { sort: "descendant" },
        images: new Map([
          [
            "-encodedUrl-2-",
            {
              success: true,
              encodedUrl: "-encodedUrl-2-",
              decodedUrl: "-decodedUrl-2-",
            },
          ],
          [
            "-encodedUrl-3-",
            {
              success: true,
              encodedUrl: "-encodedUrl-3-",
              decodedUrl: "-decodedUrl-3-",
            },
          ],
        ]),
      });
    });

    it("set current page", () => {
      expect(
        appReducer(
          {
            requestInProgress: true,
            requestStatusSeccessed: true,
            sortedList: [],
            settings: {
              sort: "descendant",
            },
            page: 1,
          },
          { type: ActionTypes.SetCurrentPage, payload: { page: 2 } }
        )
      ).toEqual({
        requestInProgress: true,
        requestStatusSeccessed: true,
        page: 2,
        sortedList: [],
        settings: { sort: "descendant" },
      });
    });

    it("set sorting direction", () => {
      expect(
        appReducer(
          {
            requestInProgress: true,
            requestStatusSeccessed: true,
            hotels: [
              { price: { total: { amount: 15 } } },
              { price: { total: { amount: 10 } } },
              { price: { total: { amount: 5 } } },
            ] as unknown as HotelDataList,
            sortedList: [],
            settings: {
              sort: "descendant",
            },
            page: 1,
          },
          {
            type: ActionTypes.SetSortingDirection,
            payload: { sort: "ascendant" },
          }
        )
      ).toEqual({
        requestInProgress: true,
        requestStatusSeccessed: true,
        page: 0,
        hotels: [
          { price: { total: { amount: 15 } } },
          { price: { total: { amount: 10 } } },
          { price: { total: { amount: 5 } } },
        ],
        sortedList: [
          { price: { total: { amount: 5 } } },
          { price: { total: { amount: 10 } } },
          { price: { total: { amount: 15 } } },
        ],
        settings: { sort: "ascendant" },
      });
    });
  });

  describe("shorts", () => {
    it("loading", () => {
      expect(
        isRequestInProgress({
          requestInProgress: true,
          requestStatusSeccessed: false,
          sortedList: [],
          page: 0,
          settings: { sort: "" },
        })
      ).toBeTruthy();
    });
    it("loading successed", () => {
      expect(
        isRequestSuccessed({
          requestInProgress: false,
          requestStatusSeccessed: true,
          sortedList: [],
          page: 0,
          settings: { sort: "" },
        })
      ).toBeTruthy();
    });
    it("failed successed", () => {
      expect(
        isRequestFailed({
          requestInProgress: false,
          requestStatusSeccessed: false,
          sortedList: [],
          page: 0,
          settings: { sort: "" },
        })
      ).toBeTruthy();
    });
    it("get list item range", () => {
      expect(
        getPageItems({
          requestInProgress: false,
          requestStatusSeccessed: true,
          sortedList: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
          ] as unknown as HotelDataList,
          page: 1,
          settings: { sort: "" },
        })
      ).toEqual([6, 7, 8, 9, 10]);
    });
  });

  describe("sortHotelList", () => {
    it("returm an empty array if the hotel list empty", () => {
      expect(sortHotelList(undefined, "descendant")).toEqual([]);
    });

    it("returm unsorted array if no derection", () => {
      expect(
        sortHotelList(
          [
            { price: { total: { amount: 10 } } },
            { price: { total: { amount: 5 } } },
            { price: { total: { amount: 15 } } },
          ] as unknown as HotelDataList,
          ""
        )
      ).toEqual([
        { price: { total: { amount: 10 } } },
        { price: { total: { amount: 5 } } },
        { price: { total: { amount: 15 } } },
      ]);
    });

    it("sort descendant", () => {
      expect(
        sortHotelList(
          [
            { price: { total: { amount: 10 } } },
            { price: { total: { amount: 5 } } },
            { price: { total: { amount: 15 } } },
          ] as unknown as HotelDataList,
          "descendant"
        )
      ).toEqual([
        { price: { total: { amount: 15 } } },
        { price: { total: { amount: 10 } } },
        { price: { total: { amount: 5 } } },
      ]);
    });

    it("sort ascendant", () => {
      expect(
        sortHotelList(
          [
            { price: { total: { amount: 10 } } },
            { price: { total: { amount: 5 } } },
            { price: { total: { amount: 15 } } },
          ] as unknown as HotelDataList,
          "ascendant"
        )
      ).toEqual([
        { price: { total: { amount: 5 } } },
        { price: { total: { amount: 10 } } },
        { price: { total: { amount: 15 } } },
      ]);
    });
  });
});
