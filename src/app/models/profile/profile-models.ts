import { GenderEnum } from "../../enums/gender-enum"
import { SocialMediaEnum } from "../../enums/social-media-enum"
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
    updatedOn: Date,
    lastLogin: Date,
    deactivatedOn: Date,
    emailConfirmed: boolean,
    role: string | '',
    location: ProfileLocationModel | null,
    socialMedia: SocialMediaModel[]
}

export interface SocialMediaModel{
    name: string,
    link: string
    type: SocialMediaEnum,
    iconName: string
}

export interface DetailedProfileModel{
    profile: ProfileModel,
    profileSummary: ProfileSummaryModel
}

export interface ProfileLocationModel extends EntityLocationModel {
    line1: string,
    line2: string | null,
    postalCode: string
}

export interface ProfileSummaryResponseModel {
    userSummary: ProfileSummaryModel
}

export interface ProfileSummaryModel{
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

export interface ApiKeyResponseModel {
    apiKey: string,
    message: string,
    success: boolean
}

export interface ProfileUpdateModel{
    firstName: string,
    lastName: string,
    otherName: string | null,
    phone: string,
    gender: GenderEnum
}

export interface ProfilesInputModel {
    search: string | null,
    status: UserStatusEnum | null,
    premium: boolean | null,
    confirmed: boolean | null,
    gender: boolean | null
}

export interface ProfilesResponseModel{
    items: ProfileModel[],
    pageInfo: {
        hasNextPage: boolean,
        hasPreviousPage: boolean
    },
    totalCount: number
}

export interface SocialMediaResponseModel {
    socialMedia: {
      success: boolean,
      socialMedia: SocialMediaModel[]
    }
}

export const apiKeyTooltip = 'Your API key will be generated once you complete your profile, including skills, education, experience, and location. After generation, navigate to the \'API\' section in your account settings to view your key and explore available endpoints.';