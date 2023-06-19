import { useEffect, useState } from "react";

export const Teste = () => {
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    const callGesfoodAPI = async () => {
      const response = await fetch(
        "http://danielsanitabuna.gesfood.com.br/api/categorias"
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setCategorias(jsonData.data);
    };
    callGesfoodAPI();
  }, []);
  return (
    <div>
      Testando API
      <div>
        {categorias.map((it) => {
          return (
            <>
              <span>{it.subgrupo}</span>
              <br />
            </>
          );
        })}
      </div>
    </div>
  );
};
