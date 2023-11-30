import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { AiOutlineHeart } from "react-icons/ai";

import Spinner from "../../components/ui/Spinner";
import ImageGallery from "../../components/ui/ImageGallery";

import Sizes from "../../components/ui/Sizes";
import Button from "../../components/ui/Button";
import Highlights from "../../components/ui/Highlights";
import Details from "../../components/ui/Details";
// import useAuth from "../../hooks/useAuth";
import ImageColors from "../../components/ui/ImageColors";
import BreadScrumbs from "../../components/ui/BreadScrumbs";
import Prices from "../../components/ui/Prices";
import Reviews from "../../components/ui/Reviews";

const ProductDetailPage: React.FC = () => {
  const { product_code } = useParams();

  const {
    currentProduct,
    isLoading,
    addToCart,
    addFavorite,
    fetchProduct,
    categories,
    imageColors,
  } = useProducts();

  useEffect(() => {
    fetchProduct(product_code);
  }, [product_code]);

  // const { user } = useAuth();

  const breadScrumbs = categories?.find(
    (cat) => cat.id === currentProduct?.product?.category_id,
  );

  if (breadScrumbs) {
    breadScrumbs.href = `/products/categories/${breadScrumbs?.name}`;
  }

  let sex;
  switch (currentProduct?.product?.sex) {
    case 1:
      sex = "Men";
      break;
    case 2:
      sex = "Women";
      break;
    default:
      "Men";
  }

  const [selectedColor, setSelectedColor] = useState(() => {
    const images = currentProduct?.imageColors;
    if (images?.length > 0) {
      const image = images.find((img) => img.product_code === product_code);
      return image;
    }
  });
  const [selectedSize, setSelectedSize] = useState(() => {
    const sizes = currentProduct?.sizes;
    if (sizes?.length > 0) {
      return sizes[0];
    }
  });
  function handleSubmit(e) {
    e.preventDefault();

    if (selectedColor && selectedSize) {
      const formData = new FormData();
      formData.append("product_id", currentProduct?.product?.id);
      formData.append("quantity_ordered", "1");
      formData.append("product_size", selectedSize.size_id);
      // for (const [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }
      addToCart(formData);
    }
  }

  function handleAddFavorite(e) {
    e.preventDefault();
    // addFavorite(selectedId);
  }

  let avgReviews = 0;

  if (
    currentProduct?.reviews &&
    currentProduct?.total &&
    currentProduct.reviews.length > 0
  ) {
    avgReviews = currentProduct.total / currentProduct.reviews.length;
  }

  return (
    <div className="bg-white text-dark-70 dark:bg-dark-100 dark:text-white">
      {!isLoading && currentProduct ? (
        <div className="pt-6">
          {/* BreadScrumb */}
          {breadScrumbs && sex && (
            <BreadScrumbs breadScrumbs={breadScrumbs} sex={sex} />
          )}
          {/* Image gallery */}
          <ImageGallery images={currentProduct.images} />
          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                {currentProduct?.product?.product_name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <Prices price={currentProduct?.product?.buy_price} discount={0} />

              {/* Reviews */}
              <Reviews value={avgReviews} />

              <form className="mt-10">
                {/* Colors */}
                {imageColors?.length > 0 && (
                  <ImageColors
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    images={imageColors}
                  />
                )}

                {/* Sizes */}
                {currentProduct?.sizes?.length > 0 && (
                  <Sizes
                    setSelectedSize={setSelectedSize}
                    selectedSize={selectedSize}
                    sizes={currentProduct.sizes}
                  />
                )}

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

              <Highlights highlights={currentProduct.highlights} />
              <Details details={currentProduct.details} />
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
