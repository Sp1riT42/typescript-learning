import { renderBlock } from './lib.js'
import {renderSearchResultsBlock} from './search-results.js';
import {rentSDKProvider} from './bookingService/providers/rentSDK/rentSDKProvider.js';
import {jsonAPIProvider} from './bookingService/providers/jsonAPI/jsonAPIProvider.js';
import {Apartments} from './bookingService/domain/apartments';

export function renderSearchFormBlock (arrivalDate: string, departureDate: string) {
  const date = new Date()
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const year = date.getFullYear() + ''
  const minDate = `${year}-${month}-${day}`
  let maxDate:string

  if(month !== '12') {
    const nextMonth = date.getMonth() + 2 < 10 ? '0' + (date.getMonth() + 2) : (date.getMonth() + 2) + ''
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0).getDate() + ''
    console.log(lastDay)
    maxDate = `${year}-${nextMonth}-${lastDay}`
  } else {
    const  nextMonth = '00'
    const lastDay = new Date((date.getFullYear() + 1), date.getMonth() + 2, 0).getDate() + ''
    const nextYear = (date.getFullYear() + 1) + ''
    maxDate = `${nextYear}-${nextMonth}-${lastDay}`
  }

  console.log(arrivalDate, departureDate, 'date: ' + date ,'day: '+ day, 'month: ' + month,
    'year: ' + year, minDate, maxDate)
  renderBlock(
    'search-form-block',
    `
    <form id="form">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <div class="providers">
            <label><input id="homy" type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input id="flat-rent" type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${arrivalDate}" min="${minDate}" max="${maxDate}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${departureDate}" min="${minDate}" max="${maxDate}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="20000" name="price" class="max-price" />
          </div>
          
          <div>
            <div><button class="form__btn">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )

  const btnSearch = document.querySelector('.form__btn')
  const city:HTMLInputElement | null = document.querySelector('#city')
  const checkInDate:HTMLInputElement | null = document.querySelector('#check-in-date')
  const checkOutDate:HTMLInputElement | null = document.querySelector('#check-out-date')
  const maxPrice:HTMLInputElement | null = document.querySelector('#max-price')
  const providerHomy:HTMLInputElement | null = document.querySelector('#homy')
  const providerFlatRent:HTMLInputElement | null = document.querySelector('#flat-rent')

  interface ISearchFormData {
    city: string,
    checkInDate: string,
    checkOutDate: string,
    maxPrice: number
  }

  interface IPlace {
    id: number,
    name: string,
    description: string,
    image: string,
    remoteness: number,
    bookedDates: [],
    price: number
  }

  const placeF = (placeVal: IPlace[] | Error): IPlace[] | Error => {
    console.log(placeVal)
    return placeVal
  }

  const search = (searchData: ISearchFormData, place:((placeVal: IPlace[] | Error) => IPlace[] | Error)):void => {
    console.log(place)
    const allProviders = []
    const jsonAPIex = new jsonAPIProvider()
    const rentSDKEx = new rentSDKProvider()
    const jsonAPIFilter = {
      'city': searchData.city,
      'checkInDate': searchData.checkInDate,
      'checkOutDate': searchData.checkOutDate,
      'maxPrice': searchData.maxPrice
    }
    const rentSDKFilter = {
      'city': searchData.city,
      'checkInDate': new Date(searchData.checkInDate),
      'checkOutDate': new Date(searchData.checkOutDate),
      'priceLimit': searchData.maxPrice
    }
    if(providerHomy !== null && providerHomy.checked) {
      console.log('homy checked')
      allProviders.push(jsonAPIex)
    }
    if(providerFlatRent !== null && providerFlatRent.checked) {
      allProviders.push(rentSDKEx)
    }

    Promise.all(allProviders.map((provider: jsonAPIProvider | rentSDKProvider) => {
      if(provider === jsonAPIex) {
        return  provider.find(jsonAPIFilter)
      }
      if(provider === rentSDKEx ) {
        return provider.find(rentSDKFilter)
      }
      return null
    })).then((res) => {
      if(res !== undefined) {
        const allResults: Apartments[] = [].concat(...res as [])
        console.log(allResults)
        renderSearchResultsBlock(allResults)
      }
    })
  }

  if(btnSearch !== null) {
    btnSearch.addEventListener('click', (evt):void=>{
      evt.preventDefault()
      if(city && checkInDate && checkOutDate && maxPrice) {
        const cityValue = city.value
        const checkInDateValue = checkInDate.value
        const checkOutDateValue = checkOutDate.value
        const maxPriceValue = +maxPrice.value
        const data:ISearchFormData = {
          city: cityValue,
          checkInDate:checkInDateValue,
          checkOutDate: checkOutDateValue,
          maxPrice: maxPriceValue
        }
        search(data,placeF)
      }

    })
  }

}
