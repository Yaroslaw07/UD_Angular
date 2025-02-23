import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap, throwError } from "rxjs";

import { Place } from "./place.model";
import { ErrorService } from "../shared/error.service";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private errorsService = inject(ErrorService);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      "http://localhost:3000/places",
      "Something went wrong fetching the available places. Please try again"
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      "http://localhost:3000/user-places",
      "Something went wrong fetching the your favorite places. Please try again"
    ).pipe(
      tap({
        next: (userPlaces) => this.userPlaces.set(userPlaces),
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();

    if (!prevPlaces.some((p) => place.id === p.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpClient
      .put("http://localhost:3000/user-places", {
        placeId: place.id,
      })
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          this.errorsService.showError("Failed to store selected place.");
          return throwError(() => new Error("Failed to store selected place"));
        })
      );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

    if (prevPlaces.some((p) => place.id === p.id)) {
      this.userPlaces.set(prevPlaces.filter((p) => p.id != place.id));
    }

    return this.httpClient
      .delete("http://localhost:3000/user-places/" + place.id)
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          this.errorsService.showError("Failed to remove selected place.");
          return throwError(() => new Error("Failed to remove selected place"));
        })
      );
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((resData) => resData.places),
      catchError((error) => {
        console.log(error);
        return throwError(
          () =>
            new Error(
              "Something went wrong fetching the your favorite places. Please try again"
            )
        );
      })
    );
  }
}
