import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Course} from '../model/course';
import {CoursesService} from '../services/courses.service';
import {Update} from '@ngrx/entity';
import {Store} from '@ngrx/store';
import {CoursesState} from '../courses.reducer';
import {CourseSaved} from '../courses.actions';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  courseId: number;

  form: FormGroup;
  description: string;

  constructor(
    private coursesService: CoursesService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private store: Store<CoursesState>,
    @Inject(MAT_DIALOG_DATA) course: Course ) {

    this.courseId = course.id;

    this.description = course.description;


    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      longDescription: [course.longDescription, Validators.required],
      promo: [course.promo, []]
    });

  }

  ngOnInit() {

  }

  save() {

    const courseChanges = this.form.value;

    this.coursesService
      .saveCourse(this.courseId, courseChanges)
      .subscribe(
        () => {
          const updatedCourse: Update<Course> = {
            id: this.courseId,
            changes: courseChanges
          };

          this.store.dispatch(new CourseSaved({course: updatedCourse}));

          this.dialogRef.close();
        }
      );
  }

  close() {
    this.dialogRef.close();
  }

}
