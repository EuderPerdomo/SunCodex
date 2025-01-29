import { Component } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-summary-calculo',
  standalone: true,
  imports: [NavComponent,FooterComponent],
  templateUrl: './summary-calculo.component.html',
  styleUrl: './summary-calculo.component.css'
})
export class SummaryCalculoComponent {

}
