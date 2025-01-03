import React from "react";
import styles from './Card.module.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Card(props) {
    const path = './' + props.imgSrc;
    const cardstyle = "card " + styles.myzoom;
    const btnStyle = "btn btn-primary " + styles.my_btn;

    // Function to handle adding product to cart
    async function handleCart() {
        try {
            const token = localStorage.getItem('authToken'); // Retrieve the token from local storage (or wherever it's stored)

            if (!token) {
                toast.error('You must be logged in to add items to the cart.');
                return;
            }

            // Prepare the product details to send to the backend
            const productDetails = {
                productId: props.pid, // productId passed as a prop
                productDetails: {
                    name: props.name,
                    imgSrc: props.imgSrc,
                    price: props.price,
                }
            };
            //console.log(productDetails);

            // Send a request to the backend API to add the product to the cart
            const response = await axios.post('http://localhost:5000/api/cart/create',
                productDetails,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token for authentication
                    }
                }
            );

            toast.success('Item added to cart!');
            

        } catch (error) {
            // Check if error response status is 400 (duplicate item in cart)
            if (error.response && error.response.status === 400 && error.response.data.message === "Item already in cart") {
            toast.info('Item is already in the cart.');
            } else {
            console.error("Error adding to cart:", error);
            toast.error('Something went wrong. Please try again.');
            }
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className={cardstyle} style={{ width: '18rem' }}>
                <img src={path} className="card-img-top" style={{ height: '12rem' }} alt={props.name} />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <a href="#" className="btn btn-light fs-5">Price: {props.price}/-</a>
                        <button className={btnStyle} onClick={handleCart}><span className={styles.blinking}>Add to Cart</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
