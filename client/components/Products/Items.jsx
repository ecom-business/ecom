import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItems, postItem, deleteItem } from "../../store/item-slice";
import { itemActions } from "../../store/item-slice";

const Items = () => {

	const dispatch = useDispatch();

	const items = useSelector((state) => state.items.items)
	const itemName = useSelector((state) => state.items.itemName)
	const price = useSelector((state) => state.items.price)
	const stockCount = useSelector((state) => state.items.stockCount)
	
	useEffect(() => {
		dispatch(getItems())
	}, [])

	const handleSubmit = (e) => {

		e.preventDefault()

		dispatch(postItem(body))
		.then(() => dispatch(getItems()))
		.then(() => dispatch(itemActions.setClearFields()))
	}

	const handleDelete = (e, id) => {
		e.preventDefault()
		dispatch(deleteItem(id))
		.then(() => dispatch(getItems()))

	}
	
	const body = {
		item_name: itemName,
		price: price,
		stock: stockCount
	}

	return (
		<>
			<ul>
				{items.map(el => {
					return (
						<li 
							key={el.item_id}>
							{el.item_name} {`$${el.price}`}
							<button onClick={(e) => handleDelete(e, el.item_id)}>Delete</button>
							<button onClick={(e) => handleEdit(e, el.item_id)}>Edit</button>
						</li>
					)
				})}
			</ul>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input type="text"
				 placeholder="Item Name" 
				 value={itemName}
				 onChange={(e) => dispatch(itemActions.setItemName(e.target.value))}/>

				<input type="text"
				 placeholder="Price" 
				 value={price}
				 onChange={(e) => dispatch(itemActions.setPrice(e.target.value))}/>

				<input type="text"
				 placeholder="Stock Count" 
				 value={stockCount}
				onChange={(e) => dispatch(itemActions.setStockCount(e.target.value))}/>

				<input type="submit"/>
			</form>
		</>
	)
}

export default Items