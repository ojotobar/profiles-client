import { SnackbarClassEnum, SnackbarIconEnum } from "../../enums/snackbar-enum";
import { SocialMediaModel } from "../profile/profile-models";

export class SnackbarModel{
    message: string = "Success!!!";
    color: SnackbarClassEnum = SnackbarClassEnum.Success;
    icon: SnackbarIconEnum = SnackbarIconEnum.Success;
}

export interface MatDialogData{
    id: string,
    name: string,
    new: boolean,
    refresh: boolean
}