import useProducts from "../../hooks/useProducts";

import ProductItem from "../../components/ui/ProductItem";

const BestSellerPage: React.FC = () => {
  const { bestSellerProducts } = useProducts();

  return (
    <div className="bg-inherit">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {bestSellerProducts &&
            bestSellerProducts.length > 0 &&
            bestSellerProducts.map((productDetail) => {
              return (
                <ProductItem
                  productDetail={productDetail}
                  key={crypto.randomUUID()}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BestSellerPage;
