import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { doc, DocumentData, Firestore, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss']
})
export class ApartmentDetailComponent implements OnDestroy {

  public commentsArray: any[] = [];
  public commentsSub: Subscription;

  form = this.fb.group({
    commentContent: ['', [Validators.required, Validators.minLength(10)]],
  }); 
 

  constructor(private route: ActivatedRoute, public apiService: ApiService,
    private afs: Firestore, private fb: FormBuilder, private authService:AuthService) {

    this.apiService.loadApartment(Number(route.snapshot.params['id']));
    this.commentsSub = this.apiService.getApartmentComments(Number(route.snapshot.params['id']))
      .subscribe(comments => {
        this.commentsArray = [];
        comments.forEach(comment => {
          getDoc(doc(this.afs, 'users', comment['userId'])).then((doc) => {
            this.commentsArray.push({ ...comment, username: doc.data()?.['username'] });
          })

        });

      });
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

        
    if(this.authService.user.value === null) {
      alert('You must be logged in to rent an apartment!');
      return;
    }

    this.apiService.addComment(this.form.value.commentContent as any);
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.commentsArray = [];
    this.commentsSub.unsubscribe();
  }


}
