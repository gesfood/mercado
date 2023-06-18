export default (props) => {
  return (
    <div>
      <b>Items</b>
      <table>
        <tbody>
          {props.items.map((it, index) => (
            <tr key={index}>
              <td>{it.name}</td>
              <td>{it.quantity}</td>
              <td>{it.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
