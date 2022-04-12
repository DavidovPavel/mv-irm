import { Directive, ElementRef, Input, ViewChild } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

const MAX_SIZE_FILE_MB = 10;

@Directive({
  selector: '[irmIncidentUploadFile]',
})
export class UploadFileDirective {
  notifyError = '';

  @Input() reserveControl!: FormArray;
  @Input() dataSource: { file: { name: string } }[] = [];

  @ViewChild('fileUploadInput')
  fileUploadInput!: ElementRef;

  get reserve(): File[] {
    return this.reserveControl.value;
  }

  show(): void {
    this.fileUploadInput.nativeElement.click();
  }

  fileUploadHandler(e: Event): void {
    if (e) {
      const fileUploader = e.target as HTMLInputElement;
      const files = fileUploader?.files;

      if (files) {
        const length = files.length;
        for (let i = 0; i < length; i++) {
          const file = files.item(i);
          if (file && this.notExist(file.name) && this.checkSize(file.size)) {
            this.reserveControl.push(new FormControl(file));
          }
        }
        this.fileUploadInput.nativeElement.value = '';
      }
    }
  }

  notExist(name: string): boolean {
    const isError = this.reserve.some((a) => a.name === name) || this.dataSource.some((a) => a.file.name === name);
    this.notifyError = isError ? 'Файл с таким именем уже добавлен!' : '';
    return !isError;
  }

  checkSize(size: number): boolean {
    const a = Math.ceil(size / (1024 * 1000));
    const isError = a > MAX_SIZE_FILE_MB;
    this.notifyError = isError ? `Размер загружаемого файла больше ${MAX_SIZE_FILE_MB}Mb!` : '';
    return !isError;
  }

  removeFile(item: File): void {
    const v = this.reserveControl.controls.filter((a) => a.value.name !== item.name);
    this.reserveControl.clear();
    v.forEach((a) => this.reserveControl.push(a));
    this.notifyError = '';
  }
}
