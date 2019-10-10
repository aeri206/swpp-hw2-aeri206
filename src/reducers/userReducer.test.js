import userReducers from "./userReducers";
import * as types from '../actions/ActionType';


describe('userReducer', ()=> {
    it('should return initial state', () => {
        const newState = userReducers(undefined, {}); 
        expect(newState).toEqual({
            users: null,
            loginedUser : null
        });
    });

    it('should get users', () => {
        const stubUser = {
            "id": 1,
            "email": "TEST_EMAIL_1",
            "password": "TEST_PW_1",
            "name": "TEST_NAME_1",
            "logged_in": false
          }

        const newState = userReducers(undefined, {
            type: types.GETUSER,
            users:[stubUser]
          });
          expect(newState).toEqual({
              users:[stubUser],
              loginedUser:null
              
          })
    });

    it('should update login user', () => {
        const stubUser = [{
            "id": 1,
            "email": "TEST_EMAIL_1",
            "password": "TEST_PW_1",
            "name": "TEST_NAME_1",
            "logged_in": false
          },
          {
            "id": 2,
            "email": "TEST_EMAIL_2",
            "password": "TEST_PW_2",
            "name": "TEST_NAME_2",
            "logged_in": false
          }
        ]

        const newState = userReducers({
            users:stubUser,
            loginedUser:null
        }, {
            type: types.LOGIN,
            id: stubUser[0].id
          });
          expect(newState).toEqual({
              users:[{...stubUser[0], logged_in:true},stubUser[1]],
              loginedUser:{...stubUser[0], logged_in:true}
          })
    });

    it('should check if there exists logined user', () => {
        const stubUser = [{
            "id": 1,
            "email": "TEST_EMAIL_1",
            "password": "TEST_PW_1",
            "name": "TEST_NAME_1",
            "logged_in": true
          },
          {
            "id": 2,
            "email": "TEST_EMAIL_2",
            "password": "TEST_PW_2",
            "name": "TEST_NAME_2",
            "logged_in": false
          }
        ];
        const newState = userReducers({
            users:stubUser,
            loginedUser:null
        }, {
            type: types.ALREADYLOGIN
          });
          expect(newState).toEqual({
              users:stubUser,
              loginedUser:stubUser[0]
          })
    });

    it('should update state when logout', () => {
        const stubUser = [{
            "id": 1,
            "email": "TEST_EMAIL_1",
            "password": "TEST_PW_1",
            "name": "TEST_NAME_1",
            "logged_in": true
          },
          {
            "id": 2,
            "email": "TEST_EMAIL_2",
            "password": "TEST_PW_2",
            "name": "TEST_NAME_2",
            "logged_in": false
          }
        ]

        const newState = userReducers({
            users:stubUser,
            loginedUser:null
        }, {
            type: types.LOGOUT,
            id: stubUser[0].id
          });
          expect(newState).toEqual({
              users:[{...stubUser[0], logged_in:false},stubUser[1]],
              loginedUser:null
          })
    });

    
    
});
