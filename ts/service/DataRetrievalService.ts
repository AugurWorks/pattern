import * as request from 'request-promise';

import DataSetValue from '../model/DataSetValue';
import SingleDataRequest from '../model/SingleDataRequest';

export class DataRetrievalService {

  private static ENGINE_URL: string = process.env.ENGINE_URL;

  public async getDataSetValues(singleDataRequest: SingleDataRequest): Promise<DataSetValue[]> {
    return await request.post(`${DataRetrievalService.ENGINE_URL}/data`, {
      body: singleDataRequest,
      json: true
    });
  }
}

export default new DataRetrievalService();
