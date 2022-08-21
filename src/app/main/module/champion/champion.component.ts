import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ChampionService } from './service/champion.service';
import { Champion } from './model/champion.model';
import { debounceTime, distinctUntilChanged, finalize, Subject, takeUntil } from 'rxjs';
import { BtnCellRenderer } from '../../common/BtnCellRenderer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { ConfirmActionType, ConfirmMessage, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from 'src/app/shared/enum/notify-type.enum';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'champion-list',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.scss']

})

export class ChampionComponent implements OnInit {

  private _unsubscribeAll: Subject<any>;
  searchInput: FormControl;
  champions: Champion[] = [];
  public paginationPageSize = 20;
  public cacheBlockSize = 20;
  api: any;
  frameworkComponents: any;



  rowData: any;

  constructor(
    private _httpClient: HttpClient,
    private _championService: ChampionService,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog
  ) {
    this._unsubscribeAll = new Subject();

    this.frameworkComponents = {
      buttonRenderer: BtnCellRenderer,
    }
    this.searchInput = new FormControl({ value: null, disabled: false });
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

    // Subscribe to search input changes
    this.searchInput
      .valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(800),
        distinctUntilChanged()

      )
      .subscribe(searchText => {
        console.log(searchText);

        if (!_.isNull(searchText)) {
          //set search text to lowercase for case insensitive
          this._championService.onSearchTextChanged.next(searchText.toLocaleLowerCase());
        }

      });
  }


  delete(params: any) {
    console.log(params.data.id);

    const dialogData = new ConfirmDialogModel(ConfirmActionType.DELETE, ConfirmMessage.DELETE);


    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      width:"400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        return new Promise<void>((resolve, reject) => {
          this._championService
            .deleteChampion(params.data.id)
            .pipe(
              takeUntil(this._unsubscribeAll),
              finalize(() => resolve())
            )
            .subscribe(
              message => setTimeout(() => this._snackBar.open(message.toUpperCase(), 'Delete', {
                horizontalPosition: MatSnackBarHorizontalPosition.CENTER,
                verticalPosition: MatSnackBarVerticalPosition.TOP,
                duration: 1500,
                panelClass: ['blue-snackbar']
              }), 200),
              error => {
                throw error;
              }
            );
        });
      }
    });


  }

}


