import { MessageSubjectEnum } from "../../enums/message-subject-enum";

export class MessageSubjectModel{
    constructor(
        public label: string,
        public value: MessageSubjectEnum){ }
}