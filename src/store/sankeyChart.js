const initialState = {
  data: {}
};


const LOAD_DEFAULT_DATA = 'LOAD_DEFAULT_DATA';


export default function reducer(state = initialState, action) {
  switch (action.type) {
  case LOAD_DEFAULT_DATA:
    console.log(action.data, 'DEFAULT DATA PUT IN STORE');
    return { ...state, data: action.data };

  default:
    return state;
  }
}
