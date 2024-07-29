import { ChartPieIcon, Cog6ToothIcon } from "@heroicons/react/16/solid";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center px-20 bg-[#292C33] max-h-[72px] h-full w-full p-3">
      <div className="flex gap-10 select-none">
        <img src="logo.png" alt="logo" className="cursor-pointer" />
        <div className="flex gap-1">
            <span className="flex gap-2 border border-white/20 py-1 px-3 rounded-2xl  cursor-pointer">
                <ChartPieIcon className="text-white/80 h-[24px] w-[24px]" />
                <p className="text-[16px] text-white/80">Themetic Analysis</p>
            </span>
            <span className="flex gap-2  py-1 px-3 rounded-2xl cursor-pointer">
                <ChartPieIcon className="text-white/80 h-[24px] w-[24px]" />
                <p className="text-[16px] text-white/80">Nascent Themes</p>
            </span>
            <span className="flex gap-2 py-1 px-3 rounded-2xl  cursor-pointer">
                <Cog6ToothIcon className="text-white/80 h-[24px] w-[24px]" />
                <p className="text-[16px] text-white/80">Settings</p>
            </span>
        </div>
      </div>
      <div>
        <img className="h-[24px] w-[24px] rounded-full select-none cursor-pointer" src="pfp.jpg" alt="pfp"/>
      </div>
    </div>
  )
};

export default NavBar;
