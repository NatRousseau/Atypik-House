//ng test  --include src/app/user-register/register.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackBarService } from '../_services/SnackBar/snack-bar.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('registerComponent', () => {
  let component: registerComponent;
  let fixture: ComponentFixture<registerComponent>;

  let mail: string;
  let password: string;
  let user = {mail,password};



  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            RouterTestingModule,
            ReactiveFormsModule,
            FormsModule,
            MatSnackBarModule,
            BrowserAnimationsModule,
        ],
      declarations: [ registerComponent ],
      providers:[],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(registerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get user datas',async()=>{

    await new Promise<void>( resolve => {

        setTimeout(() => {
            expect(mail).not.toBeUndefined;
            expect(password).not.toBeUndefined
            resolve();
        });

    });

    await new Promise<void> (resolve => {

        setTimeout(() => {
            expect(user).not.toBeUndefined;
            resolve();
        });

    })

});


});

