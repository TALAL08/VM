import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler{

    handleError(error: any){
        alert("UnExpected Error Occours");
     return   console.log(error);
    }
}