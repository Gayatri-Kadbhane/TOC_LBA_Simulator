const input = document.getElementById("input");

const runButton = document.getElementById("run");

const resetButton = document.getElementById("reset");

const result = document.getElementById("result");

const resultTitle =
    document.getElementById("result-title");

const resultText =
    document.getElementById("result-text");

const state =
    document.getElementById("state");

const tape =
    document.getElementById("tape");

const trace =
    document.getElementById("trace");

const length =
    document.getElementById("length");

const steps =
    document.getElementById("steps");

const finalState =
    document.getElementById("final-state");

const head =
    document.getElementById("head");

const symbol =
    document.getElementById("symbol");


/* VALIDATE INPUT */

function validateInput(value) {

    if (value.length === 0) {

        return {
            valid: false,
            message:
                "Input is empty. The language requires n ≥ 1."
        };

    }


    if (!/^[abc]+$/.test(value)) {

        return {
            valid: false,
            message:
                "Invalid symbol. Only a, b and c are allowed."
        };

    }


    if (!/^a*b*c*$/.test(value)) {

        return {
            valid: false,
            message:
                "Incorrect order. Required structure is a*b*c*."
        };

    }


    const a =
        (value.match(/a/g) || []).length;

    const b =
        (value.match(/b/g) || []).length;

    const c =
        (value.match(/c/g) || []).length;


    if (a === 0 || b === 0 || c === 0) {

        return {
            valid: false,
            message:
                "The input must contain a, b and c."
        };

    }


    if (a !== b || b !== c) {

        return {
            valid: false,

            message:
                `Unequal counts: a = ${a}, b = ${b}, c = ${c}.`
        };

    }


    return {
        valid: true,

        message:
            `Equal counts: a = ${a}, b = ${b}, c = ${c}.`
    };

}



/* SIMULATE LBA */

function simulateLBA(value) {

    const validation =
        validateInput(value);


    const rows = [];


    let tapeData =
        value.split("");


    rows.push({

        step: 0,

        state: "q0",

        tape: [...tapeData],

        head: 0,

        operation:
            "Initialize bounded tape"

    });


    /* INVALID INPUT */

    if (!validation.valid) {

        rows.push({

            step: 1,

            state: "q_reject",

            tape: [...tapeData],

            head:
                Math.max(0, tapeData.length - 1),

            operation:
                validation.message

        });


        return {

            accepted: false,

            rows: rows,

            message:
                validation.message

        };

    }



    let stepNumber = 0;


    /* START */

    stepNumber++;


    rows.push({

        step: stepNumber,

        state: "q1",

        tape: [...tapeData],

        head: 0,

        operation:
            "Find an unmarked a"

    });



    while (true) {

        /*
            Find first unmarked a
        */

        let aIndex =
            tapeData.indexOf("a");


        /*
            No a remains
        */

        if (aIndex === -1) {

            let remaining =
                tapeData.some(
                    character =>
                        character === "b" ||
                        character === "c"
                );


            stepNumber++;


            rows.push({

                step: stepNumber,

                state:
                    remaining
                        ? "q_reject"
                        : "q_accept",

                tape: [...tapeData],

                head:
                    tapeData.length - 1,

                operation:
                    remaining
                        ? "Unmatched b or c remains"
                        : "All symbols matched"

            });


            return {

                accepted:
                    !remaining,

                rows: rows,

                message:
                    remaining
                        ? "Unmatched b or c remains."
                        : "Every a, b and c was matched successfully."

            };

        }



        /*
            Mark a as X
        */

        tapeData[aIndex] = "X";

        stepNumber++;


        rows.push({

            step: stepNumber,

            state: "q1",

            tape: [...tapeData],

            head: aIndex,

            operation:
                `Mark a at position ${aIndex + 1} as X`

        });



        /*
            Find b
        */

        let bIndex = -1;


        for (
            let i = aIndex + 1;
            i < tapeData.length;
            i++
        ) {

            if (tapeData[i] === "b") {

                bIndex = i;

                break;

            }

        }



        /*
            No b
        */

        if (bIndex === -1) {

            stepNumber++;


            rows.push({

                step: stepNumber,

                state: "q_reject",

                tape: [...tapeData],

                head: aIndex,

                operation:
                    "No matching b found"

            });


            return {

                accepted: false,

                rows: rows,

                message:
                    "A matching b could not be found."

            };

        }



        /*
            Mark b as Y
        */

        tapeData[bIndex] = "Y";

        stepNumber++;


        rows.push({

            step: stepNumber,

            state: "q2",

            tape: [...tapeData],

            head: bIndex,

            operation:
                `Mark b at position ${bIndex + 1} as Y`

        });



        /*
            Find c
        */

        let cIndex = -1;


        for (
            let i = bIndex + 1;
            i < tapeData.length;
            i++
        ) {

            if (tapeData[i] === "c") {

                cIndex = i;

                break;

            }

        }



        /*
            No c
        */

        if (cIndex === -1) {

            stepNumber++;


            rows.push({

                step: stepNumber,

                state: "q_reject",

                tape: [...tapeData],

                head: bIndex,

                operation:
                    "No matching c found"

            });


            return {

                accepted: false,

                rows: rows,

                message:
                    "A matching c could not be found."

            };

        }



        /*
            Mark c as Z
        */

        tapeData[cIndex] = "Z";

        stepNumber++;


        rows.push({

            step: stepNumber,

            state: "q3",

            tape: [...tapeData],

            head: cIndex,

            operation:
                `Mark c at position ${cIndex + 1} as Z`

        });



        /*
            Return to left
        */

        stepNumber++;


        rows.push({

            step: stepNumber,

            state: "q4",

            tape: [...tapeData],

            head: 0,

            operation:
                "Move head toward left boundary"

        });



        /*
            Start next cycle
        */

        stepNumber++;


        rows.push({

            step: stepNumber,

            state: "q1",

            tape: [...tapeData],

            head: 0,

            operation:
                "Find next unmarked a"

        });

    }

}



