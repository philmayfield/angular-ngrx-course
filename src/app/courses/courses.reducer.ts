import {Course} from './model/course';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {CourseActionTypes, CoursesActions} from './courses.actions';

export interface CoursesState extends EntityState<Course> {}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCoursesState: CoursesState = adapter.getInitialState();

export function coursesReducer(state = initialCoursesState, action: CoursesActions): CoursesState {

  switch (action.type) {
    case CourseActionTypes.CourseLoaded:
      return adapter.addOne(action.payload.course, state);

    default:
      return state;
  }

}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
