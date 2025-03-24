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

export interface EducationModel {
    schoolName: string,
    course: string,
    startDate: Date,
    endDate: Date | null,
    level: EducationLevelEnum,
    location: EntityLocationModel
}

export interface EducationResult{
    success: boolean,
    message: string
}

export interface EducationPatchModel{
    institutionName: string,
    major: string,
    level: EducationLevelEnum,
    startDate: Date,
    endDate: Date | null,
    city: string,
    country: string,
    state: string,
    longitude: string | null,
    latitude: string | null,
    isEndDateNull: boolean
}