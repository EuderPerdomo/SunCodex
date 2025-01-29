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


export const routes: Routes = [

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

        ]
      },
 
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
