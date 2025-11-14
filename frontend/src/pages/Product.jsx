import React ,{useEffect,useContext, useState} from 'react'
import { useParams } from 'react-router-dom';
import {ShopContext} from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/relatedProducts';

const Product = () => {
  const {productId} = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image,setImage]= useState('');
  const [size,setSize]= useState('');

  const fetchProductData = async () => {

    products.map((item)=>{
      if(item._id === productId){
        setProductData(item);
        setImage(item.image[0]);
        return null;
    }
  })  
};

  useEffect(() => {
    fetchProductData();
  }, [productId,products]);
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Details Section */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-y-scroll sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
           {productData.image.map((item,index)=>(
              <img onClick={()=>setImage(item)} src={item} key={index}  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt=""/>
          </div>
        </div>
         {/* Product Info */}
         <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p>(122)</p>
          </div>
            <p className='mt-5 text-3xl font-medium'>₹{productData.price}</p>
            <p className='mt-5 text-gray-500 w-[4/5]'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size </p>
              <div className='flex gap-2'>
                {productData.sizes.map((item,index)=>{
                  return <button onClick={()=>(
                    setSize(item)
                )} className={`w-8 h-8 border bg-gray-100 flex items-center justify-center cursor-pointer
                  ${item === size ? 'border-orange-500' : ''}
                  `}>{item}</button>
                })}
              </div>
            </div>
            <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white py-3 px-8 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="flex flex-col gap-1 mt-5 text-sm text-gray-500">
             <p>100% Original product </p>
            <p>Free delivery on order above $49</p>
            <p> Easy return and exchange policy within 7 days </p>
          </div>
         </div>
      </div>
      {/* Product Description & Review Section */}
      <div className='mt-10'>
        <div className="flex">
          <b className="px-5 py-3 text-sm border">Description</b>
          <p className="px-5 py-3 text-sm border">Reviews (122)</p>
        </div>
        <div  className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>
            An-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a vietual marketplace where businesses and individuals.com
            showcase ther produch, interact with customers, and conduct
            fransactions without the need for a physical presence. E-commerce
            websites have goned immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with defailed descriptions, images, prices, and any ovalable
            variations (eg, sizes colors). Each product uwaly has its ww
            dedicated page with relevant infurroution
          </p>
        </div>
      </div>
      {/* Related Products Section */}
      <RelatedProducts category={productData.category} subcategory={productData.subCategory}/>
      
      
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
