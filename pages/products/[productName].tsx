import React from 'react'
import Address from '@/components/templates/Product/Address'
import ImageGallery from '@/components/templates/Product/ImageGallery'
import ProductInfo from '@/components/templates/Product/ProductInfo'


export default function product() {
  return (
    <>
     <div className="bg-white font-[system-ui]">
      <div className="pt-6">
        
      <Address/>
      <ImageGallery/>
      <ProductInfo/>
        
      </div>
    </div>
    </>
  )
}
