import React from 'react'
import {API} from '../../backend'

function Image({product}) {
    const imageUrl  = product ? `${API}/product/photo/${product._id}` : `https://blog.springworks.in/wp-content/themes/fox/images/placeholder.jpg`
    return (
        <div className="rounded p-2 text-center" style={{height: "150px"}}>
        <img
              src={imageUrl}
              alt={product.name}
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-1 rounded"
            />
            </div>
    )
}

export default Image
