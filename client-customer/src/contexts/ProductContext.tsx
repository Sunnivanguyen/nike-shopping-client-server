import { createContext, useEffect, useReducer, useState, useMemo } from "react";

import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import IChildrenProps from "../types/ChildrenType";
import { IOrder } from "../types/OrderType";
import { ICartItem } from "../types/CartType";
import { IProduct, IProductImage } from "../types/ProductType";
import useAuth from "../hooks/useAuth";
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
    case "cart/loaded":
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
      };
    case "cartItem/loaded":
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
      };
    case "cart/increase":
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
      };
    case "cart/decrease":
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
      };
    case "cart/purchased":
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
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
    case "fetched":
      return {
        ...state,
        isLoading: false,
      };
    default:
      throw new Error("Unknown action type");
  }
}

const ProductsProvider: React.FC<IChildrenProps> = ({ children }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [query, setQuery] = useState("");
  const [imageColors, setImageColors] = useState<IProductImage[] | []>([]);

  const [
    {
      products,
      uniqueProducts,
      cart,
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

  const { user } = useAuth();

  useEffect(() => {
    fetchUniqueProducts();
    fetchBestSellerProducts();
    fetchNewArrivalProducts();
    fetchProducts();
  }, [products?.length]);

  useEffect(() => {
    if (user) {
      fetchAllCartItems(user.user.id);
    }
  }, [user]);

  // useEffect(() => {
  //   if (selectedId) {
  //     fetchProduct(selectedId);
  //   }
  // }, [selectedId]);

  useEffect(() => {
    fetchProductImageByPrecode(currentProduct?.product?.pre_code);
  }, [currentProduct]);

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

  async function fetchProducts() {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/products`);
      console.log(res, "GETTING ALL PRODUCTS");
      dispatch({
        type: "products/loaded",
        payload: res.data.data.details,
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

  async function fetchProductImageByPrecode(pre_code: string) {
    const prevPreCode = imageColors[0]?.product_code.split("-")[0];
    if (pre_code === prevPreCode) {
      return;
    }
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/products/${pre_code}/images`,
      );
      setImageColors(res.data.data.images);
      dispatch({
        type: "fetched",
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading cities...",
      });
    }
  }

  async function fetchAllCartItems(userId: number) {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/users/${userId}/carts`);
      dispatch({
        type: "cart/loaded",
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

  async function addToCart(formData) {
    dispatch({ type: "loading" });
    const userId = user.user.id;
    try {
      await axios.post(`${BASE_URL}/api/v1/users/${userId}/carts`, formData);

      const loadingCartResponse = await axios.get(
        `${BASE_URL}/api/v1/users/${userId}/carts`,
      );
      dispatch({
        type: "cart/loaded",
        payload: loadingCartResponse.data.data.userCartItems,
      });

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

  // function checkAllCart() {
  //   dispatch({ type: "cart/purchasedAll", payload: isCheckedAll });
  // }

  function addFavorite(id: string) {
    setSelectedId(id);
    dispatch({ type: "favorite/added", payload: currentProduct });
  }

  function deleteFavorite(id: string) {
    setSelectedId(id);
    dispatch({ type: "favorite/deleted", payload: currentProduct });
  }

  function checkout() {
    const orders = cart.filter((cart) => cart.purchased);
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
        imageColors,
        isLoading,
        newArrivalProducts,
        bestSellerProducts,
        addToCart,
        decreaseCart,
        deleteCart,
        favorites,
        addFavorite,
        deleteFavorite,
        checkCart,
        checkout,
        orders,
        query,
        setQuery,
        quantity,
        setQuantity,
        fetchProduct,
        preDefinedSizes,
        categories,
        setSelectedId,
        cart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider, ProductsContext };
