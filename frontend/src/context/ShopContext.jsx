import {createContext,useEffect,useState} from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ShopContext = createContext();



const ShopContextProvider = (props) => {
    const currency = '₹' ;
    const delivery_fee = 10;
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch]=useState('');
    const [showsearch,setShowsearch]=useState(false);
    const [cartItems,setCartItems]=useState({});
    const [products,setProducts]=useState([]);
    const [token,setToken]=useState('');
    const navigate = useNavigate();
    const addToCart = async (itemId,size)=>{
        if(!size){
            toast.error("Please select a size");
            return;
        }
        let cartData=structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        setCartItems(cartData);
    }
    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalCount += cartItems[items][item];
                    }
                }catch(err){

                }
            }
        }
        return totalCount;
    }
    const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

    const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      const productInfo = products.find((product) => product._id === item);
      for (const size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) {
            totalAmount += productInfo.price * cartItems[item][size];
          }
        } catch (error) {
          console.log('error', error);
        }
      }
    }
    return totalAmount;
  };

    const getProductsData= async()=>{
        try{
            const response=await axios.get(backendURL + '/api/product/list')
            if(response.data.success){
                // Normalize backend `images` field to maintain compatibility with frontend code
                const normalized = response.data.products.map((p) => ({
                    ...p,
                    images: p.images || p.image || [],
                    image: p.images || p.image || [],
                }));
                setProducts(normalized);
            }
            else{
                toast.error(response.data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData();
    },[])

    // Fetch the user's cart from backend (if endpoint exists) or fallback to localStorage
    const getUserCart = async (token) => {
        if(!token) return;
        try{
            // Try backend endpoint (not present in current backend, handled gracefully)
            const response = await axios.get(backendURL + '/api/user/cart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if(response.data && response.data.success && response.data.cartData){
                setCartItems(response.data.cartData || {});
                return;
            }
        }
        catch(err){
            // Ignore since backend may not implement the endpoint yet
            console.log('getUserCart error:', err.message);
        }

        // Fallback: load cart from localStorage if available
        try{
            const stored = localStorage.getItem('cart');
            if(stored){
                setCartItems(JSON.parse(stored));
            }
        }catch(err){
            console.log('Error parsing stored cart:', err.message);
        }
    }

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [token])

    // Persist cart to localStorage so it survives page reloads
    useEffect(()=>{
        try{
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }catch(err){
            console.log('Error saving cart to localStorage:', err.message);
        }
    }, [cartItems])

    

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showsearch,
        setShowsearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendURL,
        // Provide a camelCase alias used by components
        backendUrl: backendURL,
        token,
        setToken,
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;