import React from "react";

const HotelInfoPlaceHolder = () => {
   return <div data-testid="hotel-placeholder" className=" rounded-md flex  bg-white mb-5 p-0 flex-col   md:flex-row  ">
      <div className="bg-gray-200 p-4 md:basis-52 grow-0 shrink-0 w-full h-32 md:h-52 rounded-t-md md:rounded-none  md:rounded-l-md " />
      <section className=" flex grow shrink ">
         <div className="pr-0 md:pl-2 pl-0 md:pl-5 pb-5 pt-2 md:pt-8 flex flex-col grow shrink ">
            <div className="bg-slate-400 my-2 w-40 h-6 rounded-md "></div>
            <div className="bg-slate-200 mt-1 mb-5 w-20 h-4 rounded-md "></div>
            <div className="bg-slate-100 my-2 w-32 h-5 rounded-md "></div>
            <div className="bg-slate-300 mb-2 w-44 h-3 rounded-md "></div>
         </div>
         <div className="pl-0  pr-0 md:pr-5 pb-5 pt-2 md:pt-8  flex flex-col grow shrink items-end">
            <div className="bg-slate-300 my-2 w-44 h-3 rounded-md "></div>
            <div className="bg-slate-400 my-2 w-24 h-9 rounded-md "></div>
         </div>
      </section>

   </div>
}
export default HotelInfoPlaceHolder;