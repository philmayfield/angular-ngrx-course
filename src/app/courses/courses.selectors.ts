import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CoursesState} from './courses.reducer';

import * as fromCourse from './courses.reducer';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectCourseById = (courseId: number) => createSelector(
  selectCoursesState,
  courseState => {
    // console.log('courseState', courseId, courseState);
    return courseState && courseState.entities[courseId];
  }
);

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourse.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === 'BEGINNER')
);

export const selectIntermediateCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === 'INTERMEDIATE')
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === 'ADVANCED')
);

export const selectPromoCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);

export const allCoursesLoaded = createSelector(
  selectCoursesState,
  coursesState => {
    // console.log('coursesState', coursesState);
    return coursesState.allCoursesLoaded;
  }
);
