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

export function renderEmptyOrErrorSearchBlock (reasonMessage) {
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

interface IPlace {
  id: number,
  name: string,
  description: string,
  image: string,
  remoteness: number,
  bookedDates: [],
  price: number
}

let currentPLace: Apartments[]
let favoriteList = JSON.parse(localStorage.getItem('favoritesAmount'))
let selectSort:HTMLSelectElement
let resultList:HTMLSelectElement
let favoritesElem:NodeList
const renderApartmentList = (currentPLace: Apartments[], selectSort:HTMLSelectElement | undefined) => {
  resultList.innerText = ''
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
    arr.sort((a, b) => a.remoteness - b.remoteness)
    break
  }

  arr.map((item:Apartments):void => {
    resultList.insertAdjacentHTML('beforeend', `<li class="result">
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

  const resultsList:HTMLElement = document.querySelector('.results-list')

  resultList = document.querySelector('.results-list')
  selectSort = document.querySelector('#selectSort')
  renderApartmentList(currentPLace, selectSort)

  selectSort.addEventListener('change', ():void => {
    renderApartmentList(currentPLace, selectSort)
  })

  toggleFavoritesElem(favoritesElem)

  console.log(resultsList)
  resultsList.addEventListener('click', (evt:Event):void => {
    console.log('click')
    const target = evt.target as HTMLElement
    const classList = target.classList
    for(const val of classList) {
      console.log(val)
      if(val === 'favorites') {
        const idx = target.dataset.index
        console.log(idx)
        toggleFavoriteItem(idx,favoritesElem)
        break
      } else {
        console.log(JSON.parse(localStorage.getItem('favoritesAmount')))
      }
    }
  })
}





let favoritesAmount: unknown
let userData: unknown
const toggleFavoritesElem = (favoritesElem:NodeList):void => {
  if(favoriteList === null) return null
  for(let i = 0; i<favoritesElem.length; i++) {
    const elem = favoritesElem[i] as HTMLElement
    console.log(favoriteList, elem.dataset.index)
    if(elem.dataset.index in favoriteList) {
      elem.classList.add('active')
    } else {
      elem.classList.remove('active')
    }
  }

}

const toggleFavoriteItem = (idx: string, favoritesElem: NodeList):void => {
  if(favoriteList === null) favoriteList = {}
  if(idx in favoriteList && favoriteList ) {
    console.log(idx in favoriteList)
    delete favoriteList[idx]
    toggleFavoritesElem(favoritesElem)
  } else {
    favoriteList = {
      [idx]: currentPLace.find((item) => item.id === idx),
      ...favoriteList
    }
    toggleFavoritesElem(favoritesElem)
  }

  localStorage.setItem('favoritesAmount', JSON.stringify(favoriteList))
  userData = getUserData()
  favoritesAmount = getFavoritesAmount()
  if(isUserData(userData)  && typeof favoritesAmount === 'number') {
    renderUserBlock(userData.username,userData.avatarURL,favoritesAmount)
  }
}
