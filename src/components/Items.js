function Items({ currentItems, onSearch }) {
  return (
    <div>
      {currentItems && currentItems.length > 0 ? (
        <table className="c-table">
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} onClick={() => onSearch(item)}>
                <td>{item.id}</td>
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No results</h2>
      )}
    </div>
  );
}

export default Items;
