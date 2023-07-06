export interface BaseModel {
  id: string | number;
}

export interface SearchQuery {
  searchKeyword?: string;
  page: number;
  perPage: number;
}
