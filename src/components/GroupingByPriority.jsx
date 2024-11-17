import React from 'react'
import TicketComponent from './TicketComponent';
import NoPriority from "../assets/icons/No-priority.svg"
import Urgent from "../assets/icons/Urgent_Priority_colour.svg"
import High from "../assets/icons/High_Priority.svg"
import Medium from "../assets/icons/Medium_Priority.svg"
import Low from "../assets/icons/Low_Priority.svg"
import add from "../assets/icons/add.svg"
import threeDots from "../assets/icons/3_dot_menu.svg"
import { useRecoilValue } from 'recoil';
import { orderingAtom } from "../store/atoms/OrderingAtom"

const GroupingByPriority = ({ tickets, users }) => {
    const ordering = useRecoilValue(orderingAtom);
    const sortTickets = (tickets) => {
        if (ordering === "Priority") {
            return [...tickets].sort((a, b) => b.priority - a.priority);
        }
        else {
            //Sort according to the title
            return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
        }
    };

    const NoPriorityTickets = sortTickets(tickets.filter((ticket) => ticket.priority === 0));
    const UrgentTickets = sortTickets(tickets.filter((ticket) => ticket.priority === 4));
    const HighTickets = sortTickets(tickets.filter((ticket) => ticket.priority === 3));
    const MediumTickets = sortTickets(tickets.filter((ticket) => ticket.priority === 2));
    const LowTickets = sortTickets(tickets.filter((ticket) => ticket.priority === 1));

    const allPriorities = [
        { priority: 0, name: "No Priority", tickets: NoPriorityTickets, icon: NoPriority },
        { priority: 4, name: "Urgent", tickets: UrgentTickets, icon: Urgent },
        { priority: 3, name: "High", tickets: HighTickets, icon: High },
        { priority: 2, name: "Medium", tickets: MediumTickets, icon: Medium },
        { priority: 1, name: "Low", tickets: LowTickets, icon: Low },
    ];

    return (
        <div className='GroupByStatus'>
            {allPriorities.map((priority) =>
            (
                <div className="status" key={priority.priority}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <img src={priority.icon} alt={priority.name} />
                            <p>{priority.name}</p>
                            <p style={{ opacity: "0.6" }}>{priority.tickets.length}</p>
                        </span>
                        <span style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <img src={add} alt="add" style={{ cursor: "pointer" }} />
                            <img src={threeDots} alt="menu" style={{ cursor: "pointer" }} />
                        </span>
                    </div>
                    <div className='tickets'>
                        {priority.tickets.map((ticket) => {
                            const user = users.find((user) => user.id === ticket.userId);
                            return (
                                <TicketComponent key={ticket.id} ticket={ticket} user={user} />
                            );
                        })}
                    </div>
                </div>
            )
            )}
        </div>
    )
}

export default GroupingByPriority
