import React from "react";
import { RowItemView } from "./RowItemView";
import PropTypes from "prop-types";

export const ListItemsView = ({title, items}) => {
    const {product, price, quantity} = items;   

    return (
    <>
      <h2 className="pt-5">{title}</h2>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
          </tr>
        </thead>

        <tbody>
          {items.map(({ id, product, price, quantity }) => (
            <RowItemView
                key={id} 
                product={product}
                price={price}
                quantity={quantity}
            />
          ))}
        </tbody>
      </table>
    </>
  )

  ListItemsView.propTypes =  {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
  }
};
