import {ResponseTypes} from "@/app/(authenticated)/new/(enums)/(enums)";

export interface ResponseInterface {
  message?: string,
  type: ResponseTypes,
  error?: any,
}
