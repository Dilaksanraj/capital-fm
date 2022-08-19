import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ChampionService } from './service/champion.service';
import { Champion } from './model/champion.model';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { BtnCellRenderer } from '../common/BtnCellRenderer';

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.scss']

})

export class ChampionComponent implements OnInit {

  private _unsubscribeAll: Subject<any>;

  champions: Champion[] = [];
  public paginationPageSize = 20;
  public cacheBlockSize = 20;
  api: any;
  frameworkComponents: any;



  rowData: any;

  constructor(
    private http: HttpClient,
    private _championService: ChampionService
  ) {
    this._unsubscribeAll = new Subject();

    this.frameworkComponents = {
      buttonRenderer: BtnCellRenderer,
    }
  }




  public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
  };

  columnDefs: ColDef[] = [
    {
      headerName: 'ID', field: 'id', checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { headerName: 'Title', field: 'title' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Key', field: 'key' },
    {
      headerName: 'Action',
      cellRenderer: BtnCellRenderer,
      cellRendererParams: {
        onClick: this.delete.bind(this),
        lable: "Delete"
      },
    },
  ];

  ngOnInit(): void {

    this._championService
      .onChampionChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((champions: Champion[]) => {
        // console.log('[champion list]', champions);

        this.champions = champions
      });
  }


  delete(params: { rowIndex: any; }) {
    console.log(params);

    //  this.api.startEditingCell({
    //     rowIndex: params.rowIndex,
    //     colKey: 'make'
    //   });
  }

}


