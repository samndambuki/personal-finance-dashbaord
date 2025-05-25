import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent implements OnInit {
  formStatus: string = '';
  transactionForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
    amount: new FormControl(0, Validators.required),
    type: new FormControl('income', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  });
  constructor(private transactionService: TransactionService) {}
  ngOnInit(): void {
    this.transactionForm.statusChanges.subscribe((status) => {
      this.formStatus = status;
    });
  }
  onSubmit() {
    if (this.transactionForm.valid) {
      const transaction: Transaction = {
        description: this.transactionForm.value.description || '',
        amount: this.transactionForm.value.amount || 0,
        type: this.transactionForm.value.type || 'icome',
        category: this.transactionForm.value.category || '',
        date: this.transactionForm.value.date || '',
      };
      this.transactionService.addTransaction(transaction).subscribe(() => {
        this.transactionForm.reset();
      });
    }
  }
}
