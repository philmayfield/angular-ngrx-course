import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Lesson} from './model/lesson';
import {CoursesActions} from './courses.actions';

export interface LessonsState extends EntityState<Lesson> {}

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>({
  sortComparer: sortByCourseAndSeqNo
});

const initialLessonState = adapter.getInitialState();

export function lessonsReducer(state = initialLessonState, action: CoursesActions): LessonsState {
  switch (action.type) {
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




function sortByCourseAndSeqNo(l1: Lesson, l2: Lesson) {
  const compare = l1.courseId - l2.courseId;

  if (compare !== 0) {
    return compare;
  }
  return l1.seqNo - l2.seqNo;

}
