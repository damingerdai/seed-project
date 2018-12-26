import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  cols = 4;

  breakpointSubscription: Subscription;
  subscriptions: Subscription[];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.subscriptions = [];
    this.subscriptions.push(this.observeBreakpoint([Breakpoints.XSmall], 1));
    this.subscriptions.push(this.observeBreakpoint([Breakpoints.Small, Breakpoints.Medium], 2));
    this.subscriptions.push(this.observeBreakpoint([Breakpoints.Large, Breakpoints.XLarge], 4));
  }

  observeBreakpoint(breakpoints: Array<string>, col: number): Subscription {
    return this.breakpointObserver.observe(breakpoints).subscribe(
      result => {
        if (result.matches) {
          this.cols = col;
        }
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe();
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }

  unsubscribe() {
    if (this.subscriptions && this.subscriptions.length > 0) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

}
