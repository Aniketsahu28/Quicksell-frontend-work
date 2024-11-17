import React from 'react';
import TicketComponent from './TicketComponent';
import Backlog from "../assets/icons/Backlog.svg"
import Todo from "../assets/icons/To-do.svg"
import InProgress from "../assets/icons/in-progress.svg"
import Done from "../assets/icons/Done.svg"
import Cancelled from "../assets/icons/Cancelled.svg"
import add from "../assets/icons/add.svg"
import threeDots from "../assets/icons/3_dot_menu.svg"
import { useRecoilValue } from 'recoil';
import { orderingAtom } from "../store/atoms/OrderingAtom"

const GroupByStatus = ({ tickets, users }) => {

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

    const BacklogTickets = sortTickets(tickets.filter((ticket) => ticket.status === "Backlog"));
    const TodoTickets = sortTickets(tickets.filter((ticket) => ticket.status === "Todo"));
    const InProgressTickets = sortTickets(tickets.filter((ticket) => ticket.status === "In progress"));
    const DoneTickets = sortTickets(tickets.filter((ticket) => ticket.status === "Done"));
    const CancelledTickets = sortTickets(tickets.filter((ticket) => ticket.status === "Cancelled"));

    const allStatus = [
        { name: "Backlog", tickets: BacklogTickets, icon: Backlog },
        { name: "Todo", tickets: TodoTickets, icon: Todo },
        { name: "In Progress", tickets: InProgressTickets, icon: InProgress },
        { name: "Done", tickets: DoneTickets, icon: Done },
        { name: "Cancelled", tickets: CancelledTickets, icon: Cancelled }
    ]

    return (
        <div className='GroupByStatus'>
            {allStatus.map((status) => (
                <div className="status" key={status.name}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <img src={status.icon} alt={status.name} />
                            <p>{status.name}</p>
                            <p style={{ opacity: "0.6" }}>{status.tickets.length}</p>
                        </span>
                        <span style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <img src={add} alt="add" style={{ cursor: "pointer" }} />
                            <img src={threeDots} alt="menu" style={{ cursor: "pointer" }} />
                        </span>
                    </div>
                    <div className='tickets'>
                        {status.tickets.map((ticket) => {
                            const user = users.find((user) => user.id === ticket.userId);
                            return (
                                <TicketComponent key={ticket.id} ticket={ticket} user={user} />
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GroupByStatus;