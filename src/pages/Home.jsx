import React, { useEffect, useState } from "react";
import Card from "../components/Card";

function ConfirmationDialog({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-lg font-semibold">O'chirish tasdiqlash</h2>
        <p className="mt-2">Rostdan ham o'chirmoqchimisiz?</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Ha
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 rounded-md px-4 py-2"
          >
            Yo'q
          </button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products/all`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleDelete(id) {
    setDeleteProductId(id);
    setIsDialogOpen(true);
  }

  function confirmDelete() {
    if (deleteProductId) {
      fetch(`${import.meta.env.VITE_API_URL}/api/products/${deleteProductId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Mahsulot muvaffaqiyatli o'chirildi") {
            let copied = [...products];
            copied = copied.filter((value) => value.id !== deleteProductId);
            setProducts(copied);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsDialogOpen(false);
    setDeleteProductId(null);
  }

  function cancelDelete() {
    setIsDialogOpen(false);
    setDeleteProductId(null);
  }

  function handleClick(event) {
    setLoading(true);
    event.preventDefault();
    setErrorMessage("");

    if (!name || !price || !desc) {
      setErrorMessage("Iltimos, barcha maydonlarni to'ldiring!");
      setLoading(false);
      return;
    }

    let card = {
      name: name,
      price: price,
      description: desc,
      status: "active",
      category_id: "2",
    };

    fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setProducts((prevProducts) => [...prevProducts, data]);
          setName("");
          setPrice("");
          setDesc("");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <div className="container mx-auto p-4">
        <form className="flex w-1/3 mx-auto mt-7 flex-col gap-5">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-md p-3 transition duration-300 ease-in-out"
            type="text"
            placeholder="Enter Name..."
          />
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-md p-3 transition duration-300 ease-in-out"
            type="number"
            placeholder="Enter price..."
          />
          <textarea
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-md p-3 transition duration-300 ease-in-out"
            placeholder="Enter description..."
          ></textarea>

          <button
            disabled={loading}
            onClick={handleClick}
            className={`rounded-md p-3 text-white transition duration-300 ease-in-out 
              ${
                loading
                  ? "bg-gray-400"
                  : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              }`}
          >
            {loading ? "LOADING" : "SAVE"}
          </button>
        </form>

        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}

        <h3 className="text-center mt-5 text-lg font-semibold text-gray-700">
          Mahsulotlar soni: {products.length}
        </h3>

        <div className="cards mt-7 flex flex-wrap gap-5 justify-center">
          {products.length > 0 &&
            products.map((value) => (
              <Card deleteProduct={handleDelete} key={value.id} data={value} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
