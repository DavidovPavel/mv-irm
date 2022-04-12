import { Pipe, PipeTransform } from '@angular/core';
import { IRMUserRole } from '@app/models';

@Pipe({
  name: 'commentFileIcon',
})
export class CommentFileIconPipe implements PipeTransform {
  transform(roles: IRMUserRole[]): string {
    return roles
      ? roles.includes(IRMUserRole.Store)
        ? 'store'
        : roles.includes(IRMUserRole.ServiceCompany)
        ? 'build'
        : 'comment'
      : 'comment';
  }
}
