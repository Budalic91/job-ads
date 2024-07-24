import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InvoiceJobViewModel } from '../../models';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceListComponent {
  @Input()
  public set invoices(value: InvoiceJobViewModel[]) {
    this._invoices = value;
  }

  public get invoices (): InvoiceJobViewModel[] {
    return this._invoices
  }

  @Input()
  public set isMobile(value) {
    this._isMobile = value;
  }

  public get isMobile() {
    return this._isMobile;
  }

  private _invoices: InvoiceJobViewModel[] = [];
  private _isMobile = false;
  public displayedColumns: string[] = ['jobAdTitle', 'amount', 'dueDate'];

  identify(index: number, item: InvoiceJobViewModel) {
      return item.id;
  }

}
