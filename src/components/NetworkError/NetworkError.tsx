import React from "react";

const  NetworkError = () => {
    return (
        <section data-testid="network-error" className="h-full flex justify-center items-center">
            <p  aria-label="network error" className="text-3xl text-red-600 ">System error, please try latter</p>
        </section>
    )
}
export default NetworkError;