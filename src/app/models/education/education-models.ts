import { EducationLevelEnum } from "../../enums/education-level-enum"
import { EntityLocationModel } from "../common/entity-location-model"

export interface EducationsResultModel {
    educations: EducationResultModel[]
}

export interface EducationResultModel{
    id: string,
    institutionName: string,
    major: string,
    level: EducationLevelEnum,
    levelDescription: string,
    startDate: Date,
    endDate: Date | null,
    location: EntityLocationModel
}