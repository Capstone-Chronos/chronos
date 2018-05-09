const initialState = {
  data: [],
  size: 0,
  tempVal: 0
};

const LOAD_DEFAULT_DATA = 'LOAD_DEFAULT_DATA';
const CHANGE_TEMP_VAL = 'CHANGE_TEMP_VAL';

const defaultData = [3, 7, 5, 10];

export const loadDefaultData = () => ({
  type: LOAD_DEFAULT_DATA,
  data: defaultData
});
const changeTempVal = tempVal => ({ type: CHANGE_TEMP_VAL, tempVal });

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DEFAULT_DATA:
      console.log(action.data, 'DEFAULT DATA PUT IN STORE');
      return { ...state, data: action.data };
    default:
      return state;
  }
}
