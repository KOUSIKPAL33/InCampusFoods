import React, { useState } from 'react';
import styles from './cart.module.css';
import axios from 'axios';

function MycartCard(props) {
  const [quantity, setQuantity] = useState(props.quantity);
  const [totalPrice, setTotalPrice] = useState(props.price * props.quantity);

  const path = './' + props.imgSrc;

  // Handle quantity change
  const handleQuantityChange = (event) => {
    const updatedQuantity = parseInt(event.target.value, 10);


    setQuantity(updatedQuantity);

    const updatedTotal = updatedQuantity * props.price;
    setTotalPrice(updatedTotal);

    props.updateItemTotal(props.pid, updatedTotal);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      console.log("No token found. User might not be authenticated.");
      return;
    }
  
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/delete`, // Your delete API endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: { productId: props.pid },  // Send the product ID to delete in the request body
        }
      );
  
      if (response.data.success) {
        console.log("Item deleted successfully");
        props.onDelete(props.pid); // Notify parent component to update the state
      } else {
        console.log("Failed to delete item:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  


  return (
    <>
      <td style={{ width: '70px' }}>{props.slno}.</td>
      <td>{props.name}</td>
      <td>
        <img
          src={path}
          alt={props.name}
          style={{ width: '180px', height: '140px', padding: '5px' }}
        />
      </td>
      <td>Rs. {props.price}/-</td>
      <td>
        <div className={styles.quantity_box}>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={handleQuantityChange}
          />
        </div>
      </td>
      <td>Rs. {totalPrice}/-</td>
      <td style={{ width: '70px' }}>
        <button onClick={handleDelete} className='btn btn-danger'>Delete</button>
      </td>
    </>
  );
}

export default MycartCard;
