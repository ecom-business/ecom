import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

const initialItemsSate = {
	items: [],
	itemName: '',
	price: '',
	stockCount: '',
	// gotItems: false
}

export const getItems = createAsyncThunk(
	'items/getItems',
	async () => {
		try {
			console.log('in get items thunk')
			const responseJSON = await fetch('/items/getItems');
			const response = await responseJSON.json();
			return response;

		} catch (error) {
			console.error(errror);
		}
	}
)

export const postItem = createAsyncThunk(
	'items/postItem',
	async (body) => {
		console.log(body)
		try {
			console.log('in postItem thunk')
			const addItem = await fetch('http://localhost:8080/items/postItem', {
				method: 'POST',
				headers: {
					'Content-type': "application/json"
				},
				body: JSON.stringify(body)
			});
			console.log(addItem)
			return addItem.status
		} catch (error) {
			console.error(error)
		}
	}
)

export const deleteItem = createAsyncThunk(
	'items/deleteItem',
	async (id) => {
		console.log(id)
		try {
			console.log('in deleteItem thunk')
			const itemToDelete = await fetch(`/items/deleteItem/${id}`, {
				method: 'DELETE',
			});
			console.log(itemToDelete)
			return itemToDelete.status
		} catch (error) {
			console.error(error)
		}
	}
)

export const editItem = createAsyncThunk(
	'items/deleteItem',
	async (id) => {
		console.log(id)
		try {
			console.log('in editItem thunk')
			const itemToDelete = await fetch(`/items/editItem/${id}`, {
				method: 'PUT',
			});
			console.log(itemToDelete)
			return itemToDelete.status
		} catch (error) {
			console.error(error)
		}
	}
)


const itemReducer = createSlice({
	name: 'items',
	initialState: initialItemsSate,
	reducers: {
		setItemName(state, action){
			state.itemName = action.payload
		},
		setPrice(state, action){
			state.price = action.payload
		},
		setStockCount(state, action){
			state.stockCount = action.payload
		},
		setClearFields(state, action){
			state.itemName = '',
			state.price = '',
			state.stockCount = ''
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getItems.fulfilled, (state, action) => {
			state.items = action.payload;
		})
	},
})

export const itemActions = itemReducer.actions;
export default itemReducer.reducer