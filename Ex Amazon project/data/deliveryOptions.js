export const deliveryOptions = [{
  id: '1',
  deliveryDate: 7,
  priceCents: 0
},{
  id: '2',
  deliveryDate: 3,
  priceCents: 499 
}
,{
  id: '3',
  deliveryDate: 1,
  priceCents: 999 
}
];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;

  deliveryOptions.forEach((option)=>{
    if(deliveryOptionId === option.id){
      deliveryOption = option ;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function calculateDeliveryDate(deliveryOption){
  const today = dayjs(); 
  let deliveryDate = today.add(1, 'day');
  let daysToAdd = deliveryOption.deliveryDate ;
  while (daysToAdd > 0) {
    deliveryDate = deliveryDate.add(1, 'day');
    if(!isWeekend(deliveryDate)){
      daysToAdd-- ;
    }   
  }

  const dateString = deliveryDate.format('dddd, MMMM D');
   return dateString ;
}

function isWeekend(date){
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
} 
