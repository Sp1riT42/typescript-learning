import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'

const date = new Date()
const nextDate = new Date(date.getFullYear(), date.getMonth(),date.getDate() +1)
const nextDateDay = nextDate.getDate() < 10 ? '0' + nextDate.getDate() : nextDate.getDate()
const nextDateMonth = nextDate.getMonth() + 1 < 10 ? '0' + (nextDate.getMonth() + 1) : nextDate.getMonth() + 1
const nextDateYear = nextDate.getFullYear() + ''
const nextDay = `${nextDateYear}-${nextDateMonth}-${nextDateDay}`
const secondDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3);
const secondDateDay = secondDate.getDate() < 10 ? '0' + secondDate.getDate() : secondDate.getDate();
const secondDateMonth = secondDate.getMonth() + 1 < 10 ? '0' + (secondDate.getMonth() + 1) : secondDate.getMonth() + 1;
const secondDateYear = secondDate.getFullYear() + '';
const secondDay = `${secondDateYear}-${secondDateMonth}-${secondDateDay}`;

let userData: unknown
let favoritesAmount: unknown
interface UserData {
  username: string,
  avatarURL: string
}

export const getUserData = ():UserData => {
  localStorage.setItem('user', JSON.stringify({username: 'John Smith', avatarURL: '/img/avatar.png'}))
  return  JSON.parse(localStorage.getItem('user') as string)
}

export const isUserData = (data: unknown):data is UserData => {
  return typeof data === 'object' && data !== null && 'username' in data && 'avatarURL' in data
}

export const getFavoritesAmount = ():number => {
  //console.log(JSON.parse(localStorage.getItem('favoritesAmount')))
  const result: string | null = localStorage.getItem('favoritesAmount')
  if(result !== null) {
    return Object.keys(JSON.parse(result)).length
  }
  return 0
}

window.addEventListener('DOMContentLoaded', () => {
  userData = getUserData()
  favoritesAmount = getFavoritesAmount()
  if(isUserData(userData) && typeof favoritesAmount === 'number') {
    renderUserBlock(userData.username, userData.avatarURL, favoritesAmount)
  }
  renderSearchFormBlock(nextDay, secondDay)
  renderSearchStubBlock()
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  )
})

