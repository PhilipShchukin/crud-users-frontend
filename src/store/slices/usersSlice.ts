import { IUser } from '@/services/user.interface';
import { UserService } from '@/services/user.service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
  }
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (page:number) => {

      const { data } = await UserService.getAll({
        page,
        perPage: 4
      })
      return data
    }
  )


export interface UserSliceState {
    items: IUser[];
    status: Status;
  }  

const initialState: UserSliceState = {
    items: [],
    status: Status.LOADING,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addItems: (state, action) => {
            state.items = action.payload;
        },
        clearItems: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id)
        },
    },
      extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
          state.status = Status.LOADING;
          state.items = [];
        });
    
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
          state.items = action.payload;
          state.status = Status.SUCCESS;
        });
    
        builder.addCase(fetchUsers.rejected, (state ) => {
          state.status = Status.ERROR;
          state.items = [];
        });
      },
      
})

export const { clearItems, addItems } = usersSlice.actions

export default usersSlice.reducer