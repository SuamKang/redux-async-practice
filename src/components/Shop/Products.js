import classes from "./Products.module.css";

import ProductItem from "./ProductItem";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "Iphone 14 pro",
    description: "World Best Phone",
    price: 130,
  },
  {
    id: "p2",
    title: "Laptop",
    description: "Wide Screen and Greate Visual",
    price: 98,
  },
  {
    id: "p3",
    title: "Apple Watch 7",
    description: "So Sexy Design and comfortable!!",
    price: 50,
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS?.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;

// useEffect(() => {
//   const transformItems = (itemsData) => {
//     const loadedItems = [];

//     for (const key in itemsData) {
//       loadedItems.push({ id: key, text: itemsData[key].items });
//     }

//     dispatch(cartActions.items(loadedItems));
//   };
//   getRequset(
//     {
//       url: "",
//     },
//     transformItems
//   );
// }, []);

// if (isLoading) {
//   return (
//     <section className={classes.products}>
//       <p>Loading... Please wait a secound.</p>
//     </section>
//   );
// }

// if (error)
//   return (
//     <section className={classes.products}>
//       <p>{error}</p>
//     </section>
//   );
