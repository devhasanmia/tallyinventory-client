import { useTranslation } from "react-i18next";
import { useGetAllCustomersQuery } from "../../redux/api/features/customers/customerApi";
import { Link } from "react-router";
import Loading from "../Loading";
import { Image } from "antd";
const customerList = () => {
  const { t } = useTranslation();
  const { data: customers, isFetching } = useGetAllCustomersQuery("");
  if (isFetching) {
    return <Loading />;
  }
  return (
    <div>
      <div>
        <div className="flex justify-between gap-2">
          <div>
            <h1>{t("customer.customerList.title")}</h1>
          </div>
          <div>
            <Link to={"/add-customer"}>
              {" "}
              <button
                type="submit"
                className=" bg-slate-900 hover:bg-slate-700 text-white py-2 px-4 rounded-xl font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none"
              >
                {t("customer.customerList.addButton")}
              </button>
            </Link>
          </div>
        </div>
        <br />

        <div className="w-full overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t("customer.customerList.table.photo")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t("customer.customerList.table.name")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t("customer.customerList.table.mobile")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t("customer.customerList.table.balance")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t("customer.customerList.table.due")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t("customer.customerList.table.address")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t("customer.customerList.table.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {customers?.data?.map((item: any) => (
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="p-2 m-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Image width={100} height={100} src={item.photo} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.balance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.due}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    {/* Edit Button */}
                    <a
                      href="#"
                      className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487a2.123 2.123 0 011.42.588l1.596 1.595a2.125 2.125 0 01.588 1.421l-10.057 10.056-2.892.487a.375.375 0 01-.429-.429l.487-2.892L15.474 3.87a2.125 2.125 0 011.388-.38z"
                        />
                      </svg>
                      {t("customer.customerList.table.edit")}
                    </a>

                    {/* Delete Button */}
                    <a className="inline-flex items-center ml-3 px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      {t("customer.customerList.table.delete")}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default customerList;
