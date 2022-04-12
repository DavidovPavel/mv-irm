import { Color } from '@app/features/rating/rating.service';

import { ServiceCenterMetric } from './service-center-metric.interface';

export interface CityInfo {
  city: {
    name: string;
  };
  color: Color;
  serviceCenters: ServiceCenterMetric[];
  serviceCentersCount: 1;
}
