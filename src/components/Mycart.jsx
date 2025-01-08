import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import MycartCard from './MycartCard';
import styles from './cart.module.css';
import { ToastContainer,toast } from 'react-toastify';

function Mycart() {
  const [cartItems, setCartItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0); // State to store grand total

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.log('No token found. User might not be authenticated.');
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/api/cart/get', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.data.success) {
          setCartItems(response.data.data);
          calculateGrandTotal(response.data.data); // Calculate grand total after fetching data
        } else {
          console.log('Failed to fetch cart items');
        }
      } catch (error) {
        console.log('An error occurred', error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateGrandTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setGrandTotal(total);
  };

  const updateItemTotal = (itemId, newTotal) => {
    const updatedItems = cartItems.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: newTotal / item.price }; // Calculate quantity based on total
      }
      return item;
    });
    console.log(updatedItems);
    
    setCartItems(updatedItems);

    const grandTotal = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setGrandTotal(grandTotal);
  };
  
  const handleDeleteItem = (itemId) => {

    const updatedItems = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedItems);

    const grandTotal = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setGrandTotal(grandTotal);
    toast.success("Item deleted successfully",{
      theme:"colored"
    })
  };  

  return (
    <>
      <Navbar />
      <ToastContainer/>
      <div className="container" style={{ marginTop: '7rem' }}>
        <h2 className={styles.heading}>My Cart</h2>
        {cartItems.length === 0 ? (
          <p className={styles.empty}>Your Cart is empty.</p>
        ) : (
          <div>
            <table className={styles.my_table}>
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((data, index) => (
                <tr key={data._id}>
                  <MycartCard
                    slno={index + 1}
                    pid={data._id}
                    name={data.name}
                    price={data.price}
                    imgSrc={data.imgSrc}
                    quantity={data.quantity}
                    updateItemTotal={updateItemTotal}
                    onDelete={handleDeleteItem}
                  />
                </tr>
              ))}
            </tbody>
            
            </table>
            <div className={styles.table_bottom}>
              <h3 className={styles.bottom_btn}>Grand Total: Rs. {grandTotal}/-</h3>
              <button className={styles.bottom_btn}>Proceed To Checkout</button>
            </div>

          </div>
        )}
        
      </div>
    </>
  );
}

export default Mycart;
