import { AppConfig } from "@/shared/types";
import { StorageHelper } from "@/shared/utils";

export const DEFAULT_SWIPE_DISTANCE =
  (StorageHelper.getItem("swipeDistance") as number) || 150;

export const levelList = ["5", "4", "3", "2", "1"];
export const appConfig: AppConfig = StorageHelper.getItem("appConfig");
