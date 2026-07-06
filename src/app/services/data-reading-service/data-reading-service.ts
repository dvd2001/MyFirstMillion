import { Injectable } from '@angular/core';
import { Field } from '../../models/Field';
import data from '../../data/fieldData.json';

@Injectable({
  providedIn: 'root',
})

export class DataReadingService {
  readingFields(): Field[] {
    const jsonString = JSON.stringify(data);
    const fields: Field[] = JSON.parse(jsonString);
    return fields;
  }
}
