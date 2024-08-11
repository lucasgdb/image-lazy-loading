import { ChangeableImage } from "./components/ChangeableImage";
import { LazyImages } from "./components/LazyImages";

function App() {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <ChangeableImage />
      <LazyImages />
    </div>
  );
}

export default App;
