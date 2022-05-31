import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

const initialItemsSate = {
	items: [],
}

export const getItems = createAsyncThunk(
	'items/getItems',
	async () => {
		try {
			console.log('in get items')
			const responseJSON = await fetch('/items/getItems');
			const response = await responseJSON.json();
			return response;

		} catch (error) {
			console.error(errror);
		}
	}
)

const itemReducer = createSlice({
	name: 'items',
	initialState: initialItemsSate,
	reducers: {
		// setItems(state, action){
		// 	state.items = action.payload;
		// }
	},
	extraReducers: (builder) => {
		builder.addCase(getItems.fulfilled, (state, action) => {
			console.log('in builder')
			state.items = action.payload;
		})
	}
})

export const itemActions = itemReducer.actions;
export default itemReducer.reducer