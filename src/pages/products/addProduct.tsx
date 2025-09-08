import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShoppingCart, Plus, ImageIcon } from "lucide-react";
import { useGetAllCategoryQuery } from "../../redux/api/features/categories/categoriesApi";
import { useGetAllUnitsQuery } from "../../redux/api/features/units/unitApi";
import { useAddProductMutation } from "../../redux/api/features/products/productApi";
import { productSchema } from "../../validations/productSchema";
import SelectWithLabel from "../../components/ui/SelectWithLabel";
import InputWithLabel from "../../components/ui/InputWithLabel";
import PrimaryButton from "../../components/ui/PrimaryButton";

const ProductForm = () => {
  type ProductFormData = z.infer<typeof productSchema>;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
  });

  const { data: category } = useGetAllCategoryQuery("");
  const { data: unit } = useGetAllUnitsQuery("");
  const [addProduct, { isLoading }] = useAddProductMutation();

  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [due, setDue] = useState(0);

  const quantity = watch("quantity") || 0;
  const purchasePrice = watch("purchasePrice") || 0;
  const discount = watch("discount") || 0;
  const cashPayment = watch("cashPayment") || 0;

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
    try {
      await addProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter product details to add it to your inventory.
          </p>
        </div>
      </div>

      <div className="w-full mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Product Form */}
          <div className="bg-white p-6 rounded-xl flex-1">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {/* Product Information */}
              <div className="md:col-span-2 lg:col-span-3">
                <h3 className="text-lg font-medium text-gray-700 mb-3 border-l-4 border-blue-500 pl-2">
                  Product Information
                </h3>
              </div>

              <SelectWithLabel
                label="Product Type"
                id="productType"
                name="productType"
                options={[
                  { value: "Physical Goods", label: "Physical Goods" },
                  { value: "Digital Products", label: "Digital Products" },
                  { value: "Services", label: "Services" },
                  {
                    value: "Experiential Products",
                    label: "Experiential Products",
                  },
                  { value: "Luxury Products", label: "Luxury Products" },
                  { value: "Raw Materials", label: "Raw Materials" },
                ]}
                register={register}
                required
                error={errors.productType}
              />

              <InputWithLabel
                label="Product Name"
                id="name"
                name="name"
                placeholder="Enter product name"
                register={register}
                required
                error={errors.name}
              />

              <InputWithLabel
                label="Brand"
                id="brand"
                name="brand"
                placeholder="Brand name"
                register={register}
                required
                error={errors.brand}
              />

              <SelectWithLabel
                label="Category"
                id="category"
                name="category"
                options={category?.data?.map((c: any) => ({
                  value: c._id,
                  label: c.name,
                }))}
                register={register}
                required
                error={errors.category}
              />

              <SelectWithLabel
                label="Unit"
                id="unit"
                name="unit"
                options={unit?.data?.map((u: any) => ({
                  value: u._id,
                  label: u.name,
                }))}
                register={register}
                required
                error={errors.unit}
              />

              {/* Barcode */}
              <InputWithLabel
                label="Barcode"
                id="barcode"
                name="barcode"
                placeholder="Auto-generated by system"
                disabled
                register={register}
                error={errors.barcode}
              />

              {/* Product Image */}
              <div className="md:col-span-2 lg:col-span-3">
                <h3 className="text-lg font-medium text-gray-700 mb-3 border-l-4 border-blue-500 pl-2">
                  Media
                </h3>
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <InputWithLabel
                  label={
                    <span className="flex items-center">
                      <ImageIcon size={16} className="mr-1" />
                      Product Image
                    </span>
                  }
                  id="photo"
                  name="photo"
                  register={register}
                  error={errors.photo}
                  type="file"
                />
              </div>

              {/* Pricing & Payment */}
              <div className="md:col-span-2 lg:col-span-3">
                <h3 className="text-lg font-medium text-gray-700 mb-3 border-l-4 border-blue-500 pl-2">
                  Pricing & Payment
                </h3>
              </div>

              <InputWithLabel
                label="Quantity"
                id="quantity"
                name="quantity"
                placeholder="0"
                type="number"
                register={register}
                required
                error={errors.quantity}
              />

              <InputWithLabel
                label="Purchase Price (৳)"
                id="purchasePrice"
                name="purchasePrice"
                placeholder="0.00"
                type="number"
                register={register}
                required
                error={errors.purchasePrice}
              />

              <InputWithLabel
                label="Selling Price (৳)"
                id="sellingPrice"
                name="sellingPrice"
                placeholder="0.00"
                type="number"
                register={register}
                required
                error={errors.sellingPrice}
              />

              <InputWithLabel
                label="Dealer/Supplier"
                id="dealer"
                name="dealer"
                placeholder="Dealer Name"
                register={register}
                required
                error={errors.dealer}
              />

              <InputWithLabel
                label="Discount (৳)"
                id="discount"
                name="discount"
                placeholder="0.00"
                type="number"
                register={register}
                error={errors.discount}
              />

              <InputWithLabel
                label="Cash Payment (৳)"
                id="cashPayment"
                name="cashPayment"
                placeholder="0.00"
                type="number"
                register={register}
                error={errors.cashPayment}
              />
            </form>
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-8 rounded-2xl lg:max-w-md w-full shadow-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-800">
              <ShoppingCart className="w-6 h-6 text-blue-500" />
              Purchase Summary
            </h2>

            <div className="space-y-5 mb-8">
              <div className="flex justify-between py-4 bg-gray-50 rounded-xl px-5">
                <span className="text-gray-500 font-medium">Total Price:</span>
                <span className="font-semibold text-gray-800">
                  ৳ {totalPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between py-4 bg-gray-50 rounded-xl px-5">
                <span className="text-gray-500 font-medium">Discount:</span>
                <span className="text-red-500 font-semibold">
                  - ৳ {discount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between py-4 bg-gray-50 rounded-xl px-5">
                <span className="text-gray-500 font-medium">
                  After Discount:
                </span>
                <span className="font-semibold text-gray-800">
                  ৳ {discountedPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between py-4 bg-gray-50 rounded-xl px-5">
                <span className="text-gray-500 font-medium">Cash Payment:</span>
                <span className="text-green-600 font-semibold">
                  - ৳ {cashPayment.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between py-5 bg-teal-50 px-5 rounded-2xl mt-6">
                <span className="font-bold text-gray-700">Due Amount:</span>
                <span
                  className={`font-bold text-lg ${
                    due > 0 ? "text-red-500" : "text-green-600"
                  }`}
                >
                  ৳ {due.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Extra spacing for inputs and select */}
            <div className="space-y-5">
              <InputWithLabel
                label="Additional Costs (৳)"
                id="additionalCosts"
                name="additionalCosts"
                placeholder="0.00"
                type="number"
                register={register}
                error={errors.additionalCosts}
              />

              <SelectWithLabel
                label="Payment Method"
                id="paymentMethod"
                name="paymentMethod"
                options={[
                  { value: "Cash", label: "Cash" },
                  { value: "bKash", label: "bKash" },
                  { value: "Nagad", label: "Nagad" },
                  { value: "Upay", label: "Upay" },
                  { value: "Bank Payment", label: "Bank Payment" },
                ]}
                register={register}
                required
                error={errors.paymentMethod}
              />

              {/* Notes */}
              <div className="space-y-2">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-black"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  {...register("notes")}
                  placeholder="Write any notes about this product..."
                  rows={3}
                  className={`
          py-3 px-4 block w-full rounded-lg sm:text-sm text-gray-800
          bg-gray-50
          outline-none
          focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          disabled:opacity-50 disabled:pointer-events-none
          ${errors.notes ? "focus:ring-red-500 border-red-500" : ""}
        `}
                ></textarea>
                {errors.notes && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.notes.message}
                  </p>
                )}
              </div>
            </div>
            {/* Submit Button */}
            <PrimaryButton
              type="submit"
              onClick={handleSubmit(onSubmit)}
              isLoading={isLoading}
              icon={<Plus className="w-5 h-5 mr-2" />}
            >
              Add Product
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
