import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AllCoursesLoaded, AllCoursesRequested, CourseActionTypes, CourseLoaded, CourseRequested} from './courses.actions';
import {filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {CoursesService} from './services/courses.service';
import {select, Store} from '@ngrx/store';
import {allCoursesLoaded} from './courses.selectors';
import {CoursesState} from './courses.reducer';
import {Observable} from 'rxjs';


@Injectable()
export class CoursesEffects {

  allCoursesLoaded$: Observable<boolean> = this.store.pipe(
    select(allCoursesLoaded)
  );

  @Effect()
  loadCourse$ = this.actions$.pipe(
    ofType<CourseRequested>(CourseActionTypes.CourseRequested),
    mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)),
    map(course => new CourseLoaded({course}))
  );

  @Effect()
  loadAllCourses$ = this.actions$.pipe(
    ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
    withLatestFrom(this.allCoursesLoaded$),
    filter(([action, allCoursesLoadedFlag]) => {
      // console.log('action', action);
      // console.log('allCoursesLoadedFlag', allCoursesLoadedFlag);
      const fetchAllCourses = !allCoursesLoadedFlag;
      // console.log('fetchAllCourses', fetchAllCourses);
      return fetchAllCourses;
    }),
    mergeMap(([action, allCoursesLoadedFlag]) => {
      // console.log('action', action);
      // console.log('allCoursesLoadedFlag', allCoursesLoadedFlag);
      return this.coursesService.findAllCourses();
    }),
    map(courses => {
      // console.log('courses', courses);
      return new AllCoursesLoaded({courses});
    })
  );

  constructor(
    private actions$: Actions, // observable of all actions dispatched to the store (provided by @ngrx/effects)
    private coursesService: CoursesService,
    private store: Store<CoursesState>
  ) {}

}
