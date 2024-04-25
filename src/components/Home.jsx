import { atom, useAtom } from "jotai";

// Atom for managing the current page state
export const currentPageAtom = atom("intro");

// Home component containing non-3D content
export const Home = () => {
  // Using Jotai to access and update the current page state
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Section containing the home content */}
      <section
        className={`flex w-full h-full flex-col items-center justify-center 
          duration-500
          ${currentPage === "home" ? "" : "opacity-0"}`}
      >
        <div className="h-[66%]"></div> {/* Placeholder for content */}

        {/* Button to navigate to the store page */}
        <button
          onClick={() => setCurrentPage("store")}
          className="pointer-events-auto py-4 px-8 bg-orange-400 text-white font-black rounded-full hover:bg-orange-600 cursor-pointer transition-colors duration-500"
        >
          ENTER ISLAND
        </button>
      </section>
    </div>
  );
};
