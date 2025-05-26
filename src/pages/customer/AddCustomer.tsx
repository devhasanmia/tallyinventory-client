import { useState } from "react";

const AddCustomer = () => {
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl: any = URL.createObjectURL(file);
      setPhotoPreview(imageUrl);
    } else {
      setPhotoPreview(null);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-8">
      <div className="bg-white p-4 sm:p-5 rounded-lg shadow-lg w-full">
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full p-3 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
              placeholder="Enter customer name"
            />
          </div>

          {/* Mobile */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-600">
              Mobile
            </label>
            <input
              type="tel"
              id="mobile"
              className="mt-1 block w-full p-3 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
              placeholder="Enter mobile number"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-3 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
              placeholder="Enter email address"
            />
          </div>

          {/* Address */}
          <div className="col-span-full">
            <label htmlFor="address" className="block text-sm font-medium text-gray-600">
              Address
            </label>
            <textarea
              id="address"
              className="mt-1 block w-full p-3 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
              placeholder="Enter address"
            ></textarea>
          </div>

          {/* Balance */}
          <div>
            <label htmlFor="balance" className="block text-sm font-medium text-gray-600">
              Balance
            </label>
            <input
              type="number"
              id="balance"
              className="mt-1 block w-full p-3 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
              placeholder="Enter balance"
            />
          </div>

          {/* Due */}
          <div>
            <label htmlFor="due" className="block text-sm font-medium text-gray-600">
              Due
            </label>
            <input
              type="number"
              id="due"
              className="mt-1 block w-full p-3 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
              placeholder="Enter due amount"
            />
          </div>
          {/* Photo & Preview */}
          <div className="col-span-full lg:col-span-1">
            <label htmlFor="photo" className="block text-sm font-medium text-gray-600 mb-1">
              Photo
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              className="mt-1 block w-full p-3 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
            />

            {photoPreview && (
              <div className="mt-4">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}
          </div>
          {/* Submit */}
          <div className="col-span-full mt-5">
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-xl font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
