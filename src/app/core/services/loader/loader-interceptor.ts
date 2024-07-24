import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { LoaderService } from "./loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private currentRequests: number;
    constructor(
        private loaderService: LoaderService) {
        this.currentRequests = 0;
    }
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        this.incrementRequestCount();
        return next.handle(request)
            .pipe(
                tap({
                    next: (event: HttpEvent<unknown>) => {
                        if (event instanceof HttpResponse) {
                            this.decrementRequestCount();
                        }
                    },
                    error: () => {
                        this.currentRequests = 0;
                        this.loaderService.setLoaderStatus(false);
                    }
                })
            );
    }
    private decrementRequestCount() {
        if (--this.currentRequests === 0) {
            this.loaderService.setLoaderStatus(false);
        }
    }

    private incrementRequestCount() {
        if (this.currentRequests++ === 0) {
            this.loaderService.setLoaderStatus(true);
        }
    }
}

export const LoaderInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true
};
