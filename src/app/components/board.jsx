"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { Quicksand } from "next/font/google";
import Cell from "./cell";
import {
  getCellsInGrid,
  addAdjacentErrors,
  clearAdjacentErrors,
} from "../utils";

const quicksand = Quicksand({
  subsets: ["latin"],
  weights: [400, 600],
});

export const Grid9x9 = forwardRef(
  (
    {
      cellValues,
      setCellValues,
      cellProtection,
      cellErrors,
      setCellErrors,
      cellSolution,
      cellValuesGiven,
    },
    ref
  ) => {
    const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
    const isFreeForm = cellSolution[0][0] === 0;

    function resetAll() {
      const userConfirmed = window.confirm(
        "Are you sure you want to reset all values?"
      );

      if (!userConfirmed) return;

      let newCellValues;
      if (isFreeForm) {
        newCellValues = Array.from({ length: 9 }, () => Array(9).fill(0));
      } else {
        newCellValues = [...cellValuesGiven.map((row) => [...row])];
      }
      const newCellErrors = Array.from({ length: 9 }, () => Array(9).fill(0));
      setCellErrors(newCellErrors);
      setCellValues(newCellValues);
    }

    const setInputValue = (value) => {
      const row = focusedCell.row;
      const col = focusedCell.col;

      if (cellProtection[row][col]) return;

      const newCellValues = [...cellValues.map((row) => [...row])];
      const newCellErrors = [...cellErrors.map((row) => [...row])];
      const prevValue = newCellValues[row][col];

      if (String(value) >= "1" && String(value) <= "9") {
        // clear errors
        newCellErrors[row][col] = 0;
        clearAdjacentErrors(newCellValues, newCellErrors, row, col, prevValue);

        // add errors
        if (isFreeForm) {
          newCellErrors[row][col] = addAdjacentErrors(
            newCellValues,
            newCellErrors,
            row,
            col,
            value
          );
        } else if (cellSolution[row][col] !== value) {
          // +1 for bad answer
          newCellErrors[row][col] = 1;
          newCellErrors[row][col] += addAdjacentErrors(
            newCellValues,
            newCellErrors,
            row,
            col,
            value
          );
        }

        newCellValues[row][col] = value;
      } else if (String(value) === "Delete" || String(value) === "Backspace") {
        // clear errors
        newCellErrors[row][col] = 0;
        clearAdjacentErrors(newCellValues, newCellErrors, row, col, prevValue);

        newCellValues[row][col] = 0;
      }

      setCellErrors(newCellErrors);
      setCellValues(newCellValues);
    };

    // Expose functions to ref
    useImperativeHandle(ref, () => ({
      setInputValue,
      resetAll,
    }));

    function handleKeyDown(event, row, col) {
      if (cellProtection[row][col]) return;

      const newCellValues = [...cellValues.map((row) => [...row])];
      const newCellErrors = [...cellErrors.map((row) => [...row])];
      const prevValue = newCellValues[row][col];

      if (event.key >= "1" && event.key <= "9") {
        let value = parseInt(event.key, 10);

        // clear errors
        newCellErrors[row][col] = 0;
        clearAdjacentErrors(newCellValues, newCellErrors, row, col, prevValue);

        // add errors
        if (isFreeForm) {
          newCellErrors[row][col] = addAdjacentErrors(
            newCellValues,
            newCellErrors,
            row,
            col,
            value
          );
        } else if (cellSolution[row][col] !== value) {
          // +1 for bad answer
          newCellErrors[row][col] = 1;
          newCellErrors[row][col] += addAdjacentErrors(
            newCellValues,
            newCellErrors,
            row,
            col,
            value
          );
        }

        newCellValues[row][col] = value;
      } else if (event.key === "Delete" || event.key === "Backspace") {
        // clear errors
        newCellErrors[row][col] = 0;
        clearAdjacentErrors(newCellValues, newCellErrors, row, col, prevValue);

        newCellValues[row][col] = 0;
      }

      setCellErrors(newCellErrors);
      setCellValues(newCellValues);
    }

    return (
      <div ref={ref} className={`grid9x9 ${quicksand.className} font-scaling`}>
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <Grid3x3
              key={i}
              gridIndex={i}
              cells={getCellsInGrid(cellValues, i)}
              focusedCell={focusedCell}
              setFocusedCell={setFocusedCell}
              handleKeyDown={handleKeyDown}
              cellProtection={cellProtection}
              cellErrors={cellErrors}
            />
          ))}
      </div>
    );
  }
);

// Add display name to get rid of ESLINT warning
Grid9x9.displayName = "Grid9x9";

export function Grid3x3({
  gridIndex,
  cells,
  focusedCell,
  setFocusedCell,
  handleKeyDown = { handleKeyDown },
  cellProtection = { cellProtection },
  cellErrors = { cellErrors },
}) {
  const rowInGrid9x9 = Math.floor(gridIndex / 3);
  const colInGrid9x9 = gridIndex % 3;

  return (
    <div className="grid3x3 rounded-lg overflow-hidden umbra-6dp">
      {cells.map((value, i) => {
        const rowInGrid3x3 = Math.floor(i / 3);
        const colInGrid3x3 = i % 3;
        const row = rowInGrid9x9 * 3 + rowInGrid3x3;
        const col = colInGrid9x9 * 3 + colInGrid3x3;

        return (
          <Cell
            key={i}
            value={value}
            row={row}
            col={col}
            focusedCell={focusedCell}
            setFocusedCell={setFocusedCell}
            handleKeyDown={handleKeyDown}
            cellProtection={cellProtection}
            cellErrors={cellErrors}
          />
        );
      })}
    </div>
  );
}
