import React from 'react';
import cookie from './cookie.png';

// export function Header({ title, appMode }) {
//   return (
//     <header className="w-full flex-grow-0">
//       <div className="flex justify-between uppercase">
//         <div className="flex flex-col text-xs">
//           <span>Sudoku</span>
//           <span>Cruncher</span>
//         </div>
//         <div
//           className="flex items-center text-sm select-none cursor-pointer"
//           onClick={() => alert("This feature is coming soon")}
//         >
//           <div
//             className={`p-2 border-r-2 border-black ${
//               appMode === "creator" && "text-gray-400"
//             }`}
//           >
//             Solver
//           </div>
//           <div className={`p-2 ${appMode === "solver" && "text-gray-400"}`}>
//             Creator
//           </div>
//         </div>
//       </div>

//       <h1 className="text-4xl mt-6 lg:text-center">{title}</h1>
//     </header>
//   );
// }

// Reusable menu component
// const HamburgerMenu = () => {
//   return (
//     <span className="inline-block h-7 w-7 bg-gray-500">
//       <div class="w-7 h-0.5 bg-white"></div>
//         <div class="w-7 h-0.5 bg-white"></div>
//         <div class="w-7 h-0.5 bg-white"></div>
//     </span>

//   );
// };

function MenuIcon(){
  return (
    <div class="space-y-2">
        <div class="w-7 h-0.5 bg-white"></div>
        <div class="w-7 h-0.5 bg-white"></div>
        <div class="w-7 h-0.5 bg-white"></div>
      </div>
  );
};

// export function Header({ title, appMode }){
//   return (
//     <header className="w-full flex-grow-0">
//       <div class="space-y-2">
//         <div class="w-7 h-0.5 bg-white"></div>
//         <div class="w-7 h-0.5 bg-white"></div>
//         <div class="w-7 h-0.5 bg-white"></div>
//       </div>
//       <div class="flex items-center justify-end pr-2">
//         <img src={cookie} alt="Image" class="h-7 w-7" />
//         </div>
//     </header>
//   );
// };

function CookieIcon(){
  return (
    <div class="flex items-center justify-end pr-2">
     <img src={cookie} alt="Image" class="h-7 w-7" />
    </div>
  );
};

export function Header({ title, appMode }){
  return (
    <header className="w-full flex-grow-0">
      <div class="flex items-center justify between">
      <MenuIcon />
      <div class="flex-grow"></div>
      <CookieIcon />
      <CookieIcon />
      <CookieIcon />
      </div>

    </header>
  );
}