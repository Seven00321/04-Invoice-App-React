import PropTypes from 'prop-types';
import React, { Component, useEffect, useState } from 'react';
import { getInvoice } from '../services/getInvoice';
import { InvoiceView } from './InvoiceView';
import { ClientView } from './ClientView';
import { CompanyView } from './CompanyView';
import { ListItemsView } from './ListItemsView';
import { TotalView } from './TotalView';

const invoiceInitial = {
    id: 0,
    name: '',
    client: {
        name: '',
        lastName: '',
        address: {
            country: '',
            city: '',
            street: '',
            number: 0
        }
    },
    company: {
        name: '',
        fiscalNumber: 0
    },    
    items: [

    ]     
}

export const InvoiceApp = () => {

    // Recuperando los datos desde Services
    const [ invoice, setInvoice ] = useState(invoiceInitial);

    // Items
    const [items, setItems] = useState([]);

    // Contador
    const [counter, setCounter] = useState(4);

    // UseState de los Items
    const [formItemsState, setFormItemsState] = useState({
        product: '',
        price: '',
        quantity: ''
    });

    // Variables de Form
    const {product, price, quantity} = formItemsState;

    // Datos de Factura
    const {id, name, client, company, total} = invoice;


    // UseEffect
    useEffect( () => {
        const data = getInvoice();
        setInvoice(data);
        setItems(data.items);
    }, []);

    useEffect(() => {
        //console.log('el precio cambio!')
    }, [price]);

    useEffect(() => {
        //console.log('el formulario cambio!')
   }, [formItemsState]);

    useEffect(() => {
        //console.log('el contador cambio!')
    }, [counter]);
    useEffect(() => {
        console.log('los items cambio!')
    }, [counter]);

    
    //console.log(invoice);

    

    

    // const [productValue, setProductValue] = useState('');
    // const [priceValue, setPriceValue] = useState('');
    // const [quantityValue, setQuantityValue] = useState('');


    

    // Evento de Entrada 
    const onInputChange = ({ target: {name, value} }) => {
        // console.log(value);
        // console.log(name);

        setFormItemsState({
            ...formItemsState, 
            [name]: value
        });
    }

    // // Evento de Producto
    // const onProductChange = ({target}) => {
    //     console.log(target.value);
    //     setProductValue(target.value);
    // }

    // // Evento de Precio
    // const onPriceChange = ({target}) => {
    //     console.log(target.value);
    //     setPriceValue(target.value);
    // }

    // // Evento de Cantidad
    // const onQuantityChange = ({target}) => {
    //     console.log(target.value);
    //     setQuantityValue(target.value);
    // }

    // Evento de Guardado
    const onInvoiceItemsSubmit = (event) => {
        event.preventDefault();

        if(product.trim().length <=1 ) return;

        if(price.trim().length <=1 ) {
            alert('Error el precio no es un numero')   
            return;
        }
        if(isNaN(price.trim())) {
            alert('Error el precio debe ser un numero')   
            return;
        }

        if(quantity.trim().length <=1 ) {
            alert('Error la cantidad no es un numero')   
            return;
        }
        if(isNaN(quantity.trim())) {
            alert('Error la cantidad debe ser un numero')   
            return;
        }

        setItems([...items, {
            id: counter, 
            product: product.trim(), 
            price: +price.trim(), 
            quantity: parseInt(quantity.trim(), 10)
        }]);

        setFormItemsState({
            product: '',
            price: '',
            quantity: '',
        });

        setCounter(counter + 1);
    }

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


                        <form className="w-50" onSubmit={ onInvoiceItemsSubmit }>
                            <label htmlFor="producto">Producto</label>
                            <input 
                                className="form-control mb-3" 
                                type="text" 
                                id='producto' 
                                name="product" 
                                value={ product }
                                placeholder='Producto' 
                                onChange={onInputChange}
                            />

                            <label htmlFor="precio">Precio</label>
                            <input 
                                className="form-control mb-3" 
                                type="text" 
                                id='precio' 
                                name="price" 
                                value={ price }
                                placeholder='Precio'
                                onChange={event => onInputChange(event)}
                            />
                             
                            <label htmlFor="cantidad">Cantidad</label>
                            <input 
                                className="form-control mb-3" 
                                type="text" 
                                id='cantidad' 
                                name="quantity" 
                                value={ quantity }
                                placeholder='Cantidad'
                                onChange={onInputChange}
                            />


                            <button 
                                type='submit' 
                                className='btn btn-primary m-2'
                            >
                                Nuevo Item
                            </button>
                        </form>
                           
                    </div>       
                </div>
            </div>    
        </>
    )
}

