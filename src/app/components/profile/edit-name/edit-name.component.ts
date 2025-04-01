import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-name',
  imports: [],
  templateUrl: './edit-name.component.html',
  styles: ``
})
export class EditNameComponent {
  id: string | null = '';

  constructor(private readonly aRoute: ActivatedRoute){
    this.aRoute.paramMap.subscribe(route => {
      this.id = route.get('id');
    })
  }
}
