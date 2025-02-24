import { GenderEnum } from "../../enums/gender.enum";

export class RegisterModel{
    firstName: string | undefined;
    lastName: string | undefined;
    emailAddress: string | undefined;
    password: string | undefined;
    confirmPassword: string | undefined;
    phoneNumber: string | undefined;
    gender: GenderEnum = GenderEnum.NotSpecified
}