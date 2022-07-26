import React, { useEffect, useRef } from "react";
import { fromEvent } from "rxjs";

export default function CustomInput(props) {
    const inputRef = useRef(null);

    // useEffect(() => {
    //     const textChange = fromEvent(inputRef.current, "inputs").subscribe({
    //         next: (el) => props.onChange(el),
    //         error: (err) => console.log("Error:", err),
    //         complete: () => {},
    //     });
    //     return () => textChange.unsubscribe();
    // }, []);

    return (
        <div className="input-row">
            <label htmlFor="">{props.label}</label>
            <input ref={inputRef} {...props} />
        </div>
    );
}
