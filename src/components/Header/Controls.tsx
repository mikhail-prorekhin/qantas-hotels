import React, { TransitionStartFunction } from "react";
import { AppContext } from "src/contexts/AppContext";
import { AsyncContext } from "src/contexts/AsyncContext";
import { ActionType, ActionTypes, SortDirection } from "src/state/reducer";


const onChange = (dispatch: React.Dispatch<ActionType>, startTransition: TransitionStartFunction) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
        startTransition(() => {
            dispatch({
                type: ActionTypes.SetSortingDirection,
                payload: { sort: event.target.value as SortDirection }
            })
        });
    }

const Controls = () => {
    const { state, dispatch } = React.useContext(AppContext);
    const { startTransition } = React.useContext(AsyncContext);
    return (
        <>
            <label htmlFor="price_sorting" className="text-slate-100  mr-3">Sort by price:</label>
            <select data-testid="sort" id="price_sorting" onChange={onChange(dispatch, startTransition)} defaultValue={state.settings.sort}>
                <option aria-selected={!state.settings.sort}></option>
                <option aria-selected={state.settings.sort === "descendant"} value="descendant">Highest Price</option>
                <option aria-selected={state.settings.sort === "ascendant"} value="ascendant">Lowest Price</option>
            </select>
        </>
    )
}
export default Controls;