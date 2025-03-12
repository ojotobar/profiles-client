import { AlertClassEnum, AlertIconEnum } from "../../enums/alert-enums";

export class AlertModel{
    constructor(
        public heading: string = '',
        public message: string = '',
        public bg: AlertClassEnum = AlertClassEnum.danger,
        public icon: AlertIconEnum = AlertIconEnum.danger,
        public dismissible: boolean = false
    ){}
}