import { createContext, useEffect, useReducer, useState } from "react";

import axios from "axios";

import IChildrenProps from "../types/ChildrenType";
import { IOrder } from "../types/OrderType";
import { Icart, ICartItem } from "../types/CartType";
import {
  IProduct,
  IProductDetail,
  IProductHighlight,
  IProductImage,
  IProductSize,
} from "../types/ProductType";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ProductsContext = createContext(null);

type InitialState = {
  products: IProduct[];
  images: IProductImage[];
  uniqueProducts: IProduct[];
  uniqueImages: IProductImage[];
  bestSellerProducts: IProduct[];
  bestSellerImages: IProductImage[];
  newArrivalProducts: IProduct[];
  newArrivalImages: IProductImage[];
  sizes: IProductSize[];
  highlights: IProductHighlight[];
  details: IProductDetail[];
  favorites: IProduct[];
  orders: IOrder[];
  carts: Icart[];
  cartItem: ICartItem[];
  isLoading: boolean;
  currentProduct: IProduct | object;
  currentSizes: IProductSize[];
  currentHighlights: IProductHighlight[];
  currentDetails: IProductDetail[];
  currentImages: IProductImage[];
  currentImageColors: IProductImage[];
  currentOrder: IProduct | object;
  error: string;
};

const initialState: InitialState = {
  products: [],
  images: [],
  uniqueProducts: [],
  uniqueImages: [],
  bestSellerProducts: [],
  bestSellerImages: [],
  newArrivalProducts: [],
  newArrivalImages: [],
  sizes: [],
  highlights: [],
  details: [],
  favorites: [],
  orders: [],
  carts: [],
  cartItem: [],
  isLoading: false,
  currentProduct: {},
  currentSizes: [],
  currentHighlights: [],
  currentDetails: [],
  currentImages: [],
  currentImageColors: [],
  currentOrder: {},
  error: "",
};

// type Payload = boolean | string | IOrder[] | IOrder | IProduct | ICartItem;

// // Define the type for your action
// interface Action {
//   type: string;
//   payload?: Payload;
// }

