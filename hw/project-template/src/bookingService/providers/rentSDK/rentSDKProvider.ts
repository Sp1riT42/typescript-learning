import {Apartments} from '../../domain/apartments.js';
import {Provider} from '../../domain/provider.js';
import {FlatRentSdk} from '../../../flat-rent-sdk.js';
import {SearchFilterRentSDK} from '../../domain/searchFilter.js';
import {ApartmentRentSDK} from '../../utils/httpHelper.js';


export class rentSDKProvider implements Provider{
  public static provider = 'rentSDK'
  public find(filter: SearchFilterRentSDK):Promise<Apartments[]> {
    const flatRentSDK = new FlatRentSdk()
    return flatRentSDK.search(filter)
      .then((resp:ApartmentRentSDK[]) => {
        console.log(resp)
        return this.convertBookListResponse(resp)
      })
  }
  private convertBookListResponse(response: ApartmentRentSDK[]): Apartments[] {
    return response.map((item) => this.convertBookResponse(item))
  }
  private convertBookResponse(item: ApartmentRentSDK): Apartments {
    return new Apartments(
      rentSDKProvider.provider,
      item.id,
      item.title,
      item.details,
      item.totalPrice,
      item.photos,
      undefined,
      item.bookedDates,

    )
  }
}
