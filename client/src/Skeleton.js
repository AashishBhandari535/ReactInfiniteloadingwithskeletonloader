import React from 'react'

export default function Skeleton() {
  return (
    <>
      {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ].map((item, index) => (
        <div className="productCard " key={index}>
          <figure className="productCard__img ">
            <img src="/default_avatar.jpg" alt="" />
          </figure>
          <div className="productCard__desc">
            <ul className="productList">
              <li className="productListItem productListItem__title  skeleton skeleton__title"></li>
              <li className="productListItem productListItem__price skeleton skeleton__price"></li>
              <li className="productListItem productListItem__rating skeleton skeleton__rating"></li>
            </ul>
          </div>
        </div>
      ))}
    </>
  );
}
