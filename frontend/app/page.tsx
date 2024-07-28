import { nunitoSans } from "./utils/fontIndex";
import NotesContainer from "./components/main/notesContainer";

export default function Home() {
  return (
    <main
      className={`${nunitoSans.className} flex min-h-screen flex-col pl-14 sm:pl-72 py-24 pr-6 gap-24 w-full`}
    >
      <header>
        <h1 className="text-headerText text-4xl font-bold">
          Welcome! Start by creating a new note
        </h1>
        <h2 className="text-subtitleText font-light">
          You can do so by clicking on the plus icon in the card below
        </h2>
      </header>
      <NotesContainer />
    </main>
  );
}
