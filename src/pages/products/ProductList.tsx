import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useGetAllProductsQuery } from "../../redux/api/features/products/productApi";

const ProductList = () => {
  const { t } = useTranslation();
  const { data: products, isFetching } = useGetAllProductsQuery("");

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <h1 className="text-lg md:text-2xl font-bold text-gray-800">
          {t("customer.customerList.title")}
        </h1>
        <Link to={"/product-management/add-product"}>
          <button
            type="submit"
            className="bg-slate-900 hover:bg-slate-700 text-white py-2 px-4 rounded-xl font-semibold text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none"
          >
           Add New Product
          </button>
        </Link>
      </div>

      <div className="w-full overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["Photo", "Name", "Unit", "Quantity", "Price", t("customer.customerList.table.actions")].map((heading, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ${heading === t("customer.customerList.table.actions") ? "text-center" : ""
                    }`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {products?.data?.map((item: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50 transition duration-200 text-center">
                <td className="px-4 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border border-gray-300"
                  />
                </td>


                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.unit.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.quantity}</td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{item.sellingPrice}</td>
                <td className="px-4 py-2 text-center whitespace-nowrap">
                  <div className="flex justify-center gap-2">
                    {/* Edit Button */}
                    <button className="px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200">
                      View
                    </button>

                    {/* Delete Button */}
                    <button className="px-4 py-1 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-red-700 transition duration-200">
                     Edit
                    </button>

                    <button className="px-4 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200">
                      {t("customer.customerList.table.delete")}
                    </button>
                  </div>
                </td>

              </tr>
            ))}
            {products?.data?.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-6">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
