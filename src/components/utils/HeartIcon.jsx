import Heart from "react-heart";
import { useState } from "react";

export function HeartIcon() {
    const [active, setActive] = useState(false)

    return (
        <div className="w-6 h-6">
            <Heart inactiveColor="gray" isActive={active} onClick={() => setActive(!active)}/>
        </div>
    )
}