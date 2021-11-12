import { renderBlock } from './lib.js';
import { renderSearchResultsBlock } from './search-results.js';
import { FlatRentSdk } from './flat-rent-sdk.js';
import { rentSDKProvider } from './bookingService/providers/rentSDK/rentSDKProvider.js';
import { jsonAPIProvider } from './bookingService/providers/jsonAPI/jsonAPIProvider.js';
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
            <input id="max-price" type="text" value="20000" name="price" class="max-price" />
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
    // interface IPlaceF {
    //   (placeVal: IPlace[] | Error):IPlace[] | Error
    // }
    const search = (searchData, place) => {
        let allSearchValue = [];
        const allProviders = [];
        const jsonAPIex = new jsonAPIProvider();
        const rentSDKEx = new rentSDKProvider();
        const jsonAPIFilter = {
            'city': searchData.city,
            'checkInDate': searchData.checkInDate,
            'checkOutDate': searchData.checkOutDate,
            'maxPrice': searchData.maxPrice
        };
        const rentSDKFilter = {
            'city': searchData.city,
            'checkInDate': new Date(searchData.checkInDate),
            'checkOutDate': new Date(searchData.checkOutDate),
            'priceLimit': searchData.maxPrice
        };
        if (providerHomy.checked) {
            console.log('homy checked');
            allSearchValue = [searchResult(searchData), ...allSearchValue];
            console.log(allSearchValue);
            allProviders.push(jsonAPIex);
            // const jsonAPIList = jsonAPIex.find({
            //   'city': searchData.city,
            //   'checkInDate': searchData.checkInDate,
            //   'checkOutDate': searchData.checkOutDate,
            //   'maxPrice': searchData.maxPrice
            // }).then(res => {
            //   console.log(res)
            // })
        }
        if (providerFlatRent.checked) {
            // console.log('flat-rent checked', cityValue, new Date(checkInDateValue), new Date(checkOutDateValue))
            allProviders.push(rentSDKEx);
            // const rentSDKList = rentSDKEx.find({
            //   'city': searchData.city,
            //   'checkInDate': new Date(searchData.checkInDate),
            //   'checkOutDate': new Date(searchData.checkOutDate),
            //   'priceLimit': searchData.maxPrice
            // }).then(res => {
            //   console.log(res)
            // })
            const flatRentSDK = new FlatRentSdk();
            flatRentSDK.search({
                'city': searchData.city,
                'checkInDate': new Date(searchData.checkInDate),
                'checkOutDate': new Date(searchData.checkOutDate),
                'priceLimit': searchData.maxPrice
            }).then(res => {
                console.log(res);
                allSearchValue = [...res, ...allSearchValue];
                console.log(allSearchValue);
            });
        }
        Promise.all(allProviders.map((provider) => {
            if (provider === jsonAPIex) {
                return provider.find(jsonAPIFilter);
            }
            if (provider === rentSDKEx) {
                return provider.find(rentSDKFilter);
            }
        })).then((res) => {
            const allResults = [].concat(...res);
            console.log(allResults);
            renderSearchResultsBlock(allResults);
        });
        // fetch('http://localhost:3000/places')
        //   .then((res) => res.json())
        //   .then((places):void => {
        //     //const x:IPlace[] = [{id:1, name: 'ddd'}]
        //     let curPlaces = []
        //     console.log(curPlaces)
        //     //console.log(places, Array.prototype.slice.call(places))
        //     for(const val in places) {
        //       curPlaces = [places[val], ...curPlaces]
        //     }
        //     const result = place(curPlaces as IPlace[])
        //     console.log(result)
        //     renderSearchResultsBlock(result as IPlace[])
        //   })
        //   .catch(err => place(err))
    };
    const searchResult = (data) => {
        console.log(data);
        return data;
    };
    btnSearch.addEventListener('click', (evt) => {
        evt.preventDefault();
        const cityValue = city.value;
        const checkInDateValue = checkInDate.value;
        const checkOutDateValue = checkOutDate.value;
        const maxPriceValue = +maxPrice.value;
        const data = {
            city: cityValue,
            checkInDate: checkInDateValue,
            checkOutDate: checkOutDateValue,
            maxPrice: maxPriceValue
        };
        search(data, placeF);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN0QyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sb0JBQW9CLENBQUE7QUFDOUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHVEQUF1RCxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx1REFBdUQsQ0FBQztBQUd0RixNQUFNLFVBQVUscUJBQXFCLENBQUUsV0FBbUIsRUFBRSxhQUFxQjtJQUMvRSxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO0lBQ3ZCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUN2RSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzFGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDcEMsTUFBTSxPQUFPLEdBQUcsR0FBRyxJQUFJLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ3pDLElBQUksT0FBYyxDQUFBO0lBRWxCLElBQUcsS0FBSyxLQUFLLElBQUksRUFBRTtRQUNq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N0IsaURBQWlEO1FBQ2pELHlCQUF5QjtRQUN6Qiw2QkFBNkI7UUFDN0IsZ0VBQWdFO1FBQ2hFLGlDQUFpQztRQUNqQyxnREFBZ0Q7UUFDaEQsUUFBUTtRQUNSLGtEQUFrRDtRQUNsRCwwQkFBMEI7UUFDMUIsbURBQW1EO1FBQ25ELE9BQU87UUFDUCw4QkFBOEI7SUFFaEMsQ0FBQyxDQUFBO0lBR0QsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFxQixFQUFFLEVBQUU7UUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqQixPQUFPLElBQUksQ0FBQTtJQUNiLENBQUMsQ0FBQTtJQUNELFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQU0sRUFBRTtRQUM5QyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDcEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUM1QixNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUE7UUFDMUMsTUFBTSxpQkFBaUIsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFBO1FBQzVDLE1BQU0sYUFBYSxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQTtRQUNyQyxNQUFNLElBQUksR0FBbUI7WUFDM0IsSUFBSSxFQUFFLFNBQVM7WUFDZixXQUFXLEVBQUMsZ0JBQWdCO1lBQzVCLFlBQVksRUFBRSxpQkFBaUI7WUFDL0IsUUFBUSxFQUFFLGFBQWE7U0FDeEIsQ0FBQTtRQUNELE1BQU0sQ0FBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLENBQUE7SUFDckIsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyQmxvY2sgfSBmcm9tICcuL2xpYi5qcydcbmltcG9ydCB7cmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrfSBmcm9tICcuL3NlYXJjaC1yZXN1bHRzLmpzJztcbmltcG9ydCB7RmxhdFJlbnRTZGt9IGZyb20gJy4vZmxhdC1yZW50LXNkay5qcydcbmltcG9ydCB7cmVudFNES1Byb3ZpZGVyfSBmcm9tICcuL2Jvb2tpbmdTZXJ2aWNlL3Byb3ZpZGVycy9yZW50U0RLL3JlbnRTREtQcm92aWRlci5qcyc7XG5pbXBvcnQge2pzb25BUElQcm92aWRlcn0gZnJvbSAnLi9ib29raW5nU2VydmljZS9wcm92aWRlcnMvanNvbkFQSS9qc29uQVBJUHJvdmlkZXIuanMnO1xuaW1wb3J0IHtBcGFydG1lbnRzfSBmcm9tICcuL2Jvb2tpbmdTZXJ2aWNlL2RvbWFpbi9hcGFydG1lbnRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNlYXJjaEZvcm1CbG9jayAoYXJyaXZhbERhdGU6IHN0cmluZywgZGVwYXJ0dXJlRGF0ZTogc3RyaW5nKSB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpIDwgMTAgPyAnMCcgKyBkYXRlLmdldERhdGUoKSA6IGRhdGUuZ2V0RGF0ZSgpXG4gIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMSA8IDEwID8gJzAnICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpIDogZGF0ZS5nZXRNb250aCgpICsgMVxuICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpICsgJydcbiAgY29uc3QgbWluRGF0ZSA9IGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fWBcbiAgbGV0IG1heERhdGU6c3RyaW5nXG5cbiAgaWYobW9udGggIT09ICcxMicpIHtcbiAgICBjb25zdCBuZXh0TW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAyIDwgMTAgPyAnMCcgKyAoZGF0ZS5nZXRNb250aCgpICsgMikgOiAoZGF0ZS5nZXRNb250aCgpICsgMikgKyAnJ1xuICAgIGNvbnN0IGxhc3REYXkgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSArIDIsIDApLmdldERhdGUoKSArICcnXG4gICAgY29uc29sZS5sb2cobGFzdERheSlcbiAgICBtYXhEYXRlID0gYCR7eWVhcn0tJHtuZXh0TW9udGh9LSR7bGFzdERheX1gXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgIG5leHRNb250aCA9ICcwMCdcbiAgICBjb25zdCBsYXN0RGF5ID0gbmV3IERhdGUoKGRhdGUuZ2V0RnVsbFllYXIoKSArIDEpLCBkYXRlLmdldE1vbnRoKCkgKyAyLCAwKS5nZXREYXRlKCkgKyAnJ1xuICAgIGNvbnN0IG5leHRZZWFyID0gKGRhdGUuZ2V0RnVsbFllYXIoKSArIDEpICsgJydcbiAgICBtYXhEYXRlID0gYCR7bmV4dFllYXJ9LSR7bmV4dE1vbnRofS0ke2xhc3REYXl9YFxuICB9XG5cbiAgY29uc29sZS5sb2coYXJyaXZhbERhdGUsIGRlcGFydHVyZURhdGUsICdkYXRlOiAnICsgZGF0ZSAsJ2RheTogJysgZGF5LCAnbW9udGg6ICcgKyBtb250aCxcbiAgICAneWVhcjogJyArIHllYXIsIG1pbkRhdGUsIG1heERhdGUpXG4gIHJlbmRlckJsb2NrKFxuICAgICdzZWFyY2gtZm9ybS1ibG9jaycsXG4gICAgYFxuICAgIDxmb3JtIGlkPVwiZm9ybVwiPlxuICAgICAgPGZpZWxkc2V0IGNsYXNzPVwic2VhcmNoLWZpbGVkc2V0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNpdHlcIj7Qk9C+0YDQvtC0PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNpdHlcIiB0eXBlPVwidGV4dFwiIGRpc2FibGVkIHZhbHVlPVwi0KHQsNC90LrRgi3Qn9C10YLQtdGA0LHRg9GA0LNcIiAvPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBkaXNhYmxlZCB2YWx1ZT1cIjU5LjkzODYsMzAuMzE0MVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInByb3ZpZGVyc1wiPlxuICAgICAgICAgICAgPGxhYmVsPjxpbnB1dCBpZD1cImhvbXlcIiB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwicHJvdmlkZXJcIiB2YWx1ZT1cImhvbXlcIiBjaGVja2VkIC8+IEhvbXk8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPjxpbnB1dCBpZD1cImZsYXQtcmVudFwiIHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJwcm92aWRlclwiIHZhbHVlPVwiZmxhdC1yZW50XCIgY2hlY2tlZCAvPiBGbGF0UmVudDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGVjay1pbi1kYXRlXCI+0JTQsNGC0LAg0LfQsNC10LfQtNCwPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNoZWNrLWluLWRhdGVcIiB0eXBlPVwiZGF0ZVwiIHZhbHVlPVwiJHthcnJpdmFsRGF0ZX1cIiBtaW49XCIke21pbkRhdGV9XCIgbWF4PVwiJHttYXhEYXRlfVwiIG5hbWU9XCJjaGVja2luXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrLW91dC1kYXRlXCI+0JTQsNGC0LAg0LLRi9C10LfQtNCwPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNoZWNrLW91dC1kYXRlXCIgdHlwZT1cImRhdGVcIiB2YWx1ZT1cIiR7ZGVwYXJ0dXJlRGF0ZX1cIiBtaW49XCIke21pbkRhdGV9XCIgbWF4PVwiJHttYXhEYXRlfVwiIG5hbWU9XCJjaGVja291dFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJtYXgtcHJpY2VcIj7QnNCw0LrRgS4g0YbQtdC90LAg0YHRg9GC0L7QujwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJtYXgtcHJpY2VcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwiMjAwMDBcIiBuYW1lPVwicHJpY2VcIiBjbGFzcz1cIm1heC1wcmljZVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXY+PGJ1dHRvbiBjbGFzcz1cImZvcm1fX2J0blwiPtCd0LDQudGC0Lg8L2J1dHRvbj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2ZpZWxkc2V0PlxuICAgIDwvZm9ybT5cbiAgICBgXG4gIClcblxuICBjb25zdCBidG5TZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybV9fYnRuJylcbiAgY29uc3QgY2l0eTpIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NpdHknKVxuICBjb25zdCBjaGVja0luRGF0ZTpIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoZWNrLWluLWRhdGUnKVxuICBjb25zdCBjaGVja091dERhdGU6SFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGVjay1vdXQtZGF0ZScpXG4gIGNvbnN0IG1heFByaWNlOkhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWF4LXByaWNlJylcbiAgY29uc3QgcHJvdmlkZXJIb215OkhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaG9teScpXG4gIGNvbnN0IHByb3ZpZGVyRmxhdFJlbnQ6SFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmbGF0LXJlbnQnKVxuXG4gIGludGVyZmFjZSBJU2VhcmNoRm9ybURhdGEge1xuICAgIGNpdHk6IHN0cmluZyxcbiAgICBjaGVja0luRGF0ZTogc3RyaW5nLFxuICAgIGNoZWNrT3V0RGF0ZTogc3RyaW5nLFxuICAgIG1heFByaWNlOiBudW1iZXJcbiAgfVxuXG4gIGludGVyZmFjZSBJUGxhY2Uge1xuICAgIGlkOiBudW1iZXIsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgaW1hZ2U6IHN0cmluZyxcbiAgICByZW1vdGVuZXNzOiBudW1iZXIsXG4gICAgYm9va2VkRGF0ZXM6IFtdLFxuICAgIHByaWNlOiBudW1iZXJcbiAgfVxuXG4gIGNvbnN0IHBsYWNlRiA9IChwbGFjZVZhbDogSVBsYWNlW10gfCBFcnJvcik6IElQbGFjZVtdIHwgRXJyb3IgPT4ge1xuICAgIGNvbnNvbGUubG9nKHBsYWNlVmFsKVxuICAgIHJldHVybiBwbGFjZVZhbFxuICB9XG4gIC8vIGludGVyZmFjZSBJUGxhY2VGIHtcbiAgLy8gICAocGxhY2VWYWw6IElQbGFjZVtdIHwgRXJyb3IpOklQbGFjZVtdIHwgRXJyb3JcbiAgLy8gfVxuICBjb25zdCBzZWFyY2ggPSAoc2VhcmNoRGF0YTogSVNlYXJjaEZvcm1EYXRhLCBwbGFjZTooKHBsYWNlVmFsOiBJUGxhY2VbXSB8IEVycm9yKSA9PiBJUGxhY2VbXSB8IEVycm9yKSk6dm9pZCA9PiB7XG4gICAgbGV0IGFsbFNlYXJjaFZhbHVlID0gW11cbiAgICBjb25zdCBhbGxQcm92aWRlcnMgPSBbXVxuICAgIGNvbnN0IGpzb25BUElleCA9IG5ldyBqc29uQVBJUHJvdmlkZXIoKVxuICAgIGNvbnN0IHJlbnRTREtFeCA9IG5ldyByZW50U0RLUHJvdmlkZXIoKVxuICAgIGNvbnN0IGpzb25BUElGaWx0ZXIgPSB7XG4gICAgICAnY2l0eSc6IHNlYXJjaERhdGEuY2l0eSxcbiAgICAgICdjaGVja0luRGF0ZSc6IHNlYXJjaERhdGEuY2hlY2tJbkRhdGUsXG4gICAgICAnY2hlY2tPdXREYXRlJzogc2VhcmNoRGF0YS5jaGVja091dERhdGUsXG4gICAgICAnbWF4UHJpY2UnOiBzZWFyY2hEYXRhLm1heFByaWNlXG4gICAgfVxuICAgIGNvbnN0IHJlbnRTREtGaWx0ZXIgPSB7XG4gICAgICAnY2l0eSc6IHNlYXJjaERhdGEuY2l0eSxcbiAgICAgICdjaGVja0luRGF0ZSc6IG5ldyBEYXRlKHNlYXJjaERhdGEuY2hlY2tJbkRhdGUpLFxuICAgICAgJ2NoZWNrT3V0RGF0ZSc6IG5ldyBEYXRlKHNlYXJjaERhdGEuY2hlY2tPdXREYXRlKSxcbiAgICAgICdwcmljZUxpbWl0Jzogc2VhcmNoRGF0YS5tYXhQcmljZVxuICAgIH1cbiAgICBpZihwcm92aWRlckhvbXkuY2hlY2tlZCkge1xuICAgICAgY29uc29sZS5sb2coJ2hvbXkgY2hlY2tlZCcpXG4gICAgICBhbGxTZWFyY2hWYWx1ZSA9IFtzZWFyY2hSZXN1bHQoc2VhcmNoRGF0YSksIC4uLmFsbFNlYXJjaFZhbHVlXVxuICAgICAgY29uc29sZS5sb2coYWxsU2VhcmNoVmFsdWUpXG5cbiAgICAgIGFsbFByb3ZpZGVycy5wdXNoKGpzb25BUElleClcbiAgICAgIC8vIGNvbnN0IGpzb25BUElMaXN0ID0ganNvbkFQSWV4LmZpbmQoe1xuICAgICAgLy8gICAnY2l0eSc6IHNlYXJjaERhdGEuY2l0eSxcbiAgICAgIC8vICAgJ2NoZWNrSW5EYXRlJzogc2VhcmNoRGF0YS5jaGVja0luRGF0ZSxcbiAgICAgIC8vICAgJ2NoZWNrT3V0RGF0ZSc6IHNlYXJjaERhdGEuY2hlY2tPdXREYXRlLFxuICAgICAgLy8gICAnbWF4UHJpY2UnOiBzZWFyY2hEYXRhLm1heFByaWNlXG4gICAgICAvLyB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIC8vIH0pXG4gICAgfVxuICAgIGlmKHByb3ZpZGVyRmxhdFJlbnQuY2hlY2tlZCkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2ZsYXQtcmVudCBjaGVja2VkJywgY2l0eVZhbHVlLCBuZXcgRGF0ZShjaGVja0luRGF0ZVZhbHVlKSwgbmV3IERhdGUoY2hlY2tPdXREYXRlVmFsdWUpKVxuXG4gICAgICBhbGxQcm92aWRlcnMucHVzaChyZW50U0RLRXgpXG4gICAgICAvLyBjb25zdCByZW50U0RLTGlzdCA9IHJlbnRTREtFeC5maW5kKHtcbiAgICAgIC8vICAgJ2NpdHknOiBzZWFyY2hEYXRhLmNpdHksXG4gICAgICAvLyAgICdjaGVja0luRGF0ZSc6IG5ldyBEYXRlKHNlYXJjaERhdGEuY2hlY2tJbkRhdGUpLFxuICAgICAgLy8gICAnY2hlY2tPdXREYXRlJzogbmV3IERhdGUoc2VhcmNoRGF0YS5jaGVja091dERhdGUpLFxuICAgICAgLy8gICAncHJpY2VMaW1pdCc6IHNlYXJjaERhdGEubWF4UHJpY2VcbiAgICAgIC8vIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIC8vICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgLy8gfSlcblxuXG4gICAgICBjb25zdCBmbGF0UmVudFNESyA9IG5ldyBGbGF0UmVudFNkaygpXG4gICAgICBmbGF0UmVudFNESy5zZWFyY2goe1xuICAgICAgICAnY2l0eSc6IHNlYXJjaERhdGEuY2l0eSxcbiAgICAgICAgJ2NoZWNrSW5EYXRlJzogbmV3IERhdGUoc2VhcmNoRGF0YS5jaGVja0luRGF0ZSksXG4gICAgICAgICdjaGVja091dERhdGUnOiBuZXcgRGF0ZShzZWFyY2hEYXRhLmNoZWNrT3V0RGF0ZSksXG4gICAgICAgICdwcmljZUxpbWl0Jzogc2VhcmNoRGF0YS5tYXhQcmljZVxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGFsbFNlYXJjaFZhbHVlID0gWy4uLnJlcywgLi4uYWxsU2VhcmNoVmFsdWVdXG4gICAgICAgIGNvbnNvbGUubG9nKGFsbFNlYXJjaFZhbHVlKVxuICAgICAgfSlcblxuICAgIH1cblxuICAgIFByb21pc2UuYWxsKGFsbFByb3ZpZGVycy5tYXAoKHByb3ZpZGVyOiBqc29uQVBJUHJvdmlkZXIgfCByZW50U0RLUHJvdmlkZXIpID0+IHtcbiAgICAgIGlmKHByb3ZpZGVyID09PSBqc29uQVBJZXgpIHtcbiAgICAgICAgcmV0dXJuICBwcm92aWRlci5maW5kKGpzb25BUElGaWx0ZXIpXG4gICAgICB9XG4gICAgICBpZihwcm92aWRlciA9PT0gcmVudFNES0V4ICkge1xuICAgICAgICByZXR1cm4gcHJvdmlkZXIuZmluZChyZW50U0RLRmlsdGVyKVxuICAgICAgfVxuICAgIH0pKS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnN0IGFsbFJlc3VsdHM6IEFwYXJ0bWVudHNbXSA9IFtdLmNvbmNhdCguLi5yZXMpXG4gICAgICBjb25zb2xlLmxvZyhhbGxSZXN1bHRzKVxuICAgICAgcmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrKGFsbFJlc3VsdHMpXG4gICAgfSlcblxuICAgIC8vIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvcGxhY2VzJylcbiAgICAvLyAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgLy8gICAudGhlbigocGxhY2VzKTp2b2lkID0+IHtcbiAgICAvLyAgICAgLy9jb25zdCB4OklQbGFjZVtdID0gW3tpZDoxLCBuYW1lOiAnZGRkJ31dXG4gICAgLy8gICAgIGxldCBjdXJQbGFjZXMgPSBbXVxuICAgIC8vICAgICBjb25zb2xlLmxvZyhjdXJQbGFjZXMpXG4gICAgLy8gICAgIC8vY29uc29sZS5sb2cocGxhY2VzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChwbGFjZXMpKVxuICAgIC8vICAgICBmb3IoY29uc3QgdmFsIGluIHBsYWNlcykge1xuICAgIC8vICAgICAgIGN1clBsYWNlcyA9IFtwbGFjZXNbdmFsXSwgLi4uY3VyUGxhY2VzXVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGNvbnN0IHJlc3VsdCA9IHBsYWNlKGN1clBsYWNlcyBhcyBJUGxhY2VbXSlcbiAgICAvLyAgICAgY29uc29sZS5sb2cocmVzdWx0KVxuICAgIC8vICAgICByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2socmVzdWx0IGFzIElQbGFjZVtdKVxuICAgIC8vICAgfSlcbiAgICAvLyAgIC5jYXRjaChlcnIgPT4gcGxhY2UoZXJyKSlcblxuICB9XG5cblxuICBjb25zdCBzZWFyY2hSZXN1bHQgPSAoZGF0YTogSVNlYXJjaEZvcm1EYXRhKSA9PiB7XG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgICByZXR1cm4gZGF0YVxuICB9XG4gIGJ0blNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldnQpOnZvaWQ9PntcbiAgICBldnQucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IGNpdHlWYWx1ZSA9IGNpdHkudmFsdWVcbiAgICBjb25zdCBjaGVja0luRGF0ZVZhbHVlID0gY2hlY2tJbkRhdGUudmFsdWVcbiAgICBjb25zdCBjaGVja091dERhdGVWYWx1ZSA9IGNoZWNrT3V0RGF0ZS52YWx1ZVxuICAgIGNvbnN0IG1heFByaWNlVmFsdWUgPSArbWF4UHJpY2UudmFsdWVcbiAgICBjb25zdCBkYXRhOklTZWFyY2hGb3JtRGF0YSA9IHtcbiAgICAgIGNpdHk6IGNpdHlWYWx1ZSxcbiAgICAgIGNoZWNrSW5EYXRlOmNoZWNrSW5EYXRlVmFsdWUsXG4gICAgICBjaGVja091dERhdGU6IGNoZWNrT3V0RGF0ZVZhbHVlLFxuICAgICAgbWF4UHJpY2U6IG1heFByaWNlVmFsdWVcbiAgICB9XG4gICAgc2VhcmNoKGRhdGEscGxhY2VGKVxuICB9KVxufVxuIl19