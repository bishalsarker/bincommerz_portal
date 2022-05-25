import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  subscriptionStatus$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(authService: AuthService) { 
    authService.getSubscriptionStatus().subscribe(x => this.subscriptionStatus$.next(x.data));
  }
}
