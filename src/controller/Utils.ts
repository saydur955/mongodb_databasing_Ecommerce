// modules
import { Request } from 'express';

 

export interface IUtils{
  isInt(value: number|string|null|undefined): boolean;
}

export class Utils implements IUtils {

  isInt(value: number|string|null|undefined): boolean {
    if(!value) return false;
    if(
      (typeof value === 'number') || 
      ( (typeof value === 'string') && !isNaN(Number(value)) && !isNaN(parseFloat(value)) ) 
      ) {
      const remainder = (Number(value) % 1);
      if(remainder === 0) {
        return true;
      }
    }
    return false;
  }

}