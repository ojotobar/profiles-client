import { OperationTypeEnum } from "../../enums/operation-type-enum";
import { UploadFileTypes, UploadTypeEnum } from "../../enums/upload-types-enums";

export interface ResponseModel{
    success: boolean,
    message: string
}

export interface MatDialogFileUploadData{
    id: string,
    type: UploadTypeEnum,
    accept: UploadFileTypes,
    refreshAfterClose: boolean
}

export interface GenericResponseModel {
    payload: ResponseModel
}

export const genericErrorMessage = 'Something went wrong';

export function getGenericErrorMessage(type: OperationTypeEnum): string {
    let operation = '';
    let plural = false;
    let isFile = false;

    switch(type){
        case OperationTypeEnum.add:
            operation = 'adding';
            break;
        case OperationTypeEnum.delete:
            operation = 'deleting';
            break;
        case OperationTypeEnum.get:
            operation = 'getting';
            break;
        case OperationTypeEnum.getMany:
            operation = 'getting';
            plural = true;
            break;
        case OperationTypeEnum.update:
            operation = 'updating';
            break;
        case OperationTypeEnum.upload:
            operation = 'uploading';
            isFile = true;
            break;
        case OperationTypeEnum.uploadMany:
            operation = 'uploading';
            isFile = true;
            plural = true;
            break;
        default:
            break;
    }

    let noun = plural ? isFile ? 'files' : 'records' : isFile ? 'file' : 'record' 
    return `Something went wrong while ${operation} the ${noun}. Please try again. Contact Support if issue persists.`;
}