import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from './Card';

function ShowData({ apiEndpoint }) {
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [apiEndpoint]);

  return (
    <>
      <Navbar />
      <div className='container mt-5'>
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div className='row' key={data._id}>
            <div className='fs-3 m-3 text-center'><h1>{data.Category}</h1></div>
              <hr />
              {foodItem.length > 0 ? (
                foodItem.filter((item) => item.Category === data.Category)
                  .map((filterItems) => (
                    <div key={filterItems._id} className='col mt-4'>
                      <Card
                        pid={filterItems._id}
                        name={filterItems.Name}
                        price={filterItems.Price}
                        imgSrc={filterItems.Image}
                      />
                    </div>
                  ))
              ) : (<div>No items found</div>)
              }
            </div>
          ))
        ) : (
          <div>No categories found</div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ShowData;
