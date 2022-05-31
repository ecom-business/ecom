import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../store/item-slice";

const Items = () => {

	const dispatch = useDispatch();
	const items = useSelector((state) => state.items.items)
	
	useEffect(() => {
		console.log('in use effect')
		dispatch(getItems())

	}, [])
	
	console.log('in products after use effect: ',items)

	return (
		<>
			<h1>Items to sell</h1>
			<ul>
				{items.map(el => <li key={el.item_id}>{el.item_name}</li>)}
			</ul>
		</>
	)
}

export default Items