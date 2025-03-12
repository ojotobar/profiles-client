import { AlertClassEnum, AlertIconEnum } from "../../enums/alert-enums";

export class AlertModel{
    constructor(
        public heading: string = '',
        public message: string = '',
        public bg: AlertClassEnum = AlertClassEnum.success,
        public icon: AlertIconEnum = AlertIconEnum.success,
        public dismissible: boolean = false
    ){}
}