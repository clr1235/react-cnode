import { useEffect, useState } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import qs from "qs";
import { cleanObject, useMount, useDebounce } from "./utils";

const ProjectList = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 500);
  useEffect(() => {
    fetch(
      `http://localhost:3001/projects?${qs.stringify(
        cleanObject(debouncedParam)
      )}`
    ).then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [debouncedParam]);

  useMount(() => {
    fetch(`http://localhost:3001/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });
  return (
    <div>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  );
};

export default ProjectList;
