import { OperationTypeEnum } from "../../enums/operation-type-enum";

export interface ResponseModel{
    success: boolean,
    message: string
}

export interface GenericResponseModel {
    payload: ResponseModel
}

export const genericErrorMessage = 'Something went wront';

export function getGenericErrorMessage(type: OperationTypeEnum): string {
    let operation = '';
    let plural = false;

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
        default:
            break;
    }

    return `Something went wrong while ${operation} the ${plural ? 'records' : 'record'}. Please try again. Contact Support if issue persists.`;
}