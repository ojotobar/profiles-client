import { Component } from '@angular/core';

@Component({
  selector: 'app-socials',
  imports: [],
  templateUrl: './socials.component.html',
  styles: `.social {
      display: flex;
      gap: 15px;
  
      a {
        color: #555;
  
        .bi {
          font-size: 20px;
        }
  
        &:hover {
          color: white;
        }
      }
    }`
})
export class SocialsComponent {

}
