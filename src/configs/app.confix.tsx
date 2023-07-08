import { AppConfig, ThemeType } from "@/shared/types";
import { StorageHelper } from "@/shared/utils";

export const DEFAULT_SWIPE_DISTANCE =
  (StorageHelper.getItem("swipeDistance") as number) || 150;
export const DEFAULT_NOTIFICATION_TIME = 5000;
export const DEFAULT_PAGINATION_SIBLINGS = 2;
export const DEFAULT_PEGINATION_PERPAGE = 18;

export const homeBtns = [
  {
    title: "Start",
    icon: <i class="fa-solid fa-play"></i>,
    path: "/random",
  },
  {
    title: "Kanji list",
    icon: <i class="fa-solid fa-list"></i>,
    path: "/kanji",
  },
  {
    title: "Settings",
    icon: <i class="fa-solid fa-gear"></i>,
    path: "/setting",
  },
];
export interface LevelItem {
  level: string;
  theme: ThemeType;
}
export const levelList: LevelItem[] = [
  {
    level: "5",
    theme: "warning",
  },
  {
    level: "4",
    theme: "accent",
  },
  {
    level: "3",
    theme: "success",
  },
  {
    level: "2",
    theme: "error",
  },
  {
    level: "1",
    theme: "info",
  },
];
export const appConfig: AppConfig = StorageHelper.getItem("appConfig");
