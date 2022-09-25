import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class HelperUtils {

    static delay(ms: number) {
        return new Promise( resolve => setTimeout(() => {}, ms));
    }

}