import { Dictionary } from './../../store/equipment-installation.service';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { bodyExpansion } from '@app/core/animations/bodyExpansion';

import { EquipmentInstallation } from '../../store/equipment-installation.interface';

@Component({
  selector: 'app-service-panel',
  templateUrl: './service-panel.component.html',
  styleUrls: ['./service-panel.component.scss'],
  animations: [bodyExpansion],
})
export class ServiceCompanyPanelComponent {
  panelOpenState = true;

  @Input()
  form!: FormGroup;

  @Input()
  appeal!: EquipmentInstallation;

  dictionary = Dictionary;
}
