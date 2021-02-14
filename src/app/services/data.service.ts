import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../common/validator/app-error';
import { BadRequest } from '../common/validator/bad-request';
import { NotFound } from '../common/validator/not-found';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private url:string="https://localhost:44329/";
    private httpOptions: any = {

        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': "Bearer " + (localStorage.getItem('token') as string) })

    }

    constructor(@Inject(String) serviceName: string, private http: HttpClient) {

        this.url+=serviceName
    }

    public getAll(name?: string|null,prams?:string[]) {

        this.extendUrl(name)
        this.addPrams(prams);

        let request = this.http.get(this.url, this.httpOptions).pipe(
            catchError(this.handleError)
        );

        this.removeUrlPrams(prams);
        this.removeUrlExtension(name);
        return request;
    }

    public get(id?:string|null,name?: string|null,prams?:string[]) {

        this.extendUrl(name);
        this.extendUrl(id);
        this.addPrams(prams);

        let request = this.http.get(this.url, this.httpOptions).pipe(
            catchError(this.handleError)
        );

        this.removeUrlPrams(prams);
        this.removeUrlExtension(id);
        this.removeUrlExtension(name);
        return request;
    }


    public create(resource: any, name?: string|null,prams?:string[]) {

        this.extendUrl(name);
        this.addPrams(prams);

        let request = this.http.post(this.url, JSON.stringify(resource), this.httpOptions).pipe(
            catchError(this.handleError)
        );

        this.removeUrlPrams(prams);
        this.removeUrlExtension(name);

        return request;
    }


    public update(resource: any, name?: string|null,prams?:string[]) {

        this.extendUrl(name);
        this.addPrams(prams);

        let request = this.http.put(this.url, JSON.stringify(resource), this.httpOptions).pipe(
            catchError(this.handleError)
        );

        this.removeUrlPrams(prams);
        this.removeUrlExtension(name);

        return request;
    }


    public delete(id: any, name?: string|null) {
        this.extendUrl(name);
        let request = this.http.delete(this.url + "/" + id, this.httpOptions).pipe(
            catchError(this.handleError)
        );

        this.removeUrlExtension(name);
        return request;
    }


    handleError(error: Response) {
        if (error.status === 404)
            return throwError(new NotFound(error))

        if (error.status === 400)
            return throwError(new BadRequest(error))

        return throwError(new AppError(error))

    }

    private extendUrl(name: string |undefined| null) {
        if (name)
            this.url += "/" + name;
    }

    private removeUrlExtension(name: string |undefined| null) {
        this.url= this.url.replace('/'+name,'');
    }

    addPrams(prams: string[] | undefined) {
        if (prams)
            prams.forEach(pram => {
                this.url += "/" + pram;
            });
    }

    removeUrlPrams(prams: string[] | undefined) {
        if (prams) {
            prams.forEach(pram => {
                this.url = this.url.replace('/' + pram, '');
            });
        }
    }
}
