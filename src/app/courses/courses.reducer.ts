import {Course} from './model/course';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {CourseActionTypes, CoursesActions} from './courses.actions';

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

const coursesAdapter: EntityAdapter<Course> = createEntityAdapter<Course>();

const initialCoursesState: CoursesState = coursesAdapter.getInitialState({
  allCoursesLoaded: false
});

export function coursesReducer(state = initialCoursesState, action: CoursesActions): CoursesState {

  switch (action.type) {
    case CourseActionTypes.CourseLoaded:
      return coursesAdapter.addOne(action.payload.course, state);

    case CourseActionTypes.AllCoursesLoaded:
      return coursesAdapter.addAll(action.payload.courses, {...state, allCoursesLoaded: true});

    case CourseActionTypes.CourseSaved:
      return coursesAdapter.updateOne(action.payload.course, state);

    default:
      return state;
  }

}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = coursesAdapter.getSelectors();
