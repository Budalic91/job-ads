import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { By } from '@angular/platform-browser';
import { InvoiceListComponent } from './invoice-list.component';
import { InvoiceJobViewModel } from '../../models';

describe('InvoiceListComponent', () => {
  let component: InvoiceListComponent;
  let fixture: ComponentFixture<InvoiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceListComponent],
    })
    .overrideComponent(InvoiceListComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set and get invoices', () => {
    const invoices: InvoiceJobViewModel[] = [
      { id: 1, jobAdId: 1, jobAdTitle: 'Job 1', amount: 100, dueDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
      { id: 2, jobAdId: 2, jobAdTitle: 'Job 2', amount: 200, dueDate: new Date(), createdAt: new Date(), updatedAt: new Date() },
    ];
    component.invoices = invoices;
    expect(component.invoices).toEqual(invoices);
  });

  it('should set and get isMobile', () => {
    component.isMobile = true;
    expect(component.isMobile).toBeTrue();
  });

  it('should return correct identifier in identify method', () => {
    const invoice: InvoiceJobViewModel = { id: 1, jobAdId: 1, jobAdTitle: 'Job 1', amount: 100, dueDate: new Date(), createdAt: new Date(), updatedAt: new Date() };
    expect(component.identify(0, invoice)).toBe(1);
  });

  it('should display the correct columns in the table', () => {
    const displayedColumns = ['jobAdTitle', 'amount', 'dueDate'];
    expect(component.displayedColumns).toEqual(displayedColumns);
  });

  it('should render invoice data in the table', () => {
    const invoices: InvoiceJobViewModel[] = [
      { id: 1, jobAdId: 1, jobAdTitle: 'Job 1', amount: 100, dueDate: new Date('2024-01-01'), createdAt: new Date(), updatedAt: new Date() },
      { id: 2, jobAdId: 2, jobAdTitle: 'Job 2', amount: 200, dueDate: new Date('2024-02-01'), createdAt: new Date(), updatedAt: new Date() },
    ];
    component.invoices = invoices;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tr'));
    expect(rows.length).toBe(3);

    const firstRowCells = rows[1].queryAll(By.css('td'));
    expect(firstRowCells[0].nativeElement.textContent).toContain('Job 1');
    expect(firstRowCells[1].nativeElement.textContent).toContain('100');
    expect(firstRowCells[2].nativeElement.textContent).toContain('2024-01-01');

    const secondRowCells = rows[2].queryAll(By.css('td'));
    expect(secondRowCells[0].nativeElement.textContent).toContain('Job 2');
    expect(secondRowCells[1].nativeElement.textContent).toContain('200');
    expect(secondRowCells[2].nativeElement.textContent).toContain('2024-02-01');
  });
});
