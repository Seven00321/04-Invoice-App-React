import React, { useEffect, useState } from "react";

export const FormItemsView = ({handler}) => {

    // UseState de los Items
    const [formItemsState, setFormItemsState] = useState({
        product: '',
        price: '',
        quantity: ''
    });

    // Variables de Form
    const {product, price, quantity} = formItemsState;

    // UseEfect
    useEffect(() => {
        //console.log('el precio cambio!')
    }, [price]);

    useEffect(() => {
        //console.log('el formulario cambio!')
    }, [formItemsState]);

    // Evento de Entrada 
    const onInputChange = ({ target: {name, value} }) => {
        // console.log(value);
        // console.log(name);

        setFormItemsState({
            ...formItemsState, 
            [name]: value
        });
    }

    // Evento de Guardado
    const onInvoiceItemsSubmit = (event) => {
        event.preventDefault();

        if(product.trim().length <=1 ) return;

        if(price.trim().length <=0 ) {
            alert('Error el precio no es un numero')   
            return;
        }
        if(isNaN(price.trim())) {
            alert('Error el precio debe ser un numero')   
            return;
        }

        if(quantity.trim().length <=0 ) {
            alert('Error la cantidad no es un numero')   
            return;
        }
        if(isNaN(quantity.trim())) {
            alert('Error la cantidad debe ser un numero')   
            return;
        }

        // setItems([...items, {
        //     id: counter, 
        //     product: product.trim(), 
        //     price: +price.trim(), 
        //     quantity: parseInt(quantity.trim(), 10)
        // }]);
        handler(formItemsState);

        setFormItemsState({
            product: '',
            price: '',
            quantity: '',
        });

        // setCounter(counter + 1);
    }

    return (
    <>
      <form className="w-50" onSubmit={onInvoiceItemsSubmit}>
        <label htmlFor="producto">Producto</label>
        <input
          className="form-control mb-3"
          type="text"
          id="producto"
          name="product"
          value={product}
          placeholder="Producto"
          onChange={onInputChange}
        />

        <label htmlFor="precio">Precio</label>
        <input
          className="form-control mb-3"
          type="text"
          id="precio"
          name="price"
          value={price}
          placeholder="Precio"
          onChange={(event) => onInputChange(event)}
        />

        <label htmlFor="cantidad">Cantidad</label>
        <input
          className="form-control mb-3"
          type="text"
          id="cantidad"
          name="quantity"
          value={quantity}
          placeholder="Cantidad"
          onChange={onInputChange}
        />

        <button type="submit" className="btn btn-primary m-2">
          Nuevo Item
        </button>
      </form>
    </>
  );
};
