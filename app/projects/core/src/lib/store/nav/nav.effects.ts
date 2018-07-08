﻿import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { switchMap, filter, map } from 'rxjs/operators';

import { NavAction, NavActionTypes } from './nav.action-sets';
import * as NavActions from './nav.actions';
import { NotifyUser } from '../info/info.actions';
import { NotificationLevel } from '../info/info.state';

@Injectable()
export class NavEffects
{
    constructor(
        protected readonly actions$: Actions<NavAction, typeof NavActions>
    ) { }

    @Effect() refreshUser$ = this.actions$.ofType(NavActionTypes.NavigationFailed).pipe(
        switchMap(user => of(new NotifyUser({
            message: 'Navigation has failed',
            level: NotificationLevel.Error,
            data: user.payload.error
        })))
    );

    @Effect() handleNavigation$ = this.actions$.ofType(NavActionTypes.RouterNavigation).pipe(
        filter(act => !this.getLastChild(act.payload.routerState.root).data.server),
        map(act => new NavActions.ReturnUrlChanged({
            returnUrl: act.payload.routerState.url
        }))
    );

    private getLastChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot
    {
        if (route.firstChild)
        {
            return this.getLastChild(route.firstChild);
        }
        return route;
    }
}
