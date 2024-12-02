import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
  en: {
    translation: {
      title: "Sa3a 5omasy",
      signIn: "Sign In",
      register: "Register",
      heroBody:
        "Whether you're looking for nearby fields, exclusive deals, or a way to rate and follow your favorites, Sa’a Khomasy is your all-in-one solution for a better football experience.",
      heroTitle: "Your Gateway to the Best Football Fields",
      function1Title: "Search Nearby Fields",
      function1Description:
        "Find football fields near your location with advanced search filters.",
      function2Title: "Rate Football Fields",
      function2Description:
        "Share your experience and help others choose the best fields.",
      function3Title: "Follow Favorites",
      function3Description:
        "Stay updated with schedules and events of your favorite fields.",
      function4Title: "Score Big with Exclusive Offers!",
      function4Description:
        "Enjoy your football experience while saving money with exclusive field discounts!",
      loginTitle: "Sign in to your account",
      forgotPassword: "Forgot Password?",
      createNewAccount: "Create new Account",
      phoneNumber: "Phone Number",
      countryCode: "Country Code",
      password: "Password",
      enterPassword: "Enter Password",
      notMember: "Not a member?",
      signIn: "Sign In",
      createAccount: "Create new Account",
      enterPhoneNumber: "Enter your phone number",
      registerTitle: "Register New User",
      fullName: "Full Name",
      enterFullName: "Enter your Full Name",
      verificationTitle: "User Verification",
      weSentCode: "We have Sent code to ",
      verifyAccount: "Verify",
      resendCode: "Resend",
      didntGetCode: "Didn't receive Code?",
      enterCode: "Enter Code",
      userVirefied: "User Verified Successfuly",
      forgotPasswordTitle: "Forgot Password?",
      submit: "Submit",
      resetPassword: "Reset your Password",
      newPassword: "New Password",
      confirmNewPassword: "Confirm New Password",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email address",
      passwordRequired: "Password is required",
      passwordLength: "Password must be at least 8 characters long",
      passwordComplexity: "Password must include letters and numbers",
      phoneNumberRequired: "Phone number is required",
      phoneNumberInvalid:
        "Phone number must be 10 or 11 digits and starts with 0 or 1",
      fullNameRequired: "Full Name is required",
      passwordRequired: "Password is required",
      confirmPasswordRequired: "Confirmation password is required",
      passwordsDoNotMatch: "Passwords do not match",
      email: "Email",
      enterEmail: "Enter your Email",
      governorate: "Governorate",
      city: "City",
      district: "District",
      selectGovernorate: "Select Governorate",
      selectCity: "Select City",
      selectDistrict: "Select District",
      searchFields: "Search Fields",
      fieldName: "Field Name",
      enterFieldName: "Enter Field Name",
      minPrice: "Min Price",
      maxPrice: "Max Price",
      enterMinPrice: "Enter Min Price",
      enterMaxPrice: "Enter Max Price",
      search: "Search",
      filters: "Filters",
    },
  },
  ar: {
    translation: {
      title: "ساعة خماسى",
      signIn: "تسجيل الدخول",
      register: "مستخدم جديد",
      heroBody:
        "سواء كنت تبحث عن ملاعب قريبة، عروض حصرية، أو طريقة لتقييم ومتابعة المفضلة لديك، ساعة خماسي هي الحل الشامل لتحسين تجربة كرة القدم الخاصة بك.",
      heroTitle: "بوابتك إلى أفضل ملاعب كرة القدم",
      function1Title: "ابحث عن الملاعب القريبة",
      function1Description:
        "ابحث عن ملاعب كرة القدم القريبة منك باستخدام مرشحات بحث متقدمة.",
      function2Title: "قيم ملاعب كرة القدم",
      function2Description: "شارك تجربتك وساعد الآخرين في اختيار أفضل الملاعب.",
      function3Title: "تابع المفضلات",
      function3Description:
        "ابقَ على اطلاع بجدول المواعيد والأحداث لملاعبك المفضلة.",
      function4Title: "وفر المزيد مع العروض الحصرية!",
      function4Description:
        "استمتع بتجربة كرة القدم الخاصة بك مع توفير المال باستخدام خصومات حصرية",
      loginTitle: "تسجيل الدخول إلى حسابك",
      forgotPassword: "هل نسيت كلمة المرور؟",
      createNewAccount: "إنشاء حساب جديد",
      phoneNumber: "رقم الهاتف",
      countryCode: "رمز الدولة",
      password: "كلمة المرور",
      enterPassword: "ادخل كلمة المرور",
      notMember: "لست عضواً؟",
      signIn: "تسجيل الدخول",
      createAccount: "إنشاء حساب جديد",
      enterPhoneNumber: "أدخل رقم هاتفك",
      registerTitle: "تسجيل مستخدم جديد",
      fullName: "الاسم الكامل",
      enterFullName: "ادخل اسمك الكامل",
      verificationTitle: "التحقق من المستخدم",
      weSentCode: "لقد أرسلنا رمزًا إلى ",
      verifyAccount: "تحقق",
      resendCode: "إعادة الإرسال",
      didntGetCode: "لم يصلك الرمز؟",
      enterCode: "أدخل الرمز",
      userVirefied: "تم التحقق بتجاح",
      forgotPasswordTitle: "نسيت كلمة المرور؟",
      submit: "إرسال",
      resetPassword: "إعادة تعيين كلمة المرور الخاصة بك",
      newPassword: "كلمة مرور جديدة",
      confirmNewPassword: "تأكيد كلمة المرور الجديدة",
      emailRequired: "البريد الإلكتروني مطلوب",
      emailInvalid: "يرجى إدخال بريد إلكتروني صالح",
      passwordRequired: "كلمة المرور مطلوبة",
      passwordLength: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
      passwordComplexity: "يجب أن تحتوي كلمة المرور على حروف وأرقام",
      phoneNumberRequired: "رقم الهاتف مطلوب",
      phoneNumberInvalid: "يجب أن يتكون رقم الهاتف من 10 أو 11 رقمًا",
      fullNameRequired: "الاسم الكامل مطلوب",
      passwordRequired: " كلمة المرور مطلوب",
      confirmPasswordRequired: "تأكيد كلمة المرور مطلوب",
      passwordsDoNotMatch: "كلمتا المرور غير متطابقتين",
      email: "البريد الإلكتروني",
      enterEmail: "أدخل بريدك الإلكتروني",
      governorate: "المحافظة",
      city: "المدينة",
      district: "الحي",
      selectGovernorate: "اختر المحافظة",
      selectCity: "اختر المدينة",
      selectDistrict: "اختر الحي",
      searchFields: "بحث عن الملاعب",
      fieldName: "اسم الملعب",
      enterFieldName: "أدخل اسم الملعب",
      minPrice: "أقل سعر",
      maxPrice: "أعلى سعر",
      enterMinPrice: "أدخل أقل سعر",
      enterMaxPrice: "أدخل أعلى سعر",
      search: "بحث",
      filters: "التصفية",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // Default language
    interpolation: {
      escapeValue: false, // React already escapes content
    },
    detection: {
      order: ["localStorage", "navigator"], // Check localStorage first, then browser language
      caches: ["localStorage"], // Persist language in localStorage
    },
  });

export default i18n;
