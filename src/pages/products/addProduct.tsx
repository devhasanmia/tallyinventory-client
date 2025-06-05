import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../validations/productSchema";
import { z } from "zod";
import { useGetAllCategoriesQuery } from "../../redux/api/features/products/productApi";
import SelectWithLabel from "../../components/ui/SelectWithLabel";
import { useGetAllUnitsQuery } from "../../redux/api/features/units/unitApi";
import { useTranslation } from "react-i18next";
import { AiFillCheckCircle, AiFillCreditCard, AiFillFileText, AiFillPlusCircle, AiFillTag } from "react-icons/ai";
import { TbCarFanAuto } from "react-icons/tb";

const ProductForm = () => {
  type ProductFormData = z.infer<typeof productSchema>;
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });
  const { data: category } = useGetAllCategoriesQuery("");
  const { data: unit } = useGetAllUnitsQuery("");

  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [due, setDue] = useState(0);

  // Watch values for auto-calculation
  const quantity = watch("quantity") || 0;
  const purchasePrice = watch("purchasePrice") || 0;
  const discount = watch("discount") || 0;
  const cashPayment = watch("cashPayment") || 0;

  // Auto calculation
  useEffect(() => {
    const tPrice = quantity * purchasePrice;
    const dPrice = tPrice - discount;
    const dueAmount = dPrice - cashPayment;

    setTotalPrice(tPrice);
    setDiscountedPrice(dPrice);
    setDue(dueAmount);
  }, [quantity, purchasePrice, discount, cashPayment]);

  const onSubmit = (data: any) => {
    data.totalPrice = totalPrice;
    data.discountedPrice = discountedPrice;
    data.due = due;
    console.log("Submitted data:", data);
    // You can send this to backend API
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 py-8">
      {/* LEFT FORM */}
      <div className="w-full lg:w-3/4 bg-white p-4 rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <SelectWithLabel
            label={t("products.productType.label")}
            id="productType"
            name="productType"
            options={[
              { value: "physical", label: t("products.productType.physical") },
              { value: "digital", label: t("products.productType.digital") },
              { value: "services", label: t("products.productType.services") },
              {
                value: "experiential",
                label: t("products.productType.experiential"),
              },
              { value: "luxury", label: t("products.productType.luxury") },
              { value: "raw", label: t("products.productType.raw") },
            ]}
            defaultOption= {t("products.productType.option")}
            register={register}
            required
            error={errors?.productType}
          />

          <InputWithLabel
            label="Name"
            id="name"
            name="name"
            placeholder="Product name"
            register={register}
            required={true}
            error={errors.name}
            type="text"
          />
          <InputWithLabel
            label="Brand"
            id="brand"
            name="brand"
            placeholder="Brand"
            register={register}
            required={true}
            error={errors.brand}
            type="text"
          />

          <SelectWithLabel
            label="Category"
            id="category"
            name="category"
            options={category?.data?.map((item: any) => ({
              value: item?.id,
              label: item?.name,
            }))}
            register={register}
            required
            error={errors?.category}
          />

          <SelectWithLabel
            label="Unit"
            id="unit"
            name="unit"
            options={unit?.data?.map((item: any) => ({
              value: item?.id,
              label: item?.name,
            }))}
            register={register}
            required
            error={errors?.unit}
          />
          <InputWithLabel
            label="Photo"
            id="photo"
            name="photo"
            placeholder="Image URL"
            register={register}
            required={false}
            error={errors.photo}
            type="text"
          />
          <InputWithLabel
            label="Quantity"
            id="quantity"
            name="quantity"
            placeholder="0"
            register={register}
            required={true}
            error={errors.quantity}
            type="number"
          />
          <InputWithLabel
            label="Purchase Price"
            id="purchasePrice"
            name="purchasePrice"
            placeholder="0"
            register={register}
            required={true}
            error={errors.purchasePrice}
            type="number"
          />
          <InputWithLabel
            label="Selling Price"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="0"
            register={register}
            required={true}
            error={errors.sellingPrice}
            type="number"
          />
          <InputWithLabel
            label="Dealer"
            id="dealer"
            name="dealer"
            placeholder="Dealer name"
            register={register}
            required={true}
            error={errors.dealer}
            type="text"
          />

          {/* Product Type */}
        </form>
      </div>
 {/* <div className="flex flex-col lg:flex-row gap-6 px-4 py-8"> */}
      {/* RIGHT CART */}
               <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 space-y-6">
        {/* Header */}
        <div className="border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Cart Summary</h2>
          <p className="text-sm text-gray-500 mt-1">Review and finalize product sale</p>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <InputWithLabel
            label="Discount"
            id="discount"
            name="discount"
            placeholder="e.g. 10"
            register={register}
            required={false}
            error={errors.discount}
            type="number"
          />

          <SelectWithLabel
            label="Product Type"
            id="productType"
            name="productType"
            options={[
              { value: "Bkash", label: "বিকাশ" },
              { value: "digital", label: "ডিজিটাল পণ্য" },
              { value: "services", label: "সেবা" },
              { value: "experiential", label: "অভিজ্ঞতামূলক পণ্য" },
              { value: "luxury", label: "বিলাসবহুল পণ্য" },
              { value: "raw", label: "কাঁচামাল" },
            ]}
            register={register}
            required
            error={errors?.productType}
          />

          <InputWithLabel
            label="Cash Payment"
            id="cashPayment"
            name="cashPayment"
            placeholder="Amount in BDT"
            register={register}
            required={true}
            error={errors.cashPayment}
            type="number"
          />

          <InputWithLabel
            label="Additional Costs"
            id="additionalCosts"
            name="additionalCosts"
            placeholder="e.g. 100"
            register={register}
            required={false}
            error={errors.additionalCosts}
            type="number"
          />

          <InputWithLabel
            label="Notes"
            id="notes"
            name="notes"
            placeholder="Optional notes"
            register={register}
            required={true}
            error={errors.notes}
            type="text"
          />
        </div>

        {/* Summary Display */}
        <div className="bg-gray-50 p-4 rounded-xl mt-4 text-sm text-gray-700 space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>Total Price:</span>
            <span className="font-medium text-gray-800">{totalPrice.toFixed(2)} ৳</span>
          </div>
          <div className="flex justify-between">
            <span>Discounted Price:</span>
            <span className="font-medium text-green-600">{discountedPrice.toFixed(2)} ৳</span>
          </div>
          <div className="flex justify-between">
            <span>Due:</span>
            <span className="font-medium text-red-500">{due.toFixed(2)} ৳</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Product
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
