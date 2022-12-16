import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss']
})
export class ApartmentDetailComponent implements OnDestroy {

  // commentsWithUserName: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public commentsWithUserName = new BehaviorSubject<any[]>([]);
  public commentsArray: any[] = [];

  form = this.fb.group({
    commentContent: ['', [Validators.required, Validators.minLength(10)]],
  });


  constructor(private route: ActivatedRoute, public apiService: ApiService,
    private afs: Firestore, private fb: FormBuilder) {

    this.apiService.loadApartment(Number(route.snapshot.params['id']));
    this.apiService.loadCommentsOfApartment(Number(route.snapshot.params['id']));
    this.apiService.currentComments.subscribe(comments => {
      // Everything is allright here
      // console.log('comments');
      // console.log(comments);
      //TODO: After logging out and in, the comments are shown 2 times
      this.commentsArray = []; 
      comments.forEach(comment => {
        getDoc(doc(this.afs, 'users', comment.userId)).then((doc) => {
          this.commentsArray.push({ ...comment, username: doc.data()?.['username'] });

          this.commentsWithUserName.next(this.commentsArray);
        })

      });
 
    });

    // this.commentsWithUserName.subscribe(comms => {
    //   console.log('comsArray')
    //   console.log(this.commentsArray);
    // });
    //TODO: why happens 2 times?

    //TODO: Hide add comment button if user is not logged in

  }


  onCommentAdd(): void {
    if (this.form.controls.commentContent.errors) {
      if (this.form.controls.commentContent.errors?.['required']) {
        alert('Comment content is required!');
      } else if (this.form.controls.commentContent.errors?.['minlength']) {
        alert('Comment content must be at least 10 characters!');
      }
      return;
    }

    this.apiService.addComment(this.form.value.commentContent as any);
    this.commentsArray = [];
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.commentsArray = [];
    this.commentsWithUserName.next([]);
  }


}
