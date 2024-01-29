import React from "react";
import { HotelData, Inclusions, Stay } from "src/types/HotedDataTypes";
import { DecodedUrl } from "src/types/UrlDefenceTypes";
import Rating from "./Rating";


type HotelDetailsProps = {
hotel: HotelData,
images?: Map<string, DecodedUrl>
}

const getInclusions = (list:Inclusions )=>list.map((itm)=><span key={itm} className="inclusion">{itm}</span>)

const getPeriod =  (stay:Stay) => {
   return Math.ceil((Date.parse(stay.checkout) - Date.parse(stay.checkIn))/(24*60*60*1000))
 
}

const getPicture = (id:string, images?: Map<string, DecodedUrl>) =>{
if (images) {
    const picture = images.get(id)
    let url = '/image-not-found.png'
    let cover = ""
    if (picture) {
        url = picture.decodedUrl;
        cover = "object-cover"
    } 
    return  <img data-testid="hero-image"  src={url} alt="hotel view" className={`object-contain  ${cover}  md:object-cover object-center md:w-52  md:basis-52 grow-0 shrink-0 w-full h-32 md:h-52 rounded-t-md md:rounded-none  md:rounded-l-md `} />
} else {
    return  <div data-testid="hero-image-loading" className="bg-gray-200  md:basis-52 grow-0 shrink-0 w-full h-32 md:h-52 rounded-t-md md:rounded-none  md:rounded-l-md " />
}
}

const HotelDetails = ({hotel, images} : HotelDetailsProps) => {
const period = getPeriod(hotel.price.stay);
const pricePerDay =  Math.ceil(hotel.price.total.amount / period)
   return <div data-testid="hotel-detail"   className=" rounded-md flex  bg-white mb-5 p-0 flex-col md:flex-row items-stretch  ">
     {getPicture(hotel.heroImage, images)}
      <section className=" flex grow shrink ">
         <div className="pr-0 md:pl-2 pl-0 md:pl-5 pb-5 pt-2 md:pt-8 flex flex-col grow shrink ">
            <h2 aria-label={`${hotel.name} for ${getPeriod(hotel.price.stay)} from ${hotel.price.total.amount} ${hotel.price.total.currency}`} className="text-slate-600 text-2xl leading-normal font-semibold " data-testid="name" >{hotel.name}</h2>
            <span   className="text-slate-400 mb-4  text-md leading-normal  " data-testid="location" >{hotel.location.city}</span>
            <div aria-label={`raiting ${hotel.rating.value} ${hotel.rating.type}`} data-testid="ratings" ><Rating rating={hotel.rating}/></div>
            <p className="text-slate-600   mb-2 text-base " data-testid="inclusions" >{getInclusions(hotel.inclusions)}</p>
         </div>
         <div className="pl-0  pr-0 md:pr-5 pb-5 pt-2 md:pt-8  flex flex-col grow shrink items-end ">
            <p  className="text-slate-500 my-2 leading-none text-nowrap" data-testid="period" >{`1 night from [${hotel.price.total.currency}]`}</p>
            <p  className="my-2 inline-flex text-slate-600  text-4xl font-semibold items-start"><span  className=" text-base leading-none mr-1 ">$</span><span  className="leading-none " data-testid="price" >{pricePerDay}</span></p>
         </div>
      </section>

   </div>
}

export default HotelDetails;