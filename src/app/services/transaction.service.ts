import { Injectable, makeStateKey, TransferState } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of, tap } from 'rxjs';

//makeStateKey - store and retrieve an array of transaction objects
const TRANSACTIONS_KEY = makeStateKey<Transaction[]>('transactions');

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/transactions';
  //TransferState - used to manage state during SSR
  constructor(private http: HttpClient, private transferState: TransferState) {}
  //fetches all transactions from the json-server or retrieves them from the transferState if available
  getTransactions(): Observable<Transaction[]> {
    //check if transactionState has the key. if data was fetched from the server during server side rendering
    if (this.transferState.hasKey(TRANSACTIONS_KEY)) {
      //if found returns an observable with chached data using of to avoid unncessesary http requests
      return of(this.transferState.get(TRANSACTIONS_KEY, []));
    }
    return this.http
      .get<Transaction[]>(this.apiUrl)
      .pipe(
        tap((transactions) =>
          this.transferState.set(TRANSACTIONS_KEY, transactions)
        )
      );
  }
  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }
  updateTransaction(
    transaction: Transaction,
    id: number
  ): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, transaction);
  }
  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
