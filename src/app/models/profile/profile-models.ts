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