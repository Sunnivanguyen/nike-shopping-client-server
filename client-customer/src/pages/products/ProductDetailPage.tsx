import { useState } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { AiOutlineHeart } from "react-icons/ai";

import Spinner from "../../components/ui/Spinner";
// import BreadScrumbs from "../../components/ui/BreadScrumbs";
// import Prices from "../../components/Prices";
import ImageGallery from "../../components/ui/ImageGallery";
// import Reviews from "../../components/Reviews";
import ImageColor from "../../components/ui/ImageColor";
import Sizes from "../../components/ui/Sizes";
import Button from "../../components/ui/Button";
import Highlights from "../../components/ui/Highlights";
import Details from "../../components/ui/Details";
import { IProductImage } from "../../types/ProductType";
import useAuth from "../../hooks/useAuth";
import ImageColors from "../../components/ui/ImageColors";

const ProductDetailPage: React.FC = () => {
  const { product_code } = useParams();
  const {
    currentProduct,
    currentDetails,
    currentHighlights,
    currentImages,
    currentSizes,
    currentImageColors,
    isLoading,
    setSelectedId,
    selectedId,
    addToCart,
    addFavorite,
  } = useProducts();
  const { user } = useAuth();

  const [selectedColor, setSelectedColor] = useState(currentImageColors[0]);
  const [selectedSize, setSelectedSize] = useState(currentSizes[0]);

  function handleSubmit(e) {
    e.preventDefault();

    if (selectedColor && selectedSize) {
      addToCart(user.id, selectedColor, 1, selectedSize);
    }
  }

  function handleAddFavorite(e) {
    e.preventDefault();
    addFavorite(selectedId);
  }

  return (
    <div className="bg-white text-dark-70 dark:bg-dark-100 dark:text-white">
      {!isLoading || currentProduct ? (
        <div className="pt-6">
          {/* BreadScrumb */}
          {/* <BreadScrumbs breadcrumbs={breadcrumbs} name={name} /> */}
          {/* Image gallery */}
          <ImageGallery images={currentImages} />
          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                {currentProduct.product_name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              {/* <Prices price={price} discount={discount} /> */}

              {/* Reviews */}
              {/* <Reviews reviews={reviews} /> */}

              <form className="mt-10">
                {/* Colors */}
                <ImageColors
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  images={currentImageColors}
                />

                {/* Sizes */}
                <Sizes
                  setSelectedSize={setSelectedSize}
                  selectedSize={selectedSize}
                  sizes={currentSizes}
                />

                {/* Buttons */}
                <div className="mt-5 flex flex-col gap-5">
                  <Button onHandleClick={handleSubmit}>Add to Cart</Button>
                  <Button onHandleClick={handleAddFavorite}>
                    Favorite <AiOutlineHeart className="ml-2" />
                  </Button>
                </div>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900 dark:text-slate-50">
                    {currentProduct.description}
                  </p>
                </div>
              </div>

              <Highlights highlights={currentHighlights} />
              <Details details={currentDetails} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-columns flex items-center justify-center lg:col-span-4">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
