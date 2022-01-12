import React, { useState } from 'react'

export default function App() {
    const [calc, setCalc] = useState("")
    const [result, setResult] = useState("")

    const ops = ["/", "*", "+", "-", "."]

    function updateCalc(value) {
        // if value is an operator and calculator is empty, do nothing.
        if (ops.includes(value) && calc === "") {
            return
        }
        // if value is an operator and the last display character is an operator, do nothing.
        if (ops.includes(value) && ops.includes(calc.slice(-1))) {
            return
        }

        // setState is async, so making my own variable to reuse
        const finalDisplay = calc + value
        setCalc(finalDisplay)

        // if the last item is not a operator
        if (!ops.includes(value)) {
            setResult(eval(finalDisplay.toString()).toString())
        }
    }


    function createDigits() {
        const digits = []
        for (let i = 1; i < 10; i++) {
            digits.push(
                <button key={i} onClick={() => updateCalc(`${i}`)}>{i}</button>
            )
        }
        return digits
    }

    function calculate() {
        let d = calc
        // if last char is operator, remove it
        if (ops.includes(calc.slice(-1))) {
            d = d.slice(0, -1)
        }

        setCalc(eval(d.toString()).toString())
        setResult(" ")
    }

    function deleteLast() {
        if (calc == "") return
        setCalc(calc.slice(0, -1))
    }

    return (
        <div className="App">
            <div className="calculator">
                <div className="display">
                    <span>
                        {(calc === "") ? ("") : (result) ? result : "0"}
                    </span>
                    &nbsp;
                    {calc || "0"}
                </div>
                <div className="operators">
                    <button onClick={() => updateCalc("/")}>/</button>
                    <button onClick={() => updateCalc("*")}>*</button>
                    <button onClick={() => updateCalc("+")}>+</button>
                    <button onClick={() => updateCalc("-")}>-</button>
                    <button onClick={deleteLast}>DEL</button>
                </div>
                <div className="digits">
                    {createDigits()}
                    <button onClick={() => updateCalc("0")}>0</button>
                    <button onClick={() => updateCalc(".")}>.</button>
                    <button onClick={calculate}>=</button>
                </div>
            </div>
        </div>
    )
}
