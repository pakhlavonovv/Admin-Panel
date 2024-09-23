import * as Yup from "yup";

// ========= Sign In =========
const signInValidationSchema = Yup.object().shape({
   phone_number: Yup.string().required("Phone number is required"),
   password: Yup.string()
      .matches(
         /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
         "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter"
      )
      .required("Password is required"),
});
// ========= Sign Up =========
const signUpValidationSchema = Yup.object().shape({
   first_name: Yup.string().required("First Name is required"),
   last_name: Yup.string().required("Last Name is required"),
   phone_number: Yup.string().required("Phone number is required"),
   email: Yup.string().email("Email is required").required("Email is required"),
   password: Yup.string().required("Password is required"),
});
// ========= Teacher Modal =========
const teacherValidationSchema = Yup.object().shape({
   course: Yup.string().required("Course is required"),
   teacher: Yup.string().required("Teacher Name is required"),
});
// ========= Student Modal =========
const studentValidationSchema = Yup.object().shape({
   group: Yup.string().required("Group is required"),
   name: Yup.string().required("Name is required"),
   age: Yup.string().required("Age is required"),
   phone: Yup.string().required("Phone is required"),
   address: Yup.string().required("Address is required"),
   teacher: Yup.string().required("Teacher is required"),
});
// ========= Group Modal =========
const groupValidationSchema = Yup.object().shape({
   course: Yup.string().required("Course is required"),
   name: Yup.string().required("Name is required"),
});
// ========= Course Modal =========
const courseValidationSchema = Yup.object().shape({
   name: Yup.string().required("Name is required"),
   duration: Yup.string().required("Duration is required"),
   price: Yup.string().required("Price is required"),
});

// ========= Category Modal =========
const categoryValidationSchema = Yup.object().shape({
   name: Yup.string().required("Category is required"),
});

export {
   signInValidationSchema,
   teacherValidationSchema,
   signUpValidationSchema,
   studentValidationSchema,
   groupValidationSchema,
   courseValidationSchema,
   categoryValidationSchema,
};
