import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Products.module.css";

import ProductItem from "./ProductItem";
import useFetch from "../hooks/useFetch";
import { cartActions } from "../../store/cart-slice";

const Products = (props) => {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const { isLoading, error, sendRequset: getRequset } = useFetch();

  useEffect(() => {
    // sendRequset effect fn

    const transformItems = (itemsData) => {
      const loadedItems = [];

      for (const key in itemsData) {
        loadedItems.push({ id: key, text: itemsData[key].items });
      }

      dispatch(cartActions.items(loadedItems));
    };
    getRequset(
      {
        url: "https://redux-async-practice-4f0bb-default-rtdb.firebaseio.com/shop.json",
      },
      transformItems
    );
  }, [getRequset]);

  if (isLoading) {
    return (
      <section className={classes.products}>
        <p>Loading... Please wait a secound.</p>
      </section>
    );
  }

  if (error)
    return (
      <section className={classes.products}>
        <p>{error}</p>
      </section>
    );

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {items?.map((item) => (
          <ProductItem
            key={item.id}
            title={item.title}
            price={item.price}
            description={items.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
