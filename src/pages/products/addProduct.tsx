import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../validations/productSchema";
import { z } from "zod";
import SelectWithLabel from "../../components/ui/SelectWithLabel";
import { useGetAllUnitsQuery } from "../../redux/api/features/units/unitApi";
import { useTranslation } from "react-i18next";
import { useGetAllCategoryQuery } from "../../redux/api/features/categories/categoriesApi";
import { useAddProductMutation } from "../../redux/api/features/products/productApi";

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
  const { data: category } = useGetAllCategoryQuery("");
  const { data: unit } = useGetAllUnitsQuery("");
  const [addProduct] = useAddProductMutation();

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

  const onSubmit = async (data: any) => {
    data.totalPrice = totalPrice;
    data.discountedPrice = discountedPrice;
    data.due = due;
    // console.log("Submitted data:", data);
   await addProduct(data)
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
              { value: "Physical Goods", label: t("products.productType.physical") },
              { value: "Digital Products", label: t("products.productType.digital") },
              { value: "Services", label: t("products.productType.services") },
              {
                value: "Experiential Products",
                label: t("products.productType.experiential"),
              },
              { value: "Luxury Products", label: t("products.productType.luxury") },
              { value: "Raw Materials", label: t("products.productType.raw") },
            ]}
            defaultOption={t("products.productType.option")}
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
            label={t("products.category.label")}
            id="category"
            name="category"
            options={category?.data?.map((item: any) => ({
              value: item?._id,
              label: item?.name,
            }))}
            register={register}
            required
            defaultOption={t("products.category.option")}
            error={errors?.category}
          />
          <SelectWithLabel
            label={t("products.units.label")}
            id="unit"
            name="unit"
            options={unit?.data?.map((item: any) => ({
              value: item?._id,
              label: item?.name,
            }))}
            register={register}
            required
            defaultOption={t("products.units.option")}
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
        </form>
      </div>
      {/* RIGHT CART */}
      <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 space-y-6">
        {/* Header */}
        <div className="border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Cart Summary</h2>
          <p className="text-sm text-gray-500 mt-1">
            Review and finalize product sale
          </p>
        </div>
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
            label={t("products.paymentMethod.label")}
            id="paymentMethod"
            name="paymentMethod"
            defaultOption={t("products.paymentMethod.option")}
            options={[
              { value: "Cash", label: t("products.paymentMethod.cash") },
              { value: "bKash", label: t("products.paymentMethod.bkash") },
              { value: "Nagad", label: t("products.paymentMethod.nagad") },
              { value: "Upay", label: t("products.paymentMethod.upay") },
              {
                value: "Bank Payment",
                label: t("products.paymentMethod.bankPayment"),
              },
            ]}
            register={register}
            required
            error={errors?.paymentMethod}
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
            <span className="font-medium text-gray-800">
              {totalPrice.toFixed(2)} ৳
            </span>
          </div>
          <div className="flex justify-between">
            <span>Discounted Price:</span>
            <span className="font-medium text-green-600">
              {discountedPrice.toFixed(2)} ৳
            </span>
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
