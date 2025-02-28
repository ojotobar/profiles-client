import { GenderEnum } from "../../enums/gender-enum";

export interface RegisterModel{
    firstName: string | '';
    lastName: string | '';
    middleName: string | '';
    emailAddress: string | '';
    password: string | '';
    confirmPassword: string | '';
    phoneNumber: string | '';
    gender: GenderEnum | GenderEnum.NotSpecified
}