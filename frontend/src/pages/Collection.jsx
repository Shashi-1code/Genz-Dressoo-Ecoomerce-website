import React ,{ use, useContext,useEffect,useState} from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showsearch } = useContext(ShopContext);
  const [showFilter,setShowFilter]=useState(false);
  const [filterProducts,setFilterProducts]=useState([]);
  const [category,setCategory]=useState([]);
  const [subCategories,setSubCategories]=useState([]);
  const [sortType,setSortType]=useState('relevant');

  const tooggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item!==e.target.value));
    }
    else{
      setCategory(prev=>[...prev,e.target.value]);
  }
}

const tooggleSubCategories=(e)=>{
  if(subCategories.includes(e.target.value)){
    setSubCategories(prev=>prev.filter(item=>item!==e.target.value));
  }
  else{
    setSubCategories(prev=>[...prev,e.target.value]);
  }
}
const applyFilter=()=>{
  let productsCopy=products.slice();
  if(showsearch && search){
    productsCopy=productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  }
  if(category.length > 0){
    productsCopy=productsCopy.filter(item => category.includes(item.category));
  }
  if(subCategories.length > 0){
    productsCopy=productsCopy.filter(item => subCategories.includes(item.subCategory));
  }
  setFilterProducts(productsCopy);
}

const sortProducts=()=>{
  let fpCopy=filterProducts.slice();
  switch(sortType){
    case 'low-high':
      setFilterProducts(fpCopy.sort((a,b)=>a.price - b.price));
      break;
    case 'high-low':
      setFilterProducts(fpCopy.sort((a,b)=>b.price - a.price));
      break;
    default:
      applyFilter();  
      break; 
  }
}
useEffect(() => {
  applyFilter();
}, [category,subCategories,search,showsearch]);

useEffect(() => {
  sortProducts();
}, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter Options */}
      <div className='min-w-60'>
      <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
        <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt=""/>
      </p>
      {/*catergory filter */}
      
      <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '': 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
            <input className="w-3" type="checkbox" value={'Men'} onChange={tooggleCategory}/> Men
          </p>
          <p className='flex gap-2'>
            <input className="w-3" type="checkbox" value={'Women'} onChange={tooggleCategory}/> Women
          </p>
          <p className='flex gap-2'>
            <input className="w-3" type="checkbox" value={'Kids'} onChange={tooggleCategory} /> Kids
          </p>
        </div>
      </div>
      {/* subCategories filters*/}
      <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '': 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>TYPE</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
            <input className="w-3" type="checkbox" value={'Topwear'} onChange={tooggleSubCategories} /> Topwear
          </p>
          <p className='flex gap-2'>
            <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={tooggleSubCategories} /> Bottomwear
          </p>
          <p className='flex gap-2'>
            <input className="w-3" type="checkbox" value={'Winterwear'} onChange={tooggleSubCategories} /> Winterwear
          </p>
        </div>
      </div>
      </div>
      {/* Right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'All'} text2={'Collections'}/>
          {/*   Product sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by : Relevent</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>
        {/*map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index) => (
             <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
