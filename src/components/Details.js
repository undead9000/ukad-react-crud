function Details({ detailsItem }) {
  return (
    <div className="c-details">
      <div className="c-subtitle">Details:</div>
      <table className="c-table">
        <tbody>
          <tr>
            <th>User Id</th>
            <th>Id</th>
            <th>Text</th>
            <th>Completed</th>
          </tr>
          <tr key={detailsItem.id}>
            <td>{detailsItem.userId}</td>
            <td>{detailsItem.id}</td>
            <td>{detailsItem.title}</td>
            <td>{detailsItem.completed.toString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Details;
