import { SnackbarIconEnum, SnackbarClassEnum } from '../enums/snackbar.enum';

export class SnackbarModel{
    message: string = "Success!!!";
    color: SnackbarClassEnum = SnackbarClassEnum.Success;
    icon: SnackbarIconEnum = SnackbarIconEnum.Success;
}