import {Directive} from '@angular/core';
import {AbstractTuiTextfieldHost} from '@taiga-ui/legacy/classes';
import {tuiAsTextfieldHost} from '@taiga-ui/legacy/tokens';

import type {TuiTextareaComponent} from './textarea.component';

@Directive({
    standalone: false,
    selector: 'tui-textarea',
    providers: [tuiAsTextfieldHost(TuiTextareaDirective)],
})
export class TuiTextareaDirective extends AbstractTuiTextfieldHost<TuiTextareaComponent> {
    public onValueChange(value: string): void {
        this.host.onValueChange(value);
    }
}
