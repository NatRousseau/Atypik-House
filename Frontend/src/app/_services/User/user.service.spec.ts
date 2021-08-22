//run command ng test  --main ./_services/User/user.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { NewUser } from 'src/app/models/Users/NewUser';
import { UserService } from './user.service';

describe('UserService', () => {
    let UserS: UserService;
    let newUser: NewUser = {
        usr_mail: 'unitbisdetest@gmail.com',
        usr_password: 'Test1',
        usr_phone: 0o600000000,
        usr_firstName: 'test',
        usr_lastName: 'test',
    };

    beforeEach(function () {
        // TestBed.configureTestingModule({});
        // service = TestBed.inject(UserService);
    });

    it('#test', function (done) {
        let user = UserS.register(newUser);
        let registerPromise = user;
        return registerPromise
            .then((result) => {
                console.log(result);
                expect(true).toBeTruthy();
                done();
            })
            .catch((result) => {
                expect(false).toBeTruthy();
                console.log(result);
                done();
            });
    });
});
