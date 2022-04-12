import { MetricsParamsRequest } from './metrics-params-request.interface';

export interface MarkParamsRequest extends MetricsParamsRequest {
  metricName: string;
}
