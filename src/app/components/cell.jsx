export default function Cell({
  value,
  row,
  col,
  focusedCell,
  setFocusedCell,
  handleKeyDown,
  cellProtection,
  cellErrors,
}) {
  const isFocused = row === focusedCell.row && col === focusedCell.col;
  const hasFocusOnRowOrCol = row === focusedCell.row || col === focusedCell.col;
  const isProtected = cellProtection[row][col];
  const hasError = cellErrors[row][col];

  return (
    <div
      className={`flex justify-center items-center ${
        isFocused
          ? "bg-blue-100"
          : hasError
          ? "bg-red-100"
          : hasFocusOnRowOrCol
          ? "bg-blue-50"
          : "bg-white"
      } ${
        hasError && !isProtected ? "text-red-400" : ""
      } ring-inset focus:outline-none select-none`}
      tabIndex={isProtected ? undefined : 0}
      onFocus={() => setFocusedCell({ row, col })}
      onKeyDown={(e) => handleKeyDown(e, row, col)}
    >
      {value > 0 ? value : ""}
    </div>
  );
}
