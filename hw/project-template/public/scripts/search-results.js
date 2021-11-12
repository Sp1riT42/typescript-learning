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
let favoriteList = localStorage.getItem('favoritesAmount');
if (favoriteList !== null)
    favoriteList = JSON.parse(favoriteList);
let selectSort;
let resultList;
let favoritesElem;
const renderApartmentList = (currentPLace, selectSort) => {
    if (resultList)
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
            arr.sort((a, b) => {
                if (a.remoteness !== undefined && b.remoteness !== undefined) {
                    return a.remoteness - b.remoteness;
                }
                else {
                    return 0;
                }
            });
            break;
    }
    arr.map((item) => {
        if (resultList)
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
    //const resultsList:HTMLElement | null = document.querySelector('.results-list')
    resultList = document.querySelector('.results-list');
    selectSort = document.querySelector('#selectSort');
    if (selectSort !== null) {
        renderApartmentList(currentPLace, selectSort);
        selectSort.addEventListener('change', () => {
            renderApartmentList(currentPLace, selectSort);
        });
    }
    if (resultList !== null) {
        resultList.addEventListener('click', (evt) => {
            console.log('click');
            const target = evt.target;
            const classList = target.classList;
            for (const val of classList) {
                console.log(val);
                if (val === 'favorites') {
                    const idx = target.dataset['index'];
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
    toggleFavoritesElem(favoritesElem);
    console.log(resultList);
}
let favoritesAmount;
let userData;
const toggleFavoritesElem = (favoritesElem) => {
    if (favoriteList !== null && typeof favoriteList === 'object') {
        for (let i = 0; i < favoritesElem.length; i++) {
            const elem = favoritesElem[i];
            console.log(favoriteList, elem.dataset['index']);
            if (elem.dataset['index'] in favoriteList) {
                elem.classList.add('active');
            }
            else {
                elem.classList.remove('active');
            }
        }
    }
};
const toggleFavoriteItem = (idx, favoritesElem) => {
    if (favoriteList !== null && typeof favoriteList === 'object') {
        if (idx in favoriteList) {
            //console.log(idx in favoriteList[idx])
            delete favoriteList[idx];
            toggleFavoritesElem(favoritesElem);
        }
        else {
            favoriteList = Object.assign({ [idx]: currentPLace.find((item) => item.id === idx) }, favoriteList);
            toggleFavoritesElem(favoritesElem);
        }
    }
    localStorage.setItem('favoritesAmount', JSON.stringify(favoriteList));
    userData = getUserData();
    favoritesAmount = getFavoritesAmount();
    if (isUserData(userData) && typeof favoritesAmount === 'number') {
        renderUserBlock(userData.username, userData.avatarURL, favoritesAmount);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBQyxNQUFNLFlBQVksQ0FBQTtBQUN0RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBSTFDLE1BQU0sVUFBVSxxQkFBcUI7SUFDbkMsV0FBVyxDQUNULHNCQUFzQixFQUN0Qjs7Ozs7S0FLQyxDQUNGLENBQUE7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLDZCQUE2QixDQUFFLGFBQW9CO0lBQ2pFLFdBQVcsQ0FDVCxzQkFBc0IsRUFDdEI7OztXQUdPLGFBQWE7O0tBRW5CLENBQ0YsQ0FBQTtBQUNILENBQUM7QUFnQkQsSUFBSSxZQUEwQixDQUFBO0FBQzlCLElBQUksWUFBWSxHQUFnQyxZQUFZLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUE7QUFDdkYsSUFBRyxZQUFZLEtBQUssSUFBSTtJQUFFLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQ2pFLElBQUksVUFBbUMsQ0FBQTtBQUN2QyxJQUFJLFVBQW1DLENBQUE7QUFDdkMsSUFBSSxhQUFzQixDQUFBO0FBQzFCLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxZQUEwQixFQUFFLFVBQTRCLEVBQUUsRUFBRTtJQUN2RixJQUFJLFVBQVU7UUFBRSxVQUFVLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUN6QyxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUE7SUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDN0IsUUFBUSxVQUFVLENBQUMsS0FBSyxF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QUFHLFlBQVksS0FBSyxJQUFJLElBQUksT0FBTyxZQUFZLEtBQUssUUFBUSxFQUFFO1FBQzVELElBQUksR0FBRyxJQUFJLFlBQVksRUFBRTtZQUN2Qix1Q0FBdUM7WUFDdkMsT0FBTyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDeEIsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUE7U0FDbkM7YUFBTTtZQUNMLFlBQVksbUJBQ1YsQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBZSxJQUM5RCxZQUFZLENBQ2hCLENBQUE7WUFDRCxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQTtTQUNuQztLQUNGO0lBQ0QsWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7SUFDckUsUUFBUSxHQUFHLFdBQVcsRUFBRSxDQUFBO0lBQ3hCLGVBQWUsR0FBRyxrQkFBa0IsRUFBRSxDQUFBO0lBQ3RDLElBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFLLE9BQU8sZUFBZSxLQUFLLFFBQVEsRUFBRTtRQUMvRCxlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsU0FBUyxFQUFDLGVBQWUsQ0FBQyxDQUFBO0tBQ3RFO0FBQ0gsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyQmxvY2sgfSBmcm9tICcuL2xpYi5qcydcbmltcG9ydCB7Z2V0RmF2b3JpdGVzQW1vdW50LCBpc1VzZXJEYXRhLCBnZXRVc2VyRGF0YX0gZnJvbSAnLi9pbmRleC5qcydcbmltcG9ydCB7cmVuZGVyVXNlckJsb2NrfSBmcm9tICcuL3VzZXIuanMnO1xuaW1wb3J0IHtBcGFydG1lbnRzfSBmcm9tICcuL2Jvb2tpbmdTZXJ2aWNlL2RvbWFpbi9hcGFydG1lbnRzLmpzJztcblxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2VhcmNoU3R1YkJsb2NrICgpIHtcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcbiAgICBgXG4gICAgPGRpdiBjbGFzcz1cImJlZm9yZS1yZXN1bHRzLWJsb2NrXCI+XG4gICAgICA8aW1nIHNyYz1cImltZy9zdGFydC1zZWFyY2gucG5nXCIgLz5cbiAgICAgIDxwPtCn0YLQvtCx0Ysg0L3QsNGH0LDRgtGMINC/0L7QuNGB0LosINC30LDQv9C+0LvQvdC40YLQtSDRhNC+0YDQvNGDINC4Jm5ic3A70L3QsNC20LzQuNGC0LUgXCLQndCw0LnRgtC4XCI8L3A+XG4gICAgPC9kaXY+XG4gICAgYFxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJFbXB0eU9yRXJyb3JTZWFyY2hCbG9jayAocmVhc29uTWVzc2FnZTpzdHJpbmcpIHtcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcbiAgICBgXG4gICAgPGRpdiBjbGFzcz1cIm5vLXJlc3VsdHMtYmxvY2tcIj5cbiAgICAgIDxpbWcgc3JjPVwiaW1nL25vLXJlc3VsdHMucG5nXCIgLz5cbiAgICAgIDxwPiR7cmVhc29uTWVzc2FnZX08L3A+XG4gICAgPC9kaXY+XG4gICAgYFxuICApXG59XG5cbi8vIGludGVyZmFjZSBJUGxhY2Uge1xuLy8gICBpZDogbnVtYmVyLFxuLy8gICBuYW1lOiBzdHJpbmcsXG4vLyAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4vLyAgIGltYWdlOiBzdHJpbmcsXG4vLyAgIHJlbW90ZW5lc3M6IG51bWJlcixcbi8vICAgYm9va2VkRGF0ZXM6IFtdLFxuLy8gICBwcmljZTogbnVtYmVyXG4vLyB9XG5cbmludGVyZmFjZSBJRmF2b3JpdGVMaXN0IHtcbiAgW2tleTogc3RyaW5nIHwgbnVtYmVyXTogc3RyaW5nIHwgbnVtYmVyIHwgQXBhcnRtZW50c1xufVxuXG5sZXQgY3VycmVudFBMYWNlOiBBcGFydG1lbnRzW11cbmxldCBmYXZvcml0ZUxpc3Q6c3RyaW5nIHwgbnVsbCB8IElGYXZvcml0ZUxpc3Q9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmYXZvcml0ZXNBbW91bnQnKVxuaWYoZmF2b3JpdGVMaXN0ICE9PSBudWxsKSBmYXZvcml0ZUxpc3QgPSBKU09OLnBhcnNlKGZhdm9yaXRlTGlzdClcbmxldCBzZWxlY3RTb3J0OkhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbFxubGV0IHJlc3VsdExpc3Q6SFRNTFNlbGVjdEVsZW1lbnQgfCBudWxsXG5sZXQgZmF2b3JpdGVzRWxlbTpOb2RlTGlzdFxuY29uc3QgcmVuZGVyQXBhcnRtZW50TGlzdCA9IChjdXJyZW50UExhY2U6IEFwYXJ0bWVudHNbXSwgc2VsZWN0U29ydDpIVE1MU2VsZWN0RWxlbWVudCkgPT4ge1xuICBpZiAocmVzdWx0TGlzdCkgcmVzdWx0TGlzdC5pbm5lclRleHQgPSAnJ1xuICBjb25zdCBhcnIgPSBbLi4uY3VycmVudFBMYWNlXVxuICBjb25zb2xlLmxvZyhzZWxlY3RTb3J0LnZhbHVlKVxuICBzd2l0Y2ggKHNlbGVjdFNvcnQudmFsdWUpe1xuICBjYXNlICdtaW5QcmljZSc6XG4gICAgYXJyLnNvcnQoKGEsIGIpID0+IGEucHJpY2UgLSBiLnByaWNlKVxuICAgIGJyZWFrXG4gIGNhc2UgJ21heFByaWNlJzpcbiAgICBhcnIuc29ydCgoYSwgYikgPT4gYi5wcmljZSAtIGEucHJpY2UpXG4gICAgYnJlYWtcbiAgY2FzZSAnY2xvc2VyJzpcbiAgICBhcnIuc29ydCgoYSwgYikgPT4ge1xuICAgICAgaWYoYS5yZW1vdGVuZXNzICE9PSB1bmRlZmluZWQgJiYgYi5yZW1vdGVuZXNzICE9PSB1bmRlZmluZWQpe1xuICAgICAgICByZXR1cm4gYS5yZW1vdGVuZXNzIC0gYi5yZW1vdGVuZXNzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMH1cbiAgICB9KVxuICAgIGJyZWFrXG4gIH1cblxuICBhcnIubWFwKChpdGVtOkFwYXJ0bWVudHMpOnZvaWQgPT4ge1xuICAgIGlmIChyZXN1bHRMaXN0KSByZXN1bHRMaXN0Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYDxsaSBjbGFzcz1cInJlc3VsdFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1jb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW1nLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cImZhdm9yaXRlc1wiIGRhdGEtaW5kZXg9XCIke2l0ZW0uaWR9XCI+PC9kaXY+XG4gICAgICAgIDxpbWcgY2xhc3M9XCJyZXN1bHQtaW1nXCIgc3JjPVwiJHtpdGVtLmltYWdlfVwiIGFsdD1cIlwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWhlYWRlclwiPlxuICAgICAgICA8cD4ke2l0ZW0ubmFtZX08L3A+XG4gICAgICA8cCBjbGFzcz1cInByaWNlXCI+JHtpdGVtLnByaWNlfSYjODM4MTs8L3A+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0tbWFwXCI+PGkgY2xhc3M9XCJtYXAtaWNvblwiPjwvaT4gJHtpdGVtLnJlbW90ZW5lc3N90LrQvCDQvtGCINCy0LDRgTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1kZXNjclwiPiR7aXRlbS5kZXNjcmlwdGlvbn08L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0tZm9vdGVyXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvbj7Ql9Cw0LHRgNC+0L3QuNGA0L7QstCw0YLRjDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9saT5gKVxuICB9KVxuICBmYXZvcml0ZXNFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZhdm9yaXRlcycpXG4gIHRvZ2dsZUZhdm9yaXRlc0VsZW0oZmF2b3JpdGVzRWxlbSlcbn1cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2sgKHBsYWNlOkFwYXJ0bWVudHNbXSkge1xuICBjb25zb2xlLmxvZygncmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrOiAnLCBwbGFjZSlcbiAgY3VycmVudFBMYWNlID0gcGxhY2VcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcbiAgICBgXG4gICAgPGRpdiBjbGFzcz1cInNlYXJjaC1yZXN1bHRzLWhlYWRlclwiPlxuICAgICAgICA8cD7QoNC10LfRg9C70YzRgtCw0YLRiyDQv9C+0LjRgdC60LA8L3A+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtcmVzdWx0cy1maWx0ZXJcIj5cbiAgICAgICAgICAgIDxzcGFuPjxpIGNsYXNzPVwiaWNvbiBpY29uLWZpbHRlclwiPjwvaT4g0KHQvtGA0YLQuNGA0L7QstCw0YLRjDo8L3NwYW4+XG4gICAgICAgICAgICA8c2VsZWN0IGlkPVwic2VsZWN0U29ydFwiPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJtaW5QcmljZVwiID7QodC90LDRh9Cw0LvQsCDQtNC10YjRkdCy0YvQtTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJtYXhQcmljZVwiPtCh0L3QsNGH0LDQu9CwINC00L7RgNC+0LPQuNC1PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImNsb3NlclwiPtCh0L3QsNGH0LDQu9CwINCx0LvQuNC20LU8L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8dWwgY2xhc3M9XCJyZXN1bHRzLWxpc3RcIj5cbiAgICA8L3VsPlxuICAgIGBcbiAgKVxuXG4gIC8vY29uc3QgcmVzdWx0c0xpc3Q6SFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdHMtbGlzdCcpXG5cbiAgcmVzdWx0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzLWxpc3QnKVxuICBzZWxlY3RTb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlbGVjdFNvcnQnKVxuICBpZihzZWxlY3RTb3J0ICE9PSBudWxsKSB7XG4gICAgcmVuZGVyQXBhcnRtZW50TGlzdChjdXJyZW50UExhY2UsIHNlbGVjdFNvcnQpXG5cbiAgICBzZWxlY3RTb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpOnZvaWQgPT4ge1xuICAgICAgcmVuZGVyQXBhcnRtZW50TGlzdChjdXJyZW50UExhY2UsIHNlbGVjdFNvcnQgYXMgSFRNTFNlbGVjdEVsZW1lbnQpXG4gICAgfSlcbiAgfVxuICBpZihyZXN1bHRMaXN0ICE9PSBudWxsKSB7XG4gICAgcmVzdWx0TGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQ6RXZlbnQpOnZvaWQgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ2NsaWNrJylcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXQgYXMgSFRNTEVsZW1lbnRcbiAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IHRhcmdldC5jbGFzc0xpc3RcbiAgICAgIGZvcihjb25zdCB2YWwgb2YgY2xhc3NMaXN0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHZhbClcbiAgICAgICAgaWYodmFsID09PSAnZmF2b3JpdGVzJykge1xuICAgICAgICAgIGNvbnN0IGlkeCA9IHRhcmdldC5kYXRhc2V0WydpbmRleCddXG4gICAgICAgICAgY29uc29sZS5sb2coaWR4KVxuICAgICAgICAgIHRvZ2dsZUZhdm9yaXRlSXRlbShpZHggYXMgc3RyaW5nLGZhdm9yaXRlc0VsZW0pXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmYXZvcml0ZXNBbW91bnQnKSBhcyBzdHJpbmcpKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG5cbiAgdG9nZ2xlRmF2b3JpdGVzRWxlbShmYXZvcml0ZXNFbGVtKVxuXG4gIGNvbnNvbGUubG9nKHJlc3VsdExpc3QpXG5cbn1cblxuXG5cblxuXG5sZXQgZmF2b3JpdGVzQW1vdW50OiB1bmtub3duXG5sZXQgdXNlckRhdGE6IHVua25vd25cbmNvbnN0IHRvZ2dsZUZhdm9yaXRlc0VsZW0gPSAoZmF2b3JpdGVzRWxlbTpOb2RlTGlzdCk6dm9pZCA9PiB7XG4gIGlmKGZhdm9yaXRlTGlzdCAhPT0gbnVsbCAmJiB0eXBlb2YgZmF2b3JpdGVMaXN0ID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmF2b3JpdGVzRWxlbS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZWxlbSA9IGZhdm9yaXRlc0VsZW1baV0gYXMgSFRNTEVsZW1lbnRcbiAgICAgIGNvbnNvbGUubG9nKGZhdm9yaXRlTGlzdCwgZWxlbS5kYXRhc2V0WydpbmRleCddKVxuICAgICAgaWYgKGVsZW0uZGF0YXNldFsnaW5kZXgnXSBhcyBzdHJpbmcgaW4gZmF2b3JpdGVMaXN0KSB7XG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3QgdG9nZ2xlRmF2b3JpdGVJdGVtID0gKGlkeDogc3RyaW5nLCBmYXZvcml0ZXNFbGVtOiBOb2RlTGlzdCk6dm9pZCA9PiB7XG4gIGlmKGZhdm9yaXRlTGlzdCAhPT0gbnVsbCAmJiB0eXBlb2YgZmF2b3JpdGVMaXN0ID09PSAnb2JqZWN0Jykge1xuICAgIGlmIChpZHggaW4gZmF2b3JpdGVMaXN0KSB7XG4gICAgICAvL2NvbnNvbGUubG9nKGlkeCBpbiBmYXZvcml0ZUxpc3RbaWR4XSlcbiAgICAgIGRlbGV0ZSBmYXZvcml0ZUxpc3RbaWR4XVxuICAgICAgdG9nZ2xlRmF2b3JpdGVzRWxlbShmYXZvcml0ZXNFbGVtKVxuICAgIH0gZWxzZSB7XG4gICAgICBmYXZvcml0ZUxpc3QgPSB7XG4gICAgICAgIFtpZHhdOiBjdXJyZW50UExhY2UuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaWR4KSBhcyBBcGFydG1lbnRzLFxuICAgICAgICAuLi5mYXZvcml0ZUxpc3RcbiAgICAgIH1cbiAgICAgIHRvZ2dsZUZhdm9yaXRlc0VsZW0oZmF2b3JpdGVzRWxlbSlcbiAgICB9XG4gIH1cbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Zhdm9yaXRlc0Ftb3VudCcsIEpTT04uc3RyaW5naWZ5KGZhdm9yaXRlTGlzdCkpXG4gIHVzZXJEYXRhID0gZ2V0VXNlckRhdGEoKVxuICBmYXZvcml0ZXNBbW91bnQgPSBnZXRGYXZvcml0ZXNBbW91bnQoKVxuICBpZihpc1VzZXJEYXRhKHVzZXJEYXRhKSAgJiYgdHlwZW9mIGZhdm9yaXRlc0Ftb3VudCA9PT0gJ251bWJlcicpIHtcbiAgICByZW5kZXJVc2VyQmxvY2sodXNlckRhdGEudXNlcm5hbWUsdXNlckRhdGEuYXZhdGFyVVJMLGZhdm9yaXRlc0Ftb3VudClcbiAgfVxufVxuIl19