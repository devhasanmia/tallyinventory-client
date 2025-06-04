import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useAddCustomerMutation } from "../../redux/api/features/customers/customerApi";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema } from "../../validations/customerSchema";
import InputWithLabel from "../../components/ui/InputWithLabel";

type Inputs = z.infer<typeof customerSchema>;
const AddCustomer = () => {
  const { t } = useTranslation();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [addCustomer, { isLoading }] = useAddCustomerMutation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(customerSchema),
  });

  const photoFile = watch("photo");
  const file = photoFile?.[0];
  if (file && !photoPreview) {
    const imageUrl = URL.createObjectURL(file);
    setPhotoPreview(imageUrl);
  }
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("photo", data.photo[0]);
      formData.append("name", data.name);
      formData.append("mobile", data.mobile);
      formData.append("email", data.email);
      formData.append("balance", String(data.balance));
      formData.append("due", String(data.due));
      formData.append("address", data.address ?? "");
      await addCustomer(formData).unwrap();
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
          <InputWithLabel
            label={t("customer.addCustomer.name")}
            id="name"
            name="name"
            placeholder={t("customer.addCustomer.namePlaceholder")}
            register={register}
            required={false}
            error={errors.name}
            type="text"
          />

          <InputWithLabel
            label={t("customer.addCustomer.mobile")}
            id="mobile"
            name="mobile"
            placeholder={t("customer.addCustomer.mobilePlaceholder")}
            register={register}
            required
            error={errors.mobile}
          />

          <InputWithLabel
            label={t("customer.addCustomer.email")}
            id="email"
            name="email"
            type="email"
            placeholder={t("customer.addCustomer.emailPlaceholder")}
            register={register}
            error={errors.email}
          />

          <InputWithLabel
            label={t("customer.addCustomer.address")}
            id="address"
            name="address"
            placeholder={t("customer.addCustomer.addressPlaceholder")}
            register={register}
            className="col-span-full"
            error={errors.address}
            type="textarea"
          />

          <InputWithLabel
            label={t("customer.addCustomer.balance")}
            id="balance"
            name="balance"
            type="number"
            placeholder={t("customer.addCustomer.balancePlaceholder")}
            register={register}
            error={errors.balance}
          />

          <InputWithLabel
            label={t("customer.addCustomer.due")}
            id="due"
            name="due"
            type="number"
            placeholder={t("customer.addCustomer.duePlaceholder")}
            register={register}
            error={errors.due}
          />

          <div className="col-span-full lg:col-span-1">
            <InputWithLabel
              label={t("customer.addCustomer.photo")}
              id="photo"
              name="photo"
              type="file"
              register={register}
              className="cursor-pointer"
              // error={errors?.photo}
            />
            {photoPreview && (
              <div className="mt-4">
                <img
                  src={photoPreview}
                  alt={t("customer.addCustomer.photoPreviewAlt")}
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}
          </div>

          <div className="col-span-full mt-5">
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-xl font-semibold text-base"
            >
              {isLoading
                ? t("customer.addCustomer.isLoading")
                : t("customer.addCustomer.addCustomer")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;