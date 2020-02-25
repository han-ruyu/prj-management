import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as AuthActions from '../auth/store/auth.actions';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements  OnInit ,OnDestroy{

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, {static : false}) alertHost: PlaceholderDirective;
    constructor(private authService: AuthService, private router: Router, private componentFactoryResoolver: ComponentFactoryResolver, private store: Store<fromApp.AppState>) {}

    private colseSub: Subscription;
    private storeSub: Subscription;
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    ngOnInit() {
        this.storeSub = this.store.select('auth').subscribe(storeData => {
            this.isLoading = storeData.loading;
            this.error = storeData.authError;
            if(this.error) {
                this.showErrorAlert(this.error)
            }
        })
    }
    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        }

        const email =  form.value.email;
        const password = form.value.password;
        if (this.isLoginMode) {
            this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}))
        } else {
            this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}))
        }

        form.reset()
    }

    onHandleError() {
        this.store.dispatch(new AuthActions.ClearError());
    }

    private showErrorAlert(message: string) {
        const alertCmpFactory = this.componentFactoryResoolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
        componentRef.instance.message = message;
        this.colseSub = componentRef.instance.close.subscribe(()=>{
            this.colseSub.unsubscribe();
            hostViewContainerRef.clear()
        })
    }

    ngOnDestroy() {
        if (this.colseSub) {
            this.colseSub.unsubscribe();
        }
        if(this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }
}