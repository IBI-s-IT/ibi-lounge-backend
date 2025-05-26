import axios, { AxiosResponse } from 'axios';
import { NewsResponse, RequestParams } from '@repo/shared/noco';
import { NewsQuery, NewsRow } from '@repo/api-schema/news';

const BASE_URL = process.env['NOCODB_URL'];
const TABLE_ID = process.env['NOCODB_ID_NEWS'];
const TOKEN = process.env['NOCODB_TOKEN'];

const url = BASE_URL + `/api/v2/tables/${TABLE_ID}/records`;
const params: RequestParams = { offset: 0, limit: 25 };
const headers = {
  'xc-token': TOKEN,
};

export async function generateNews(query: NewsQuery) {
  if ([BASE_URL, TABLE_ID, TOKEN].includes(undefined)) {
    return null;
  }

  const data = await axios.get<RequestParams, AxiosResponse<NewsResponse>>(
    url,
    { params, headers }
  );

  if (data.status !== 200) {
    return null;
  }

  const lang = query?.lang ?? 'ru';

  const result: NewsRow[] = data.data.list.map((item) => ({
    title: item[`title_${lang}`],
    description: item[`description_${lang}`],
    button_text: item[`button_text_${lang}`] ?? undefined,
    button_url: item.button_url ?? undefined,
    created_at: item.CreatedAt?.toString(),
    updated_at: item.UpdatedAt?.toString(),
    pinned: item.pinned || item.urgent,
    urgent: item.urgent,
    author: item.author.display_name,
  }));

  if (query.mode === 'urgent') {
    return result.filter((item) => item.urgent);
  }

  return result;
}
