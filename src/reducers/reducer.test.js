import articleReducers from "./reducers";
import * as types from '../actions/ActionType';


describe('article reducer', () => {
    it('should return initial state', () => {
        const newState = articleReducers(undefined, {}); 
        expect(newState).toEqual({ articles:[], selectedArticle: []});
    });

    it('should get articles', () => {
        const stubArticle = {
        "id": 0,
        "author_id": 1,
        "title": "DISPATCH_TEST_TITLE",
        "content": "DISPTACH_TEST_CONTENT"}

        const newState = articleReducers(undefined, {
            type: types.GETARTICLE,
            articles: [stubArticle]
          });
          expect(newState).toEqual({
              articles:[stubArticle],
              selectedArticle:[]
          })
    });

    it('should get article detail', () => {
        const stubArticle = {
        "id": 0,
        "author_id": 1,
        "title": "DISPATCH_TEST_TITLE",
        "content": "DISPTACH_TEST_CONTENT"}

        const newState = articleReducers(undefined, {
            type: types.GETARTICLEDETAIL,
            target: stubArticle
          });
          expect(newState).toEqual({
              articles:[],
              selectedArticle:stubArticle
          })
    });

});