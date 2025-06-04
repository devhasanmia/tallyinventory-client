import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../validations/productSchema";
import { z } from "zod";

const ProductForm = () => {

type ProductFormData = z.infer<typeof productSchema>;

const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
} = useForm<ProductFormData>({
  resolver: zodResolver(productSchema),
});

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
          <InputWithLabel label="Name" id="name" name="name" placeholder="Product name" register={register} required={true} error={errors.name} type="text" />
          <InputWithLabel label="Brand" id="brand" name="brand" placeholder="Brand" register={register} required={true} error={errors.brand} type="text" />
          <InputWithLabel label="Category" id="category" name="category" placeholder="Category ID" register={register} required={true} error={errors.category} type="text" />
          <InputWithLabel label="Unit" id="unit" name="unit" placeholder="Unit ID" register={register} required={true} error={errors.unit} type="text" />
          <InputWithLabel label="Barcode" id="barcode" name="barcode" placeholder="Barcode" register={register} required={false} error={errors.barcode} type="text" />
          <InputWithLabel label="Photo" id="photo" name="photo" placeholder="Image URL" register={register} required={false} error={errors.photo} type="text" />
          <InputWithLabel label="Quantity" id="quantity" name="quantity" placeholder="0" register={register} required={true} error={errors.quantity} type="number" />
          <InputWithLabel label="Purchase Price" id="purchasePrice" name="purchasePrice" placeholder="0" register={register} required={true} error={errors.purchasePrice} type="number" />
          <InputWithLabel label="Selling Price" id="sellingPrice" name="sellingPrice" placeholder="0" register={register} required={true} error={errors.sellingPrice} type="number" />
          <InputWithLabel label="Dealer" id="dealer" name="dealer" placeholder="Dealer name" register={register} required={true} error={errors.dealer} type="text" />
          
          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
            <select {...register("productType")} className="w-full border border-gray-300 rounded-md p-2">
              <option value="">Select Product Type</option>
              <option value="Physical Goods">Physical Goods</option>
              <option value="Digital Products">Digital Products</option>
              <option value="Services">Services</option>
              <option value="Experiential Products">Experiential Products</option>
              <option value="Luxury Products">Luxury Products</option>
              <option value="Raw Materials">Raw Materials</option>
            </select>
            {/* {errors.productType && <p className="text-red-500 text-sm">{errors.productType.message}</p>} */}
          </div>
        </form>
      </div>

      {/* RIGHT CART */}
      <div className="w-full lg:w-1/4 bg-white p-4 rounded-lg shadow-lg space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Cart Summary</h2>

        <InputWithLabel label="Discount" id="discount" name="discount" placeholder="0" register={register} required={false} error={errors.discount} type="number" />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
          <select {...register("paymentMethod")} className="w-full border border-gray-300 rounded-md p-2">
            <option value="">Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="bKash">bKash</option>
            <option value="Nagad">Nagad</option>
            <option value="Upay">Upay</option>
            <option value="Bank Payment">Bank Payment</option>
          </select>
          {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>}
        </div>

        <InputWithLabel label="Cash Payment" id="cashPayment" name="cashPayment" placeholder="0" register={register} required={true} error={errors.cashPayment} type="number" />
        <InputWithLabel label="Additional Costs" id="additionalCosts" name="additionalCosts" placeholder="0" register={register} required={false} error={errors.additionalCosts} type="number" />
        <InputWithLabel label="Notes" id="notes" name="notes" placeholder="Notes" register={register} required={true} error={errors.notes} type="text" />

        {/* Display auto-calculated values */}
        <div className="text-sm text-gray-700 space-y-1 border-t pt-4 mt-4">
          <p><strong>Total Price:</strong> {totalPrice.toFixed(2)}</p>
          <p><strong>Discounted Price:</strong> {discountedPrice.toFixed(2)}</p>
          <p><strong>Due:</strong> {due.toFixed(2)}</p>
        </div>

        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit Product
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
