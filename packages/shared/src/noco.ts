export interface RequestParams {
  fields?: string[];
  sort?: string;
  where?: string;
  limit?: number;
  shuffle?: 0 | 1;
  offset?: number;
}

interface NocoUser {
  id: string;
  email: string;
  display_name: string;
  meta: string | null;
}

export interface PageInfo {
  totalRows: number;
  page: number;
  pageSize: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

interface BaseData {
  Id: number;
  CreatedAt: Date;
  UpdatedAt: Date;
}

interface BaseResponse<RowItem> {
  list: RowItem[];
  pageInfo: PageInfo;
}

export interface NewsRow extends BaseData {
  title_ru: string;
  title_en: string;
  description_ru: string;
  description_en: string;
  button_text_ru: string | null;
  button_text_en: string | null;
  button_url: string | null;
  author: NocoUser;
  pinned: boolean;
  urgent: boolean;
}

export type NewsResponse = BaseResponse<NewsRow>;

export interface LinkRow extends BaseData {
  text: string;
  href: string;
}

export type LinkResponse = BaseResponse<LinkRow>;
