import { renderBlock } from './lib.js';
import { renderSearchResultsBlock } from './search-results.js';
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
    `);
    const btnSearch = document.querySelector('.form__btn');
    const checkInDate = document.querySelector('#check-in-date');
    const checkOutDate = document.querySelector('#check-out-date');
    const maxPrice = document.querySelector('#max-price');
    const placeF = (placeVal) => {
        console.log(placeVal);
        return placeVal;
    };
    const search = (evt, place) => {
        evt.preventDefault();
        const checkInDateValue = checkInDate.value;
        const checkOutDateValue = checkOutDate.value;
        const maxPriceValue = +maxPrice.value;
        const data = {
            checkInDate: checkInDateValue,
            checkOutDate: checkOutDateValue,
            maxPrice: maxPriceValue
        };
        searchResult(data);
        // setTimeout(() => {
        //   const rand = Math.round(Math.random())
        //   if(rand) {
        //     const val:IPlace = {}
        //     place(val)
        //   } else {
        //     const val = Error('Error!')
        //     place(val)
        //   }
        //
        // },2000)
        fetch('http://localhost:3000/places')
            .then((res) => res.json())
            .then((places) => {
            const result = place(places);
            renderSearchResultsBlock(result);
        })
            .catch(err => place(err));
    };
    const searchResult = (data) => {
        console.log(data);
    };
    btnSearch.addEventListener('click', (evt) => search(evt, placeF));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUU3RCxNQUFNLFVBQVUscUJBQXFCLENBQUUsV0FBbUIsRUFBRSxhQUFxQjtJQUMvRSxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO0lBQ3ZCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUN2RSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzFGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDcEMsTUFBTSxPQUFPLEdBQUcsR0FBRyxJQUFJLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ3pDLElBQUksT0FBYyxDQUFBO0lBRWxCLElBQUcsS0FBSyxLQUFLLElBQUksRUFBRTtRQUNqQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENB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QUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN6QixJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQU8sRUFBRTtZQUNwQixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDNUIsd0JBQXdCLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbEMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFFN0IsQ0FBQyxDQUFBO0lBR0QsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFxQixFQUFFLEVBQUU7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNuQixDQUFDLENBQUE7SUFDRCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQSxNQUFNLENBQUMsR0FBRyxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7QUFDaEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlckJsb2NrIH0gZnJvbSAnLi9saWIuanMnXG5pbXBvcnQge3JlbmRlclNlYXJjaFJlc3VsdHNCbG9ja30gZnJvbSAnLi9zZWFyY2gtcmVzdWx0cy5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hGb3JtQmxvY2sgKGFycml2YWxEYXRlOiBzdHJpbmcsIGRlcGFydHVyZURhdGU6IHN0cmluZykge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoKVxuICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKSA8IDEwID8gJzAnICsgZGF0ZS5nZXREYXRlKCkgOiBkYXRlLmdldERhdGUoKVxuICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDEgPCAxMCA/ICcwJyArIChkYXRlLmdldE1vbnRoKCkgKyAxKSA6IGRhdGUuZ2V0TW9udGgoKSArIDFcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKSArICcnXG4gIGNvbnN0IG1pbkRhdGUgPSBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gXG4gIGxldCBtYXhEYXRlOnN0cmluZ1xuXG4gIGlmKG1vbnRoICE9PSAnMTInKSB7XG4gICAgY29uc3QgbmV4dE1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMiA8IDEwID8gJzAnICsgKGRhdGUuZ2V0TW9udGgoKSArIDIpIDogKGRhdGUuZ2V0TW9udGgoKSArIDIpICsgJydcbiAgICBjb25zdCBsYXN0RGF5ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCkgKyAyLCAwKS5nZXREYXRlKCkgKyAnJ1xuICAgIGNvbnNvbGUubG9nKGxhc3REYXkpXG4gICAgbWF4RGF0ZSA9IGAke3llYXJ9LSR7bmV4dE1vbnRofS0ke2xhc3REYXl9YFxuICB9IGVsc2Uge1xuICAgIGNvbnN0ICBuZXh0TW9udGggPSAnMDAnXG4gICAgY29uc3QgbGFzdERheSA9IG5ldyBEYXRlKChkYXRlLmdldEZ1bGxZZWFyKCkgKyAxKSwgZGF0ZS5nZXRNb250aCgpICsgMiwgMCkuZ2V0RGF0ZSgpICsgJydcbiAgICBjb25zdCBuZXh0WWVhciA9IChkYXRlLmdldEZ1bGxZZWFyKCkgKyAxKSArICcnXG4gICAgbWF4RGF0ZSA9IGAke25leHRZZWFyfS0ke25leHRNb250aH0tJHtsYXN0RGF5fWBcbiAgfVxuXG4gIGNvbnNvbGUubG9nKGFycml2YWxEYXRlLCBkZXBhcnR1cmVEYXRlLCAnZGF0ZTogJyArIGRhdGUgLCdkYXk6ICcrIGRheSwgJ21vbnRoOiAnICsgbW9udGgsXG4gICAgJ3llYXI6ICcgKyB5ZWFyLCBtaW5EYXRlLCBtYXhEYXRlKVxuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLWZvcm0tYmxvY2snLFxuICAgIGBcbiAgICA8Zm9ybSBpZD1cImZvcm1cIj5cbiAgICAgIDxmaWVsZHNldCBjbGFzcz1cInNlYXJjaC1maWxlZHNldFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaXR5XCI+0JPQvtGA0L7QtDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaXR5XCIgdHlwZT1cInRleHRcIiBkaXNhYmxlZCB2YWx1ZT1cItCh0LDQvdC60YIt0J/QtdGC0LXRgNCx0YPRgNCzXCIgLz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgZGlzYWJsZWQgdmFsdWU9XCI1OS45Mzg2LDMwLjMxNDFcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwicHJvdmlkZXJzXCI+XG4gICAgICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJwcm92aWRlclwiIHZhbHVlPVwiaG9teVwiIGNoZWNrZWQgLz4gSG9teTwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJwcm92aWRlclwiIHZhbHVlPVwiZmxhdC1yZW50XCIgY2hlY2tlZCAvPiBGbGF0UmVudDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+IC0tPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2hlY2staW4tZGF0ZVwiPtCU0LDRgtCwINC30LDQtdC30LTQsDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVjay1pbi1kYXRlXCIgdHlwZT1cImRhdGVcIiB2YWx1ZT1cIiR7YXJyaXZhbERhdGV9XCIgbWluPVwiJHttaW5EYXRlfVwiIG1heD1cIiR7bWF4RGF0ZX1cIiBuYW1lPVwiY2hlY2tpblwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGVjay1vdXQtZGF0ZVwiPtCU0LDRgtCwINCy0YvQtdC30LTQsDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVjay1vdXQtZGF0ZVwiIHR5cGU9XCJkYXRlXCIgdmFsdWU9XCIke2RlcGFydHVyZURhdGV9XCIgbWluPVwiJHttaW5EYXRlfVwiIG1heD1cIiR7bWF4RGF0ZX1cIiBuYW1lPVwiY2hlY2tvdXRcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwibWF4LXByaWNlXCI+0JzQsNC60YEuINGG0LXQvdCwINGB0YPRgtC+0Lo8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwibWF4LXByaWNlXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiIG5hbWU9XCJwcmljZVwiIGNsYXNzPVwibWF4LXByaWNlXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdj48YnV0dG9uIGNsYXNzPVwiZm9ybV9fYnRuXCI+0J3QsNC50YLQuDwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgPC9mb3JtPlxuICAgIGBcbiAgKVxuXG4gIGNvbnN0IGJ0blNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19idG4nKVxuICBjb25zdCBjaGVja0luRGF0ZTpIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoZWNrLWluLWRhdGUnKVxuICBjb25zdCBjaGVja091dERhdGU6SFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGVjay1vdXQtZGF0ZScpXG4gIGNvbnN0IG1heFByaWNlOkhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWF4LXByaWNlJylcblxuICBpbnRlcmZhY2UgSVNlYXJjaEZvcm1EYXRhIHtcbiAgICBjaGVja0luRGF0ZTogc3RyaW5nLFxuICAgIGNoZWNrT3V0RGF0ZTogc3RyaW5nLFxuICAgIG1heFByaWNlOiBudW1iZXJcbiAgfVxuXG4gIGludGVyZmFjZSBJUGxhY2Uge1xuICAgIGlkOiBudW1iZXIsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgaW1hZ2U6IHN0cmluZyxcbiAgICByZW1vdGVuZXNzOiBudW1iZXIsXG4gICAgYm9va2VkRGF0ZXM6IFtdLFxuICAgIHByaWNlOiBudW1iZXJcbiAgfVxuXG4gIGNvbnN0IHBsYWNlRiA9IChwbGFjZVZhbDogSVBsYWNlIHwgRXJyb3IpID0+IHtcbiAgICBjb25zb2xlLmxvZyhwbGFjZVZhbClcbiAgICByZXR1cm4gcGxhY2VWYWxcbiAgfVxuICBjb25zdCBzZWFyY2ggPSAoZXZ0OiBFdmVudCwgcGxhY2UpID0+IHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IGNoZWNrSW5EYXRlVmFsdWUgPSBjaGVja0luRGF0ZS52YWx1ZVxuICAgIGNvbnN0IGNoZWNrT3V0RGF0ZVZhbHVlID0gY2hlY2tPdXREYXRlLnZhbHVlXG4gICAgY29uc3QgbWF4UHJpY2VWYWx1ZSA9ICttYXhQcmljZS52YWx1ZVxuICAgIGNvbnN0IGRhdGE6SVNlYXJjaEZvcm1EYXRhID0ge1xuICAgICAgY2hlY2tJbkRhdGU6Y2hlY2tJbkRhdGVWYWx1ZSxcbiAgICAgIGNoZWNrT3V0RGF0ZTogY2hlY2tPdXREYXRlVmFsdWUsXG4gICAgICBtYXhQcmljZTogbWF4UHJpY2VWYWx1ZVxuICAgIH1cbiAgICBzZWFyY2hSZXN1bHQoZGF0YSlcbiAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAvLyAgIGNvbnN0IHJhbmQgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpXG4gICAgLy8gICBpZihyYW5kKSB7XG4gICAgLy8gICAgIGNvbnN0IHZhbDpJUGxhY2UgPSB7fVxuICAgIC8vICAgICBwbGFjZSh2YWwpXG4gICAgLy8gICB9IGVsc2Uge1xuICAgIC8vICAgICBjb25zdCB2YWwgPSBFcnJvcignRXJyb3IhJylcbiAgICAvLyAgICAgcGxhY2UodmFsKVxuICAgIC8vICAgfVxuICAgIC8vXG4gICAgLy8gfSwyMDAwKVxuICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvcGxhY2VzJylcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgICAudGhlbigocGxhY2VzKTp2b2lkID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcGxhY2UocGxhY2VzKVxuICAgICAgICByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2socmVzdWx0KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4gcGxhY2UoZXJyKSlcblxuICB9XG5cblxuICBjb25zdCBzZWFyY2hSZXN1bHQgPSAoZGF0YTogSVNlYXJjaEZvcm1EYXRhKSA9PiB7XG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgfVxuICBidG5TZWFyY2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KT0+c2VhcmNoKGV2dCxwbGFjZUYpKVxufVxuIl19