const List = ({ list, users }: { list: any; users: any }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list?.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>
              {users?.find((user) => user.id === item.personId)?.name || "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
