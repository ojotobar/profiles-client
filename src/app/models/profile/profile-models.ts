import { GenderEnum } from "../../enums/gender-enum"
import { UserStatusEnum } from "../../enums/status-enum"
import { EntityLocationModel } from "../common/entity-location-model"

export interface ProfileResultModel {
    profile: ProfileModel
}

export interface ProfileModel{
    id: string,
    firstName: string,
    lastName: string,
    otherName: string,
    email: string,
    phoneNumber: string,
    gender: GenderEnum,
    status: UserStatusEnum,
    cvUrl: string | null,
    photoUrl: string | null,
    isDeprecated: boolean,
    createdOn: Date,
    lastLogin: Date,
    deactivatedOn: Date,
    location: ProfileLocationModel | null
}

export interface ProfileLocationModel extends EntityLocationModel {
    line1: string,
    line2: string | null,
    postalCode: string
}

export interface ProfileSummaryResponseModel {
    userSummary: {
      education: number,
      experience: number,
      skills: number,
      projects: number,
      certifications: number,
      hasCareerSummary: boolean
      progress: number,
      canGenerateApiKey: boolean,
      apiKey: string
    }
}

export const apiKeyTooltip = 'Your API key will be generated once you complete your profile, including skills, education, experience, and location. After generation, navigate to the \'API\' section in your account settings to view your key and explore available endpoints.';