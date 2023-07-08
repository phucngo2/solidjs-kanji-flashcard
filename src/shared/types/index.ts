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
  showFurigana: boolean;
} & Partial<Record<Level, boolean>>;

export type ThemePaleteType = "primary" | "secondary" | "accent";
export type ThemeActionType = "info" | "warning" | "error" | "success";
export type ThemeType = ThemePaleteType | ThemeActionType;
