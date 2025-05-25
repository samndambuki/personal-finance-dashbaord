import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { BudgetOverviewComponent } from '../budget-overview/budget-overview.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    TransactionFormComponent,
    TransactionListComponent,
    BudgetOverviewComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  changeLanguage(lang: string) {
    //full page reload which is necessary for i18n
    window.location.href = `/${lang}`;
  }
}
