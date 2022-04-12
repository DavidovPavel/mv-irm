import { Pipe, PipeTransform } from '@angular/core';
import { ProjectType, ZNUInfo } from '@app/models';
import { environment } from '@env/environment';

@Pipe({
  name: 'znuInfo',
})
export class ZnuInfoPipe implements PipeTransform {
  transform(value: ZNUInfo | null, numberZNU: string): string[] {
    if (value) {
      return [`${environment.linkUrl}${ProjectType.get(value.projectType)}/${value.id}`, numberZNU, '_blank'];
    } else {
      return [];
    }
  }
}
