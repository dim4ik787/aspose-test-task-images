import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { environment } from 'src/environments/environment';
import { ConvertImages, ImageFile } from 'src/app/models/preview.interface';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { from } from 'rxjs/internal/observable/from';
import { retry, timeout } from 'rxjs';

type AuthToken = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

/**
 * Service responsible for converting images using a remote conversion server.
 */
@Injectable({
  providedIn: 'root',
})
export class ConversionService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieves a JSON Web Token (JWT) for authentication from the authentication server.
   * @returns {Observable<AuthToken>} An observable emitting the authentication token.
   */
  private getJwtToken(): Observable<AuthToken> {
    const url = environment.authURL;
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', environment.clientId);
    body.set('client_secret', environment.clientSecret);

    const options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };

    return this.http
      .post<AuthToken>(url, body.toString(), options)
      .pipe(shareReplay(1));
  }

  /**
   * Converts the provided images to the specified format using the conversion server.
   * @param {ConvertImages} conversion - Object containing conversion details.
   * @returns {Observable<ImageFile>} An observable emitting the converted image file.
   * @throws {Error} If the conversion fails or wrong credentials are provided.
   */
  convertImages(conversion: ConvertImages): Observable<ImageFile> {
    return this.getJwtToken().pipe(
      switchMap((token: AuthToken) => {
        const headers = new HttpHeaders({
          'Content-Type': 'multipart/form-data',
          Authorization: `${token.token_type} ${token.access_token}`,
        });
        const params = new HttpParams().set('format', conversion.endFormat);

        return from(conversion.images).pipe(
          mergeMap((imageFile: ImageFile) => {
            const formData = new FormData();
            formData.append('imageData:', imageFile.file);

            return this.http
              .post(environment.baseURL, formData, {
                headers,
                params,
                responseType: 'blob',
              })
              .pipe(
                timeout({
                  each: 60000
                }),
                retry(3),
                mergeMap((blob: Blob) => {
                  imageFile.src = URL.createObjectURL(blob);
                  imageFile.file = blob as File;
                  imageFile.isConverted = true;
                  imageFile.name = this.replaceFileExtension(
                    imageFile.name,
                    conversion.endFormat
                  );

                  return of(imageFile);
                }),
                catchError((error) => {
                  return of(imageFile);
                })
              );
          }, environment.threadsCount)
        );
      }),
      catchError(() => {
        throw { message: 'wrong credentials' };
      })
    );
  }

  /**
   * Replaces the file extension of the given filename with the new extension.
   * @param {string} filename - The original filename.
   * @param {string} newExtension - The new file extension to replace.
   * @returns {string} The updated filename with the new extension.
   */
  private replaceFileExtension(filename: string, newExtension: string): string {
    const parts = filename.split('.');
    if (parts.length <= 1) {
      return filename;
    }

    parts[parts.length - 1] = newExtension;
    return parts.join('.');
  }
}
