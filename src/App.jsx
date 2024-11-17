import React, { useEffect, useState } from 'react';
import './App.css'
import TopBar from './components/TopBar'
import GroupingByStatus from './components/GroupByStatus'
import GroupingByPriority from './components/GroupingByPriority'
import GroupingByUsers from './components/GroupingByUsers'
import { useRecoilValue } from 'recoil'
import { groupingAtom } from "./store/atoms/GroupingAtom"

function App() {
  const grouping = useRecoilValue(groupingAtom);

  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchTickets = async () => {
    const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
    const data = await response.json();
    setTickets(data.tickets);
  };

  const fetchUsers = async () => {
    const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
    const data = await response.json();
    setUsers(data.users);
  };

  useEffect(() => {
    fetchTickets();
    fetchUsers();
  }, []);

  if (tickets.length && users.length) {
    return (
      <div className='mainPage'>
        <TopBar />
        {grouping === "Status" ? <GroupingByStatus tickets={tickets} users={users} /> :
          grouping === "Priority" ? <GroupingByPriority tickets={tickets} users={users} /> :
            <GroupingByUsers tickets={tickets} users={users} />}
      </div>
    )
  }
  else {
    return (
      <div>Loading...</div>
    )
  }
}

export default App
