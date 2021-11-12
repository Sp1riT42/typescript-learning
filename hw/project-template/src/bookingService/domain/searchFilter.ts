export interface SearchFilterRentSDK {
   city: string,
   checkInDate: Date,
   checkOutDate: Date,
   priceLimit: number
}

export interface SearchFilterJSON {
  city: string,
  checkInDate: string,
  checkOutDate: string,
  maxPrice: number,
}
