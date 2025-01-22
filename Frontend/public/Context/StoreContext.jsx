import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartitems, setCartitems] = useState({});
  const [cartQty, setCartQty] = useState(0);
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);
  const [userName, setUserName] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const url = "https://fullstack-food-backend-7bpz.onrender.com";

  // Function to update cart data and calculate total quantity
  const updateCartData = (cartData) => {
    setCartitems(cartData);
    const newCartQty = Object.values(cartData).reduce(
      (total, quantity) => total + quantity,
      0
    );
    setCartQty(newCartQty); // Update cartQty here
  };

  const addToCart = async (itemId) => {
    try {
      setIsAddingToCart(true);
      if (token) {
        const response = await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });

          // Update cart state in context
          const updatedCartItems = {
            ...cartitems,
            [itemId]: (cartitems[itemId] || 0) + 1,
          };
          setCartitems(updatedCartItems);
          // Update cartQty after the change
          updateCartData(updatedCartItems);
        }
      } else {
        toast.error("Please, Login to add Food", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsAddingToCart(false); //
    }
  };
  const removeFromCart = async (itemId) => {
    try {
      setIsAddingToCart(true);
      if (token) {
        const response = await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.error(response.data.message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });

          // Update cart state in context
          const updatedCartItems = {
            ...cartitems,
            [itemId]: cartitems[itemId] - 1,
          };
          setCartitems(updatedCartItems);
          // Update cartQty after the change
          updateCartData(updatedCartItems);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const calculateSubtotal = () => {
    return Object.keys(cartitems).reduce((total, itemId) => {
      const item = food_list.find((product) => product._id === itemId);
      if (item) {
        return total + item.price * cartitems[itemId];
      }
      return total;
    }, 0);
  };

  // Fetch food data
  const fetchFood = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      const data = response.data.data; // Assuming response.data contains a "data" field

      if (data) {
        const newData = data.map((item) => ({
          ...item,
          image: `${url}/images/${item.image}`,
        }));
        setFood_list(newData);
      } else {
        console.error("No data received from API");
      }
    } catch (error) {
      console.error("Error fetching food:", error);
    }
  };

  // Load cart data (for user who is already logged in)
  const loadCartData = async (token) => {
    const response = await axios.post(
      `${url}/api/cart/get`,
      {},
      { headers: { token } }
    );
    const cartData = response.data.cartData || {};
    setUserName(response.data.userName);
    updateCartData(cartData); // Update both cart items and quantity
  };

  useEffect(() => {
    async function loadData() {
      try {
        setIsAddingToCart(true); ///
        await fetchFood();
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
          setToken(savedToken);
          await loadCartData(savedToken); // Fetch cart data when token exists
        }
      } catch (error) {
        console.log("Error fetching", error);
      } finally {
        setIsAddingToCart(false);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartitems,
    setCartitems,
    addToCart,
    removeFromCart,
    cartQty,
    setCartQty,
    url,
    token,
    setToken,
    updateCartData, // Add updateCartData function to the context
    calculateSubtotal,
    loadCartData,
    userName,
    setUserName,
    fetchFood,
    isAddingToCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
