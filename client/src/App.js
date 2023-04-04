import { useState, useEffect } from "react";
import Skeleton from "./Skeleton";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset,setOffset] = useState(0)
  const limit = 12;
  useEffect(() => {
    async function loadData() {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      );
      const datas = await response.json()
      setData((prev) => [...prev,...datas]);
      //setData((prev)=>prev.concat(datas))
      setLoading(false)
    }
    loadData()
  },[offset]);
  const handleInfiniteScroll = async () => {
    // console.log("scrollHeight"+document.documentElement.scrollHeight);
    // console.log("innerHeight"+window.innerHeight);
    // console.log("scrollTop"+document.documentElement.scrollTop)
    try{
      if((window.innerHeight+document.documentElement.scrollTop+1) >= document.documentElement.scrollHeight){
        setOffset(prev => prev + limit)
        setLoading(true)
      }
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    window.addEventListener("scroll",handleInfiniteScroll);
  },[])
  return (
    <>
      <div className="container">
        <div className="product">
          {loading ? (
            <Skeleton />
          ) : (
            data&&data.map((item, index) => (
              <div className="productCard " key={index}>
                <figure className="productCard__img ">
                  <img src={item.images[0]} alt="img" />
                </figure>
                <div className="productCard__desc">
                  <ul className="productList">
                    <li className="productListItem productList__title ">
                      {item.title}
                    </li>
                    <li className="productListItem productList__price ">
                      {item.price}
                    </li>
                    {/* <li className="productListItem productList__rating ">
                      {item.rating.rate}
                    </li> */}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
