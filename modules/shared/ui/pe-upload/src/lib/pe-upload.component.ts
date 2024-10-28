import { ChangeDetectionStrategy, Component, Input, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiIcon, TuiLink } from '@taiga-ui/core';
import type { TuiFileLike } from '@taiga-ui/kit';
import { TuiAvatar, TuiFiles } from '@taiga-ui/kit';
import { TranslocoModule } from '@jsverse/transloco';
import { UploadGifOptions } from '@pe-giphy/models';
import { TuiHint, TuiTextfield } from '@taiga-ui/core';
import { TuiInputModule, TuiInputTagModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { urlValidator } from '@pe-giphy/utils';

@Component({
  selector: 'pe-upload',
  standalone: true,
  imports: [
    TuiLink,
    TuiIcon,
    TuiHint,
    TuiFiles,
    TuiAvatar,
    TuiTextfield,
    CommonModule,
    TuiInputModule,
    TranslocoModule,
    TuiInputTagModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './pe-upload.component.html',
  styleUrl: './pe-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeUploadComponent {

  accept = input('.gif,.webp');
  acceptHint = input('COMMON.LABEL.ENTER_VALID_GIF_LINK');
  
  protected readonly control = new FormControl<TuiFileLike | null>(null);
  protected readonly uploadForm = new FormGroup({
    attachment: new FormControl<Array<File>>([]),
    sourceImageUrl: new FormControl('', [urlValidator()]),
    tags: new FormControl([], [Validators.required]),
    sourcePostUrl: new FormControl('', [urlValidator()])
  })

  ngAfterViewInit(): void {
    this.registerValueChanges();
  }

  get formValue() { return this.uploadForm.getRawValue() }

  get isValid() { return this.uploadForm.valid }

  get formInstance() { return this.uploadForm }

  protected registerValueChanges() {
    this.uploadForm.get('attachment')?.valueChanges.subscribe({
      next: (value) => {
        if (value?.length) {
          this.uploadForm.get('sourceImageUrl')?.disable({ onlySelf: true, emitEvent: false });
          this.uploadForm.get('sourcePostUrl')?.disable({ onlySelf: true, emitEvent: false });
        } else {
          this.uploadForm.get('sourceImageUrl')?.enable({ onlySelf: true, emitEvent: false });
          this.uploadForm.get('sourcePostUrl')?.enable({ onlySelf: true, emitEvent: false });
        }
      }
    });

    this.uploadForm.get('sourceImageUrl')?.valueChanges.subscribe({
      next: (value) => {
        if (value?.length) {
          this.uploadForm.get('attachment')?.disable({ onlySelf: true, emitEvent: false });
        } else {
          this.uploadForm.get('attachment')?.enable({ onlySelf: true, emitEvent: false });
        }
      }
    });
  }

  protected removeFile(index: number): void {
    const newFiles = this.uploadForm.get('attachment')?.value?.filter((ite, idx) => idx != index) as Array<File>;
    this.uploadForm.get('attachment')?.patchValue(newFiles)
  }
}
