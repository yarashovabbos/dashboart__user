import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "./Product";

const translations = {
  uz: {
    products: "Mahsulotlar",
    searchPlaceholder: "Mahsulotlarni qidirish...",
    addProduct: "Mahsulot qo'shish",
    title: "Sarlavha",
    price: "Narx",
    actions: "Amallar",
    edit: "Tahrirlash",
    delete: "O'chirish",
    editProduct: "Mahsulotni tahrirlash",
    addProductTitle: "Mahsulot qo'shish",
    cancel: "Bekor qilish",
    saveChanges: "O'zgartirishlarni saqlash",
    confirmDelete: "Siz haqiqatan ham bu mahsulotni o'chirmoqchimisiz?"
  },
  ru: {
    products: "Товары",
    searchPlaceholder: "Поиск товаров...",
    addProduct: "Добавить товар",
    title: "Название",
    price: "Цена",
    actions: "Действия",
    edit: "Редактировать",
    delete: "Удалить",
    editProduct: "Редактировать товар",
    addProductTitle: "Добавить товар",
    cancel: "Отмена",
    saveChanges: "Сохранить изменения",
    confirmDelete: "Вы действительно хотите удалить этот товар?"
  },
  en: {
    products: "Products",
    searchPlaceholder: "Search products...",
    addProduct: "Add Product",
    title: "Title",
    price: "Price",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    editProduct: "Edit Product",
    addProductTitle: "Add Product",
    cancel: "Cancel",
    saveChanges: "Save Changes",
    confirmDelete: "Are you sure you want to delete this product?"
  },
};

const ProductsTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Product>({ id: "", title: "", price: 0 });
  const [language, setLanguage] = useState<"uz" | "ru" | "en">("en");

  const t = translations[language];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, products]);

  const fetchProducts = () => {
    axios.get("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const filterProducts = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleEditClick = (product: Product) => {
    setCurrentProduct(product);
    setShowEditModal(true);
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm(t.confirmDelete)) {
      axios.delete(`http://localhost:3000/products/${id}`)
        .then(() => {
          fetchProducts();
        })
        .catch(error => console.error('Error deleting product:', error));
    }
  };

  const handleEditSave = () => {
    if (currentProduct) {
      axios.put(`http://localhost:3000/products/${currentProduct.id}`, currentProduct)
        .then(() => {
          fetchProducts();
          setShowEditModal(false);
        })
        .catch(error => console.error('Error updating product:', error));
    }
  };

  const handleAddClick = () => {
    setNewProduct({ id: "", title: "", price: 0 }); // Reset newProduct state
    setShowAddModal(true);
  };

  const handleAddSave = () => {
    axios.post("http://localhost:3000/products", newProduct)
      .then(() => {
        fetchProducts();
        setShowAddModal(false);
      })
      .catch(error => console.error('Error adding product:', error));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">{t.products}</h2>
        <div>
          <button onClick={() => setLanguage("uz")} className="mr-2">Uz</button>
          <button onClick={() => setLanguage("ru")} className="mr-2">Ru</button>
          <button onClick={() => setLanguage("en")}>En</button>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Add Product Button */}
      <button
        onClick={handleAddClick}
        className="mb-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        {t.addProduct}
      </button>

      {/* Products Table */}
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border border-gray-300">{t.title}</th>
            <th className="px-4 py-2 border border-gray-300">{t.price}</th>
            <th className="px-4 py-2 border border-gray-300">{t.actions}</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id} className="bg-white hover:bg-gray-100">
              <td className="px-4 py-2 border border-gray-300">{product.title}</td>
              <td className="px-4 py-2 border border-gray-300">${product.price.toFixed(2)}</td>
              <td className="px-4 py-2 border border-gray-300">
                <button
                  onClick={() => handleEditClick(product)}
                  className="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  {t.edit}
                </button>
                <button
                  onClick={() => handleDeleteClick(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  {t.delete}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showEditModal && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">{t.editProduct}</h3>
            <div>
              <label className="block text-sm font-medium mb-2">{t.title}</label>
              <input
                type="text"
                value={currentProduct.title}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <label className="block text-sm font-medium mt-4 mb-2">{t.price}</label>
              <input
                type="number"
                value={currentProduct.price}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowEditModal(false)}
                className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleEditSave}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                {t.saveChanges}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">{t.addProductTitle}</h3>
            <div>
              <label className="block text-sm font-medium mb-2">{t.title}</label>
              <input
                type="text"
                value={newProduct.title}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <label className="block text-sm font-medium mt-4 mb-2">{t.price}</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleAddSave}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                {t.saveChanges}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
