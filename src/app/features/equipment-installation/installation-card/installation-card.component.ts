import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { EquipmentInstallation } from '../store/equipment-installation.interface';
import { InstallationCardStore } from '../store/installation-card.store';
import { PatchService } from './../../../core/services/patch.service';
import { OperationType } from './../store/enums';

@Component({
  selector: 'app-installation-card',
  templateUrl: './installation-card.component.html',
  styleUrls: ['./installation-card.component.scss'],
  providers: [InstallationCardStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallationCardComponent {
  @HostBinding('class') class = 'page-container';

  form = new FormGroup({});

  instance$ = this.store.instance$;

  constructor(private readonly store: InstallationCardStore, private patch: PatchService) {
    this.store.fetchPermissions();
    this.store.fetchInstance();
  }

  update(instance: EquipmentInstallation): void {
    if (this.form.valid) {
      const update = this.patch.parse(instance, this.form.value as EquipmentInstallation, OperationType.replace);
      if (update.length) {
        this.store.updateInstance(update);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