/* DISPLAY RESULT */

function displayResult(data) {

    const last =
        data.rows[data.rows.length - 1];


    if (data.accepted) {

        result.className =
            "result accept";

        document.querySelector(
            ".result-icon"
        ).textContent = "✓";

        resultTitle.textContent =
            "ACCEPTED";

    } else {

        result.className =
            "result reject";

        document.querySelector(
            ".result-icon"
        ).textContent = "×";

        resultTitle.textContent =
            "REJECTED";

    }


    resultText.textContent =
        data.message;


    state.textContent =
        `${last.state} • ${
            data.accepted
                ? "Accepted"
                : "Rejected"
        }`;


    length.textContent =
        input.value.length;


    steps.textContent =
        data.rows.length - 1;


    finalState.textContent =
        last.state;


    displayTape(last);


    displayTrace(data.rows);

}



/* DISPLAY TAPE */

function displayTape(row) {

    tape.innerHTML = "";


    const leftBoundary =
        document.createElement("span");

    leftBoundary.className =
        "boundary";

    leftBoundary.textContent =
        "⊢";

    tape.appendChild(leftBoundary);



    row.tape.forEach(
        (character, index) => {

            const cell =
                document.createElement("div");

            cell.className =
                "tape-cell";


            if (
                character === "X" ||
                character === "Y" ||
                character === "Z"
            ) {

                cell.classList.add(
                    "marked"
                );

            }


            if (index === row.head) {

                cell.classList.add(
                    "head"
                );

            }


            cell.textContent =
                character;


            tape.appendChild(cell);

        }
    );



    const rightBoundary =
        document.createElement("span");

    rightBoundary.className =
        "boundary";

    rightBoundary.textContent =
        "⊣";

    tape.appendChild(rightBoundary);



    head.textContent =
        row.tape.length
            ? row.head + 1
            : "—";


    symbol.textContent =
        row.tape.length
            ? row.tape[row.head]
            : "—";

}



/* DISPLAY TRACE */

function displayTrace(rows) {

    trace.innerHTML = "";


    rows.forEach(row => {

        const tr =
            document.createElement("tr");


        const values = [

            row.step,

            row.state,

            row.tape.join(""),

            row.tape.length
                ? row.head + 1
                : "—",

            row.operation

        ];


        values.forEach(
            (value, index) => {

                const td =
                    document.createElement("td");

                td.textContent =
                    value;

                tr.appendChild(td);

            }
        );


        trace.appendChild(tr);

    });

}



/* RUN BUTTON */

runButton.addEventListener(
    "click",
    function () {

        const value =
            input.value.trim();

        input.value =
            value;


        const data =
            simulateLBA(value);


        displayResult(data);


        document
            .getElementById("simulator")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);



/* ENTER KEY */

input.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            runButton.click();

        }

    }
);



/* RESET */

resetButton.addEventListener(
    "click",
    function () {

        input.value = "";

        result.className =
            "result neutral";

        document.querySelector(
            ".result-icon"
        ).textContent = "?";

        resultTitle.textContent =
            "Ready to process";

        resultText.textContent =
            "Enter a string and click Run LBA.";

        state.textContent =
            "q0 • Ready";

        length.textContent =
            "0";

        steps.textContent =
            "0";

        finalState.textContent =
            "—";

        head.textContent =
            "—";

        symbol.textContent =
            "—";


        tape.innerHTML = `

            <span class="boundary">
                ⊢
            </span>

            <span class="message">
                Run the simulator to display the tape.
            </span>

            <span class="boundary">
                ⊣
            </span>

        `;


        trace.innerHTML = `

            <tr>

                <td colspan="5">
                    No execution trace yet.
                </td>

            </tr>

        `;

    }
);



/* QUICK TEST BUTTONS */

document
    .querySelectorAll("[data-value]")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                input.value =
                    this.dataset.value;

                runButton.click();

            }
        );

    });