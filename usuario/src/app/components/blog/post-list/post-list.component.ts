import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { NavComponent } from '../../nav/nav.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [FooterComponent,NavComponent,FormsModule,CommonModule,RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {

  // Paginación
  public page = 1
  public pageSize = 5
  public sort_by = 'Defecto'


  public categorias: Array<any> = [];
  public filtrar_categoria = ''
  public posts: Array<any> = []

}
