import {SearchFilterJSON, SearchFilterRentSDK} from './searchFilter.js';
import {Apartments} from './apartments.js';

export interface Provider {
  find(filter: SearchFilterJSON | SearchFilterRentSDK):Promise<Apartments[]>
}
