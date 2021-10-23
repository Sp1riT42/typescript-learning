import { renderSearchFormBlock } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock } from './user.js';
import { renderToast } from './lib.js';
const date = new Date();
const nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
const nextDateDay = nextDate.getDate() < 10 ? '0' + nextDate.getDate() : nextDate.getDate();
const nextDateMonth = nextDate.getMonth() + 1 < 10 ? '0' + (nextDate.getMonth() + 1) : nextDate.getMonth() + 1;
const nextDateYear = nextDate.getFullYear() + '';
const nextDay = `${nextDateYear}-${nextDateMonth}-${nextDateDay}`;
const secondDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3);
const secondDateDay = secondDate.getDate() < 10 ? '0' + secondDate.getDate() : secondDate.getDate();
const secondDateMonth = secondDate.getMonth() + 1 < 10 ? '0' + (secondDate.getMonth() + 1) : secondDate.getMonth() + 1;
const secondDateYear = secondDate.getFullYear() + '';
const secondDay = `${secondDateYear}-${secondDateMonth}-${secondDateDay}`;
window.addEventListener('DOMContentLoaded', () => {
    renderUserBlock('Wade Warren', '/img/avatar.png', 0);
    renderSearchFormBlock(nextDay, secondDay);
    renderSearchStubBlock();
    renderToast({ text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' }, { name: 'Понял', handler: () => { console.log('Уведомление закрыто'); } });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDeEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQTtBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRXRDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7QUFDdkIsTUFBTSxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUUsQ0FBQyxDQUFDLENBQUE7QUFDaEYsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQzNGLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDOUcsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQTtBQUNoRCxNQUFNLE9BQU8sR0FBRyxHQUFHLFlBQVksSUFBSSxhQUFhLElBQUksV0FBVyxFQUFFLENBQUE7QUFDakUsTUFBTSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDckYsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3BHLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDdkgsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUNyRCxNQUFNLFNBQVMsR0FBRyxHQUFHLGNBQWMsSUFBSSxlQUFlLElBQUksYUFBYSxFQUFFLENBQUM7QUFFMUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtJQUMvQyxlQUFlLENBQUMsYUFBYSxFQUFDLGlCQUFpQixFQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2xELHFCQUFxQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUN6QyxxQkFBcUIsRUFBRSxDQUFBO0lBQ3ZCLFdBQVcsQ0FDVCxFQUFDLElBQUksRUFBRSwyREFBMkQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQ3BGLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBLENBQUEsQ0FBQyxFQUFDLENBQ3JFLENBQUE7QUFDSCxDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlclNlYXJjaEZvcm1CbG9jayB9IGZyb20gJy4vc2VhcmNoLWZvcm0uanMnXG5pbXBvcnQgeyByZW5kZXJTZWFyY2hTdHViQmxvY2sgfSBmcm9tICcuL3NlYXJjaC1yZXN1bHRzLmpzJ1xuaW1wb3J0IHsgcmVuZGVyVXNlckJsb2NrIH0gZnJvbSAnLi91c2VyLmpzJ1xuaW1wb3J0IHsgcmVuZGVyVG9hc3QgfSBmcm9tICcuL2xpYi5qcydcblxuY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcbmNvbnN0IG5leHREYXRlID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksZGF0ZS5nZXREYXRlKCkgKzEpXG5jb25zdCBuZXh0RGF0ZURheSA9IG5leHREYXRlLmdldERhdGUoKSA8IDEwID8gJzAnICsgbmV4dERhdGUuZ2V0RGF0ZSgpIDogbmV4dERhdGUuZ2V0RGF0ZSgpXG5jb25zdCBuZXh0RGF0ZU1vbnRoID0gbmV4dERhdGUuZ2V0TW9udGgoKSArIDEgPCAxMCA/ICcwJyArIChuZXh0RGF0ZS5nZXRNb250aCgpICsgMSkgOiBuZXh0RGF0ZS5nZXRNb250aCgpICsgMVxuY29uc3QgbmV4dERhdGVZZWFyID0gbmV4dERhdGUuZ2V0RnVsbFllYXIoKSArICcnXG5jb25zdCBuZXh0RGF5ID0gYCR7bmV4dERhdGVZZWFyfS0ke25leHREYXRlTW9udGh9LSR7bmV4dERhdGVEYXl9YFxuY29uc3Qgc2Vjb25kRGF0ZSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSArIDMpO1xuY29uc3Qgc2Vjb25kRGF0ZURheSA9IHNlY29uZERhdGUuZ2V0RGF0ZSgpIDwgMTAgPyAnMCcgKyBzZWNvbmREYXRlLmdldERhdGUoKSA6IHNlY29uZERhdGUuZ2V0RGF0ZSgpO1xuY29uc3Qgc2Vjb25kRGF0ZU1vbnRoID0gc2Vjb25kRGF0ZS5nZXRNb250aCgpICsgMSA8IDEwID8gJzAnICsgKHNlY29uZERhdGUuZ2V0TW9udGgoKSArIDEpIDogc2Vjb25kRGF0ZS5nZXRNb250aCgpICsgMTtcbmNvbnN0IHNlY29uZERhdGVZZWFyID0gc2Vjb25kRGF0ZS5nZXRGdWxsWWVhcigpICsgJyc7XG5jb25zdCBzZWNvbmREYXkgPSBgJHtzZWNvbmREYXRlWWVhcn0tJHtzZWNvbmREYXRlTW9udGh9LSR7c2Vjb25kRGF0ZURheX1gO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgcmVuZGVyVXNlckJsb2NrKCdXYWRlIFdhcnJlbicsJy9pbWcvYXZhdGFyLnBuZycsMClcbiAgcmVuZGVyU2VhcmNoRm9ybUJsb2NrKG5leHREYXksIHNlY29uZERheSlcbiAgcmVuZGVyU2VhcmNoU3R1YkJsb2NrKClcbiAgcmVuZGVyVG9hc3QoXG4gICAge3RleHQ6ICfQrdGC0L4g0L/RgNC40LzQtdGAINGD0LLQtdC00L7QvNC70LXQvdC40Y8uINCY0YHQv9C+0LvRjNC30YPQudGC0LUg0LXQs9C+INC/0YDQuCDQvdC10L7QsdGF0L7QtNC40LzQvtGB0YLQuCcsIHR5cGU6ICdzdWNjZXNzJ30sXG4gICAge25hbWU6ICfQn9C+0L3Rj9C7JywgaGFuZGxlcjogKCkgPT4ge2NvbnNvbGUubG9nKCfQo9Cy0LXQtNC+0LzQu9C10L3QuNC1INC30LDQutGA0YvRgtC+Jyl9fVxuICApXG59KVxuXG4iXX0=