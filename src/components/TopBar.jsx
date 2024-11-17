import React, { useContext } from 'react'
import displayIcon from "../assets/icons/Display.svg"
import arrow from "../assets/icons/down.svg"
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { groupingAtom } from '../store/atoms/GroupingAtom'
import { orderingAtom } from '../store/atoms/orderingAtom'

const TopBar = () => {
    const [displayVisible, setDisplayVisible] = useState(false)
    const [grouping, setGrouping] = useRecoilState(groupingAtom)
    const [ordering, setOrdering] = useRecoilState(orderingAtom)

    const handleGroupingChange = (event) => {
        setGrouping(event.target.value)
        setDisplayVisible(!displayVisible)
    }

    const handleOrderingChange = (event) => {
        setOrdering(event.target.value)
        setDisplayVisible(!displayVisible)
    }

    return (
        <div className="topBar">
            <span className='displayMain'>
                <button className="displaybtn" onClick={() => { setDisplayVisible(!displayVisible) }}>
                    <img src={displayIcon} alt="display" />
                    <p>Display</p>
                    <img src={arrow} alt="arrow" />
                </button>

                <div className='displayOptions' style={{ display: displayVisible ? "flex" : "none", zIndex: "10" }}>
                    <span className='displayOptionsRow'>
                        <p style={{ opacity: "0.6" }}>Grouping</p>
                        <button className="displaybtn" style={{ gap: "20px" }}>
                            <select value={grouping} onChange={handleGroupingChange} style={{ border: "0px", outline: "none", padding: "2px" }}>
                                <option value="Status">Status</option>
                                <option value="Priority">Priority</option>
                                <option value="Users">Users</option>
                            </select>
                        </button>
                    </span>
                    <span className='displayOptionsRow'>
                        <p style={{ opacity: "0.6" }}>Ordering</p>
                        <button className="displaybtn" style={{ gap: "20px" }}>
                            <select value={ordering} onChange={handleOrderingChange} style={{ border: "0px", outline: "none", padding: "2px" }}>
                                <option value="Priority">Priority</option>
                                <option value="Title">Title</option>
                            </select>
                        </button>
                    </span>
                </div>
            </span>
        </div>
    )
}

export default TopBar