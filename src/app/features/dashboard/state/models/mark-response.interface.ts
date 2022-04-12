export type markType = 1 | 2 | 3 | 4 | 5;

export interface MarkResponse {
  city: string;
  serviceCompany: string;
  serviceCenter: string;
  sapId: string;
  mark: markType;
  metricName: string;
  valePerSc: number;
  valuePerCity: number;
  valuePerCompany: number;
}
