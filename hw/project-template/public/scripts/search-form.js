import { renderBlock } from './lib.js';
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
    <form>
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
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUV0QyxNQUFNLFVBQVUscUJBQXFCLENBQUUsV0FBbUIsRUFBRSxhQUFxQjtJQUMvRSxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO0lBQ3ZCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUN2RSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzFGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDcEMsTUFBTSxPQUFPLEdBQUcsR0FBRyxJQUFJLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ3pDLElBQUksT0FBYyxDQUFBO0lBRWxCLElBQUcsS0FBSyxLQUFLLElBQUksRUFBRTtRQUNqQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDckcsTUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFBO1FBQ25GLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDcEIsT0FBTyxHQUFHLEdBQUcsSUFBSSxJQUFJLFNBQVMsSUFBSSxPQUFPLEVBQUUsQ0FBQTtLQUM1QztTQUFNO1FBQ0wsTUFBTyxTQUFTLEdBQUcsSUFBSSxDQUFBO1FBQ3ZCLE1BQU0sT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFBO1FBQ3pGLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUM5QyxPQUFPLEdBQUcsR0FBRyxRQUFRLElBQUksU0FBUyxJQUFJLE9BQU8sRUFBRSxDQUFBO0tBQ2hEO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLFFBQVEsR0FBRyxJQUFJLEVBQUUsT0FBTyxHQUFFLEdBQUcsRUFBRSxTQUFTLEdBQUcsS0FBSyxFQUN0RixRQUFRLEdBQUcsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUNwQyxXQUFXLENBQ1QsbUJBQW1CLEVBQ25COzs7Ozs7Ozs7Ozs7Ozs7OzsyREFpQnVELFdBQVcsVUFBVSxPQUFPLFVBQVUsT0FBTzs7Ozs0REFJNUMsYUFBYSxVQUFVLE9BQU8sVUFBVSxPQUFPOzs7Ozs7Ozs7Ozs7S0FZdEcsQ0FDRixDQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlckJsb2NrIH0gZnJvbSAnLi9saWIuanMnXG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hGb3JtQmxvY2sgKGFycml2YWxEYXRlOiBzdHJpbmcsIGRlcGFydHVyZURhdGU6IHN0cmluZykge1xuICBjb25zdCBkYXRlID0gbmV3IERhdGUoKVxuICBjb25zdCBkYXkgPSBkYXRlLmdldERhdGUoKSA8IDEwID8gJzAnICsgZGF0ZS5nZXREYXRlKCkgOiBkYXRlLmdldERhdGUoKVxuICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDEgPCAxMCA/ICcwJyArIChkYXRlLmdldE1vbnRoKCkgKyAxKSA6IGRhdGUuZ2V0TW9udGgoKSArIDFcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKSArICcnXG4gIGNvbnN0IG1pbkRhdGUgPSBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gXG4gIGxldCBtYXhEYXRlOnN0cmluZ1xuXG4gIGlmKG1vbnRoICE9PSAnMTInKSB7XG4gICAgY29uc3QgbmV4dE1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMiA8IDEwID8gJzAnICsgKGRhdGUuZ2V0TW9udGgoKSArIDIpIDogKGRhdGUuZ2V0TW9udGgoKSArIDIpICsgJydcbiAgICBjb25zdCBsYXN0RGF5ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCkgKyAyLCAwKS5nZXREYXRlKCkgKyAnJ1xuICAgIGNvbnNvbGUubG9nKGxhc3REYXkpXG4gICAgbWF4RGF0ZSA9IGAke3llYXJ9LSR7bmV4dE1vbnRofS0ke2xhc3REYXl9YFxuICB9IGVsc2Uge1xuICAgIGNvbnN0ICBuZXh0TW9udGggPSAnMDAnXG4gICAgY29uc3QgbGFzdERheSA9IG5ldyBEYXRlKChkYXRlLmdldEZ1bGxZZWFyKCkgKyAxKSwgZGF0ZS5nZXRNb250aCgpICsgMiwgMCkuZ2V0RGF0ZSgpICsgJydcbiAgICBjb25zdCBuZXh0WWVhciA9IChkYXRlLmdldEZ1bGxZZWFyKCkgKyAxKSArICcnXG4gICAgbWF4RGF0ZSA9IGAke25leHRZZWFyfS0ke25leHRNb250aH0tJHtsYXN0RGF5fWBcbiAgfVxuXG4gIGNvbnNvbGUubG9nKGFycml2YWxEYXRlLCBkZXBhcnR1cmVEYXRlLCAnZGF0ZTogJyArIGRhdGUgLCdkYXk6ICcrIGRheSwgJ21vbnRoOiAnICsgbW9udGgsXG4gICAgJ3llYXI6ICcgKyB5ZWFyLCBtaW5EYXRlLCBtYXhEYXRlKVxuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLWZvcm0tYmxvY2snLFxuICAgIGBcbiAgICA8Zm9ybT5cbiAgICAgIDxmaWVsZHNldCBjbGFzcz1cInNlYXJjaC1maWxlZHNldFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaXR5XCI+0JPQvtGA0L7QtDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaXR5XCIgdHlwZT1cInRleHRcIiBkaXNhYmxlZCB2YWx1ZT1cItCh0LDQvdC60YIt0J/QtdGC0LXRgNCx0YPRgNCzXCIgLz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgZGlzYWJsZWQgdmFsdWU9XCI1OS45Mzg2LDMwLjMxNDFcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwicHJvdmlkZXJzXCI+XG4gICAgICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJwcm92aWRlclwiIHZhbHVlPVwiaG9teVwiIGNoZWNrZWQgLz4gSG9teTwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJwcm92aWRlclwiIHZhbHVlPVwiZmxhdC1yZW50XCIgY2hlY2tlZCAvPiBGbGF0UmVudDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+IC0tPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2hlY2staW4tZGF0ZVwiPtCU0LDRgtCwINC30LDQtdC30LTQsDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVjay1pbi1kYXRlXCIgdHlwZT1cImRhdGVcIiB2YWx1ZT1cIiR7YXJyaXZhbERhdGV9XCIgbWluPVwiJHttaW5EYXRlfVwiIG1heD1cIiR7bWF4RGF0ZX1cIiBuYW1lPVwiY2hlY2tpblwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGVjay1vdXQtZGF0ZVwiPtCU0LDRgtCwINCy0YvQtdC30LTQsDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVjay1vdXQtZGF0ZVwiIHR5cGU9XCJkYXRlXCIgdmFsdWU9XCIke2RlcGFydHVyZURhdGV9XCIgbWluPVwiJHttaW5EYXRlfVwiIG1heD1cIiR7bWF4RGF0ZX1cIiBuYW1lPVwiY2hlY2tvdXRcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwibWF4LXByaWNlXCI+0JzQsNC60YEuINGG0LXQvdCwINGB0YPRgtC+0Lo8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwibWF4LXByaWNlXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiIG5hbWU9XCJwcmljZVwiIGNsYXNzPVwibWF4LXByaWNlXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdj48YnV0dG9uPtCd0LDQudGC0Lg8L2J1dHRvbj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2ZpZWxkc2V0PlxuICAgIDwvZm9ybT5cbiAgICBgXG4gIClcbn1cbiJdfQ==