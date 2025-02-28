import { SnackbarClassEnum, SnackbarIconEnum } from "../../enums/snackbar-enum";

export class SnackbarModel{
    message: string = "Success!!!";
    color: SnackbarClassEnum = SnackbarClassEnum.Success;
    icon: SnackbarIconEnum = SnackbarIconEnum.Success;
}