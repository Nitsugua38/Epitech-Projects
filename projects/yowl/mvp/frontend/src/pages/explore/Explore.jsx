import { useEffect, useState } from 'react'
import "./Explore.css";

import Item from './Item';

function Explore() {

    const [items, setItems] = useState([]);
    const itemTypes = ["video", "image", "post"]

    useEffect(() => {
        setItems([ itemTypes[Math.floor(Math.random() * 3)], itemTypes[Math.floor(Math.random() * 3)], itemTypes[Math.floor(Math.random() * 3)], itemTypes[Math.floor(Math.random() * 3)] ]);

        const feed = document.getElementById("feed")

        feed.addEventListener("scroll", () => {
            if (feed.scrollTop + feed.clientHeight > feed.scrollHeight - 200) {
                setItems(oldItems => [ ...oldItems, itemTypes[Math.floor(Math.random() * 3)] ])
            }
        })
    }, [])

    return (
        <>
            <div id='feed'>
                {
                    items.map(item => (
                        <Item item={item}/>
                    ))
                }
            </div>
        </>
    )
}

export default Explore