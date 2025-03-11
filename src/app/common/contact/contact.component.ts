import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { AppService } from '../../services/app.service';
import { MessageSubjectEnum } from '../../enums/message-subject-enum';
import { ContactMessageModel } from '../../models/common/contact-message-model';

@Component({
  selector: 'app-contact',
  imports: [
    MatIconModule,
    RouterLink,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  supportEmail: string = 'support@profiles.com';
  subjectOptions = inject(AppService).getMessageSubjectOptions();
  appService = inject(AppService);

  messageForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    subject: new FormControl(MessageSubjectEnum.GeneralInquiry),
    message: new FormControl('', Validators.required)
  });

  sendMessage() {
    if(this.messageForm.valid){
      let form = this.messageForm.value;
      this.clearForm()
      let payload: ContactMessageModel = {
        name: form.name as string,
        email: form.email as string,
        subject: form.subject as MessageSubjectEnum,
        message: form.message as string
      }
      this.appService.sendContactMessage(payload)
    }
  }

  clearForm(){
    this.messageForm.get('name')?.reset();
    this.messageForm.get('email')?.reset();
    this.messageForm.get('message')?.reset();
  }
}
