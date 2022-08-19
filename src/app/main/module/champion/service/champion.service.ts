import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { shareReplay, map, takeUntil, finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { PaginationProp } from 'src/app/shared/interface/pagination';
import { SortProp } from 'src/app/shared/interface/sort';
import { AppConst } from 'src/app/shared/AppConst';
import { Champion } from '../model/champion.model';
import { __makeTemplateObject } from 'tslib';

@Injectable()
export class ChampionService implements Resolve<any>
{
    champions: Champion[];
    private _unsubscribeAll: Subject<any>;

    onChampionChanged: BehaviorSubject<any>;

    onPaginationChanged: Subject<PaginationProp>;
    onSearchTextChanged: Subject<any>;
    onSortChanged: Subject<SortProp>;
    onTableLoaderChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    defaultPageIndex: any = 1;
    defaultPageSize: any = 5;
    defaultPageSizeOptions: number[] = [5, 10, 20];

    totalRecords: number;
    totalDisplayRecords: number;
    isFiltered: boolean;
    pagination: any | null = null;
    filterBy: any | null = null;
    sortBy: any | null = null;
    searchText: string | null = null;

    constructor(
        private _httpClient: HttpClient,
    ) {
        // Set the defaults
        this.totalRecords = 0;
        this.totalDisplayRecords = 0;
        this.isFiltered = false;
        this.champions = [];

        this.onChampionChanged = new BehaviorSubject([]);

        this.onSearchTextChanged = new Subject();
        this.onSortChanged = new Subject();
        this.onPaginationChanged = new Subject();
        this.onTableLoaderChanged = new Subject();
        this.onFilterChanged = new Subject();

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
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getChampions(): Promise<any> {
        return new Promise<void>((resolve, reject) => {

            this._httpClient
                .get<any>(`assets/dataset_lolrankedgames/champion_info.json`)
                .pipe(
                    map(response => response.data),
                    shareReplay()
                )
                .subscribe(
                    (response: any) => {
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
                        
                        this.onChampionChanged.next([...this.champions]);

                        resolve();
                    },
                    reject
                );
        });
    }

    unsubscribeOptions(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();

        // reinitialize 
        this._unsubscribeAll = new Subject();

        // reset all variables
        this.pagination = null;
        this.filterBy = null;
        this.sortBy = null;
        this.searchText = null;
        this.totalDisplayRecords = 0;
        this.totalRecords = 0;
        this.isFiltered = false;
    }

}
