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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBQyxNQUFNLFlBQVksQ0FBQTtBQUN4RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRTFDLE1BQU0sVUFBVSxxQkFBcUI7SUFDbkMsV0FBVyxDQUNULHNCQUFzQixFQUN0Qjs7Ozs7S0FLQyxDQUNGLENBQUE7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLDZCQUE2QixDQUFFLGFBQWE7SUFDMUQsV0FBVyxDQUNULHNCQUFzQixFQUN0Qjs7O1dBR08sYUFBYTs7S0FFbkIsQ0FDRixDQUFBO0FBQ0gsQ0FBQztBQVlELElBQUksWUFBb0IsQ0FBQTtBQUN4QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFBO0FBRXRFLE1BQU0sVUFBVSx3QkFBd0IsQ0FBRSxLQUFZO0lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDaEQsWUFBWSxHQUFHLEtBQUssQ0FBQTtJQUNwQixXQUFXLENBQ1Qsc0JBQXNCLEVBQ3RCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXdEQyxDQUNGLENBQUE7SUFFRCxNQUFNLFdBQVcsR0FBZSxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ3ZFLE1BQU0sYUFBYSxHQUFZLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUV0RSxtQkFBbUIsQ0FBQyxhQUFhLENB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XG5pbXBvcnQge2dldEZhdm9yaXRlc0Ftb3VudCwgdmFsaWRhdGVEYXRhLCBnZXRVc2VyRGF0YX0gZnJvbSAnLi9pbmRleC5qcydcbmltcG9ydCB7cmVuZGVyVXNlckJsb2NrfSBmcm9tICcuL3VzZXIuanMnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2VhcmNoU3R1YkJsb2NrICgpIHtcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcbiAgICBgXG4gICAgPGRpdiBjbGFzcz1cImJlZm9yZS1yZXN1bHRzLWJsb2NrXCI+XG4gICAgICA8aW1nIHNyYz1cImltZy9zdGFydC1zZWFyY2gucG5nXCIgLz5cbiAgICAgIDxwPtCn0YLQvtCx0Ysg0L3QsNGH0LDRgtGMINC/0L7QuNGB0LosINC30LDQv9C+0LvQvdC40YLQtSDRhNC+0YDQvNGDINC4Jm5ic3A70L3QsNC20LzQuNGC0LUgXCLQndCw0LnRgtC4XCI8L3A+XG4gICAgPC9kaXY+XG4gICAgYFxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJFbXB0eU9yRXJyb3JTZWFyY2hCbG9jayAocmVhc29uTWVzc2FnZSkge1xuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLXJlc3VsdHMtYmxvY2snLFxuICAgIGBcbiAgICA8ZGl2IGNsYXNzPVwibm8tcmVzdWx0cy1ibG9ja1wiPlxuICAgICAgPGltZyBzcmM9XCJpbWcvbm8tcmVzdWx0cy5wbmdcIiAvPlxuICAgICAgPHA+JHtyZWFzb25NZXNzYWdlfTwvcD5cbiAgICA8L2Rpdj5cbiAgICBgXG4gIClcbn1cblxuaW50ZXJmYWNlIElQbGFjZSB7XG4gIGlkOiBudW1iZXIsXG4gIG5hbWU6IHN0cmluZyxcbiAgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgaW1hZ2U6IHN0cmluZyxcbiAgcmVtb3RlbmVzczogbnVtYmVyLFxuICBib29rZWREYXRlczogW10sXG4gIHByaWNlOiBudW1iZXJcbn1cblxubGV0IGN1cnJlbnRQTGFjZTogSVBsYWNlXG5sZXQgZmF2b3JpdGVMaXN0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmF2b3JpdGVzQW1vdW50JykpXG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2sgKHBsYWNlOklQbGFjZSkge1xuICBjb25zb2xlLmxvZygncmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrOiAnLCBwbGFjZSlcbiAgY3VycmVudFBMYWNlID0gcGxhY2VcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcbiAgICBgXG4gICAgPGRpdiBjbGFzcz1cInNlYXJjaC1yZXN1bHRzLWhlYWRlclwiPlxuICAgICAgICA8cD7QoNC10LfRg9C70YzRgtCw0YLRiyDQv9C+0LjRgdC60LA8L3A+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtcmVzdWx0cy1maWx0ZXJcIj5cbiAgICAgICAgICAgIDxzcGFuPjxpIGNsYXNzPVwiaWNvbiBpY29uLWZpbHRlclwiPjwvaT4g0KHQvtGA0YLQuNGA0L7QstCw0YLRjDo8L3NwYW4+XG4gICAgICAgICAgICA8c2VsZWN0PlxuICAgICAgICAgICAgICAgIDxvcHRpb24gc2VsZWN0ZWQ9XCJcIj7QodC90LDRh9Cw0LvQsCDQtNC10YjRkdCy0YvQtTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gc2VsZWN0ZWQ9XCJcIj7QodC90LDRh9Cw0LvQsCDQtNC+0YDQvtCz0LjQtTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24+0KHQvdCw0YfQsNC70LAg0LHQu9C40LbQtTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDx1bCBjbGFzcz1cInJlc3VsdHMtbGlzdFwiPlxuICAgICAgPGxpIGNsYXNzPVwicmVzdWx0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbWctY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmF2b3JpdGVzXCIgZGF0YS1pbmRleD1cIjFcIj48L2Rpdj5cbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJyZXN1bHQtaW1nXCIgc3JjPVwiLi9pbWcvcmVzdWx0LTEucG5nXCIgYWx0PVwiXCI+XG4gICAgICAgICAgPC9kaXY+XHRcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm9cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0taGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxwPllBUkQgUmVzaWRlbmNlIEFwYXJ0LWhvdGVsPC9wPlxuICAgICAgICAgICAgICA8cCBjbGFzcz1cInByaWNlXCI+MTMwMDAmIzgzODE7PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLW1hcFwiPjxpIGNsYXNzPVwibWFwLWljb25cIj48L2k+IDIuNdC60Lwg0L7RgiDQstCw0YE8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0tZGVzY3JcIj7QmtC+0LzRhNC+0YDRgtC90YvQuSDQsNC/0LDRgNGCLdC+0YLQtdC70Ywg0LIg0YHQsNC80L7QvCDRgdC10YDQtNGG0LUg0KHQsNC90LrRgi3Qn9C10YLQtdGA0LHRgNCz0LAuINCaINGD0YHQu9GD0LPQsNC8INCz0L7RgdGC0LXQuSDQvdC+0LzQtdGA0LAg0YEg0LLQuNC00L7QvCDQvdCwINCz0L7RgNC+0LQg0Lgg0LHQtdGB0L/Qu9Cw0YLQvdGL0LkgV2ktRmkuPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWZvb3RlclwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24+0JfQsNCx0YDQvtC90LjRgNC+0LLQsNGC0Yw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPVwicmVzdWx0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbWctY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmF2b3JpdGVzXCIgZGF0YS1pbmRleD1cIjJcIj48L2Rpdj5cbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJyZXN1bHQtaW1nXCIgc3JjPVwiLi9pbWcvcmVzdWx0LTIucG5nXCIgYWx0PVwiXCI+XG4gICAgICAgICAgPC9kaXY+XHRcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm9cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0taGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxwPkFreWFuIFN0LlBldGVyc2J1cmc8L3A+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJpY2VcIj4xMzAwMCYjODM4MTs8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0tbWFwXCI+PGkgY2xhc3M9XCJtYXAtaWNvblwiPjwvaT4gMS4x0LrQvCDQvtGCINCy0LDRgTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1kZXNjclwiPtCe0YLQtdC70YwgQWt5YW4gU3QtUGV0ZXJzYnVyZyDRgSDQsdC10YHQv9C70LDRgtC90YvQvCBXaS1GaSDQvdCwINCy0YHQtdC5INGC0LXRgNGA0LjRgtC+0YDQuNC4INGA0LDRgdC/0L7Qu9C+0LbQtdC9INCyINC40YHRgtC+0YDQuNGH0LXRgdC60L7QvCDQt9C00LDQvdC40Lgg0KHQsNC90LrRgi3Qn9C10YLQtdGA0LHRg9GA0LPQsC48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0tZm9vdGVyXCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbj7Ql9Cw0LHRgNC+0L3QuNGA0L7QstCw0YLRjDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgICBgXG4gIClcblxuICBjb25zdCByZXN1bHRzTGlzdDpIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzLWxpc3QnKVxuICBjb25zdCBmYXZvcml0ZXNFbGVtOk5vZGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZhdm9yaXRlcycpXG5cbiAgdG9nZ2xlRmF2b3JpdGVzRWxlbShmYXZvcml0ZXNFbGVtKVxuXG4gIGNvbnNvbGUubG9nKHJlc3VsdHNMaXN0KVxuICByZXN1bHRzTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpID0+IHtcbiAgICBjb25zb2xlLmxvZygnY2xpY2snKVxuICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXQgYXMgSFRNTEVsZW1lbnRcbiAgICBjb25zdCBjbGFzc0xpc3QgPSB0YXJnZXQuY2xhc3NMaXN0XG4gICAgLy9jb25zb2xlLmxvZyhjbGFzc0xpc3QpXG4gICAgZm9yKGNvbnN0IHZhbCBvZiBjbGFzc0xpc3QpIHtcbiAgICAgIGNvbnNvbGUubG9nKHZhbClcbiAgICAgIGlmKHZhbCA9PT0gJ2Zhdm9yaXRlcycpIHtcbiAgICAgICAgY29uc3QgaWR4ID0gTnVtYmVyKHRhcmdldC5kYXRhc2V0LmluZGV4KVxuICAgICAgICBjb25zb2xlLmxvZyhpZHgpXG4gICAgICAgIHRvZ2dsZUZhdm9yaXRlSXRlbShpZHgsZmF2b3JpdGVzRWxlbSlcblxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmF2b3JpdGVzQW1vdW50JykpKVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn1cblxuXG5cblxubGV0IGZhdm9yaXRlc0Ftb3VudDogdW5rbm93blxubGV0IHVzZXJEYXRhOiB1bmtub3duXG5jb25zdCB0b2dnbGVGYXZvcml0ZXNFbGVtID0gKGZhdm9yaXRlc0VsZW06Tm9kZUxpc3QpID0+IHtcbiAgZm9yKGxldCBpID0gMDsgaTxmYXZvcml0ZXNFbGVtLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZWxlbSA9IGZhdm9yaXRlc0VsZW1baV0gYXMgSFRNTEVsZW1lbnRcbiAgICBpZihOdW1iZXIoZWxlbS5kYXRhc2V0LmluZGV4KSBpbiBmYXZvcml0ZUxpc3QpIHtcbiAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgIH1cbiAgfVxuXG59XG5cbmNvbnN0IHRvZ2dsZUZhdm9yaXRlSXRlbSA9IChpZHg6IG51bWJlciwgZmF2b3JpdGVzRWxlbTogTm9kZUxpc3QpID0+IHtcbiAgaWYoaWR4IGluIGZhdm9yaXRlTGlzdCkge1xuICAgIGNvbnNvbGUubG9nKGlkeCBpbiBmYXZvcml0ZUxpc3QpXG4gICAgZGVsZXRlIGZhdm9yaXRlTGlzdFtpZHhdXG4gICAgdG9nZ2xlRmF2b3JpdGVzRWxlbShmYXZvcml0ZXNFbGVtKVxuICB9IGVsc2Uge1xuICAgIGZhdm9yaXRlTGlzdCA9IHtcbiAgICAgIFtpZHhdOiBjdXJyZW50UExhY2VbaWR4XSxcbiAgICAgIC4uLmZhdm9yaXRlTGlzdFxuICAgIH1cbiAgICB0b2dnbGVGYXZvcml0ZXNFbGVtKGZhdm9yaXRlc0VsZW0pXG4gIH1cblxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmF2b3JpdGVzQW1vdW50JywgSlNPTi5zdHJpbmdpZnkoZmF2b3JpdGVMaXN0KSlcbiAgdXNlckRhdGEgPSBnZXRVc2VyRGF0YSgpXG4gIGNvbnN0IGRhdGEgPSAgdmFsaWRhdGVEYXRhKHVzZXJEYXRhKVxuICBmYXZvcml0ZXNBbW91bnQgPSBOdW1iZXIoZ2V0RmF2b3JpdGVzQW1vdW50KCkpXG4gIGlmKHR5cGVvZiBmYXZvcml0ZXNBbW91bnQgPT09ICdudW1iZXInKSB7XG4gICAgcmVuZGVyVXNlckJsb2NrKGRhdGEudXNlcm5hbWUsZGF0YS5hdmF0YXJVUkwsZmF2b3JpdGVzQW1vdW50KVxuICB9XG59XG4iXX0=