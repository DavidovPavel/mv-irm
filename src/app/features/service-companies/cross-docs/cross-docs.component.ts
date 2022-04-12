import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cross-docs',
  templateUrl: './cross-docs.component.html',
  styleUrls: ['./cross-docs.component.scss'],
})
export class CrossDocsComponent implements OnInit {
  constructor(private readonly store: Store) {}

  ngOnInit(): void {}
}
