import { useEffect, useState } from "react";
import "./App.css";
import * as Database from "./database/RxDatabase";
import BrowseItems from "./components/BrowseItems";
import CreateItem from "./components/CreateItem";
import { nanoid } from "nanoid";

interface Item {
  name: string;
  quantity: number;
  price: number;
}

function App() {
  const [mercadoDb, setMercadoDb] = useState(null);
  const [items, setItems] = useState<Item[]>([]);
  const subs = [];

  useEffect(() => {
    const getDatabase = async () => {
      const mercadoDb = await Database.get();
      setMercadoDb(mercadoDb);

      const sub = mercadoDb.items
        .find({
          selector: {},
          sort: [{ name: "name" }],
        })
        .$.subscribe((items) => {
          if (!items) {
            console.log("found no items-list ");
            return;
          }
          console.log("reload items-list ");
          console.dir(items);
          setItems(items);
        });
      subs.push(sub);
    };
    getDatabase();
  }, []);

  return (
    <div className="main-container">
      <h1>Mercado App</h1>
      <div className="browse-items-container">
        <BrowseItems items={items} />
      </div>
      <CreateItem
        mercadoDb={mercadoDb}
        createItem={async (mercadoDb, item: Item) => {
          const thisMoment = new Date().toISOString()
          const newItem = await mercadoDb.items.insert({
            id: nanoid(16),
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            _deleted: false,
            createdAt: thisMoment,
            updatedAt: thisMoment,
          });
          console.log(`Created a new item! ${JSON.stringify(newItem)}`)
        }}
      />
    </div>
  );
}

export default App;
