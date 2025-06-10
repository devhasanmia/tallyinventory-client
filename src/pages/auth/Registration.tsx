import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

// তোমার User Schema থেকে তৈরি zod স্কিমা (তোমার নিজের মতো করে ঠিক করে নিতে পারো)
const registrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  organizationName: z.string().min(1, "Organization Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  mobile: z.string().min(1, "Mobile is required"),
  photo: z
    .any()
    .refine(
      (files) => files?.length === 1,
      "Photo is required"
    ), // react-hook-form file input validation
  nid: z.string().optional(),
  birthCertificate: z.string().optional(),
  designation: z.enum(["Business Owner", "Sales Executive"]),
  salary: z.number().optional(),
  joiningDate: z.string().min(1, "Joining Date is required"),
  address: z.string().min(1, "Address is required"),
});

type Inputs = z.infer<typeof registrationSchema>;

const Registration = () => {
  const { t } = useTranslation();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(registrationSchema),
  });

  const designation = watch("designation");
  const photoFile = watch("photo");
  const file = photoFile?.[0];

  // Photo preview setup
  useEffect(() => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhotoPreview(imageUrl);

      return () => URL.revokeObjectURL(imageUrl); // cleanup
    } else {
      setPhotoPreview(null);
    }
  }, [file]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("photo", data.photo[0]);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("organizationName", data.organizationName);
      formData.append("password", data.password);
      formData.append("mobile", data.mobile);
      formData.append("nid", data.nid ?? "");
      formData.append("birthCertificate", data.birthCertificate ?? "");
      formData.append("designation", data.designation);
      if (data.designation === "Sales Executive" && data.salary !== undefined) {
        formData.append("salary", data.salary.toString());
      }
      formData.append("joiningDate", data.joiningDate);
      formData.append("address", data.address);

      // এখানে তোমার API কল করো, উদাহরণ:
      // await addUser(formData);

      toast.success("Registration successful!");
      reset();
      setPhotoPreview(null);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">{t("register.title") || "Register"}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">{t("register.name") || "Name"}</label>
            <input
              {...register("name")}
              type="text"
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder={t("register.namePlaceholder") || "Full Name"}
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">{t("register.email") || "Email"}</label>
            <input
              {...register("email")}
              type="email"
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder={t("register.emailPlaceholder") || "Email Address"}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Organization Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">{t("register.organizationName") || "Organization Name"}</label>
            <input
              {...register("organizationName")}
              type="text"
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.organizationName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder={t("register.organizationNamePlaceholder") || "Organization Name"}
            />
            {errors.organizationName && <p className="text-red-600 text-sm mt-1">{errors.organizationName.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">{t("register.password") || "Password"}</label>
            <input
              {...register("password")}
              type="password"
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder={t("register.passwordPlaceholder") || "Password"}
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">{t("register.mobile") || "Mobile"}</label>
            <input
              {...register("mobile")}
              type="tel"
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.mobile ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder={t("register.mobilePlaceholder") || "Mobile Number"}
            />
            {errors.mobile && <p className="text-red-600 text-sm mt-1">{errors.mobile.message}</p>}
          </div>

          {/* Photo */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 cursor-pointer">{t("register.photo") || "Photo"}</label>
            <input
              {...register("photo")}
              type="file"
              accept="image/*"
              className={`w-full cursor-pointer border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.photo ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {/* {errors.photo && <p className="text-red-600 text-sm mt-1">{errors.photo.message}</p>} */}

            {photoPreview && (
              <img
                src={photoPreview}
                alt={t("register.photoPreviewAlt") || "Photo Preview"}
                className="mt-4 w-32 h-32 rounded-lg object-cover border border-gray-300"
              />
            )}
          </div>

          {/* NID */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">{t("register.nid") || "NID"}</label>
            <input
              {...register("nid")}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t("register.nidPlaceholder") || "National ID"}
            />
          </div>

          {/* Birth Certificate */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">{t("register.birthCertificate") || "Birth Certificate"}</label>
            <input
              {...register("birthCertificate")}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t("register.birthCertificatePlaceholder") || "Birth Certificate"}
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">{t("register.designation") || "Designation"}</label>
            <select
              {...register("designation")}
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.designation ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            >
              <option value="">{t("register.selectDesignation") || "Select Designation"}</option>
              <option value="Business Owner">{t("register.businessOwner") || "Business Owner"}</option>
              <option value="Sales Executive">{t("register.salesExecutive") || "Sales Executive"}</option>
            </select>
            {errors.designation && <p className="text-red-600 text-sm mt-1">{errors.designation.message}</p>}
          </div>

          {/* Salary (conditional) */}
          {designation === "Sales Executive" && (
            <div>
              <label className="block mb-1 font-medium text-gray-700">{t("register.salary") || "Salary"}</label>
              <input
                {...register("salary", { valueAsNumber: true })}
                type="number"
                className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                  errors.salary ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder={t("register.salaryPlaceholder") || "Salary"}
              />
              {errors.salary && <p className="text-red-600 text-sm mt-1">{errors.salary.message}</p>}
            </div>
          )}

          {/* Joining Date */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">{t("register.joiningDate") || "Joining Date"}</label>
            <input
              {...register("joiningDate")}
              type="date"
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.joiningDate ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.joiningDate && <p className="text-red-600 text-sm mt-1">{errors.joiningDate.message}</p>}
          </div>

          {/* Address */}
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block mb-1 font-medium text-gray-700">{t("register.address") || "Address"}</label>
            <textarea
              {...register("address")}
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.address ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder={t("register.addressPlaceholder") || "Address"}
              rows={3}
            />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 lg:col-span-3 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl disabled:opacity-50"
            >
              {isSubmitting ? t("register.submitting") || "Submitting..." : t("register.submit") || "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
