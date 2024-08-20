import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Users": "Users",
      "Add User": "Add User",
      "Edit User": "Edit User",
      "ID": "ID",
      "First Name": "First Name",
      "Last Name": "Last Name",
      "Email": "Email",
      "Username": "Username",
      "Phone": "Phone",
      "Profile Picture": "Profile Picture",
      "Actions": "Actions",
      "Search users": "Search users",
      "Please input the first name!": "Please input the first name!",
      "Please input the last name!": "Please input the last name!",
      "Please input the email!": "Please input the email!",
      "Please input the username!": "Please input the username!",
      "Please input the phone number!": "Please input the phone number!",
      "Click to Upload": "Click to Upload",
      "Update": "Update",
      "No Image": "No Image",
    }
  },
  ru: {
    translation: {
      "Users": "Пользователи",
      "Add User": "Добавить пользователя",
      "Edit User": "Редактировать пользователя",
      "ID": "ID",
      "First Name": "Имя",
      "Last Name": "Фамилия",
      "Email": "Электронная почта",
      "Username": "Имя пользователя",
      "Phone": "Телефон",
      "Profile Picture": "Фото профиля",
      "Actions": "Действия",
      "Search users": "Поиск пользователей",
      "Please input the first name!": "Пожалуйста, введите имя!",
      "Please input the last name!": "Пожалуйста, введите фамилию!",
      "Please input the email!": "Пожалуйста, введите электронную почту!",
      "Please input the username!": "Пожалуйста, введите имя пользователя!",
      "Please input the phone number!": "Пожалуйста, введите номер телефона!",
      "Click to Upload": "Нажмите, чтобы загрузить",
      "Update": "Обновить",
      "No Image": "Нет изображения",
    }
  },
  uz: {
    translation: {
      "Users": "Foydalanuvchilar",
      "Add User": "Foydalanuvchini qo'shish",
      "Edit User": "Foydalanuvchini tahrirlash",
      "ID": "ID",
      "First Name": "Ism",
      "Last Name": "Familiya",
      "Email": "Elektron pochta",
      "Username": "Foydalanuvchi nomi",
      "Phone": "Telefon",
      "Profile Picture": "Profil rasmi",
      "Actions": "Amallar",
      "Search users": "Foydalanuvchilarni qidirish",
      "Please input the first name!": "Iltimos, ismni kiriting!",
      "Please input the last name!": "Iltimos, familiyani kiriting!",
      "Please input the email!": "Iltimos, elektron pochtani kiriting!",
      "Please input the username!": "Iltimos, foydalanuvchi nomini kiriting!",
      "Please input the phone number!": "Iltimos, telefon raqamini kiriting!",
      "Click to Upload": "Yuklash uchun bosing",
      "Update": "Yangilash",
      "No Image": "Rasm yo'q",
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
