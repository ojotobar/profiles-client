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

export interface ExperienceModel {
    organization: string,
    title: string,
    startDate: Date,
    endDate: Date | null,
    summaries: string[],
    location: {
        city: string,
        country: string
    }
}

export const getEducationPayload = function(form: any): ExperienceModel {
    let payload: ExperienceModel = {
        organization: form.organizationName as string,
        title: form.jobTitle as string,
        startDate: new Date(form.startDate),
        endDate: form.endDate ? new Date(form.endDate) : null,
        summaries: form.accomplishments as string[],
        location: {
          city: form.city as string,
          country: form.country as string
        }
    }
    return payload
}