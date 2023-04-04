import { useState, useEffect,useRef, useCallback } from "react";
import Skeleton from "./Skeleton";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 12;
  useEffect(() => {
    async function loadData() {
      const {data} = await axios({
        method: "GET",
        url: "https://api.escuelajs.co/api/v1/products",
        params: { offset: offset, limit: limit },
      });
      console.log(data)
      setData((prev) => [...prev, ...data]);
      //setData((prev)=>prev.concat(datas))
      setLoading(false);
    }
    loadData();
  }, [offset]);
  const handleInfiniteScroll = async () => {
    // console.log("scrollHeight"+document.documentElement.scrollHeight);
    // console.log("innerHeight"+window.innerHeight);
    // console.log("scrollTop"+document.documentElement.scrollTop)
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setOffset((prev) => prev + limit);
        setLoading(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <>
      <div className="container">
        <div className="product">
          {data &&
            data.map((item, index) => (
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
            ))}
            {loading && <Skeleton/>}
        </div>
      </div>
    </>
  );
}

export default App;
// https://dev.to/designly/create-a-responsive-animated-sidebar-using-react-nextjs-and-tailwind-css-1ml3