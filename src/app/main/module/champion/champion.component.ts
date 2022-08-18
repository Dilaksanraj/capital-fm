import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef, GridReadyEvent } from 'ag-grid-community';

export interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.scss']

})

export class ChampionComponent implements OnInit {

  // public columnDefs: ColDef[] = [
  //   { field: 'athlete', sort: 'desc' },
  //   { field: 'age', width: 90 },
  //   { field: 'country' },
  //   { field: 'year', width: 90, unSortIcon: true },
  //   { field: 'date', comparator: dateComparator },
  //   { field: 'sport' },
  //   { field: 'gold' },
  //   { field: 'silver' },
  //   { field: 'bronze' },
  //   { field: 'total' },
  // ];

  // public defaultColDef: ColDef = {
  //   width: 170,
  //   sortable: true,
  // };
  // public rowData!: IOlympicData[];

  rowData:any;

  constructor(private http: HttpClient) {}


  onGridReady(params: GridReadyEvent<IOlympicData>) {
    this.http
      .get<IOlympicData[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
      .subscribe((data) => {
        console.log(data);
        
        this.rowData = data
      });
  }

  columnDefs: ColDef[] = [
		{headerName: 'ID', field: 'age' },
		{headerName: 'Title', field: 'athlete' },
		{headerName: 'Name', field: 'country'},
    {headerName: 'Key', field: 'gold'}
	];

	// rowData = [
	// 	{ id: 'Toyota', title: 'Celica', name: 35000, key: "key data"},
	// 	{ id: 'Ford', title: 'Mondeo', name: 32000, key: "key data"},
	// 	{ id: 'Porsche', title: 'Boxster', name: 72000, key: "key data"}
	// ];
  

  ngOnInit(): void {

    
  }

}

function dateComparator(date1: string, date2: string) {
  const date1Number = monthToComparableNumber(date1);
  const date2Number = monthToComparableNumber(date2);
  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }
  return date1Number - date2Number;
}

function monthToComparableNumber(date: string) {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }
  const yearNumber = Number.parseInt(date.substring(6, 10));
  const monthNumber = Number.parseInt(date.substring(3, 5));
  const dayNumber = Number.parseInt(date.substring(0, 2));
  return yearNumber * 10000 + monthNumber * 100 + dayNumber;
}
function fadeInOnEnterAnimation(arg0: { anchor: string; delay: number; duration: number; }): any {
  throw new Error('Function not implemented.');
}

function slideOutUpOnLeaveAnimation(arg0: { anchor: string; delay: number; duration: number; }): any {
  throw new Error('Function not implemented.');
}

