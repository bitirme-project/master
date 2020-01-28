import { Pipe, PipeTransform } from '@angular/core'; @Pipe({
  name: 'filter'
}) export class FilterPipe implements PipeTransform {
  start = false;
  transform(items: any, filter: any, isAnd: boolean, select: boolean, filterK?: any ): any {
    this.start = true
    let filterKeys
    if (filter && Array.isArray(items)) {
      if(filterK){
        filterKeys = filterK
        
      }else{
         filterKeys = Object.keys(items[0]);
      }

      if (isAnd) {
        return items.filter(item => {
          filterKeys.reduce((memo, keyName) =>
            (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true)
            this.start = false
        });
      }
      if (filter) {
        return items.filter(item => {

          return filterKeys.some((keyName) => {
            this.start = false
            return new RegExp(filter, 'gi').test(item[keyName]) || filter === "";

          });
        });
      } else {
        return []
      }
    } else if (select) {
      this.start = false
      return items;
    } else {
      this.start = false
      return []
    }
  }
}
