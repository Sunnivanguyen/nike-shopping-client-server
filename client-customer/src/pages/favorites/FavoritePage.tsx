import useProducts from "../../hooks/useProducts";
// import { IProduct } from "../../types/ProductType";
// import { Link } from "react-router-dom";
// import { MdDeleteForever } from "react-icons/md";

const CustomerFavoritePage: React.FC = () => {
  const { favorites, deleteFavorite } = useProducts();

  function handleDeleteFavorite(e, id) {
    e.stopPropagation();
    deleteFavorite(id);
  }

  return (
    <main className="max-w-10xl mt-0 h-full bg-white px-4 dark:bg-dark-100 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Favorites
        </h1>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        {favorites.length === 0 && (
          <h2 className="mx-auto flex text-lg dark:text-white">
            Items added to your Favourites will be saved here.
          </h2>
        )}

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {/* {favorites.map((product: IProduct) => (
            <div key={crypto.randomUUID()} className="relative">
              <Link to={`/vn/nike/new/${product.id}`} className="group">
                <MdDeleteForever
                  className="absolute right-5 top-5 z-10 text-3xl text-dark-50"
                  onClick={(e) => handleDeleteFavorite(e, product.id)}
                />
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.images[2].src}
                    alt={product.images[2].alt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-black dark:text-white">
                  {product.name}
                </h3>
                <p className="mt-1 text-lg font-medium text-black dark:text-white">
                  $
                  {new Intl.NumberFormat("en-US").format(
                    Number(product.price.value),
                  )}
                </p>
              </Link>
            </div>
          ))} */}
        </div>
      </div>
    </main>
  );
};

export default CustomerFavoritePage;
