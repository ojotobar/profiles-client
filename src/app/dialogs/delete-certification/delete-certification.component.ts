import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogData } from '../../models/common/snackbar-model';
import { AppService } from '../../services/app.service';
import { CertificationsService } from '../../services/certifications.service';

@Component({
  selector: 'app-delete-certification',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './delete-certification.component.html',
  styleUrl: './delete-certification.component.scss'
})
export class DeleteCertificationComponent {
  loading: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
      private dialogRef: MatDialogRef<DeleteCertificationComponent>,
      private readonly appService: AppService,
      private readonly certService: CertificationsService){}

  deleteRecord() {
  }

  closeDialog(){
    this.dialogRef.close(this.data)
  }
}
