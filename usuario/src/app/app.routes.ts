import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CreateCalculoComponent } from './components/calculadora/create-calculo/create-calculo.component';
import { SimularPanelSolarComponent } from './components/calculadora/panel_solar/simular-panel-solar/simular-panel-solar.component';
import { SummaryCalculoComponent } from './components/calculadora/summary-calculo/summary-calculo.component';
import { AboutMeComponent } from './components/aboutMe/about-me/about-me.component';
import { SimularPanelComponent } from './components/simulaciones/paneles/simular-panel/simular-panel.component';
import { SimularLamparaComponent } from './components/simulaciones/lamparas/simular-lampara/simular-lampara.component';
import { EstandarCalculoComponent } from './components/calculadora/estandar-calculo/estandar-calculo/estandar-calculo.component';
import { ArreglosComponent } from './components/simulaciones/paneles/arreglos/arreglos.component';
import { PostListComponent } from './components/blog/post-list/post-list.component';
import { PostSingleComponent } from './components/blog/post-single/post-single.component';
import { LoginComponent } from './components/login/login.component';
import { IndexLamparasComponent } from './components/lamparas/index-lamparas/index-lamparas.component';
import { ShowLamparaComponent } from './components/lamparas/show-lampara/show-lampara.component';
import { InversorComponent } from './components/inversores/inversor/inversor.component';
import { ControladorComponent } from './components/controladores/controlador/controlador.component';
import { BateriaComponent } from './components/baterias/bateria/bateria.component';
import { PanelSolarComponent } from './components/paneles/panel-solar/panel-solar.component';


export const routes: Routes = [

  { path: 'login', component:LoginComponent },
  
    {
        path: '',
        component: InicioComponent,
        //canActivate: [adminGuard],
        //data: { allowedRoles: ['user', 'admin']}  // Definiendo roles permitidos
      },

      {
        path:'calculo',children:[
          // {
          //   path: 'crear',
          //   component: CreateCalculoComponent,
          //   //canActivate: [adminGuard],
          //   //data: { allowedRoles: ['user', 'admin'] }
          // },

          { path: 'crear/:tipo', component: CreateCalculoComponent },
          { path: 'interactiva', component: EstandarCalculoComponent },

          { path: 'summary/:id', 
            component: SummaryCalculoComponent, 
           // canActivate: [AuthGuard] 
          },

        ]
      },

      
      {
        path:'panelSolar',children:[
          {
            path: 'paneles',
            component: PanelSolarComponent,
            //canActivate: [adminGuard],
            //data: { allowedRoles: ['user', 'admin'] }
          },

          {
            path: 'simular',
            component: SimularPanelSolarComponent,
            //canActivate: [adminGuard],
            //data: { allowedRoles: ['user', 'admin'] }
          },

          {
            path: 'simularPanelSolar',
            component: SimularPanelComponent,
            //canActivate: [adminGuard],
            //data: { allowedRoles: ['user', 'admin'] }
          },

          {
            path: 'arreglos',
            component: ArreglosComponent,
            //canActivate: [adminGuard],
            //data: { allowedRoles: ['user', 'admin'] }
          },

        ]
      },

      {
        path:'lamparaSolar',children:[
          {
            path: 'simularLamparaSolar',
            component: SimularLamparaComponent,
            //canActivate: [adminGuard],
            //data: { allowedRoles: ['user', 'admin'] }
          },

          {
            path: 'lamparasSolares',
            component: IndexLamparasComponent,
            //canActivate: [adminGuard],
            //data: { allowedRoles: ['user', 'admin'] }
          },

          {
            path: 'lampara/:slug',
            component: ShowLamparaComponent,
            //canActivate: [adminGuard],
            //data: { allowedRoles: ['user', 'admin'] }
          },
        ]
      },

      {
        path:'blog',children:[
          {
            path: 'post_list',
            component: PostListComponent,
            //canActivate: [adminGuard],
            //data: { allowedRoles: ['user', 'admin'] }
          },
          {
            path: ':slug',
            component: PostSingleComponent,
            //canActivate: [adminGuard],
            //data: { allowedRoles: ['user', 'admin'] }
          },

        ]
      },

      {
        path:'inversor',children:[
          {
            path: 'inversores',
            component: InversorComponent,
            //canActivate: [adminGuard],
            //data: { allowedRoles: ['user', 'admin'] }
          },
      
        ]
      },

      {
        path:'controlador',children:[
          {
            path: 'controladores',
            component: ControladorComponent,
            //canActivate: [adminGuard],
            //data: { allowedRoles: ['user', 'admin'] }
          },
      
        ]
      },
      {
        path:'bateria',children:[
          {
            path: 'baterias',
            component: BateriaComponent,
            //canActivate: [adminGuard],
            //data: { allowedRoles: ['user', 'admin'] }
          },
      
        ]
      },

      /*
      { path: 'blog', component:BlogListComponent },
{ path: 'blog/categoria/:categoria', component:BlogListComponent},
{ path: 'blog/:slug', component:SingleBlogComponent }
      */

 
          {
            path: 'aboutMe',
            component: AboutMeComponent,
            //canActivate: [adminGuard],
            //data: { allowedRoles: ['user', 'admin'] }
          },


      //Ruta Comodin
      {
        path: '**',
        redirectTo: ''
      }

];
