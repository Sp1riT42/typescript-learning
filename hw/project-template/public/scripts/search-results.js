import { renderBlock } from './lib.js';
import { getFavoritesAmount, isUserData, getUserData } from './index.js';
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
let selectSort;
let resultList;
let favoritesElem;
const renderApartmentList = (currentPLace, selectSort) => {
    resultList.innerText = '';
    const arr = [...currentPLace];
    console.log(selectSort.value);
    switch (selectSort.value) {
        case 'minPrice':
            arr.sort((a, b) => a.price - b.price);
            break;
        case 'maxPrice':
            arr.sort((a, b) => b.price - a.price);
            break;
        case 'closer':
            arr.sort((a, b) => a.remoteness - b.remoteness);
            break;
    }
    arr.map((item) => {
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
        </li>`);
    });
    favoritesElem = document.querySelectorAll('.favorites');
    toggleFavoritesElem(favoritesElem);
};
export function renderSearchResultsBlock(place) {
    console.log('renderSearchResultsBlock: ', place);
    currentPLace = place;
    renderBlock('search-results-block', `
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
    `);
    const resultsList = document.querySelector('.results-list');
    resultList = document.querySelector('.results-list');
    selectSort = document.querySelector('#selectSort');
    renderApartmentList(currentPLace, selectSort);
    selectSort.addEventListener('change', () => {
        renderApartmentList(currentPLace, selectSort);
    });
    toggleFavoritesElem(favoritesElem);
    console.log(resultsList);
    resultsList.addEventListener('click', (evt) => {
        console.log('click');
        const target = evt.target;
        const classList = target.classList;
        for (const val of classList) {
            console.log(val);
            if (val === 'favorites') {
                const idx = target.dataset.index;
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
    if (favoriteList === null)
        return null;
    for (let i = 0; i < favoritesElem.length; i++) {
        const elem = favoritesElem[i];
        console.log(favoriteList, elem.dataset.index);
        if (elem.dataset.index in favoriteList) {
            elem.classList.add('active');
        }
        else {
            elem.classList.remove('active');
        }
    }
};
const toggleFavoriteItem = (idx, favoritesElem) => {
    if (favoriteList === null)
        favoriteList = {};
    if (idx in favoriteList && favoriteList) {
        console.log(idx in favoriteList);
        delete favoriteList[idx];
        toggleFavoritesElem(favoritesElem);
    }
    else {
        favoriteList = Object.assign({ [idx]: currentPLace.find((item) => item.id === idx) }, favoriteList);
        toggleFavoritesElem(favoritesElem);
    }
    localStorage.setItem('favoritesAmount', JSON.stringify(favoriteList));
    userData = getUserData();
    favoritesAmount = getFavoritesAmount();
    if (isUserData(userData) && typeof favoritesAmount === 'number') {
        renderUserBlock(userData.username, userData.avatarURL, favoritesAmount);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBQyxNQUFNLFlBQVksQ0FBQTtBQUN0RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBSTFDLE1BQU0sVUFBVSxxQkFBcUI7SUFDbkMsV0FBVyxDQUNULHNCQUFzQixFQUN0Qjs7Ozs7S0FLQyxDQUNGLENBQUE7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLDZCQUE2QixDQUFFLGFBQWE7SUFDMUQsV0FBVyxDQUNULHNCQUFzQixFQUN0Qjs7O1dBR08sYUFBYTs7S0FFbkIsQ0FDRixDQUFBO0FBQ0gsQ0FBQztBQVlELElBQUksWUFBMEIsQ0FBQTtBQUM5QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFBO0FBQ3RFLElBQUksVUFBNEIsQ0FBQTtBQUNoQyxJQUFJLFVBQTRCLENBQUE7QUFDaEMsSUFBSSxhQUFzQixDQUFBO0FBQzFCLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxZQUEwQixFQUFFLFVBQXdDLEVBQUUsRUFBRTtJQUNuRyxVQUFVLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUN6QixNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUE7SUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDN0IsUUFBUSxVQUFVLENBQUMsS0FBSyxFQUFDO1FBQ3pCLEtBQUssVUFBVTtZQUNiLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFF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RSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsSUFDaEQsWUFBWSxDQUNoQixDQUFBO1FBQ0QsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUE7S0FDbkM7SUFFRCxZQUFZLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtJQUNyRSxRQUFRLEdBQUcsV0FBVyxFQUFFLENBQUE7SUFDeEIsZUFBZSxHQUFHLGtCQUFrQixFQUFFLENBQUE7SUFDdEMsSUFBRyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUssT0FBTyxlQUFlLEtBQUssUUFBUSxFQUFFO1FBQy9ELGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUMsZUFBZSxDQUFDLENBQUE7S0FDdEU7QUFDSCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJCbG9jayB9IGZyb20gJy4vbGliLmpzJ1xuaW1wb3J0IHtnZXRGYXZvcml0ZXNBbW91bnQsIGlzVXNlckRhdGEsIGdldFVzZXJEYXRhfSBmcm9tICcuL2luZGV4LmpzJ1xuaW1wb3J0IHtyZW5kZXJVc2VyQmxvY2t9IGZyb20gJy4vdXNlci5qcyc7XG5pbXBvcnQge0FwYXJ0bWVudHN9IGZyb20gJy4vYm9va2luZ1NlcnZpY2UvZG9tYWluL2FwYXJ0bWVudHMuanMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hTdHViQmxvY2sgKCkge1xuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLXJlc3VsdHMtYmxvY2snLFxuICAgIGBcbiAgICA8ZGl2IGNsYXNzPVwiYmVmb3JlLXJlc3VsdHMtYmxvY2tcIj5cbiAgICAgIDxpbWcgc3JjPVwiaW1nL3N0YXJ0LXNlYXJjaC5wbmdcIiAvPlxuICAgICAgPHA+0KfRgtC+0LHRiyDQvdCw0YfQsNGC0Ywg0L/QvtC40YHQuiwg0LfQsNC/0L7Qu9C90LjRgtC1INGE0L7RgNC80YMg0LgmbmJzcDvQvdCw0LbQvNC40YLQtSBcItCd0LDQudGC0LhcIjwvcD5cbiAgICA8L2Rpdj5cbiAgICBgXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckVtcHR5T3JFcnJvclNlYXJjaEJsb2NrIChyZWFzb25NZXNzYWdlKSB7XG4gIHJlbmRlckJsb2NrKFxuICAgICdzZWFyY2gtcmVzdWx0cy1ibG9jaycsXG4gICAgYFxuICAgIDxkaXYgY2xhc3M9XCJuby1yZXN1bHRzLWJsb2NrXCI+XG4gICAgICA8aW1nIHNyYz1cImltZy9uby1yZXN1bHRzLnBuZ1wiIC8+XG4gICAgICA8cD4ke3JlYXNvbk1lc3NhZ2V9PC9wPlxuICAgIDwvZGl2PlxuICAgIGBcbiAgKVxufVxuXG5pbnRlcmZhY2UgSVBsYWNlIHtcbiAgaWQ6IG51bWJlcixcbiAgbmFtZTogc3RyaW5nLFxuICBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICBpbWFnZTogc3RyaW5nLFxuICByZW1vdGVuZXNzOiBudW1iZXIsXG4gIGJvb2tlZERhdGVzOiBbXSxcbiAgcHJpY2U6IG51bWJlclxufVxuXG5sZXQgY3VycmVudFBMYWNlOiBBcGFydG1lbnRzW11cbmxldCBmYXZvcml0ZUxpc3QgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmYXZvcml0ZXNBbW91bnQnKSlcbmxldCBzZWxlY3RTb3J0OkhUTUxTZWxlY3RFbGVtZW50XG5sZXQgcmVzdWx0TGlzdDpIVE1MU2VsZWN0RWxlbWVudFxubGV0IGZhdm9yaXRlc0VsZW06Tm9kZUxpc3RcbmNvbnN0IHJlbmRlckFwYXJ0bWVudExpc3QgPSAoY3VycmVudFBMYWNlOiBBcGFydG1lbnRzW10sIHNlbGVjdFNvcnQ6SFRNTFNlbGVjdEVsZW1lbnQgfCB1bmRlZmluZWQpID0+IHtcbiAgcmVzdWx0TGlzdC5pbm5lclRleHQgPSAnJ1xuICBjb25zdCBhcnIgPSBbLi4uY3VycmVudFBMYWNlXVxuICBjb25zb2xlLmxvZyhzZWxlY3RTb3J0LnZhbHVlKVxuICBzd2l0Y2ggKHNlbGVjdFNvcnQudmFsdWUpe1xuICBjYXNlICdtaW5QcmljZSc6XG4gICAgYXJyLnNvcnQoKGEsIGIpID0+IGEucHJpY2UgLSBiLnByaWNlKVxuICAgIGJyZWFrXG4gIGNhc2UgJ21heFByaWNlJzpcbiAgICBhcnIuc29ydCgoYSwgYikgPT4gYi5wcmljZSAtIGEucHJpY2UpXG4gICAgYnJlYWtcbiAgY2FzZSAnY2xvc2VyJzpcbiAgICBhcnIuc29ydCgoYSwgYikgPT4gYS5yZW1vdGVuZXNzIC0gYi5yZW1vdGVuZXNzKVxuICAgIGJyZWFrXG4gIH1cblxuICBhcnIubWFwKChpdGVtOkFwYXJ0bWVudHMpOnZvaWQgPT4ge1xuICAgIHJlc3VsdExpc3QuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgPGxpIGNsYXNzPVwicmVzdWx0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbWctY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmF2b3JpdGVzXCIgZGF0YS1pbmRleD1cIiR7aXRlbS5pZH1cIj48L2Rpdj5cbiAgICAgICAgPGltZyBjbGFzcz1cInJlc3VsdC1pbWdcIiBzcmM9XCIke2l0ZW0uaW1hZ2V9XCIgYWx0PVwiXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm9cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0taGVhZGVyXCI+XG4gICAgICAgIDxwPiR7aXRlbS5uYW1lfTwvcD5cbiAgICAgIDxwIGNsYXNzPVwicHJpY2VcIj4ke2l0ZW0ucHJpY2V9JiM4MzgxOzwvcD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1tYXBcIj48aSBjbGFzcz1cIm1hcC1pY29uXCI+PC9pPiAke2l0ZW0ucmVtb3RlbmVzc33QutC8INC+0YIg0LLQsNGBPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWRlc2NyXCI+JHtpdGVtLmRlc2NyaXB0aW9ufTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1mb290ZXJcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8YnV0dG9uPtCX0LDQsdGA0L7QvdC40YDQvtCy0LDRgtGMPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8L2xpPmApXG4gIH0pXG4gIGZhdm9yaXRlc0VsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmF2b3JpdGVzJylcbiAgdG9nZ2xlRmF2b3JpdGVzRWxlbShmYXZvcml0ZXNFbGVtKVxufVxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNlYXJjaFJlc3VsdHNCbG9jayAocGxhY2U6QXBhcnRtZW50c1tdKSB7XG4gIGNvbnNvbGUubG9nKCdyZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2s6ICcsIHBsYWNlKVxuICBjdXJyZW50UExhY2UgPSBwbGFjZVxuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLXJlc3VsdHMtYmxvY2snLFxuICAgIGBcbiAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLXJlc3VsdHMtaGVhZGVyXCI+XG4gICAgICAgIDxwPtCg0LXQt9GD0LvRjNGC0LDRgtGLINC/0L7QuNGB0LrQsDwvcD5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1yZXN1bHRzLWZpbHRlclwiPlxuICAgICAgICAgICAgPHNwYW4+PGkgY2xhc3M9XCJpY29uIGljb24tZmlsdGVyXCI+PC9pPiDQodC+0YDRgtC40YDQvtCy0LDRgtGMOjwvc3Bhbj5cbiAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJzZWxlY3RTb3J0XCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm1pblByaWNlXCIgPtCh0L3QsNGH0LDQu9CwINC00LXRiNGR0LLRi9C1PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm1heFByaWNlXCI+0KHQvdCw0YfQsNC70LAg0LTQvtGA0L7Qs9C40LU8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiY2xvc2VyXCI+0KHQvdCw0YfQsNC70LAg0LHQu9C40LbQtTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDx1bCBjbGFzcz1cInJlc3VsdHMtbGlzdFwiPlxuICAgIDwvdWw+XG4gICAgYFxuICApXG5cbiAgY29uc3QgcmVzdWx0c0xpc3Q6SFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0cy1saXN0JylcblxuICByZXN1bHRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdHMtbGlzdCcpXG4gIHNlbGVjdFNvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VsZWN0U29ydCcpXG4gIHJlbmRlckFwYXJ0bWVudExpc3QoY3VycmVudFBMYWNlLCBzZWxlY3RTb3J0KVxuXG4gIHNlbGVjdFNvcnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCk6dm9pZCA9PiB7XG4gICAgcmVuZGVyQXBhcnRtZW50TGlzdChjdXJyZW50UExhY2UsIHNlbGVjdFNvcnQpXG4gIH0pXG5cbiAgdG9nZ2xlRmF2b3JpdGVzRWxlbShmYXZvcml0ZXNFbGVtKVxuXG4gIGNvbnNvbGUubG9nKHJlc3VsdHNMaXN0KVxuICByZXN1bHRzTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQ6RXZlbnQpOnZvaWQgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdjbGljaycpXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldCBhcyBIVE1MRWxlbWVudFxuICAgIGNvbnN0IGNsYXNzTGlzdCA9IHRhcmdldC5jbGFzc0xpc3RcbiAgICBmb3IoY29uc3QgdmFsIG9mIGNsYXNzTGlzdCkge1xuICAgICAgY29uc29sZS5sb2codmFsKVxuICAgICAgaWYodmFsID09PSAnZmF2b3JpdGVzJykge1xuICAgICAgICBjb25zdCBpZHggPSB0YXJnZXQuZGF0YXNldC5pbmRleFxuICAgICAgICBjb25zb2xlLmxvZyhpZHgpXG4gICAgICAgIHRvZ2dsZUZhdm9yaXRlSXRlbShpZHgsZmF2b3JpdGVzRWxlbSlcbiAgICAgICAgYnJlYWtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Zhdm9yaXRlc0Ftb3VudCcpKSlcbiAgICAgIH1cbiAgICB9XG4gIH0pXG59XG5cblxuXG5cblxubGV0IGZhdm9yaXRlc0Ftb3VudDogdW5rbm93blxubGV0IHVzZXJEYXRhOiB1bmtub3duXG5jb25zdCB0b2dnbGVGYXZvcml0ZXNFbGVtID0gKGZhdm9yaXRlc0VsZW06Tm9kZUxpc3QpOnZvaWQgPT4ge1xuICBpZihmYXZvcml0ZUxpc3QgPT09IG51bGwpIHJldHVybiBudWxsXG4gIGZvcihsZXQgaSA9IDA7IGk8ZmF2b3JpdGVzRWxlbS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGVsZW0gPSBmYXZvcml0ZXNFbGVtW2ldIGFzIEhUTUxFbGVtZW50XG4gICAgY29uc29sZS5sb2coZmF2b3JpdGVMaXN0LCBlbGVtLmRhdGFzZXQuaW5kZXgpXG4gICAgaWYoZWxlbS5kYXRhc2V0LmluZGV4IGluIGZhdm9yaXRlTGlzdCkge1xuICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgfVxuICB9XG5cbn1cblxuY29uc3QgdG9nZ2xlRmF2b3JpdGVJdGVtID0gKGlkeDogc3RyaW5nLCBmYXZvcml0ZXNFbGVtOiBOb2RlTGlzdCk6dm9pZCA9PiB7XG4gIGlmKGZhdm9yaXRlTGlzdCA9PT0gbnVsbCkgZmF2b3JpdGVMaXN0ID0ge31cbiAgaWYoaWR4IGluIGZhdm9yaXRlTGlzdCAmJiBmYXZvcml0ZUxpc3QgKSB7XG4gICAgY29uc29sZS5sb2coaWR4IGluIGZhdm9yaXRlTGlzdClcbiAgICBkZWxldGUgZmF2b3JpdGVMaXN0W2lkeF1cbiAgICB0b2dnbGVGYXZvcml0ZXNFbGVtKGZhdm9yaXRlc0VsZW0pXG4gIH0gZWxzZSB7XG4gICAgZmF2b3JpdGVMaXN0ID0ge1xuICAgICAgW2lkeF06IGN1cnJlbnRQTGFjZS5maW5kKChpdGVtKSA9PiBpdGVtLmlkID09PSBpZHgpLFxuICAgICAgLi4uZmF2b3JpdGVMaXN0XG4gICAgfVxuICAgIHRvZ2dsZUZhdm9yaXRlc0VsZW0oZmF2b3JpdGVzRWxlbSlcbiAgfVxuXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmYXZvcml0ZXNBbW91bnQnLCBKU09OLnN0cmluZ2lmeShmYXZvcml0ZUxpc3QpKVxuICB1c2VyRGF0YSA9IGdldFVzZXJEYXRhKClcbiAgZmF2b3JpdGVzQW1vdW50ID0gZ2V0RmF2b3JpdGVzQW1vdW50KClcbiAgaWYoaXNVc2VyRGF0YSh1c2VyRGF0YSkgICYmIHR5cGVvZiBmYXZvcml0ZXNBbW91bnQgPT09ICdudW1iZXInKSB7XG4gICAgcmVuZGVyVXNlckJsb2NrKHVzZXJEYXRhLnVzZXJuYW1lLHVzZXJEYXRhLmF2YXRhclVSTCxmYXZvcml0ZXNBbW91bnQpXG4gIH1cbn1cbiJdfQ==