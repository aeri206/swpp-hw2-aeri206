import commentReducers from "./commentReducers";
import * as types from '../actions/ActionType';
import { exportAllDeclaration } from "@babel/types";

describe('commentReducer', () => {
    it('should return initial state', () => {
        const newState = commentReducers(undefined, {}); 
        expect(newState).toEqual({comments:[]});
    });

    it('should get comments', () => {
        const stubComments =  [{
            "id": 1,
            "article_id": 0,
            "author_id": 1,
            "content": "TEST_CONTENT"
          }]

        const newState = commentReducers(undefined, {
            type: types.GETCOMMENTS,
            comments: stubComments 
          });
          expect(newState).toEqual({
              comments:stubComments
          });
    });

});