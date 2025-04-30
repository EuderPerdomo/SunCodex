import { Component,OnInit } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { FormsModule, FormGroup, FormControl,Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TinymceComponent } from 'ngx-tinymce';
import { AdminService } from '../../../services/admin.service';

declare var iziToast:any
declare var $:any

@Component({
    selector: 'app-edit-blog',
    standalone: true,
    imports: [SidebarComponent,FormsModule,CommonModule,RouterModule,TinymceComponent],
    templateUrl: './edit-blog.component.html',
    styleUrl: './edit-blog.component.css'
})
export class EditBlogComponent implements OnInit {
    public id = '';
    public load_data = false;
    public token = localStorage.getItem('token');
    public file: any = undefined;
    public config: any = {}
    public configCorta: any = {}
  
    public categorias: Array<any> = [];
    public etiquetas: Array<any> = [];
    public arr_etiquetas: Array<any> = [];
    public new_etiqueta = '';
    public load_data_etiqueta = false;
    public load_etiquetas = false;
  
    public blog = {
      titulo: '',
      portada: '',
      contenido: '',
      descripcion: '',
      categoria: this.categorias[0],
      etiquetas: this.etiquetas[0],
      fecha: '',
      autor: '',
    };
  
    public load_btn = false;
  
    blogForm!: FormGroup
  
    public imgSelect: any | ArrayBuffer = 'assets/img/components/noimagen/noimg.PNG';
  
    constructor(
      private _adminService:AdminService,
      private _router: Router,
      private _route: ActivatedRoute,
    ) {
  
  
      this.config = {
        height: 400,
        license_key: 'gpl',   
        plugins:'link,image, media, code, emoticons,fullscreen,importcss,preview',
      }
  
      this.configCorta = {
        height: 300,
        license_key: 'gpl',
     
      }
  
      this.blogForm=new FormGroup({
        titulo: new FormControl(this.blog.titulo, [
          Validators.required,
          Validators.minLength(4),
          //forbiddenNameValidator(/bob/i), // <-- Here's how you pass in the custom validator.
        ]),
  
        contenido: new FormControl(this.blog.contenido, [
          Validators.required,
        ]),
        descripcion: new FormControl(this.blog.contenido, [
          Validators.required,
        ]),
        categoria: new FormControl(this.blog.categoria, Validators.required),
        etiquetas: new FormControl(this.blog.etiquetas, Validators.required),
    
      })
  
    }
  
    ngOnInit(): void {
  
      this._adminService.get_categorias(this.token).subscribe(
        response => {
          this.categorias = response.data;
        }
      );
  
      this._adminService.listar_etiquetas_post_global_admin(this.token).subscribe(
        response => {
          this.etiquetas = response.data;
        }
      );
  
      this._route.params.subscribe(
        params => {
          this.id = params['id'];
          this.load_data = true;
          this._adminService.obtener_blog_admin(this.id, this.token).subscribe(
            response => {
              if (response.data == undefined) {
                this.load_data = false;
                //this.producto = undefined;
  
              } else {
                this.load_data = false;
                this.blog = response.data;
                this.listar_etiquetas_post();
                //this.imgSelect = this.url +'obtener_portada/'+this.producto.portada;
                this.imgSelect = this.blog.portada;
              }
  
            },
            error => {
              iziToast.show({
                title: '¡upss!',
                titleColor: '#FF0000',
                color: '#FFF',
                class: 'text-danger',
                position: 'topRight',
                message: '🤨 Error al Obtener Post'
              });
  
            }
          );
  
        }
      );
    }
  
  
    listar_etiquetas_post() {
      this.load_etiquetas = true;
      this._adminService.listar_etiquetas_post_admin(this.id, this.token).subscribe(
        response => {
          this.arr_etiquetas = response.data;
          this.load_etiquetas = false;
        }
      );
    }
  
  
  
    EditarPost(blogForm: any) {
      if (blogForm.valid) {
  
        var data: any = {};
  
        if (this.file != undefined) {
          data.portada = this.file;
        }
  
        data.titulo = this.blog.titulo;
        data.etiquetas = this.arr_etiquetas
        data.descripcion = this.blog.descripcion;
        data.categoria = this.blog.categoria;
        data.contenido = this.blog.contenido;
  
          this.load_btn = true;
         // this.blog.etiquetas = this.arr_etiquetas;
          this._adminService.actualizar_post_admin(data, this.id, this.token).subscribe(
            response => {
  
              if (response.data == undefined) {
                iziToast.show({
                  title: 'ERROR',
                  titleColor: '#FF0000',
                  color: '#FFF',
                  class: 'text-danger',
                  position: 'topRight',
                  message: response.message
                });
                this.load_btn = false;
              } else {
                iziToast.show({
                  title: 'SUCCESS',
                  titleColor: '#1DC74C',
                  color: '#FFF',
                  class: 'text-success',
                  position: 'topRight',
                  message: 'Se Actualizo correctamente el post.'
                });
                this.load_btn = false;
  
                this._router.navigate(['panel/blog']);
              }
            },
            error => {
              this.load_btn = false;
            }
          );
  
          this.load_btn = false;
        
  
      } else {
  
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Los datos del formulario no son validos'
        });
        this.load_btn = false;
      }
  
    }
  
    fileChangeEvent(event: any): void {
      var file: any;
      if (event.target.files && event.target.files[0]) {
        file = <File>event.target.files[0];
      } else {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'No hay un imagen de envio'
        });
      }
  
      if (file.size <= 4000000) {
  
        if (file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {
  
          const reader = new FileReader();
          reader.onload = e => this.imgSelect = reader.result;
          reader.readAsDataURL(file);
          $('#input-portada').text(file.name);
          this.file = file;
  
        } else {
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'El archivo debe ser una imagen'
          });
          $('#input-portada').text('Seleccionar imagen');
          this.imgSelect = 'assets/img/components/noimagen/noimg.PNG';
          this.file = undefined;
        }
      } else {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'La imagen no puede superar los 4MB'
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/components/noimagen/noimg.PNG';
        this.file = undefined;
      }
  
    }
  
    agregar_etiqueta() {
      let arr_label = this.new_etiqueta.split('_');
      let data = {
        etiqueta: arr_label[0],
        blog: this.id
      }
      this.load_etiquetas = true;
      this._adminService.agregar_etiqueta_post_admin(data, this.token).subscribe(
  
        response => {
            this.listar_etiquetas_post();
            this.load_etiquetas = false;
            iziToast.show({
              title: '!Yeaa¡',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: '😄 Etiqueta Agregada'
            });
        },
        error=>{
          iziToast.show({
            title: '¡upss!',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: '🤨 Error al agregar Etiqueta'
          });
        }
      );
    }
  
      eliminar_etiqueta(id: any) {
           var etiqueta= this.arr_etiquetas[id]._id
          var blog= this.id
  
        this.load_etiquetas = true;
        this._adminService.eliminar_etiqueta_post_admin(blog,etiqueta, this.token).subscribe(
          response => {
            this.listar_etiquetas_post();
            this.load_etiquetas = false;
            iziToast.show({
              title: '!Yeaa¡',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: '🗑️ Etiqueta Eliminada'
            });
          },
          error=>{
            iziToast.show({
              title: '¡Upps!',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: '🤨 Error al elimianr etiqueta'
            });
          }
        );
      }
  
  }
  
