import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { shareReplay, map, takeUntil, finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppConst } from 'src/app/shared/AppConst';
import { Champion } from '../model/champion.model';

@Injectable()
export class ChampionService implements Resolve<any>
{
    champions: Champion[];
    private _unsubscribeAll: Subject<any>;

    onChampionChanged: BehaviorSubject<any>;

    onSearchTextChanged: Subject<any>;
    searchText: string = '';

    constructor(
        private _httpClient: HttpClient,
    ) 
    {
        // Set the defaults
        this.champions = [];
        this.onChampionChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {
            Promise.all([
                this.getChampions()
            ])
                .then(([champions]: [any]) => {

                    this.onSearchTextChanged
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe(searchText => {
                            this.searchText = searchText;
                            this.getChampions();
                        });

                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getChampions(): Promise<any> {
        return new Promise<void>((resolve, reject) => {

            const params = new HttpParams()
                .set('search', this.searchText);

            this._httpClient
                .get<any>(`${AppConst.apiBaseUrl}/champion_info.json`, {params })
                .pipe(
                    map(response => response.data),
                    shareReplay()
                )
                .subscribe(
                    (response: any) => {

                        //creating iterable array
                        for (let i = 1; i < Object.keys(response).length - 1; i++) {

                            //skip data
                            // if(response[i]=== undefined){
                            //     continue;
                                
                            // }

                            if (response[i] !== undefined) {

                                const data =
                                {
                                    name: response[i]['name'],
                                    title: response[i]['title'],
                                    key: response[i]['key'],
                                    id: response[i]['id']
                                }

                                this.champions.push(new Champion(data));
                            }
                        }

                        if(!_.isNull(this.searchText)|| !_.isEmpty(this.searchText)){

                            //  //set column to lowercase for case insensitive search
                            this.onChampionChanged.next([...this.champions.filter(champion=> champion.name.toLocaleLowerCase().includes(this.searchText)|| champion.title.toLocaleLowerCase().includes(this.searchText)|| champion.key.toLocaleLowerCase().includes(this.searchText))])
                        }
                        else{

                            this.onChampionChanged.next([...this.champions]);

                        }
                        
                        resolve();
                    },
                    reject
                );
        });
    }

    deleteChampion(index: string): Observable<any>
    {
        const params = new HttpParams().set('id', index);

        return this._httpClient
        // .delete<any>(`assets/dataset_lolrankedgames/champion_info.json`, {params })
            .get<any>(`${AppConst.apiBaseUrl}/champion_info.json`, {params })
            .pipe(
                map(response => 
                {
                    this.champions = this.champions.filter((i) => i.id !== index).map((v, i) =>
                    {
                        v.index = i;
                        return v;
                    });

                    setTimeout(() => this.onChampionChanged.next([...this.champions]), 500);

                    return 'deleted';
                }),
                shareReplay()
            );
    }

    unsubscribeOptions(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();

        // reinitialize 
        this._unsubscribeAll = new Subject();

        // reset all variables
        this.searchText = '';

    }

}
