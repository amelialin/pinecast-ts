export type JSONObject = {
  [key: string]:
    | JSONObject
    | JSONObject[]
    | string
    | string[]
    | number
    | number[]
    | boolean
    | boolean[]
    | null
    | null[];
};
export type JSONType =
  | JSONObject
  | JSONObject[]
  | string
  | string[]
  | number
  | number[]
  | boolean
  | boolean[]
  | null
  | null[];
