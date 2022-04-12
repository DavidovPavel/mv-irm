import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-holder',
  templateUrl: './holder.component.html',
  styleUrls: ['./holder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HolderComponent {
  @HostBinding('class') class = 'page-container';

  items = this.route.routeConfig?.children?.filter((a) => a.path) ?? [];

  constructor(public route: ActivatedRoute) {}
}
