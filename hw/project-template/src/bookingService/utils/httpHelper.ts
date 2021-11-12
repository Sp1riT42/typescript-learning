
export abstract class HttpHelper {
  public static fetchAsJson<Response>(input: RequestInfo, init?: RequestInit): Promise<Response> {
    return fetch(input, init)
      .then((response) => {
        return response.text()
      })
      .then<Response>((responseText) => {
        return JSON.parse(responseText)
      })
  }
}
export interface ApartmentsListResponse {
  errorMessage?: string
  items: ApartmentRentSDK[]
}
export interface ApartmentsListResponseJSONApi {
  errorMessage?: string
  items: ApartmentJSONApi[]
}
export interface ApartmentRentSDK {
   id: number,
   title: string,
  details: string,
  photos: string[],
   remoteness: number,
   bookedDates: [],
  totalPrice: number
}

export interface ApartmentJSONApi {
  id: number,
  name: string,
  description: string,
  image: string,
  remoteness: number,
  bookedDates: [],
  price: number
}
