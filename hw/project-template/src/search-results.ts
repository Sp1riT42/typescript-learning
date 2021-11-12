import { renderBlock } from './lib.js'
import {getFavoritesAmount, isUserData, getUserData} from './index.js'
import {renderUserBlock} from './user.js';
import {Apartments} from './bookingService/domain/apartments.js';


export function renderSearchStubBlock () {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock (reasonMessage:string) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

// interface IPlace {
//   id: number,
//   name: string,
//   description: string,
//   image: string,
//   remoteness: number,
//   bookedDates: [],
//   price: number
// }

interface IFavoriteList {
  [key: string | number]: string | number | Apartments
}

let currentPLace: Apartments[]
let favoriteList:string | null | IFavoriteList= localStorage.getItem('favoritesAmount')
if(favoriteList !== null) favoriteList = JSON.parse(favoriteList)
let selectSort:HTMLSelectElement | null
let resultList:HTMLSelectElement | null
let favoritesElem:NodeList
const renderApartmentList = (currentPLace: Apartments[], selectSort:HTMLSelectElement) => {
  if (resultList) resultList.innerText = ''
  const arr = [...currentPLace]
  console.log(selectSort.value)
  switch (selectSort.value){
  case 'minPrice':
    arr.sort((a, b) => a.price - b.price)
    break
  case 'maxPrice':
    arr.sort((a, b) => b.price - a.price)
    break
  case 'closer':
    arr.sort((a, b) => {
      if(a.remoteness !== undefined && b.remoteness !== undefined){
        return a.remoteness - b.remoteness
      } else {
        return 0}
    })
    break
  }

  arr.map((item:Apartments):void => {
    if (resultList) resultList.insertAdjacentHTML('beforeend', `<li class="result">
      <div class="result-container">
      <div class="result-img-container">
      <div class="favorites" data-index="${item.id}"></div>
        <img class="result-img" src="${item.image}" alt="">
        </div>
        <div class="result-info">
      <div class="result-info--header">
        <p>${item.name}</p>
      <p class="price">${item.price}&#8381;</p>
      </div>
      <div class="result-info--map"><i class="map-icon"></i> ${item.remoteness}км от вас</div>
      <div class="result-info--descr">${item.description}</div>
      <div class="result-info--footer">
        <div>
          <button>Забронировать</button>
        </div>
        </div>
        </div>
        </div>
        </li>`)
  })
  favoritesElem = document.querySelectorAll('.favorites')
  toggleFavoritesElem(favoritesElem)
}
export function renderSearchResultsBlock (place:Apartments[]) {
  console.log('renderSearchResultsBlock: ', place)
  currentPLace = place
  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select id="selectSort">
                <option value="minPrice" >Сначала дешёвые</option>
                <option value="maxPrice">Сначала дорогие</option>
                <option value="closer">Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
    </ul>
    `
  )

  //const resultsList:HTMLElement | null = document.querySelector('.results-list')

  resultList = document.querySelector('.results-list')
  selectSort = document.querySelector('#selectSort')
  if(selectSort !== null) {
    renderApartmentList(currentPLace, selectSort)

    selectSort.addEventListener('change', ():void => {
      renderApartmentList(currentPLace, selectSort as HTMLSelectElement)
    })
  }
  if(resultList !== null) {
    resultList.addEventListener('click', (evt:Event):void => {
      console.log('click')
      const target = evt.target as HTMLElement
      const classList = target.classList
      for(const val of classList) {
        console.log(val)
        if(val === 'favorites') {
          const idx = target.dataset['index']
          console.log(idx)
          toggleFavoriteItem(idx as string,favoritesElem)
          break
        } else {
          console.log(JSON.parse(localStorage.getItem('favoritesAmount') as string))
        }
      }
    })
  }


  toggleFavoritesElem(favoritesElem)

  console.log(resultList)

}





let favoritesAmount: unknown
let userData: unknown
const toggleFavoritesElem = (favoritesElem:NodeList):void => {
  if(favoriteList !== null && typeof favoriteList === 'object') {
    for (let i = 0; i < favoritesElem.length; i++) {
      const elem = favoritesElem[i] as HTMLElement
      console.log(favoriteList, elem.dataset['index'])
      if (elem.dataset['index'] as string in favoriteList) {
        elem.classList.add('active')
      } else {
        elem.classList.remove('active')
      }
    }
  }
}

const toggleFavoriteItem = (idx: string, favoritesElem: NodeList):void => {
  if(favoriteList !== null && typeof favoriteList === 'object') {
    if (idx in favoriteList) {
      //console.log(idx in favoriteList[idx])
      delete favoriteList[idx]
      toggleFavoritesElem(favoritesElem)
    } else {
      favoriteList = {
        [idx]: currentPLace.find((item) => item.id === idx) as Apartments,
        ...favoriteList
      }
      toggleFavoritesElem(favoritesElem)
    }
  }
  localStorage.setItem('favoritesAmount', JSON.stringify(favoriteList))
  userData = getUserData()
  favoritesAmount = getFavoritesAmount()
  if(isUserData(userData)  && typeof favoritesAmount === 'number') {
    renderUserBlock(userData.username,userData.avatarURL,favoritesAmount)
  }
}
