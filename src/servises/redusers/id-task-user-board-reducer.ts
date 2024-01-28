
// interface IIDTaskUser {
//     id: string,
// }

export interface IRegisterUserSuccessAction {
  
  readonly type: typeof ADD_ID;
  readonly payload: string;
}


export type TUserActions = IRegisterUserSuccessAction  ;


const ADD_ID = 'ADD_ID';
export type TInitialStateUserReduser = {
  idTaskBoard: string,
};

const initialState: TInitialStateUserReduser = {
  idTaskBoard: '',  
};

export function createIDTask(id: any) {
    return {
      type: ADD_ID,
      payload:  id ,
    }
  }

 export const IDReducer = (state = initialState, action: TUserActions): TInitialStateUserReduser => {
    switch (action.type) {
     
  
      case ADD_ID:
        return {
          ...state,  
          idTaskBoard: action.payload,
        };
  
      default:
        return state;
    }
  };
  
//   const initialStateIdTask: IIDTaskUser = {
//     id: ''
//   }

// const idTaskUserSlice = createSlice({

//     name: 'posts',
//     initialState: initialStateIdTask,
//     reducers: {
//       addIDTaks(state, action) {
//      console.log(state);
//      console.log(action);  
//         state.id = (action.payload);
//       },

//     },
//   })
  
//   // Extract the action creators object and the reducer
//  export const { addIDTaks } = idTaskUserSlice.actions;
//  export default idTaskUserSlice.reducer;
 