export as namespace grubbs;

export type Data = number | undefined;

export interface Options {
  alpha: number;
  recursion: boolean;
}

export interface Round {
  dataSet: Data[];
  stdev: number;
  average: number;
  criticalValue: number;
  gSet: Data[];
  gPass: (boolean | undefined)[];
  outliers: number[];
  outlierIndexes: number[];
}

export type Result = Round[];

export function test(dataSet: ReadonlyArray<Data>, options?: Options): Result;

export function isValidData(data: Data): boolean;
