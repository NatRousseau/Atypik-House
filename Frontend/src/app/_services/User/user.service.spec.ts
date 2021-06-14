//run command ng test  --main ./_services/User/user.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';


describe('UserService', () => {
  let UserS: UserService;
  let mail =  "unitbisdetest@gmail.com";
  let password = "Test1" ;

  beforeEach(function() {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(UserService);
  });

  it('#test', function(done) {

    let user = UserS.register({
        mail,
        password
    });
    let registerPromise = user.toPromise();
        return registerPromise.then(
            result =>
            {
                console.log(result);
                expect(true).toBeTruthy();
                done();
            }
        ).catch(
            result =>
            {
                expect(false).toBeTruthy();
                console.log(result);
                done();
            }
        );

  });





});
