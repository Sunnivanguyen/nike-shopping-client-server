import React from "react";
import { IProductImage } from "../../types/ProductType";

const BASE_URL = import.meta.env.SERVER_BASE_URL;
const ImageGallery: React.FC<{ images: IProductImage[] }> = ({ images }) => {
  return (
    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      {images && images.length > 0 && (
        <>
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={`${BASE_URL}/api/v1/product/image/${images[0].image_src}`}
              alt={images[0].image_alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={`${BASE_URL}/api/v1/product/image/${images[1].image_src}`}
                alt={images[1].image_alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={`${BASE_URL}/api/v1/product/image/${images[2].image_src}`}
                alt={images[2].image_alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={`${BASE_URL}/api/v1/product/image/${images[3].image_src}`}
              alt={images[3].image_alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ImageGallery;
