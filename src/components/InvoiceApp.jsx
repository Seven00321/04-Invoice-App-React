import PropTypes from 'prop-types';
import React, { Component, useState } from 'react';
import { getInvoice } from '../services/getInvoice';
import { InvoiceView } from './InvoiceView';
import { ClientView } from './ClientView';
import { CompanyView } from './CompanyView';
import { ListItemsView } from './ListItemsView';
import { TotalView } from './TotalView';

export const InvoiceApp = () => {

    // Recuperando los datos desde Services
    const {id, name, client, company, items: itemsInitial, total} = getInvoice();

    const [productValue, setProductValue] = useState('');
    const [priceValue, setPriceValue] = useState(0);
    const [quantityValue, setQuantityValue] = useState(0);

    const [items, setItems] = useState(itemsInitial);

    // Modelo HTML
    return (
        <>
            <h1>Generacion de Facturas</h1>
            <div className='container'>
                <div className='card my-3'>

                    <h2 className='card-header'>
                        Ejemplo Factura
                    </h2>

                    <div className='card-body'>
                        
                        <InvoiceView id={id} name={ name }/>

                        <div className='row py-3'>
                            <div className='col'>
                                <ClientView 
                                    title={"Datos del cliente"}
                                    client={client} 
                                />
                            </div>

                            <div className='col'>
                                <CompanyView 
                                    title={"Datos de la Empresa"}
                                    company={company}
                                />
                            </div>      
                        </div>  


                        <ListItemsView
                            title={"Productos de la Factura"}
                            items={items}
                        />


                        <TotalView 
                            total={total}
                        />


                        <form className="w-50" onSubmit={event => {
                            event.preventDefault();

                            setItems([...items, {key: 4, product: productValue, price: priceValue, quantity: quantityValue}]);
                        }}>
                            <label htmlFor="producto">Producto</label>
                            <input 
                                className="form-control mb-3" 
                                type="text" 
                                id='producto' 
                                name="product" 
                                placeholder='Producto' 
                                onChange={event => {
                                    console.log(event.target.value);
                                    setProductValue(event.target.value);
                                }}
                            />

                            <label htmlFor="precio">Precio</label>
                            <input 
                                className="form-control mb-3" 
                                type="number" 
                                id='precio' 
                                name="price" 
                                placeholder='Precio'
                                onChange={event => {
                                    console.log(event.target.value);
                                    setPriceValue(event.target.value);
                                }}
                            />
                             
                            <label htmlFor="cantidad">Cantidad</label>
                            <input 
                                className="form-control mb-3" 
                                type="number" 
                                id='cantidad' 
                                name="quantity" 
                                placeholder='Cantidad'
                                onChange={event => {
                                    console.log(event.target.value);
                                    setQuantityValue(event.target.value);
                                }}
                            />


                            <button type='submit' className='btn btn-primary'>Crear Item</button>
                        </form>
                           
                    </div>       
                </div>
            </div>    
        </>
    )
}

