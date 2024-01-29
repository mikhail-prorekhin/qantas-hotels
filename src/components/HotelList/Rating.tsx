import React from 'react';
import { RatingType } from 'src/types/HotedDataTypes';

const FullStar = () => <svg data-testid="full-star"  aria-hidden="true" focusable="false" className="inline-block w-5 h-5 fill-yellow-500"  >
    <path d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218" />
</svg>

const HalfStar = () => <svg data-testid="half-star"  aria-hidden="true" focusable="false" className="inline-block w-5 h-5 fill-yellow-500">
    <path d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218" className="fill-gray-100" />
    <path d="M 9.5 14.25 l -5.584 2.936 l 1.066 -6.218 L 0.465 6.564 l 6.243 -0.907 L 9.5 0" />
</svg>

const EmptyStar = () =>
    <svg data-testid="empty-star"  aria-hidden="true" focusable="false" className="inline-block w-5 h-5  fill-gray-100">
        <path d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218" />
    </svg>

const FullSelf = () => <svg data-testid="full-self"  aria-hidden="true" focusable="false" className="inline-block w-5 h-5 fill-yellow-500" viewBox="0 0 2 2" >
    <circle xmlns="http://www.w3.org/2000/svg" cx="1" cy="1" r="0.7" />
</svg>

const EmptySelf = () =>
    <svg data-testid="empty-self"  aria-hidden="true" focusable="false" className="inline-block w-5 h-5  fill-gray-100" viewBox="0 0 2 2">
        <circle xmlns="http://www.w3.org/2000/svg" cx="1" cy="1" r="0.7" />
    </svg>

const HalfSelf = () =>  <svg data-testid="half-self"  aria-hidden="true" focusable="false" className="inline-block w-5 h-5 fill-yellow-500" viewBox="0 0 2 2">
   <circle xmlns="http://www.w3.org/2000/svg" cx="1" cy="1" r="0.7" />
  
   <path d="M 1 0.3
           A 0.7 0.7, 0, 0, 1, 1 1.7
           L 1 1.7
           Z" 
        className="fill-gray-100" />

</svg>



const Rating = ({ rating }: { rating: RatingType }) => {
    const icons = rating.type === "star" ? {
        full:(id:number)=><FullStar  key={id}/>,
        half:(id:number)=><HalfStar  key={id}/>,
        empty:(id:number)=><EmptyStar  key={id}/> 
    }:{
        full:(id:number)=><FullSelf  key={id}/>,
        half:(id:number)=><HalfSelf  key={id}/>,
        empty:(id:number)=><EmptySelf  key={id}/> 
    }
    const marks = [];
    let key = 0;
    for (let i = 0; i < Math.floor(rating.value); i++) {
        marks.push(icons.full(key++))
    }
    if (Math.floor(rating.value) < rating.value) {
        marks.push(icons.half(key++))
    }
    while (marks.length < 5) {
        marks.push(icons.empty(key++))
    }


    return <>{marks}</>
}



export default Rating;