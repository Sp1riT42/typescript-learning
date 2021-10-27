import { renderBlock } from './lib.js'

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
         <!-- <div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div> -->
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
            <input id="max-price" type="text" value="" name="price" class="max-price" />
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
  const checkInDate:HTMLInputElement = document.querySelector('#check-in-date')
  const checkOutDate:HTMLInputElement = document.querySelector('#check-out-date')
  const maxPrice:HTMLInputElement = document.querySelector('#max-price')

  interface ISearchFormData {
    checkInDate: string,
    checkOutDate: string,
    maxPrice: number
  }

  interface IPlace {}

  const placeF = (placeVal: IPlace | Error) => {
    console.log(placeVal)
    return placeVal
  }
  const search = (evt: Event, place) => {
    evt.preventDefault()
    const checkInDateValue = checkInDate.value
    const checkOutDateValue = checkOutDate.value
    const maxPriceValue = +maxPrice.value
    const data:ISearchFormData = {
      checkInDate:checkInDateValue,
      checkOutDate: checkOutDateValue,
      maxPrice: maxPriceValue
    }
    searchResult(data)
    setTimeout(() => {
      const rand = Math.round(Math.random())
      if(rand) {
        const val:IPlace = {}
        place(val)
      } else {
        const val = Error('Error!')
        place(val)
      }

    },2000)
  }


  const searchResult = (data: ISearchFormData) => {
    console.log(data)
  }
  btnSearch.addEventListener('click', (evt)=>search(evt,placeF))
}
