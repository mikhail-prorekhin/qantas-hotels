import React from "react";
import Header from "../Header";
import Main from "../Main";
import Fotter from "../Fotter";

const Container = () => {
    return (
        <div className="flex h-screen flex-col relative bg-gray-100">
            <Header/>
            <Main />
            <Fotter/>
        </div>

    )
}
export default Container;