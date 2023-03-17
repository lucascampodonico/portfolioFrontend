import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class CustomDateParserFormatter  {
  
    // Formatear un objeto de fecha en una cadena "YYYY-MM-DD"
    format(date: NgbDateStruct | null): string {
      return date ? `${date.year}-${date.month}-${date.day}` : '';
    }
  }
  
  