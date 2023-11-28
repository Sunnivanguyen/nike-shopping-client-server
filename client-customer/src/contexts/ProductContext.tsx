import { createContext, useEffect, useReducer, useState, useMemo } from "react";

import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import IChildrenProps from "../types/ChildrenType";
import { IOrder } from "../types/OrderType";
import { ICartItem } from "../types/CartType";
import { IProduct } from "../types/ProductType";
//import.meta.env.SERVER_BASE_URL
const BASE_URL = "http://localhost:8080";

const ProductsContext = createContext(null);

type InitialState = {
  products: IProduct[];
  uniqueProducts: IProduct[];
  bestSellerProducts: IProduct[];
  newArrivalProducts: IProduct[];
  favorites: IProduct[];
  orders: IOrder[];
  cartItem: ICartItem[];
  isLoading: boolean;
  currentProduct: IProduct | object;
  currentOrder: IProduct | object;
  error: string;
};

const initialState: InitialState = {
  products: [],
  uniqueProducts: [],
  bestSellerProducts: [],
  newArrivalProducts: [],
  favorites: [],
  orders: [],
  cartItem: [],
  isLoading: false,
  currentProduct: {},
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
        products: action.payload,
      };
    case "pre-defined-sizes/loaded":
      return {
        ...state,
        isLoading: false,
        preDefinedSizes: action.payload,
      };
    case "categories/loaded":
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
    case "product/loaded":
      return {
        ...state,
        isLoading: false,
        currentProduct: action.payload,
      };
    case "unique/loaded":
      return {
        ...state,
        isLoading: false,
        uniqueProducts: action.payload,
      };
    case "best-seller/loaded":
      return {
        ...state,
        isLoading: false,
        bestSellerProducts: action.payload,
      };

    case "new-arrival/loaded":
      return {
        ...state,
        isLoading: false,
        newArrivalProducts: action.payload,
      };

    case "image-color/loaded":
      return {
        ...state,
        isLoading: false,
        imageColors: action.payload,
      };

    case "cartItem/added":
      return {
        ...state,
        isLoading: false,
        carts: action.payload,
      };
    case "cartItem/loaded":
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

  const [
    {
      products,
      uniqueProducts,
      carts,
      orders,
      favorites,
      currentProduct,
      bestSellerProducts,
      newArrivalProducts,
      categories,
      preDefinedSizes,
      currentOrder,
      isLoading,
      error,
      searchs,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchUniqueProducts();
    fetchBestSellerProducts();
    fetchNewArrivalProducts();
  }, [products?.length]);

  useEffect(() => {
    if (selectedId) {
      fetchProduct(selectedId);
    }
  }, [selectedId]);

  async function fetchPreDefinedSizes() {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/sizes`);
      dispatch({
        type: "pre-defined-sizes/loaded",
        payload: res.data.data.sizes,
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading cities...",
      });
    }
  }

  useMemo(async () => await fetchPreDefinedSizes(), []);

  async function fetchCategories() {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/categories`);
      dispatch({
        type: "categories/loaded",
        payload: res.data.data.categories,
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading cities...",
      });
    }
  }

  useMemo(async () => await fetchCategories(), []);

  function showToast(status: string, message: string) {
    if (status === "success") {
      toast.success(message);
    } else if (status === "error") {
      toast.error(message);
    }
  }

  // async function fetchProducts() {
  //   dispatch({ type: "loading" });
  //   try {
  //     const res = await axios.get(`${BASE_URL}/api/v1/products`);
  //     console.log(res, "GETTING ALL PRODUCTS");
  //     dispatch({
  //       type: "products/loaded",
  //       payload: res.data.data.details,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: "rejected",
  //       payload: "There was an error loading cities...",
  //     });
  //   }
  // }

  async function fetchUniqueProducts() {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/products/unique`);
      dispatch({
        type: "unique/loaded",
        payload: res.data.data.details,
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading cities...",
      });
    }
  }

  async function fetchNewArrivalProducts() {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/products/new-arrivals`);
      dispatch({
        type: "new-arrival/loaded",
        payload: res.data.data.details,
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
        payload: res.data.data.details,
      });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Error" });
    }
  }

  // async function fetchProductImageByPrecode(pre_code: string) {
  //   dispatch({ type: "loading" });
  //   try {
  //     const res = await axios.get(
  //       `${BASE_URL}/api/v1/products/${pre_code}}/images`,
  //     );
  //     console.log(pre_code, "PRE CODE");
  //     dispatch({
  //       type: "image-color/loaded",
  //       payload: res.data.data.images,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: "rejected",
  //       payload: "There was an error loading cities...",
  //     });
  //   }
  // }

  async function fetchAllCartItems(userId: number) {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/users/${userId}/carts`);
      dispatch({
        type: "carts/loaded",
        payload: res.data.data.userCartItems,
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

  async function fetchProduct(productCode: string) {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/products/product-code/${productCode}`,
      );
      dispatch({
        type: "product/loaded",
        payload: res.data.data,
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
      dispatch({ type: "cartItem/added", payload: res.data.data.cartItems });

      showToast("success", "Add to Cart successfully!");
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

  return (
    <ProductsContext.Provider
      value={{
        products,
        uniqueProducts,
        currentProduct,
        isLoading,
        newArrivalProducts,
        bestSellerProducts,
        setSelectedId,
        addToCart,
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
        fetchProduct,
        preDefinedSizes,
        categories,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider, ProductsContext };
