import useProducts from "../../hooks/useProducts";
import { IProduct } from "../../types/ProductType";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const HomePage = () => {
  const { uniqueProducts, uniqueImages, setSelectedId, fetchProduct } =
    useProducts();

  return (
    <>
      <main className="max-w-10xl mt-0 h-full bg-white px-4 dark:bg-dark-100 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Featured Products
          </h1>
        </div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {uniqueProducts.length > 0 &&
              uniqueProducts.map((product: IProduct, index: number) => {
                return (
                  <div key={crypto.randomUUID()}>
                    <Link
                      to={`/nike/new-arrivals/${product.product_code}`}
                      className="group"
                    >
                      <div
                        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
                        onClick={() => {
                          setSelectedId(product.id);
                        }}
                      >
                        <img
                          src={`${BASE_URL}/api/v1/product/image/${uniqueImages[index].image_src}`}
                          alt={uniqueImages[index].image_alt}
                          className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <h3 className="mt-4 text-sm text-black dark:text-white">
                        {product.product_name}
                      </h3>
                      <p className="mt-1 text-lg font-medium text-black dark:text-white">
                        $
                        {new Intl.NumberFormat("en-US").format(
                          Number(product.buy_price),
                        )}
                      </p>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </>
  );
};
export default HomePage;
