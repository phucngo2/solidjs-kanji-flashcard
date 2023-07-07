export interface BaseModel {
  id: string | number;
}

export interface SearchQuery {
  searchKeyword?: string;
  page: number;
  perPage: number;
}

export type Level = 1 | 2 | 3 | 4 | 5;

export type AppConfig = {
  swipeDistance: number;
} & Partial<Record<Level, boolean>>;
