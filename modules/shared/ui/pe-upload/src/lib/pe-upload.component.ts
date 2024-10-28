import { ChangeDetectionStrategy, Component, output } from '@angular/core';
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

  formSubmit = output<UploadGifOptions>();
  protected readonly control = new FormControl<TuiFileLike | null>(null);

  protected readonly uploadForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    attachment: new FormControl(null, [urlValidator()]),
    sourceImageUrl: new FormControl('', [urlValidator()]),
    tags: new FormControl([], [Validators.required]),
    sourcePostUrl: new FormControl('')
  })

  get formValue() { return this.uploadForm.getRawValue() }
}
