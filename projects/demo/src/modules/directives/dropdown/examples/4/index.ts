import {Component, ViewEncapsulation} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {changeDetection} from '@demo/emulate/change-detection';
import {TuiDropdownModule, TuiLabel} from '@taiga-ui/core';
import {TuiSwitchComponent} from '@taiga-ui/kit';

@Component({
    standalone: true,
    imports: [TuiDropdownModule, TuiSwitchComponent, FormsModule, TuiLabel],
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection,
})
export default class Example {
    protected open = false;
}
