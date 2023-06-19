import { nanoid } from "nanoid";
import { Item } from "../App";
import BrowseItems from "./BrowseItems";
import CreateItem from "./CreateItem";

export const ConsultaItens = (props) => {
  const { mercadoDb, items } = props;
  return (
    <div className="main-container">
      <h1>Mercado App</h1>
      <div className="browse-items-container">
        <BrowseItems items={items} />
      </div>
      <CreateItem
        mercadoDb={mercadoDb}
        createItem={async (mercadoDb, item: Item) => {
          const thisMoment = new Date().toISOString();
          const newItem = await mercadoDb.items.insert({
            id: nanoid(16),
            codigo: item.codigo,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            _deleted: false,
            createdAt: thisMoment,
            updatedAt: thisMoment,
          });
          console.log(`Created a new item! ${JSON.stringify(newItem)}`);
        }}
      />
    </div>
  );
};
