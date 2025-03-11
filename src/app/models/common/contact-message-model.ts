import { MessageSubjectEnum } from "../../enums/message-subject-enum";

export interface ContactMessageModel{
    name: string,
    email: string,
    subject: MessageSubjectEnum,
    message: string
}