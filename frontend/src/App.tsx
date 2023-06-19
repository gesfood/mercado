import { useEffect, useState } from "react";
import "./App.css";
import * as Database from "./database/RxDatabase";
import BrowseItems from "./components/BrowseItems";
import CreateItem from "./components/CreateItem";
import { nanoid } from "nanoid";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConsultaItens } from "./components/ConsultaItens";
import { Home } from "./components/Home";
import { Teste } from "./components/Teste";

export interface Item {
  codigo: string;
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
    <RouterProvider
      router={
        createBrowserRouter([
        {
          path: "/",
          element: <Home mercadoDb={mercadoDb} hello={'World'} />
        },
        {
          path: "/consulta",
          element: <ConsultaItens mercadoDb={mercadoDb} items={items} />
        },
        {
          path: "/teste-api",
          element: <Teste />
        },
      ])}
    />
  );
}

export default App;
