import { Injectable } from "@angular/core";
import { InvoiceDto, InvoiceViewModel } from "../models";

@Injectable({
  providedIn: 'root'
})
export class InvoiceMapper {
  public toViewModel(dto: InvoiceDto): InvoiceViewModel {
    return {
      id: dto.id,
      jobAdId: dto.jobAdId,
      amount: dto.amount,
      dueDate: dto.dueDate,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    };
  }

  public toDto(viewModel: InvoiceViewModel): InvoiceDto {
    return {
      id: viewModel.id,
      jobAdId: viewModel.jobAdId,
      amount: viewModel.amount,
      dueDate: viewModel.dueDate,
      createdAt: viewModel.createdAt,
      updatedAt: viewModel.updatedAt,
      _embedded: {}
    };
  }
}
