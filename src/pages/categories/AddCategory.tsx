import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { useAddCategoryMutation } from "../../redux/api/features/categories/categoriesApi";


const AddCategory = () => {
    const { t } = useTranslation();
    const [addCategory, { isLoading }] = useAddCategoryMutation();
    
    const categorySchema = z.object({
        name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    });
    type Inputs = z.infer<typeof categorySchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(categorySchema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await addCategory(data).unwrap();
      toast.success(res?.data?.message);
      reset();
    } catch (error: any) {
        
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

export default AddCategory;
