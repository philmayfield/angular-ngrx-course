import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Lesson} from './model/lesson';
import {CourseActionTypes, CoursesActions} from './courses.actions';

export interface LessonsState extends EntityState<Lesson> {
  loading: boolean;
}

const lessonsAdapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>({
  sortComparer: sortByCourseAndSeqNo
});

const initialLessonState = lessonsAdapter.getInitialState({
  loading: false
});

export function lessonsReducer(state = initialLessonState, action: CoursesActions): LessonsState {
  switch (action.type) {

    case CourseActionTypes.LessonsPageCancelled:
      return {
        ...state,
        loading: false
      };

    case CourseActionTypes.LessonsPageRequested:
      return {
        ...state,
        loading: true
      };

    case CourseActionTypes.LessonsPageLoaded:
      return lessonsAdapter.addMany(
        action.payload.lessons,
        { ...state, loading: false }
        );

    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = lessonsAdapter.getSelectors();



// POJ sorting function
function sortByCourseAndSeqNo(l1: Lesson, l2: Lesson) {
  const compare = l1.courseId - l2.courseId;

  if (compare !== 0) {
    return compare;
  }
  return l1.seqNo - l2.seqNo;

}
