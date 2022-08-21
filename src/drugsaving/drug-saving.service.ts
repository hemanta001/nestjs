import {HttpService, Injectable} from '@nestjs/common';
import xmlParser from 'xml2json';

@Injectable()
export class DrugSavingService {
  constructor(
      private httpService: HttpService
  ) {}

  findCachedDrugs = async (token) => {
    let response;
    try{
    await this.httpService
        .get(
            `${process.env.CACHED_DRUG_URL}`,
            {
              headers: {
                'Authorization': token,
              },
            }

        )
        .toPromise()
        .then((data) => {
          response=JSON.parse(xmlParser.toJson(data.data));
        });
  } catch (e) {
    console.log(e);
  }
  return response;
  };

}
