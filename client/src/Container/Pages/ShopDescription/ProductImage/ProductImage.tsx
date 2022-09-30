import React from 'react'
import './ProductImage.scss'
import ImageGallery from 'react-image-gallery';

interface IProductImage {
    images: any[]
}


const ProductImage: React.FC<IProductImage> = ({ images }) => {
    return (
        <div className='product_container'>
            <ImageGallery thumbnailPosition='bottom' showPlayButton={false} showFullscreenButton={false} items={
                images.map((img: any) => {
                    return {
                        original: img.avatar,
                        thumbnail: img.avatar
                    }
                })
            }
            />
        </div>
    )
}

export default ProductImage
