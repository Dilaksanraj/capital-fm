
export class Champion 
{
    id: string;
    title: String;
    key: string;
    name: string

    index?: number;

    constructor (data?: any, index?: number){
        this.id = data.id || '';
        this.title = data.title || '';
        this.key = data.key || '';
        this.name = data.key || '';

        this.index = index || 0;
    }
}