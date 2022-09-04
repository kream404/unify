import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { TaskbarComponent } from './taskbar.component';
jest.mock('../../services/auth/auth.service.ts')


describe('TaskbarComponent', () => {
  let component: TaskbarComponent;
  let fixture: ComponentFixture<TaskbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskbarComponent ],
      imports: [
      ],
      providers: [
        AuthService,
        { provide: AuthService, useValue: {
          authorised: () => of([])                      //have to provide becuse of subscription
        }
      }
    ],
  }).compileComponents();

    fixture = TestBed.createComponent(TaskbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
