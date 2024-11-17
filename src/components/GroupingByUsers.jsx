import React from 'react'
import TicketComponent from './TicketComponent';
import add from "../assets/icons/add.svg"
import threeDots from "../assets/icons/3_dot_menu.svg"
import profileImage from '../assets/images/man.svg'
import { useRecoilValue } from 'recoil';
import { orderingAtom } from "../store/atoms/OrderingAtom"

const GroupingByUsers = ({ tickets, users }) => {
    const ordering = useRecoilValue(orderingAtom);
    const sortTickets = (tickets) => {
        if (ordering === "Priority") {
            return [...tickets].sort((a, b) => b.priority - a.priority);
        }
        else {
            //Sorting according to the title
            return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
        }
    };

    return (
        <div className='GroupByStatus'>
            {users.map((user) => {
                const userTickets = sortTickets(tickets.filter((ticket) => ticket.userId === user.id));

                return <div className="status">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <span style={{ position: "relative" }}>
                                <img src={profileImage} alt="Profile" className='profileImage' />
                                <div style={{ width: "8px", height: "8px", borderRadius: "100%", backgroundColor: user?.available ? "#0eb54c" : "#e0e2e4", position: "absolute", right: "-1px", bottom: '3px', border: "2px solid white" }} />
                            </span>
                            <p>{user.name}</p>
                            <p style={{ opacity: "0.6" }}>{userTickets.length}</p>
                        </span>
                        <span style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <img src={add} alt="add" style={{ cursor: "pointer" }} />
                            <img src={threeDots} alt="menu" style={{ cursor: "pointer" }} />
                        </span>
                    </div>
                    <div className='tickets'>
                        {userTickets.map((ticket) => {
                            return (
                                <TicketComponent key={ticket.id} ticket={ticket} />
                            );
                        })}
                    </div>
                </div>
            })}
        </div>
    )
}

export default GroupingByUsers
