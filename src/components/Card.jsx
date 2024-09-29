import React from "react";
import { TiDelete } from "react-icons/ti";

function Card(props) {
  const { name, price, description, id } = props.data;
  const { deleteProduct, loading } = props;

  function handleDel(event) {
    event.preventDefault();
    deleteProduct(id);
  }

  return (
    <div className="border shadow-lg p-6 rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white hover:shadow-xl transition-shadow duration-300 relative">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
      <h3 className="text-lg font-semibold text-green-500 mb-4">{price}$</h3>
      <p className="text-gray-600">{description}</p>

      <button
        onClick={handleDel}
        className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 rounded-full bg-gray-100 hover:bg-red-100 transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-12"
        aria-label="Delete"
      >
        <TiDelete size={24} />
      </button>
    </div>
  );
}

export default Card;
