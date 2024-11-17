import React, { useState } from 'react'
import profileImage from '../assets/images/man.svg'
import Done from '../assets/icons/Done.svg'
import { useRecoilValue } from 'recoil'
import { groupingAtom } from "../store/atoms/GroupingAtom"

const TicketComponent = ({ ticket, user }) => {
    const grouping = useRecoilValue(groupingAtom);
    const [tick, setTick] = useState(false);

    return (
        <div className='ticketComponent'>
            <span style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ opacity: "0.8" }}>{ticket.id}</p>
                {grouping !== "Users" && <span style={{ position: "relative" }}>
                    <img src={profileImage} alt="Profile" className='profileImage' />
                    <div style={{ width: "8px", height: "8px", borderRadius: "100%", backgroundColor: user?.available ? "#0eb54c" : "#e0e2e4", position: "absolute", right: "-1px", bottom: '3px', border: "2px solid white" }} />
                </span>}
            </span>
            <span style={{ display: "flex", gap: "8px", marginTop: grouping === "Users" ? "8px" : "0px" }}>
                {grouping !== "Status" && <div onClick={() => setTick(!tick)} style={{ cursor: "pointer" }}>
                    {tick ?
                        <img src={Done} alt='done task' style={{ width: "12px" }} /> :
                        <div style={{ width: "12px", height: "12px", borderRadius: "100%", border: "1px solid black", backgroundColor: "white", marginTop: "3px" }} />}

                </div>}
                <p style={{ marginBottom: "16px" }}>{ticket.title}</p>
            </span>
            <span>
                {ticket.tag.map((tag, index) => {
                    return <span key={index}>{tag === "Feature Request" || tag === "Feature request" ?
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", boxShadow: "0px 0px 1px black", width: "fit-content", padding: "2px 8px", borderRadius: "4px" }}>
                            <div style={{ width: "8px", height: "8px", borderRadius: "100%", backgroundColor: "#bfc1c7" }}>
                            </div>
                            <span>{tag}</span>
                        </span> : <span>{tag}</span>}</span>
                })}
            </span>
        </div>
    )
}

export default TicketComponent
