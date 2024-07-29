import WorkSpace from "./components/WorkSpace";
import NavBar from "./NavBar";

const App = () => {
  return (
    <div className="min-h-[100vh] h-full w-screen bg-[#1D2025]">
        <NavBar/>
        <div className="py-6 px-16">
          <WorkSpace/>
        </div>
    </div>
  )
};

export default App;
