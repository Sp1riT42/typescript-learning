import { renderBlock } from './lib.js';
import { getFavoritesAmount, validateData, getUserData } from './index.js';
import { renderUserBlock } from './user.js';
export function renderSearchStubBlock() {
    renderBlock('search-results-block', `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `);
}
export function renderEmptyOrErrorSearchBlock(reasonMessage) {
    renderBlock('search-results-block', `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `);
}
let currentPLace;
let favoriteList = JSON.parse(localStorage.getItem('favoritesAmount'));
export function renderSearchResultsBlock(place) {
    console.log('renderSearchResultsBlock: ', place);
    currentPLace = place;
    renderBlock('search-results-block', `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites" data-index="1"></div>
            <img class="result-img" src="./img/result-1.png" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>YARD Residence Apart-hotel</p>
              <p class="price">13000&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 2.5км от вас</div>
            <div class="result-info--descr">Комфортный апарт-отель в самом сердце Санкт-Петербрга. К услугам гостей номера с видом на город и бесплатный Wi-Fi.</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites" data-index="2"></div>
            <img class="result-img" src="./img/result-2.png" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>Akyan St.Petersburg</p>
              <p class="price">13000&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 1.1км от вас</div>
            <div class="result-info--descr">Отель Akyan St-Petersburg с бесплатным Wi-Fi на всей территории расположен в историческом здании Санкт-Петербурга.</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    `);
    const resultsList = document.querySelector('.results-list');
    const favoritesElem = document.querySelectorAll('.favorites');
    toggleFavoritesElem(favoritesElem);
    console.log(resultsList);
    resultsList.addEventListener('click', (evt) => {
        console.log('click');
        const target = evt.target;
        const classList = target.classList;
        //console.log(classList)
        for (const val of classList) {
            console.log(val);
            if (val === 'favorites') {
                const idx = Number(target.dataset.index);
                console.log(idx);
                toggleFavoriteItem(idx, favoritesElem);
                break;
            }
            else {
                console.log(JSON.parse(localStorage.getItem('favoritesAmount')));
            }
        }
    });
}
let favoritesAmount;
let userData;
const toggleFavoritesElem = (favoritesElem) => {
    for (let i = 0; i < favoritesElem.length; i++) {
        const elem = favoritesElem[i];
        if (Number(elem.dataset.index) in favoriteList) {
            elem.classList.add('active');
        }
        else {
            elem.classList.remove('active');
        }
    }
};
const toggleFavoriteItem = (idx, favoritesElem) => {
    if (idx in favoriteList) {
        console.log(idx in favoriteList);
        delete favoriteList[idx];
        toggleFavoritesElem(favoritesElem);
    }
    else {
        favoriteList = Object.assign({ [idx]: currentPLace[idx] }, favoriteList);
        toggleFavoritesElem(favoritesElem);
    }
    localStorage.setItem('favoritesAmount', JSON.stringify(favoriteList));
    userData = getUserData();
    const data = validateData(userData);
    favoritesAmount = Number(getFavoritesAmount());
    if (typeof favoritesAmount === 'number') {
        renderUserBlock(data.username, data.avatarURL, favoritesAmount);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBQyxNQUFNLFlBQVksQ0FBQTtBQUN4RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRzFDLE1BQU0sVUFBVSxxQkFBcUI7SUFDbkMsV0FBVyxDQUNULHNCQUFzQixFQUN0Qjs7Ozs7S0FLQyxDQUNGLENBQUE7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLDZCQUE2QixDQUFFLGFBQWE7SUFDMUQsV0FBVyxDQUNULHNCQUFzQixFQUN0Qjs7O1dBR08sYUFBYTs7S0FFbkIsQ0FDRixDQUFBO0FBQ0gsQ0FBQztBQVlELElBQUksWUFBb0IsQ0FBQTtBQUN4QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFBO0FBRXRFLE1BQU0sVUFBVSx3QkFBd0IsQ0FBRSxLQUFZO0lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDaEQsWUFBWSxHQUFHLEtBQUssQ0FBQTtJQUNwQixXQUFXLENBQ1Qsc0JBQXNCLEVBQ3RCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXdEQyxDQUNGLENBQUE7SUFFRCxNQUFNLFdBQVcsR0FBZSxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ3ZFLE1BQU0sYUFBYSxHQUFZLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUV0RSxtQkFBbUIsQ0FBQyxhQUFhLENB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XG5pbXBvcnQge2dldEZhdm9yaXRlc0Ftb3VudCwgdmFsaWRhdGVEYXRhLCBnZXRVc2VyRGF0YX0gZnJvbSAnLi9pbmRleC5qcydcbmltcG9ydCB7cmVuZGVyVXNlckJsb2NrfSBmcm9tICcuL3VzZXIuanMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hTdHViQmxvY2sgKCkge1xuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLXJlc3VsdHMtYmxvY2snLFxuICAgIGBcbiAgICA8ZGl2IGNsYXNzPVwiYmVmb3JlLXJlc3VsdHMtYmxvY2tcIj5cbiAgICAgIDxpbWcgc3JjPVwiaW1nL3N0YXJ0LXNlYXJjaC5wbmdcIiAvPlxuICAgICAgPHA+0KfRgtC+0LHRiyDQvdCw0YfQsNGC0Ywg0L/QvtC40YHQuiwg0LfQsNC/0L7Qu9C90LjRgtC1INGE0L7RgNC80YMg0LgmbmJzcDvQvdCw0LbQvNC40YLQtSBcItCd0LDQudGC0LhcIjwvcD5cbiAgICA8L2Rpdj5cbiAgICBgXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckVtcHR5T3JFcnJvclNlYXJjaEJsb2NrIChyZWFzb25NZXNzYWdlKSB7XG4gIHJlbmRlckJsb2NrKFxuICAgICdzZWFyY2gtcmVzdWx0cy1ibG9jaycsXG4gICAgYFxuICAgIDxkaXYgY2xhc3M9XCJuby1yZXN1bHRzLWJsb2NrXCI+XG4gICAgICA8aW1nIHNyYz1cImltZy9uby1yZXN1bHRzLnBuZ1wiIC8+XG4gICAgICA8cD4ke3JlYXNvbk1lc3NhZ2V9PC9wPlxuICAgIDwvZGl2PlxuICAgIGBcbiAgKVxufVxuXG5pbnRlcmZhY2UgSVBsYWNlIHtcbiAgaWQ6IG51bWJlcixcbiAgbmFtZTogc3RyaW5nLFxuICBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICBpbWFnZTogc3RyaW5nLFxuICByZW1vdGVuZXNzOiBudW1iZXIsXG4gIGJvb2tlZERhdGVzOiBbXSxcbiAgcHJpY2U6IG51bWJlclxufVxuXG5sZXQgY3VycmVudFBMYWNlOiBJUGxhY2VcbmxldCBmYXZvcml0ZUxpc3QgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmYXZvcml0ZXNBbW91bnQnKSlcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNlYXJjaFJlc3VsdHNCbG9jayAocGxhY2U6SVBsYWNlKSB7XG4gIGNvbnNvbGUubG9nKCdyZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2s6ICcsIHBsYWNlKVxuICBjdXJyZW50UExhY2UgPSBwbGFjZVxuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLXJlc3VsdHMtYmxvY2snLFxuICAgIGBcbiAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLXJlc3VsdHMtaGVhZGVyXCI+XG4gICAgICAgIDxwPtCg0LXQt9GD0LvRjNGC0LDRgtGLINC/0L7QuNGB0LrQsDwvcD5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1yZXN1bHRzLWZpbHRlclwiPlxuICAgICAgICAgICAgPHNwYW4+PGkgY2xhc3M9XCJpY29uIGljb24tZmlsdGVyXCI+PC9pPiDQodC+0YDRgtC40YDQvtCy0LDRgtGMOjwvc3Bhbj5cbiAgICAgICAgICAgIDxzZWxlY3Q+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiBzZWxlY3RlZD1cIlwiPtCh0L3QsNGH0LDQu9CwINC00LXRiNGR0LLRi9C1PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiBzZWxlY3RlZD1cIlwiPtCh0L3QsNGH0LDQu9CwINC00L7RgNC+0LPQuNC1PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbj7QodC90LDRh9Cw0LvQsCDQsdC70LjQttC1PC9vcHRpb24+XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPHVsIGNsYXNzPVwicmVzdWx0cy1saXN0XCI+XG4gICAgICA8bGkgY2xhc3M9XCJyZXN1bHRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWltZy1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmYXZvcml0ZXNcIiBkYXRhLWluZGV4PVwiMVwiPjwvZGl2PlxuICAgICAgICAgICAgPGltZyBjbGFzcz1cInJlc3VsdC1pbWdcIiBzcmM9XCIuL2ltZy9yZXN1bHQtMS5wbmdcIiBhbHQ9XCJcIj5cbiAgICAgICAgICA8L2Rpdj5cdFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mb1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgPHA+WUFSRCBSZXNpZGVuY2UgQXBhcnQtaG90ZWw8L3A+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJpY2VcIj4xMzAwMCYjODM4MTs8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0tbWFwXCI+PGkgY2xhc3M9XCJtYXAtaWNvblwiPjwvaT4gMi410LrQvCDQvtGCINCy0LDRgTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1kZXNjclwiPtCa0L7QvNGE0L7RgNGC0L3Ri9C5INCw0L/QsNGA0YIt0L7RgtC10LvRjCDQsiDRgdCw0LzQvtC8INGB0LXRgNC00YbQtSDQodCw0L3QutGCLdCf0LXRgtC10YDQsdGA0LPQsC4g0Jog0YPRgdC70YPQs9Cw0Lwg0LPQvtGB0YLQtdC5INC90L7QvNC10YDQsCDRgSDQstC40LTQvtC8INC90LAg0LPQvtGA0L7QtCDQuCDQsdC10YHQv9C70LDRgtC90YvQuSBXaS1GaS48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0tZm9vdGVyXCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbj7Ql9Cw0LHRgNC+0L3QuNGA0L7QstCw0YLRjDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgY2xhc3M9XCJyZXN1bHRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWltZy1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmYXZvcml0ZXNcIiBkYXRhLWluZGV4PVwiMlwiPjwvZGl2PlxuICAgICAgICAgICAgPGltZyBjbGFzcz1cInJlc3VsdC1pbWdcIiBzcmM9XCIuL2ltZy9yZXN1bHQtMi5wbmdcIiBhbHQ9XCJcIj5cbiAgICAgICAgICA8L2Rpdj5cdFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mb1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgPHA+QWt5YW4gU3QuUGV0ZXJzYnVyZzwvcD5cbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcmljZVwiPjEzMDAwJiM4MzgxOzwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1tYXBcIj48aSBjbGFzcz1cIm1hcC1pY29uXCI+PC9pPiAxLjHQutC8INC+0YIg0LLQsNGBPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWRlc2NyXCI+0J7RgtC10LvRjCBBa3lhbiBTdC1QZXRlcnNidXJnINGBINCx0LXRgdC/0LvQsNGC0L3Ri9C8IFdpLUZpINC90LAg0LLRgdC10Lkg0YLQtdGA0YDQuNGC0L7RgNC40Lgg0YDQsNGB0L/QvtC70L7QttC10L0g0LIg0LjRgdGC0L7RgNC40YfQtdGB0LrQvtC8INC30LTQsNC90LjQuCDQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQs9CwLjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1mb290ZXJcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uPtCX0LDQsdGA0L7QvdC40YDQvtCy0LDRgtGMPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICAgIGBcbiAgKVxuXG4gIGNvbnN0IHJlc3VsdHNMaXN0OkhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdHMtbGlzdCcpXG4gIGNvbnN0IGZhdm9yaXRlc0VsZW06Tm9kZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmF2b3JpdGVzJylcblxuICB0b2dnbGVGYXZvcml0ZXNFbGVtKGZhdm9yaXRlc0VsZW0pXG5cbiAgY29uc29sZS5sb2cocmVzdWx0c0xpc3QpXG4gIHJlc3VsdHNMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdjbGljaycpXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldCBhcyBIVE1MRWxlbWVudFxuICAgIGNvbnN0IGNsYXNzTGlzdCA9IHRhcmdldC5jbGFzc0xpc3RcbiAgICAvL2NvbnNvbGUubG9nKGNsYXNzTGlzdClcbiAgICBmb3IoY29uc3QgdmFsIG9mIGNsYXNzTGlzdCkge1xuICAgICAgY29uc29sZS5sb2codmFsKVxuICAgICAgaWYodmFsID09PSAnZmF2b3JpdGVzJykge1xuICAgICAgICBjb25zdCBpZHggPSBOdW1iZXIodGFyZ2V0LmRhdGFzZXQuaW5kZXgpXG4gICAgICAgIGNvbnNvbGUubG9nKGlkeClcbiAgICAgICAgdG9nZ2xlRmF2b3JpdGVJdGVtKGlkeCxmYXZvcml0ZXNFbGVtKVxuXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmYXZvcml0ZXNBbW91bnQnKSkpXG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuXG5cblxuXG5sZXQgZmF2b3JpdGVzQW1vdW50OiB1bmtub3duXG5sZXQgdXNlckRhdGE6IHVua25vd25cbmNvbnN0IHRvZ2dsZUZhdm9yaXRlc0VsZW0gPSAoZmF2b3JpdGVzRWxlbTpOb2RlTGlzdCkgPT4ge1xuICBmb3IobGV0IGkgPSAwOyBpPGZhdm9yaXRlc0VsZW0ubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbGVtID0gZmF2b3JpdGVzRWxlbVtpXSBhcyBIVE1MRWxlbWVudFxuICAgIGlmKE51bWJlcihlbGVtLmRhdGFzZXQuaW5kZXgpIGluIGZhdm9yaXRlTGlzdCkge1xuICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgfVxuICB9XG5cbn1cblxuY29uc3QgdG9nZ2xlRmF2b3JpdGVJdGVtID0gKGlkeDogbnVtYmVyLCBmYXZvcml0ZXNFbGVtOiBOb2RlTGlzdCkgPT4ge1xuICBpZihpZHggaW4gZmF2b3JpdGVMaXN0KSB7XG4gICAgY29uc29sZS5sb2coaWR4IGluIGZhdm9yaXRlTGlzdClcbiAgICBkZWxldGUgZmF2b3JpdGVMaXN0W2lkeF1cbiAgICB0b2dnbGVGYXZvcml0ZXNFbGVtKGZhdm9yaXRlc0VsZW0pXG4gIH0gZWxzZSB7XG4gICAgZmF2b3JpdGVMaXN0ID0ge1xuICAgICAgW2lkeF06IGN1cnJlbnRQTGFjZVtpZHhdLFxuICAgICAgLi4uZmF2b3JpdGVMaXN0XG4gICAgfVxuICAgIHRvZ2dsZUZhdm9yaXRlc0VsZW0oZmF2b3JpdGVzRWxlbSlcbiAgfVxuXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmYXZvcml0ZXNBbW91bnQnLCBKU09OLnN0cmluZ2lmeShmYXZvcml0ZUxpc3QpKVxuICB1c2VyRGF0YSA9IGdldFVzZXJEYXRhKClcbiAgY29uc3QgZGF0YSA9ICB2YWxpZGF0ZURhdGEodXNlckRhdGEpXG4gIGZhdm9yaXRlc0Ftb3VudCA9IE51bWJlcihnZXRGYXZvcml0ZXNBbW91bnQoKSlcbiAgaWYodHlwZW9mIGZhdm9yaXRlc0Ftb3VudCA9PT0gJ251bWJlcicpIHtcbiAgICByZW5kZXJVc2VyQmxvY2soZGF0YS51c2VybmFtZSxkYXRhLmF2YXRhclVSTCxmYXZvcml0ZXNBbW91bnQpXG4gIH1cbn1cbiJdfQ==