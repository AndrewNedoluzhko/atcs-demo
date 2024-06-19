import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {  


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public sideNaveToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  public toggle(){   
    console.log("object toggled")
    return this.sideNaveToggleSubject.next(null);
  }
}