function reducer(state: InitialState, action: any): any {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "products/loaded":
      return {
        ...state,
        isLoading: false,
        products: action.payload.products,
        images: action.payload.images,
      };
    case "product/loaded":
      return {
        ...state,
        isLoading: false,
        currentProduct: action.payload.product,
        currentSizes: action.payload.sizes,
        currentHighlights: action.payload.highlights,
        currentDetails: action.payload.details,
        currentImages: action.payload.images,
        currentImageColors: action.payload.imageColors,
      };
    case "unique/loaded":
      return {
        ...state,
        isLoading: false,
        uniqueProducts: action.payload.products,
        uniqueImages: action.payload.images,
      };

    case "best-seller/loaded":
      return {
        ...state,
        isLoading: false,
        bestSellerProducts: action.payload.products,
        bestSellerImages: action.payload.images,
      };

    case "new-arrival/loaded":
      return {
        ...state,
        isLoading: false,
        newArrivalProducts: action.payload.products,
        newArrivalImages: action.payload.images,
      };
    case "cartItem/added":
      return {
        ...state,
        isLoading: false,
        carts: action.payload,
      };
    case "cart/increase":
      return {
        ...state,
        isLoading: false,
        carts: action.payload,
      };
    case "cart/decrease":
      return {
        ...state,
        isLoading: false,
        carts: action.payload,
      };
    case "carts/loaded":
      return {
        ...state,
        isLoading: false,
        carts: action.payload,
      };
    case "cart/purchased":
      return {
        ...state,
        isLoading: false,
        carts: action.payload,
      };
    case "cart/purchasedAll":
      return {
        ...state,
        isLoading: false,
        carts: action.payload,
      };
    case "favorite/added":
      return {
        ...state,
        isLoading: false,
        favorites: action.payload,
      };
    case "favorite/deleted":
      return {
        ...state,
        isLoading: false,
        favorites: action.payload,
      };
    case "orders/loaded":
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
      };
    case "order/loaded":
      return {
        ...state,
        isLoading: false,
        currentOrder: action.payload,
      };
    case "order/added":
      return {
        ...state,
        isLoading: false,
        carts: [],
        orders: action.payload,
      };
    case "order/deleted":
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
        currentOrder: {},
      };
    case "product/search":
      return {
        ...state,
        isLoading: false,
        searchs: action.payload,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

const ProductsProvider: React.FC<IChildrenProps> = ({ children }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [query, setQuery] = useState("");

  // const { user } = useAuth();

  const [
    {
      products,
      images,
      uniqueProducts,
      uniqueImages,
      carts,
      orders,
      favorites,
      currentProduct,
      currentDetails,
      currentHighlights,
      currentImages,
      currentSizes,
      currentImageColors,
      bestSellerProducts,
      bestSellerImages,
      newArrivalProducts,
      newArrivalImages,
      currentOrder,
      isLoading,
      error,
      searchs,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchProducts();
    fetchUniqueProducts();
    fetchBestSellerProducts();
    fetchNewArrivalProducts();
  }, [products.length]);

  // useEffect(() => {
  //   fetchOrders();
  // }, []);

  useEffect(() => {
    if (selectedId) {
      fetchProduct(selectedId);
    }
  }, [selectedId]);

  async function fetchProducts() {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/products`);
      dispatch({
        type: "products/loaded",
        payload: {
          products: res.data.data.products,
          images: res.data.data.images,
        },
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading cities...",
      });
    }
  }

  async function fetchUniqueProducts() {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/products/unique`);
      dispatch({
        type: "unique/loaded",
        payload: {
          products: res.data.data.products,
          images: res.data.data.images,
        },
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading cities...",
      });
    }
  }

  // async function fetchOrders() {
  //   dispatch({ type: "loading" });
  //   try {
  //     const res = await axios.get(`${BASE_URL}/api/v1/orders`);
  //     dispatch({ type: "orders/loaded", payload: res.data.data.orders });
  //   } catch (error) {
  //     dispatch({
  //       type: "rejected",
  //       payload: "There was an error loading orders...",
  //     });
  //   }
  // }

  // function fetchQuery() {
  //   const searchResults = products.filter((product: IProduct) =>
  //     `${product.id} ${product.name} ${product.price}`.includes(query),
  //   );

  //   dispatch({ type: "product/search", payload: searchResults });
  // }

  async function fetchProduct(id: string) {
    if (id === currentProduct.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/products/${id}`);
      dispatch({
        type: "product/loaded",
        payload: {
          product: res.data.data.product,
          images: res.data.data.images,
          details: res.data.data.details,
          highlights: res.data.data.highlights,
          sizes: res.data.data.sizes,
          imageColors: res.data.data.imageColor,
        },
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the product...",
      });
    }
  }

  async function addToCart(
    cartId: number,
    productId: number,
    quantityOrdered: number,
    productSize: number,
  ) {
    const cartData = {
      product_id: productId,
      quantity_ordered: quantityOrdered,
      product_size: productSize,
    };
    dispatch({ type: "loading" });
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/carts/${cartId}`,
        cartData,
      );
      dispatch({ type: "cartItem/added", payload: res.data.data.cartItem });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading users...",
      });
    }
  }

  function decreaseCart(id: string) {
    dispatch({
      type: "cart/decrease",
      payload: id,
    });
  }

  function deleteCart(id: string) {
    dispatch({
      type: "cart/deleted",
      payload: id,
    });
  }

  function checkCart(id: string) {
    dispatch({ type: "cart/purchased", payload: id });
  }

  function checkAllCart() {
    dispatch({ type: "cart/purchasedAll", payload: isCheckedAll });
  }

  function addFavorite(id: string) {
    setSelectedId(id);
    dispatch({ type: "favorite/added", payload: currentProduct });
  }

  function deleteFavorite(id: string) {
    setSelectedId(id);
    dispatch({ type: "favorite/deleted", payload: currentProduct });
  }

  function checkout() {
    const orders = carts.filter((cart) => cart.purchased);
    orders.id = crypto.randomUUID();
    orders.status = "done";

    dispatch({ type: "order/added", payload: orders });
  }

  async function fetchNewArrivalProducts() {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/products/new-arrivals`);
      dispatch({
        type: "new-arrival/loaded",
        payload: {
          products: res.data.data.products,
          images: res.data.data.images,
        },
      });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Error" });
    }
  }

  async function fetchBestSellerProducts() {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/products/best-sellers`);

      dispatch({
        type: "best-seller/loaded",
        payload: {
          products: res.data.data.products,
          images: res.data.data.images,
        },
      });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Error" });
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        images,
        uniqueProducts,
        uniqueImages,
        currentProduct,
        currentDetails,
        currentHighlights,
        currentImages,
        currentSizes,
        currentImageColors,
        isLoading,
        newArrivalProducts,
        newArrivalImages,
        bestSellerProducts,
        bestSellerImages,
        setSelectedId,
        addToCart,
        carts,
        decreaseCart,
        deleteCart,
        favorites,
        addFavorite,
        deleteFavorite,
        checkCart,
        checkAllCart,
        isChecked,
        setIsChecked,
        isCheckedAll,
        setIsCheckedAll,
        checkout,
        orders,
        query,
        setQuery,
        quantity,
        setQuantity,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider, ProductsContext };
