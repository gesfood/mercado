import { addRxPlugin } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { mercadoSchema } from "./Schema";
addRxPlugin(RxDBDevModePlugin);

let mercadoDbPromise = null;

const _create = async () => {
  console.log("DatabaseService: creating database...");
  const mercadoDb = await createRxDatabase({
    name: "mercado-db",
    storage: getRxStorageDexie(),
  });
  console.log("DatabaseService: created database");
  window["mercadoDb"] = mercadoDb; // write to window for debugging

  // create collections
  console.log("DatabaseService: create collections");
  await mercadoDb.addCollections({
    items: {
      schema: mercadoSchema,
    },
  });

  // hooks
  console.log("DatabaseService: add hooks");
  mercadoDb.collections.items.preInsert((docObj) => {
    const { name } = docObj;
    return mercadoDb.collections.items
      .findOne({
        selector: { name },
      })
      .exec()
      .then((has) => {
        if (has !== null) {
          console.error("Another item  already has the name " + name);
          throw new Error("name already there");
        } else {
          console.info("All good for inserting: " + name);
        }
        return mercadoDb;
      });
  }, false);

  return mercadoDb;
};

export const get = () => {
  if (!mercadoDbPromise) mercadoDbPromise = _create();
  return mercadoDbPromise;
};
