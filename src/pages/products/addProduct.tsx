import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { 
  ShoppingCart, 
  Package, 
  DollarSign, 
  Calculator, 
  CheckCircle, 
  Loader, 
  Upload,
  TrendingUp,
  Star,
  Award,
  Sparkles,
  Zap,
  Target,
  Gift
} from 'lucide-react';
import { useTranslation } from "react-i18next";
import { useGetAllCategoryQuery } from "../../redux/api/features/categories/categoriesApi";
import { useGetAllUnitsQuery } from "../../redux/api/features/units/unitApi";
import { useAddProductMutation } from "../../redux/api/features/products/productApi";
import { productSchema } from "../../validations/productSchema";
import SelectWithLabel from "../../components/ui/SelectWithLabel";
import InputWithLabel from "../../components/ui/InputWithLabel";

const ProductForm = () => {
  type ProductFormData = z.infer<typeof productSchema>;
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: 'onChange'
  });
  
  const { data: category } = useGetAllCategoryQuery("");
  const { data: unit } = useGetAllUnitsQuery("");
  const [addProduct, { isLoading }] = useAddProductMutation();

  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [due, setDue] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Watch values for auto-calculation
  const quantity = watch("quantity") || 0;
  const purchasePrice = watch("purchasePrice") || 0;
  const discount = watch("discount") || 0;
  const cashPayment = watch("cashPayment") || 0;

  // Auto calculation with animation trigger
  useEffect(() => {
    const tPrice = quantity * purchasePrice;
    const dPrice = tPrice - discount;
    const dueAmount = dPrice - cashPayment;
    
    if (tPrice !== totalPrice || dPrice !== discountedPrice || dueAmount !== due) {
      setAnimateCart(true);
      setTimeout(() => setAnimateCart(false), 600);
    }
    
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
      setIsSubmitted(true);
      setShowSuccess(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setShowSuccess(false);
      }, 4000);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Calculate form completion percentage
  const watchedFields = watch();
  const completedFields = Object.values(watchedFields).filter(value => value && value !== '').length;
  const totalFields = Object.keys(productSchema.shape).length;
  const completionPercentage = Math.round((completedFields / totalFields) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl mb-8 shadow-2xl transform hover:scale-110 transition-all duration-300">
              <Package className="w-10 h-10 text-white animate-bounce" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
              Add New Product
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Create a comprehensive product profile with automatic calculations and real-time validation
            </p>
            
            {/* Enhanced Progress Bar */}
            <div className="max-w-lg mx-auto">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm font-semibold text-gray-700">Form Completion</span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-blue-600">{completionPercentage}%</span>
                  {completionPercentage === 100 && <CheckCircle className="w-5 h-5 text-green-500 ml-2 animate-bounce" />}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{ width: `${completionPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-8">
            {/* LEFT FORM */}
            <div className="flex-1 bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/30 animate-slide-in-left hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center mb-10">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-5 shadow-lg transform hover:rotate-12 transition-all duration-300">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">Product Information</h2>
                  <p className="text-gray-600 text-lg">Fill in the details below to create your product</p>
                </div>
              </div>
              
              <form className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <div className="col-span-full md:col-span-1 transform hover:scale-105 transition-all duration-300">
                  <SelectWithLabel
                    label={t("products.productType.label")}
                    id="productType"
                    name="productType"
                    options={[
                      { value: "Physical Goods", label: t("products.productType.physical") },
                      { value: "Digital Products", label: t("products.productType.digital") },
                      { value: "Services", label: t("products.productType.services") },
                      { value: "Experiential Products", label: t("products.productType.experiential") },
                      { value: "Luxury Products", label: t("products.productType.luxury") },
                      { value: "Raw Materials", label: t("products.productType.raw") },
                    ]}
                    defaultOption={t("products.productType.option")}
                    register={register}
                    required
                    error={errors?.productType}
                  />
                </div>
                
                <div className="transform hover:scale-105 transition-all duration-300">
                  <InputWithLabel
                    label="Product Name"
                    id="name"
                    name="name"
                    placeholder="Enter product name"
                    register={register}
                    required={true}
                    error={errors.name}
                    type="text"
                  />
                </div>
                
                <div className="transform hover:scale-105 transition-all duration-300">
                  <InputWithLabel
                    label="Brand"
                    id="brand"
                    name="brand"
                    placeholder="Enter brand name"
                    register={register}
                    required={true}
                    error={errors.brand}
                    type="text"
                  />
                </div>
                
                <div className="transform hover:scale-105 transition-all duration-300">
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
                </div>
                
                <div className="transform hover:scale-105 transition-all duration-300">
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
                </div>
                
                <div className="relative group transform hover:scale-105 transition-all duration-300">
                  <InputWithLabel
                    label="Product Image"
                    id="photo"
                    name="photo"
                    placeholder="Enter image URL"
                    register={register}
                    required={false}
                    error={errors.photo}
                    type="text"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Upload className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300" />
                  </div>
                </div>
                
                <div className="transform hover:scale-105 transition-all duration-300">
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
                </div>
                
                <div className="transform hover:scale-105 transition-all duration-300">
                  <InputWithLabel
                    label="Purchase Price (৳)"
                    id="purchasePrice"
                    name="purchasePrice"
                    placeholder="0.00"
                    register={register}
                    required={true}
                    error={errors.purchasePrice}
                    type="number"
                  />
                </div>
                
                <div className="transform hover:scale-105 transition-all duration-300">
                  <InputWithLabel
                    label="Selling Price (৳)"
                    id="sellingPrice"
                    name="sellingPrice"
                    placeholder="0.00"
                    register={register}
                    required={true}
                    error={errors.sellingPrice}
                    type="number"
                  />
                </div>
                
                <div className="col-span-full md:col-span-2 xl:col-span-1 transform hover:scale-105 transition-all duration-300">
                  <InputWithLabel
                    label="Dealer/Supplier"
                    id="dealer"
                    name="dealer"
                    placeholder="Enter dealer name"
                    register={register}
                    required={true}
                    error={errors.dealer}
                    type="text"
                  />
                </div>
              </form>
            </div>

            {/* RIGHT CART */}
            <div className="w-full xl:w-96 animate-slide-in-right">
              <div className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 space-y-8 sticky top-8 transition-all duration-700 hover:shadow-3xl ${animateCart ? 'scale-105 shadow-4xl ring-4 ring-blue-200' : ''}`}>
                {/* Header */}
                <div className="text-center pb-8 border-b border-gray-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-3xl mb-6 shadow-xl transform hover:rotate-12 transition-all duration-300">
                    <ShoppingCart className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Purchase Summary</h2>
                  <p className="text-gray-600 text-lg">
                    Review and finalize the transaction
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="transform hover:scale-105 transition-all duration-300">
                    <InputWithLabel
                      label="Discount Amount (৳)"
                      id="discount"
                      name="discount"
                      placeholder="0.00"
                      register={register}
                      required={false}
                      error={errors.discount}
                      type="number"
                    />
                  </div>
                  
                  <div className="transform hover:scale-105 transition-all duration-300">
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
                        { value: "Bank Payment", label: t("products.paymentMethod.bankPayment") },
                      ]}
                      register={register}
                      required
                      error={errors?.paymentMethod}
                    />
                  </div>

                  <div className="transform hover:scale-105 transition-all duration-300">
                    <InputWithLabel
                      label="Cash Payment (৳)"
                      id="cashPayment"
                      name="cashPayment"
                      placeholder="0.00"
                      register={register}
                      required={true}
                      error={errors.cashPayment}
                      type="number"
                    />
                  </div>

                  <div className="transform hover:scale-105 transition-all duration-300">
                    <InputWithLabel
                      label="Additional Costs (৳)"
                      id="additionalCosts"
                      name="additionalCosts"
                      placeholder="0.00"
                      register={register}
                      required={false}
                      error={errors.additionalCosts}
                      type="number"
                    />
                  </div>

                  <div className="transform hover:scale-105 transition-all duration-300">
                    <InputWithLabel
                      label="Transaction Notes"
                      id="notes"
                      name="notes"
                      placeholder="Add any additional notes..."
                      register={register}
                      required={true}
                      error={errors.notes}
                      type="text"
                    />
                  </div>
                </div>

                {/* Enhanced Summary Display */}
                <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-8 rounded-3xl border border-gray-100 space-y-6 shadow-inner">
                  <div className="flex items-center justify-between text-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                        <Calculator className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">Total Price:</span>
                    </div>
                    <span className="font-bold text-2xl text-gray-900 animate-pulse">
                      {totalPrice.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-3">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">After Discount:</span>
                    </div>
                    <span className="font-bold text-2xl text-emerald-600 animate-pulse">
                      {discountedPrice.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-lg pt-4 border-t-2 border-gray-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center mr-3">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-700 font-semibold">Due Amount:</span>
                    </div>
                    <span className="font-bold text-3xl text-red-500 animate-bounce">
                      {due.toLocaleString('en-BD', { style: 'currency', currency: 'BDT' })}
                    </span>
                  </div>
                </div>

                {/* Enhanced Submit Button */}
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  disabled={!isValid || isLoading}
                  className={`
                    w-full py-5 rounded-3xl font-bold text-white text-xl relative overflow-hidden
                    transition-all duration-500 transform shadow-2xl
                    ${isSubmitted 
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 scale-105 animate-pulse' 
                      : isValid 
                        ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 hover:scale-105 hover:shadow-3xl active:scale-95' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }
                    ${isLoading ? 'cursor-wait animate-pulse' : ''}
                  `}
                >
                  <div className="flex items-center justify-center relative z-10">
                    {isLoading ? (
                      <>
                        <Loader className="w-6 h-6 mr-3 animate-spin" />
                        Processing Transaction...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="w-6 h-6 mr-3 animate-bounce" />
                        Product Added Successfully!
                      </>
                    ) : (
                      <>
                        <div className="flex items-center">
                          <Zap className="w-6 h-6 mr-3 animate-pulse" />
                          Add Product to Inventory
                          <Target className="w-5 h-5 ml-3 animate-spin" />
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Button ripple effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Enhanced Success Message */}
                {showSuccess && (
                  <div className="text-center p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-200 rounded-3xl animate-bounce shadow-xl">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center animate-spin">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-800 mb-2">Success!</h3>
                    <p className="text-emerald-700 font-medium text-lg">Product successfully added to inventory!</p>
                    <div className="flex items-center justify-center mt-4">
                      <Gift className="w-6 h-6 text-emerald-600 mr-2 animate-bounce" />
                      <span className="text-emerald-600 font-semibold">Ready for sale!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;