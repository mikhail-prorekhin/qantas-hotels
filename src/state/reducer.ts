import { HotelData, HotelDataList } from "../types/HotedDataTypes";
import { DecodedUrl, DecodedUrlList } from "../types/UrlDefenceTypes";

export const ITEMS_PER_PAGE = 5;

export type SortDirection = "descendant" | "ascendant" | "";

export type AppStateType = {
  requestInProgress?: boolean;
  requestStatusSeccessed?: boolean;
  hotels?: HotelDataList;
  sortedList: HotelDataList | [];
  images?: Map<string, DecodedUrl>;
  settings: {
    // in our case by price only
    sort: SortDirection;
  };
  page: number;
};

export enum ActionTypes {
  Clean = "CLEAN",
  RequestInProgress = "REQUEST_IN_PROGRESS",
  RequestFailed = "REQUEST_FAILED",
  RequestSuccessed = "REQUEST_SUCCESSED",
  SetImmageList = "SET_IMMAGE_LIST",
  SetCurrentPage = "SET_CURREN_PAGE",
  SetSortingDirection = "SET_SORTING_DIRECTION",
}

export type ActionType =
  | { type: ActionTypes.Clean }
  | { type: ActionTypes.RequestInProgress }
  | { type: ActionTypes.RequestFailed }
  | { type: ActionTypes.RequestSuccessed; payload: { hotels: HotelDataList } }
  | { type: ActionTypes.SetImmageList; payload: { images: DecodedUrlList } }
  | { type: ActionTypes.SetCurrentPage; payload: { page: number } }
  | { type: ActionTypes.SetSortingDirection; payload: { sort: SortDirection } };

export const sortHotelList = (
  hotels: HotelDataList | undefined,
  sort: SortDirection
) => {
  if (!hotels) {
    return [];
  }
  if (!sort) {
    return hotels;
  }
  let k = 1;
  if (sort === "descendant") {
    k = -1;
  }

  return [...hotels].sort(
    (h1: HotelData, h2: HotelData) =>
      k * (h1.price.total.amount - h2.price.total.amount)
  );
};

export const appReducer = (
  state: AppStateType,
  action: ActionType
): AppStateType => {
  switch (action.type) {
    case ActionTypes.Clean: {
      return initialState();
    }
    case ActionTypes.RequestInProgress: {
      return {
        ...state,
        requestInProgress: true,
        requestStatusSeccessed: undefined,
        hotels: undefined,
        images: undefined,
        page: 0,
        settings: {
          sort: ""
        },
        sortedList:[]
      };
    }
    case ActionTypes.RequestFailed: {
      return {
        ...state,
        requestInProgress: false,
        requestStatusSeccessed: false,
      };
    }
    case ActionTypes.RequestSuccessed: {
      return {
        ...state,
        requestInProgress: false,
        requestStatusSeccessed: true,
        ...action.payload,
        sortedList: sortHotelList(action.payload.hotels, state.settings.sort),
      };
    }
    case ActionTypes.SetImmageList: {
      return {
        ...state,
        images: new Map(
          action.payload.images.urls
            .filter((img) => img.success)
            .map((img) => [img.encodedUrl, img])
        )
      };
    }
    case ActionTypes.SetCurrentPage: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ActionTypes.SetSortingDirection: {
      return {
        ...state,
        sortedList: sortHotelList(state.hotels, action.payload.sort),
        page:0,
        settings:{ ...action.payload}
      };
    }
  }
};

export const isRequestInProgress = (state: AppStateType) =>
  state.requestInProgress;
export const isRequestFailed = (state: AppStateType) =>
  !state.requestInProgress && state.requestStatusSeccessed === false;
export const isRequestSuccessed = (state: AppStateType) =>
  !state.requestInProgress && state.requestStatusSeccessed === true;
export const getPageItems = (state: AppStateType) =>
  state.sortedList.slice(
    state.page * ITEMS_PER_PAGE,
    state.page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

export const initialState = (): AppStateType => ({
  requestInProgress: false,
  page: 0,
  sortedList: [],
  settings: { sort: "" },
});
