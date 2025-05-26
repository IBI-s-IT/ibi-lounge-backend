import axios, { AxiosResponse } from 'axios';
import { LinkResponse, RequestParams } from '@repo/shared/noco';

const BASE_URL = process.env['NOCODB_URL'];
const TABLE_ID = process.env['NOCODB_ID_LINKS'];
const TOKEN = process.env['NOCODB_TOKEN'];

const url = BASE_URL + `/api/v2/tables/${TABLE_ID}/records`;
const params: RequestParams = { offset: 0, limit: 25 };
const headers = {
  'xc-token': TOKEN,
};

export async function generateAdditionalLinks() {
  if ([BASE_URL, TABLE_ID, TOKEN].includes(undefined)) {
    return null;
  }

  const data = await axios.get<RequestParams, AxiosResponse<LinkResponse>>(
    url,
    { params, headers }
  );

  if (data.status !== 200) {
    return null;
  }

  return data.data.list;
}
