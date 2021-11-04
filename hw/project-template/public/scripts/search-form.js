var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderBlock } from './lib.js';
import { renderSearchResultsBlock } from './search-results.js';
import { FlatRentSdk } from './flat-rent-sdk.js';
export function renderSearchFormBlock(arrivalDate, departureDate) {
    const date = new Date();
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const year = date.getFullYear() + '';
    const minDate = `${year}-${month}-${day}`;
    let maxDate;
    if (month !== '12') {
        const nextMonth = date.getMonth() + 2 < 10 ? '0' + (date.getMonth() + 2) : (date.getMonth() + 2) + '';
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0).getDate() + '';
        console.log(lastDay);
        maxDate = `${year}-${nextMonth}-${lastDay}`;
    }
    else {
        const nextMonth = '00';
        const lastDay = new Date((date.getFullYear() + 1), date.getMonth() + 2, 0).getDate() + '';
        const nextYear = (date.getFullYear() + 1) + '';
        maxDate = `${nextYear}-${nextMonth}-${lastDay}`;
    }
    console.log(arrivalDate, departureDate, 'date: ' + date, 'day: ' + day, 'month: ' + month, 'year: ' + year, minDate, maxDate);
    renderBlock('search-form-block', `
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
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          
          <div>
            <div><button class="form__btn">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `);
    const btnSearch = document.querySelector('.form__btn');
    const city = document.querySelector('#city');
    const checkInDate = document.querySelector('#check-in-date');
    const checkOutDate = document.querySelector('#check-out-date');
    const maxPrice = document.querySelector('#max-price');
    const providerHomy = document.querySelector('#homy');
    const providerFlatRent = document.querySelector('#flat-rent');
    const placeF = (placeVal) => {
        console.log(placeVal);
        return placeVal;
    };
    const search = (evt, place) => __awaiter(this, void 0, void 0, function* () {
        evt.preventDefault();
        const cityValue = city.value;
        const checkInDateValue = checkInDate.value;
        const checkOutDateValue = checkOutDate.value;
        const maxPriceValue = +maxPrice.value;
        const data = {
            checkInDate: checkInDateValue,
            checkOutDate: checkOutDateValue,
            maxPrice: maxPriceValue
        };
        let allSearchValue = [];
        if (providerHomy.checked) {
            console.log('homy checked');
            allSearchValue = [searchResult(data), ...allSearchValue];
            console.log(allSearchValue);
        }
        if (providerFlatRent.checked) {
            console.log('flat-rent checked', cityValue, new Date(checkInDateValue), new Date(checkOutDateValue));
            const flatRentSDK = new FlatRentSdk();
            flatRentSDK.search({
                'city': cityValue,
                'checkInDate': new Date(checkInDateValue),
                'checkOutDate': new Date(checkOutDateValue),
                'priceLimit': maxPriceValue
            }).then(res => {
                console.log(res);
                allSearchValue = [...res, ...allSearchValue];
                console.log(allSearchValue);
            });
        }
        fetch('http://localhost:3000/places')
            .then((res) => res.json())
            .then((places) => {
            const result = place(places);
            renderSearchResultsBlock(result);
        })
            .catch(err => place(err));
    });
    const searchResult = (data) => {
        console.log(data);
        return data;
    };
    btnSearch.addEventListener('click', (evt) => search(evt, placeF));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sb0JBQW9CLENBQUE7QUFFOUMsTUFBTSxVQUFVLHFCQUFxQixDQUFFLFdBQW1CLEVBQUUsYUFBcUI7SUFDL0UsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtJQUN2QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDdkUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUMxRixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQ3BDLE1BQU0sT0FBTyxHQUFHLEdBQUcsSUFBSSxJQUFJLEtBQUssSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUN6QyxJQUFJLE9BQWMsQ0FBQTtJQUVsQixJQUFHLEtBQUssS0FBSyxJQUFJLEVBQUU7UUFDakIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcs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LElBQUksRUFBRSxDQUFDO2FBQ3pCLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBTyxFQUFFO1lBQ3BCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUM1Qix3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNsQyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUU3QixDQUFDLENBQUEsQ0FBQTtJQUdELE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBcUIsRUFBRSxFQUFFO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDLENBQUE7SUFDRCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQSxNQUFNLENBQUMsR0FBRyxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDaEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlckJsb2NrIH0gZnJvbSAnLi9saWIuanMnXG5pbXBvcnQge3JlbmRlclNlYXJjaFJlc3VsdHNCbG9ja30gZnJvbSAnLi9zZWFyY2gtcmVzdWx0cy5qcyc7XG5pbXBvcnQge0ZsYXRSZW50U2RrfSBmcm9tICcuL2ZsYXQtcmVudC1zZGsuanMnXG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hGb3JtQmxvY2sgKGFycml2YWxEYXRlOiBzdHJpbmcsIGRlcGFydHVyZURhdGU6IHN0cmluZykge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoKVxuICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKSA8IDEwID8gJzAnICsgZGF0ZS5nZXREYXRlKCkgOiBkYXRlLmdldERhdGUoKVxuICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDEgPCAxMCA/ICcwJyArIChkYXRlLmdldE1vbnRoKCkgKyAxKSA6IGRhdGUuZ2V0TW9udGgoKSArIDFcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKSArICcnXG4gIGNvbnN0IG1pbkRhdGUgPSBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gXG4gIGxldCBtYXhEYXRlOnN0cmluZ1xuXG4gIGlmKG1vbnRoICE9PSAnMTInKSB7XG4gICAgY29uc3QgbmV4dE1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMiA8IDEwID8gJzAnICsgKGRhdGUuZ2V0TW9udGgoKSArIDIpIDogKGRhdGUuZ2V0TW9udGgoKSArIDIpICsgJydcbiAgICBjb25zdCBsYXN0RGF5ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCkgKyAyLCAwKS5nZXREYXRlKCkgKyAnJ1xuICAgIGNvbnNvbGUubG9nKGxhc3REYXkpXG4gICAgbWF4RGF0ZSA9IGAke3llYXJ9LSR7bmV4dE1vbnRofS0ke2xhc3REYXl9YFxuICB9IGVsc2Uge1xuICAgIGNvbnN0ICBuZXh0TW9udGggPSAnMDAnXG4gICAgY29uc3QgbGFzdERheSA9IG5ldyBEYXRlKChkYXRlLmdldEZ1bGxZZWFyKCkgKyAxKSwgZGF0ZS5nZXRNb250aCgpICsgMiwgMCkuZ2V0RGF0ZSgpICsgJydcbiAgICBjb25zdCBuZXh0WWVhciA9IChkYXRlLmdldEZ1bGxZZWFyKCkgKyAxKSArICcnXG4gICAgbWF4RGF0ZSA9IGAke25leHRZZWFyfS0ke25leHRNb250aH0tJHtsYXN0RGF5fWBcbiAgfVxuXG4gIGNvbnNvbGUubG9nKGFycml2YWxEYXRlLCBkZXBhcnR1cmVEYXRlLCAnZGF0ZTogJyArIGRhdGUgLCdkYXk6ICcrIGRheSwgJ21vbnRoOiAnICsgbW9udGgsXG4gICAgJ3llYXI6ICcgKyB5ZWFyLCBtaW5EYXRlLCBtYXhEYXRlKVxuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLWZvcm0tYmxvY2snLFxuICAgIGBcbiAgICA8Zm9ybSBpZD1cImZvcm1cIj5cbiAgICAgIDxmaWVsZHNldCBjbGFzcz1cInNlYXJjaC1maWxlZHNldFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaXR5XCI+0JPQvtGA0L7QtDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaXR5XCIgdHlwZT1cInRleHRcIiBkaXNhYmxlZCB2YWx1ZT1cItCh0LDQvdC60YIt0J/QtdGC0LXRgNCx0YPRgNCzXCIgLz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgZGlzYWJsZWQgdmFsdWU9XCI1OS45Mzg2LDMwLjMxNDFcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm92aWRlcnNcIj5cbiAgICAgICAgICAgIDxsYWJlbD48aW5wdXQgaWQ9XCJob215XCIgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInByb3ZpZGVyXCIgdmFsdWU9XCJob215XCIgY2hlY2tlZCAvPiBIb215PC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbD48aW5wdXQgaWQ9XCJmbGF0LXJlbnRcIiB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwicHJvdmlkZXJcIiB2YWx1ZT1cImZsYXQtcmVudFwiIGNoZWNrZWQgLz4gRmxhdFJlbnQ8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2hlY2staW4tZGF0ZVwiPtCU0LDRgtCwINC30LDQtdC30LTQsDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVjay1pbi1kYXRlXCIgdHlwZT1cImRhdGVcIiB2YWx1ZT1cIiR7YXJyaXZhbERhdGV9XCIgbWluPVwiJHttaW5EYXRlfVwiIG1heD1cIiR7bWF4RGF0ZX1cIiBuYW1lPVwiY2hlY2tpblwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGVjay1vdXQtZGF0ZVwiPtCU0LDRgtCwINCy0YvQtdC30LTQsDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVjay1vdXQtZGF0ZVwiIHR5cGU9XCJkYXRlXCIgdmFsdWU9XCIke2RlcGFydHVyZURhdGV9XCIgbWluPVwiJHttaW5EYXRlfVwiIG1heD1cIiR7bWF4RGF0ZX1cIiBuYW1lPVwiY2hlY2tvdXRcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwibWF4LXByaWNlXCI+0JzQsNC60YEuINGG0LXQvdCwINGB0YPRgtC+0Lo8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwibWF4LXByaWNlXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiIG5hbWU9XCJwcmljZVwiIGNsYXNzPVwibWF4LXByaWNlXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdj48YnV0dG9uIGNsYXNzPVwiZm9ybV9fYnRuXCI+0J3QsNC50YLQuDwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgPC9mb3JtPlxuICAgIGBcbiAgKVxuXG4gIGNvbnN0IGJ0blNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19idG4nKVxuICBjb25zdCBjaXR5OkhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2l0eScpXG4gIGNvbnN0IGNoZWNrSW5EYXRlOkhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hlY2staW4tZGF0ZScpXG4gIGNvbnN0IGNoZWNrT3V0RGF0ZTpIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoZWNrLW91dC1kYXRlJylcbiAgY29uc3QgbWF4UHJpY2U6SFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYXgtcHJpY2UnKVxuICBjb25zdCBwcm92aWRlckhvbXk6SFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNob215JylcbiAgY29uc3QgcHJvdmlkZXJGbGF0UmVudDpIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZsYXQtcmVudCcpXG5cbiAgaW50ZXJmYWNlIElTZWFyY2hGb3JtRGF0YSB7XG4gICAgY2hlY2tJbkRhdGU6IHN0cmluZyxcbiAgICBjaGVja091dERhdGU6IHN0cmluZyxcbiAgICBtYXhQcmljZTogbnVtYmVyXG4gIH1cblxuICBpbnRlcmZhY2UgSVBsYWNlIHtcbiAgICBpZDogbnVtYmVyLFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgIGltYWdlOiBzdHJpbmcsXG4gICAgcmVtb3RlbmVzczogbnVtYmVyLFxuICAgIGJvb2tlZERhdGVzOiBbXSxcbiAgICBwcmljZTogbnVtYmVyXG4gIH1cblxuICBjb25zdCBwbGFjZUYgPSAocGxhY2VWYWw6IElQbGFjZSB8IEVycm9yKSA9PiB7XG4gICAgY29uc29sZS5sb2cocGxhY2VWYWwpXG4gICAgcmV0dXJuIHBsYWNlVmFsXG4gIH1cbiAgY29uc3Qgc2VhcmNoID0gYXN5bmMgKGV2dDogRXZlbnQsIHBsYWNlKSA9PiB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KClcbiAgICBjb25zdCBjaXR5VmFsdWUgPSBjaXR5LnZhbHVlXG4gICAgY29uc3QgY2hlY2tJbkRhdGVWYWx1ZSA9IGNoZWNrSW5EYXRlLnZhbHVlXG4gICAgY29uc3QgY2hlY2tPdXREYXRlVmFsdWUgPSBjaGVja091dERhdGUudmFsdWVcbiAgICBjb25zdCBtYXhQcmljZVZhbHVlID0gK21heFByaWNlLnZhbHVlXG4gICAgY29uc3QgZGF0YTpJU2VhcmNoRm9ybURhdGEgPSB7XG4gICAgICBjaGVja0luRGF0ZTpjaGVja0luRGF0ZVZhbHVlLFxuICAgICAgY2hlY2tPdXREYXRlOiBjaGVja091dERhdGVWYWx1ZSxcbiAgICAgIG1heFByaWNlOiBtYXhQcmljZVZhbHVlXG4gICAgfVxuICAgIGxldCBhbGxTZWFyY2hWYWx1ZSA9IFtdXG5cbiAgICBpZihwcm92aWRlckhvbXkuY2hlY2tlZCkge1xuICAgICAgY29uc29sZS5sb2coJ2hvbXkgY2hlY2tlZCcpXG4gICAgICBhbGxTZWFyY2hWYWx1ZSA9IFtzZWFyY2hSZXN1bHQoZGF0YSksIC4uLmFsbFNlYXJjaFZhbHVlXVxuICAgICAgY29uc29sZS5sb2coYWxsU2VhcmNoVmFsdWUpXG4gICAgfVxuICAgIGlmKHByb3ZpZGVyRmxhdFJlbnQuY2hlY2tlZCkge1xuXG4gICAgICBjb25zb2xlLmxvZygnZmxhdC1yZW50IGNoZWNrZWQnLCBjaXR5VmFsdWUsIG5ldyBEYXRlKGNoZWNrSW5EYXRlVmFsdWUpLCBuZXcgRGF0ZShjaGVja091dERhdGVWYWx1ZSkpXG4gICAgICBjb25zdCBmbGF0UmVudFNESyA9IG5ldyBGbGF0UmVudFNkaygpXG4gICAgICBmbGF0UmVudFNESy5zZWFyY2goe1xuICAgICAgICAnY2l0eSc6IGNpdHlWYWx1ZSxcbiAgICAgICAgJ2NoZWNrSW5EYXRlJzogbmV3IERhdGUoY2hlY2tJbkRhdGVWYWx1ZSksXG4gICAgICAgICdjaGVja091dERhdGUnOiBuZXcgRGF0ZShjaGVja091dERhdGVWYWx1ZSksXG4gICAgICAgICdwcmljZUxpbWl0JzogbWF4UHJpY2VWYWx1ZVxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGFsbFNlYXJjaFZhbHVlID0gWy4uLnJlcywgLi4uYWxsU2VhcmNoVmFsdWVdXG5cbiAgICAgICAgY29uc29sZS5sb2coYWxsU2VhcmNoVmFsdWUpXG4gICAgICB9KVxuXG4gICAgfVxuXG4gICAgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9wbGFjZXMnKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKChwbGFjZXMpOnZvaWQgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBwbGFjZShwbGFjZXMpXG4gICAgICAgIHJlbmRlclNlYXJjaFJlc3VsdHNCbG9jayhyZXN1bHQpXG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiBwbGFjZShlcnIpKVxuXG4gIH1cblxuXG4gIGNvbnN0IHNlYXJjaFJlc3VsdCA9IChkYXRhOiBJU2VhcmNoRm9ybURhdGEpID0+IHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgIHJldHVybiBkYXRhXG4gIH1cbiAgYnRuU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCk9PnNlYXJjaChldnQscGxhY2VGKSlcbn1cbiJdfQ==