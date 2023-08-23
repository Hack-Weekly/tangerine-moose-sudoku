"use client";

import { useState, useRef, useEffect } from "react";
import { Grid9x9 } from "./components/board";
import { Keypad } from "./components/keypad";
import { test1 } from "../../data/board-mocks";
import Menubar from "./components/menubar";
import { getSudoku, createCellProtection } from "./utils";

export default function Home() {
  const [cellValues, setCellValues] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );
  const [cellValuesGiven, setCellValuesGiven] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );
  const [cellSolution, setCellSolution] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );
  const [cellProtection, setCellProtection] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(false))
  );
  const [cellErrors, setCellErrors] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );
  const [game, setGame] = useState("");

  const gridRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      if (!game) return;
      const boards = await getSudoku(game);

      // initialize new game
      setCellValuesGiven([...boards.cells.map((row) => [...row])]);
      setCellValues([...boards.cells.map((row) => [...row])]);
      setCellSolution([...boards.solution.map((row) => [...row])]);
      setCellProtection(createCellProtection(boards.cells));
      setCellErrors(Array.from({ length: 9 }, () => Array(9).fill(0)));
    }

    fetchData();
  }, [game]);

  // for testing purposes only
  // const [cellValues, setCellValues] = useState(test1.cellValues);
  // const [cellSolution, setCellSolution] = useState(test1.cellSolution);
  // const [cellProtection, setCellProtection] = useState(test1.cellProtection);
  // const [cellValuesGiven, setCellValuesGiven] = useState(test1.cellValuesGiven);

  return (
    <main className="px-4 py-6 w-full h-full flex justify-center">
      <div className="w-full h-full max-w-screen-lg flex flex-col justify-between items-center">
        <Menubar game={game} setGame={setGame} />
        <div className="flex-grow flex flex-col justify-center">
          <Grid9x9
            cellValues={cellValues}
            setCellValues={setCellValues}
            cellProtection={cellProtection}
            cellSolution={cellSolution}
            cellErrors={cellErrors}
            setCellErrors={setCellErrors}
            cellValuesGiven={cellValuesGiven}
            ref={gridRef}
          />
          <Keypad gridRef={gridRef} />
        </div>
      </div>
    </main>
  );
}
