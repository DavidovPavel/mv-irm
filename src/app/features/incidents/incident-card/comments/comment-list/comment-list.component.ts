import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IncidentComment } from '../../../models';

@Component({
  selector: 'app-incident-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent {
  @Input() dataSource!: IncidentComment[];
  @Input() disabled = true;
  @Input() form!: FormGroup;

  @Output() send = new EventEmitter<string>();

  sendMessage(): void {
    const cntr = this.form.get('comment');
    if (cntr?.value && cntr.value.trim()) {
      this.send.emit(cntr.value);
      cntr.setValue('');
    }
  }
}
