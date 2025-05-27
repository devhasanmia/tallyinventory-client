import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useAddCustomerMutation } from "../../redux/api/features/customers/customerApi";

type Inputs = {
  photo: FileList;
  name: string;
  mobile: string;
  email: string;
  balance: number;
  due: number;
  address: string;
};

const AddCustomer = () => {
  const { t } = useTranslation();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<Inputs>();
  const photoFile = watch("photo");
  const file = photoFile?.[0];
  if (file && !photoPreview) {
    const imageUrl = URL.createObjectURL(file);
    setPhotoPreview(imageUrl);
  }

  const [addCustomer] = useAddCustomerMutation()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("photo", data.photo[0]);
      formData.append("name", data.name);
      formData.append("mobile", data.mobile);
      formData.append("email", data.email);
      formData.append("balance", String(data.balance));
      formData.append("due", String(data.due));
      formData.append("address", data.address);
      await addCustomer(formData)
      toast.success("Customer created successfully!");
      reset();
      setPhotoPreview(null);
    } catch (error: any) {
      toast.error(
        <h1>
          {error.response?.data?.message || "Something went wrong"} <br />
          {error.response?.data?.errors?.[0]?.message || ""}
        </h1>
      );
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-8">
      <div className="bg-white p-4 sm:p-5 rounded-lg shadow-lg w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              {t("customer.addCustomer.name")}
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="mt-1 block w-full p-3 text-sm bg-gray-50 border border-gray-300 rounded-lg"
              placeholder={t("customer.addCustomer.namePlaceholder")}
            />
          </div>

          {/* Mobile */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-600">
              {t("customer.addCustomer.mobile")}
            </label>
            <input
              {...register("mobile")}
              type="tel"
              id="mobile"
              className="mt-1 block w-full p-3 text-sm bg-gray-50 border border-gray-300 rounded-lg"
              placeholder={t("customer.addCustomer.mobilePlaceholder")}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              {t("customer.addCustomer.email")}
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="mt-1 block w-full p-3 text-sm bg-gray-50 border border-gray-300 rounded-lg"
              placeholder={t("customer.addCustomer.emailPlaceholder")}
            />
          </div>

          {/* Address */}
          <div className="col-span-full">
            <label htmlFor="address" className="block text-sm font-medium text-gray-600">
               {t("customer.addCustomer.address")}
            </label>
            <textarea
              {...register("address")}
              id="address"
              className="mt-1 block w-full p-3 text-sm bg-gray-50 border border-gray-300 rounded-lg"
              placeholder={t("customer.addCustomer.addressPlaceholder")}
            />
          </div>

          {/* Balance */}
          <div>
            <label htmlFor="balance" className="block text-sm font-medium text-gray-600">
               {t("customer.addCustomer.balance")}
            </label>
            <input
              {...register("balance")}
              type="number"
              id="balance"
              className="mt-1 block w-full p-3 text-sm bg-gray-50 border border-gray-300 rounded-lg"
              placeholder={t("customer.addCustomer.balancePlaceholder")}
            />
          </div>

          {/* Due */}
          <div>
            <label htmlFor="due" className="block text-sm font-medium text-gray-600">
               {t("customer.addCustomer.due")}
            </label>
            <input
              {...register("due")}
              type="number"
              id="due"
              className="mt-1 block w-full p-3 text-sm bg-gray-50 border border-gray-300 rounded-lg"
              placeholder={t("customer.addCustomer.duePlaceholder")}
            />
          </div>

          {/* Photo */}
          <div className="col-span-full lg:col-span-1">
            <label htmlFor="photo" className="block text-sm font-medium text-gray-600 mb-1">
               {t("customer.addCustomer.photo")}
            </label>
            <input
              {...register("photo")}
              type="file"
              id="photo"
              accept="image/*"
              className="mt-1 block w-full p-3 text-sm bg-gray-50 border border-gray-300 rounded-lg cursor-pointer"
            />
            {photoPreview && (
              <div className="mt-4">
                <img
                  src={photoPreview}
                  alt={t('customer.addCustomer.photoPreviewAlt')}
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="col-span-full mt-5">
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-xl font-semibold text-base"
            >
               {t("customer.addCustomer.addCustomer")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
