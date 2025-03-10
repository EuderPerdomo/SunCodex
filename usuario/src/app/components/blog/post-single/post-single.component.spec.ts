import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSingleComponent } from './post-single.component';

describe('PostSingleComponent', () => {
  let component: PostSingleComponent;
  let fixture: ComponentFixture<PostSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostSingleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
