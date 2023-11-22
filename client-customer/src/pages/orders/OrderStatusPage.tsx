import React from "react";
import useProducts from "../../hooks/useProducts";
// import { Link } from "react-router-dom";
// import OrderPrice from "../../components/OrderPrice";
// import { IOrder } from "../../types/OrderType";

const OrderStatusPage: React.FC = () => {
  const { orders } = useProducts();

  return (
    <main className=" max-w-10xl mt-0 h-full bg-white px-4 dark:bg-dark-100 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Order Status
        </h1>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid-rows grid gap-4">
          {/* {orders !== undefined &&
            orders.map((order: IOrders) => (
              <div
                key={crypto.randomUUID()}
                className="flex h-[400px] w-full items-center justify-start gap-20 border-b border-gray-200"
              >
                <Link to={`${order.orderID}`} className="w-[280px]">
                  <div className="aspect-h-1 aspect-w-1 h-full w-[250px] overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={order.customerOrder[0].images[1].src}
                      alt={order.customerOrder[0].images[1].alt}
                      className="h-full w-full object-cover object-center hover:opacity-75"
                    />
                  </div>
                  <h3 className=" mt-2 text-xl text-dark-50 dark:text-white">
                    {order.customerOrder[0].name}
                  </h3>
                  <div className="flex gap-5">
                    <h4 className=" text-md mt-2 text-dark-50 dark:text-white">
                      Color: {order.customerOrder[0].color}
                    </h4>
                    <h4 className=" text-md mt-2 text-dark-50 dark:text-white">
                      Size: {`${order.customerOrder[0].size}`}
                    </h4>
                  </div>
                </Link>

                <div className="w-[400px]">
                  <OrderPrice
                    price={order.customerOrder[0].price.value}
                    discount={order.customerOrder[0].discount}
                  />
                </div>
                <h2 className="text-2xl text-black dark:text-white">
                  {order.customerOrder[0].quantity}
                </h2>
              </div>
            ))} */}
        </div>
      </div>
    </main>
  );
};
export default OrderStatusPage;
