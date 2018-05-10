const initialState = {
  data: [],
  size: 0,
  tempVal: 0
};

const LOAD_DEFAULT_DATA = 'LOAD_DEFAULT_DATA';
const CHANGE_TEMP_VAL = 'CHANGE_TEMP_VAL';
const ADD_DATA_POINT = 'ADD_DATA_POINT';

const defaultData = [3, 7, 5, 10];

export const loadDefaultData = () => ({
  type: LOAD_DEFAULT_DATA,
  data: defaultData
});
export const addDataPoint = point => {
  return {
    type: ADD_DATA_POINT,
    point
  };
};

// const changeTempVal = tempVal => ({ type: CHANGE_TEMP_VAL, tempVal });

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DEFAULT_DATA:
      console.log(action.data, 'DEFAULT DATA PUT IN STORE');
      return { ...state, data: action.data };
    case ADD_DATA_POINT:
      return { ...state, data: state.data.concat([action.point]) };
    default:
      return state;
  }
}