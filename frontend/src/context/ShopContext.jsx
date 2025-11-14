import {createContext,useEffect,useState} from 'react';
import {products} from "../assets/assets";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export const ShopContext = createContext();


const ShopContextProvider = (props) => {
    const currency = '₹' ;
    const delivery_fee = 10;
    const [search,setSearch]=useState("");
    const [showsearch,setShowsearch]=useState(false);
    const [cartItems,setCartItems]=useState({});
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

    const value = {
        products,currency,delivery_fee,search,setSearch,showsearch,setShowsearch,cartItems,addToCart, getCartCount, updateQuantity, getCartAmount, navigate,
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;