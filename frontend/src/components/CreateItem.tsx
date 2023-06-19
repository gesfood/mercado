import React, { useState } from "react";

interface Item {
  codigo: string;
  name: string;
  quantity: number;
  price: number;
}

interface CreateItemProps {
  mercadoDb: any;
  createItem: (item: Item) => void;
}

const CreateItem: React.FC<CreateItemProps> = ({ createItem, mercadoDb }) => {
  const [item, setItem] = useState<Item>({
    codigo: "",
    name: "",
    quantity: 0,
    price: 0,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createItem(mercadoDb, item);
    setItem({ codigo: "", name: "", quantity: 0, price: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <b>
        <label>Create a new Item</label>
      </b>
      <input
        type="text"
        name="codigo"
        value={item.codigo}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = event.target;
          setItem({
            ...item,
            codigo: value
          });
        }}
        placeholder="Codigo"
      />
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = event.target;
          setItem({
            ...item,
            name: value
          });
        }}
        placeholder="Item name"
      />
      <input
        type="number"
        name="quantity"
        value={item.quantity}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = event.target;
          setItem({
            ...item,
            quantity: parseFloat(value)
          });
        }}
        placeholder="Quantity"
      />
      <input
        type="number"
        name="price"
        value={item.price}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = event.target;
          setItem({
            ...item,
            price: parseFloat(value)
          });
        }}
        placeholder="Price"
      />
      <button type="submit">Create Item</button>
    </form>
  );
};

export default CreateItem;
