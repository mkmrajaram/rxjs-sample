import { useEffect, useState } from "react";
import "./App.css";
import inputsData from "./data/inputs";
import { from } from "rxjs";
import { map } from "rxjs/operators";
import Input from "./components/CustomInput/CustomInput";

let inputsElements = from(inputsData);

function App() {
    const [inputs, setInputs] = useState(null);

    useEffect(() => {
        inputsElements = inputsElements.pipe(
            map((item) => {
                if (item.onChange) {
                    item.onChange = changeValue;
                }
                return item;
            }),
        );
        getObservableElements();
    }, []);

    const getObservableElements = () => {
        let inputsEl = [];
        inputsElements.subscribe({
            next: (item) => inputsEl.push(item),
            error: (err) => {
                console.log("Error", err);
                setInputs(null);
            },
            complete: () => {
                setInputs(inputsEl);
            },
        });
    };

    const changeValue = (e) => {
        inputsElements = inputsElements.pipe(
            map((item) => {
                return { ...item, value: e.target.value };
            }),
        );
        getObservableElements();
    };

    return <div className="App">{inputs && inputs.map((item, index) => <Input key={index} {...item} />)}</div>;
}

export default App;
