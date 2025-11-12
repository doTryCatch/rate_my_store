export const Store = () => {
  return (
    <div className="store">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light"></tbody>
      </table>
    </div>
  );
};
