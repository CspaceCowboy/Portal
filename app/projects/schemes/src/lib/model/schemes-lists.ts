﻿import { ActivatedRouteSnapshot } from '@angular/router';

export enum SchemesList
{
    Full = 'full',
    My = 'my',
    Favorites = 'fav',
    Likes = 'likes',
    Original = 'ml',
    Community = 'com'
}


export function getSchemesListFromRoute(route: ActivatedRouteSnapshot): SchemesList
{
    let index = route;
    while (index.firstChild && (index.url.length === 0 || index.url[0].path !== 'index'))
    {
        index = index.firstChild;
    }
    return index.params.list ? SchemesList[index.params.list] as any : SchemesList.Full;
}