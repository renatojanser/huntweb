import React,  { useState, useEffect } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'

import './style.css'

export default function Main(){

    const [products, setProducts] = useState([]);
    const [productInfo, setProductInfo] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function loadProducts(page){
            const response = await api.get(`/products?page=${page}`)

            const { docs, ...productInfo } = response.data
            
            setProducts(docs)
            setProductInfo(productInfo)
        }

        loadProducts(page)
    }, [page])

    function prevPage() {
        const pg = page;

        if(page == 1) return

        const pageNumber = pg - 1

        setPage(pageNumber)

    }

    function nextPage() {
        const pg = page;

        if(page == productInfo.pages) return

        const pageNumber = pg + 1

        setPage(pageNumber)
    }

    return (
        <div className="products-list"> 
            {products.map((product) => (
                <article key={product._id}>
                    <strong>{product.title}</strong>
                    <p>{product.description}</p>

                    <Link to={`products/${product._id}`}>Acessar</Link>
                </article>
            ))}
            <div className="actions">
                <button disabled={page == 1} onClick={prevPage}>Anterior</button>
                <button disabled={page == productInfo.pages} onClick={nextPage}>Próxima</button>
            </div>
        </div>
    )
}