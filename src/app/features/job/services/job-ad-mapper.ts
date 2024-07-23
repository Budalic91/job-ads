import { Injectable } from "@angular/core";
import { JobAdDto, JobAdViewModel } from "../models";

@Injectable({
  providedIn: 'root'
})
export class JobAdMapper {
  public toViewModel(dto: JobAdDto): JobAdViewModel {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      skills: dto.skills,
      status: dto.status,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    };
  }

  public toDto(viewModel: JobAdViewModel): JobAdDto {
    return {
      id: viewModel.id,
      title: viewModel.title,
      description: viewModel.description,
      skills: viewModel.skills,
      status: viewModel.status,
      createdAt: viewModel.createdAt,
      updatedAt: viewModel.updatedAt,
      _embedded: {}
    };
  }
}
