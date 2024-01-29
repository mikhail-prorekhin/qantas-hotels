import React, { MouseEventHandler, TransitionStartFunction } from "react";
import { ActionType, ActionTypes, ITEMS_PER_PAGE, isRequestFailed, isRequestInProgress } from "../../state/reducer"
import { AppContext } from "src/contexts/AppContext";
import { AsyncContext } from "src/contexts/AsyncContext";


const onClick = (dispatch: React.Dispatch<ActionType>, index: number, startTransition: TransitionStartFunction): MouseEventHandler<HTMLAnchorElement> => (event) => {
    event.preventDefault()
    startTransition(() => dispatch({
        type: ActionTypes.SetCurrentPage,
        payload: { page: index }
    }));
}

const generateLinks = (length: number = 0, currentPage: number, dispatch: React.Dispatch<ActionType>, startTransition: TransitionStartFunction) => {
    const links = []
    for (let i = 0; i < Math.ceil(length / ITEMS_PER_PAGE); i++) {
        if (currentPage === i) {
            links.push(<span aria-current="true" data-testid="page-current" key={i} className="nav-link nav-link__current" >{i + 1}</span>)
        } else {
            links.push(<a aria-label={`goto page ${i}`} aria-current="false" data-testid="page-link" key={i} className={`nav-link`} href={`/${i + 1}`} onClick={onClick(dispatch, i, startTransition)}>{i + 1}</a>)
        }
    }
    return links
}

const Pagination = (
) => {
    const { state, dispatch } = React.useContext(AppContext);
    const {startTransition} = React.useContext(AsyncContext);

    if (isRequestFailed(state) || isRequestInProgress(state)) {
        return <></>
    }
    return (
        <nav role="navigation" aria-label="Pagination Navigation">
            {generateLinks(state.hotels?.length, state.page, dispatch, startTransition)}
        </nav>
    )
}
export default Pagination;