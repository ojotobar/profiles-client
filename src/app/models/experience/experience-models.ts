import { EntityLocationModel } from "../common/entity-location-model"

export interface ExperiencesResultModel {
    experiences: ExperienceResultModel[]
}

export interface ExperienceResultModel {
    id: string,
    userId: string,
    organization: string,
    jobTitle: string
    accomplishments: string[]
    isDeprecated: boolean
    startDate: Date
    endDate: Date | null
    location: EntityLocationModel
}