import useProducts from "../../hooks/useProducts";
import { SiNike } from "react-icons/si";
// import { IProduct } from "../../types/ProductType";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { uniqueProducts, setSelectedId } = useProducts();

  return (
    <>
      <main className="max-w-10xl top-30 h-full bg-white px-4 dark:bg-dark-100 sm:px-6 lg:px-8">
        <div className="shadow-0 left-30 relative top-10 flex h-[500px] w-full  flex-row items-center justify-center gap-40  bg-white bg-opacity-0">
          <img
            className="h-full w-[700px] rounded-lg object-cover"
            src="https://res.cloudinary.com/demoempx3/image/upload/v1701013450/nike-shopping/home/il93ex4mtdxw4ikborec.jpg"
            alt="bg-1"
          />
          <span className="text-5xl font-bold text-dark-50 dark:text-white">
            SPEED BEYOND YOUR <br />
            WILDEST DREAMS
          </span>
        </div>
        <div className="shadow-0 relative bottom-4 left-5 top-[-20px] flex h-[700px] w-full  flex-row items-center justify-center gap-10 bg-white bg-opacity-0">
          <span className="flex flex-row items-center justify-center gap-5 text-4xl font-bold text-dark-50 dark:text-white">
            JUST DO IT <SiNike />
          </span>
          <img
            className="h-[700px] w-[500px] rounded-lg object-cover "
            src="https://res.cloudinary.com/demoempx3/image/upload/v1701013581/nike-shopping/home/qgrhf1himzrsdznn37kf.jpg"
            alt="bg-2"
          />
          <span className="text-xl font-bold text-dark-50 dark:text-white">
            Level up your fits with pieces rooted in Jordan heritage. <br />{" "}
            From everyday fleece essentials in subtle washed colors <br /> to
            classic outerwear silhouettes and utilitarian pants, <br /> these
            staples are timelessly cool.
          </span>
        </div>
        <div className="bottom-40 top-40 flex h-full w-full flex-col items-center justify-center gap-10 ">
          <img
            className="h-full w-full rounded-lg object-cover"
            src="https://res.cloudinary.com/demoempx3/image/upload/v1701062916/nike-shopping/home/bgxzbv3a8mmge2x3qxqi.jpg"
            alt="bg-3"
          />
          <span className="text-center text-5xl font-bold text-dark-50 dark:text-white">
            NIKE PEGASUS TRAIL <br />
            GORE-TEX
          </span>
          <p className="text-center text-xl text-dark-50 dark:text-white">
            A waterproof GORE-TEX upper helps your feet stay dry whether you’re
            jogging down a rainy road or splashing through muddy trails. <br />{" "}
            A flexible cuff around the ankle provides comfort and helps keep
            debris out.
          </p>
        </div>

        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Featured Products
          </h1>
        </div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {uniqueProducts?.length > 0 &&
              uniqueProducts.map((product) => {
                return (
                  <div key={crypto.randomUUID()}>
                    <Link
                      to={`/nike/featured/${product.product.product_code}`}
                      className="group"
                    >
                      <div
                        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 shadow-xl xl:aspect-h-8 xl:aspect-w-7"
                        onClick={() => {
                          setSelectedId(product.product.product.id);
                        }}
                      >
                        <img
                          src={product.imageData[1].image_src}
                          alt={product.imageData[1].image_alt}
                          className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <h3 className="mt-4 text-sm text-black dark:text-white">
                        {product.product.product_name}
                      </h3>
                      <p className="mt-1 text-lg font-medium text-black dark:text-white">
                        $
                        {new Intl.NumberFormat("en-US").format(
                          Number(product.product.buy_price),
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
