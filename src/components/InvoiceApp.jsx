import PropTypes from 'prop-types';
import React, { Component, useEffect, useState } from 'react';
import { getInvoice, calculateTotal } from '../services/getInvoice';
import { InvoiceView } from './InvoiceView';
import { ClientView } from './ClientView';
import { CompanyView } from './CompanyView';
import { ListItemsView } from './ListItemsView';
import { TotalView } from './TotalView';
import { FormItemsView } from './FormItemsView';

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

    const [ activeForm, setActiveForm ] = useState(false);

    // Total
    const [total, setTotal] = useState(0);

    // Recuperando los datos desde Services
    const [ invoice, setInvoice ] = useState(invoiceInitial);

    // Items
    const [items, setItems] = useState([]);

    // Contador
    const [counter, setCounter] = useState(4);

    // Datos de Factura
    const {id, name, client, company} = invoice;

    
    // UseEffect principal
    useEffect( () => {
        const data = getInvoice();
        setInvoice(data);
        setItems(data.items);
    }, []);

    

    // useEffect(() => {
    //     //console.log('el contador cambio!')
    // }, [counter]);

    useEffect(() => {
        //console.log('los items cambio!')
        setTotal(calculateTotal(items));
    }, [items]);

    const handlerAddItems = ({ product, price, quantity}) => {
        setItems([...items, {
            id: counter, 
            product: product.trim(), 
            price: +price.trim(), 
            quantity: parseInt(quantity.trim(), 10)
        }]);

        setCounter(counter + 1);
    }

    const handlerDeleteItem = (id) => {
        setItems(items.filter(item => item.id !== id ));
    }

    const onActiveForm = () => {
        setActiveForm(!activeForm);
    }

    // const [productValue, setProductValue] = useState('');
    // const [priceValue, setPriceValue] = useState('');
    // const [quantityValue, setQuantityValue] = useState('');

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
                            handlerDeleteItem={ id => handlerDeleteItem(id) }
                        />


                        <TotalView 
                            total={total}
                        />

                        <button 
                            className='btn btn-success mb-3'
                            onClick={ onActiveForm }
                            >{!activeForm ? 'Agregar Item': 'Cerrar Form'}</button>
                        {
                            !activeForm || <FormItemsView handler={(newItem) => handlerAddItems(newItem)}
                            //!activeForm ? '': <FormItemsView handler={(newItem) => handlerAddItems(newItem)}
                            />
                        }          
                    </div>       
                </div>
            </div>    
        </>
    )
}

