import { useState } from "react";
import { Drawer} from "antd";
import { useGetAllUnitsQuery } from "../redux/api/features/units/unitApi";

const Unit = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const {data} = useGetAllUnitsQuery("")

  return (
    <div>
      <div className="flex justify-between gap-2">
        <div>
          <h1>All Units</h1>
        </div>
        <div>
          <button
            onClick={showDrawer}
            value="right"
            className="items-center px-4 py-2 text-xs font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Create New Unit
          </button>
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
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Abbreviation
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          {
            data?.data?.map((unit: any) => (
              <tbody className="bg-white divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {unit.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {unit.abbreviation}
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
                    Edit
                  </a>
  
                  {/* Delete Button */}
                  <a
                    href="#"
                    className="inline-flex items-center ml-3 px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Delete
                  </a>
                </td>
              </tr>
            </tbody>
            ))
          }
        </table>
      </div>
      <Drawer
        title={
          <h1 className="text-center text-xl font-semibold bg-[#DDD] rounded-lg p-2">
            Create New Unit
          </h1>
        }
        placement="bottom"
        closable={false}
        onClose={onClose}
        open={open}
        height={400}
      >
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full px-4">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter unit name"
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
          <div className="w-full px-4 ">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Abbreviation
            </label>
            <input
              type="text"
              placeholder="Enter abbreviation"
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            <div className="mt-5">
            <button className="w-full py-2 m-t5 px-3 text-white bg-[#123458]  rounded-lg hover:cursor-pointer transition-all duration-300">
              Submit
            </button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Unit;
