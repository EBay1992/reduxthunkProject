// import _ from "lodash";
import jsonPlaceHolder from "../apis/jsonPlaceHolder";

//* an a way to resolve "overFetching"
export const fetchPostsAndFetchUser = () => {
  return async (dispatch, getState) => {
    //* TO CALL A ACTION CREATOR IN AN ACTION CREATOR, YOU SHOULD WRAP IT WITH DISPATCH FUNCTION!, AND IF ASYNC YOU SHOUD AWAIT
    await dispatch(fetchPosts());

    const usersId = getState().posts.map((post) => post.userId);
    const uniqueId = [...new Set(usersId)];
    uniqueId.map((id) => dispatch(fetchUser(id)));
  };
};

export const fetchPosts = () => {
  //   //bad approach!!!
  //   const response = await jsonPlaceHolder.get("/posts");
  //   return { type: "FETCH_POSTS", payload: response };
  return async (dispatch) => {
    const { data } = await jsonPlaceHolder.get("/posts");
    dispatch({ type: "FETCH_POSTS", payload: data });
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    const { data } = await jsonPlaceHolder.get(`/users/${id}`);
    dispatch({ type: "FETCH_USER", payload: data });
  };
};

// //* memoized version
// export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);

// //_ to sign other developer: private function
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const { data } = await jsonPlaceHolder.get(`/users/${id}`);
//   dispatch({ type: "FETCH_USER", payload: data });
// });
