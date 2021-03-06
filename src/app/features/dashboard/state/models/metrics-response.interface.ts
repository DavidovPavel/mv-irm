export interface MetricResponse {
  city: string;
  serviceCompany: string;
  serviceCenter: string;
  sapId: string;
  weekNumber: number;
  weekCsiPerCity: number;
  weekRetPerCity: number;
  weekIncPerCity: number;
  weekCsiPerSc: number;
  weekRetPerSc: number;
  weekIncPerSc: number;
  weekMarkOnePerC: number;
  weekMarkTwoPerC: number;
  weekMarkThreePerC: number;
  weekMarkFourPerC: number;
  weekMarkFivePerC: number;
  weekCsiPerCompany: number;
  weekRetPerCompany: number;
  weekIncPerCompany: number;
  monthCsiPerCity: number;
  csiRank: number;
  monthIncPerCity: number;
  incRank: number;
  monthRetPerCity: number;
  retRank: number;
  monthCsiPerSc: number;
  monthRetPerSc: number;
  monthIncPerS: number;
  overallRank: number;
}
