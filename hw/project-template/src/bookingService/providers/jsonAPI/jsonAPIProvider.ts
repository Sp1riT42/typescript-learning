import {Apartments} from '../../domain/apartments.js';
import {Provider} from '../../domain/provider.js';
import {SearchFilterJSON} from '../../domain/searchFilter.js';
import {ApartmentJSONApi, ApartmentsListResponseJSONApi, HttpHelper} from '../../utils/httpHelper.js';

export class jsonAPIProvider implements Provider{
  public static provider = 'jsonAPI'
  public static apiURL = 'http://localhost:3000/places'
  public find(filter: SearchFilterJSON):Promise<Apartments[]> {
    console.log(filter)
    return HttpHelper.fetchAsJson<ApartmentsListResponseJSONApi>(jsonAPIProvider.apiURL)
      .then((resp) => this.convertBookListResponse(resp))
  }
  private convertBookListResponse(response: ApartmentsListResponseJSONApi): Apartments[] {
    console.log(response)
    return Object.values(response).map((item) => this.convertBookResponse(item))
  }

  private convertBookResponse(item: ApartmentJSONApi): Apartments {
    return new Apartments(
      jsonAPIProvider.provider,
      item.id,
      item.name,
      item.description,
      item.price,
      item.image,
      item.remoteness,
      item.bookedDates,
    )
  }
}
