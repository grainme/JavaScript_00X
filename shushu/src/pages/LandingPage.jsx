import { Link } from "react-router-dom";
import logo from "../assets/Logo_Trans_V2.png";
import banner from "../assets/clouds.jpg";
import calendar from "../assets/Calendar.png";
import laptop from "../assets/Laptop.jpg";
import FeatureSection from "../components/FeatureSection";
import DefaultFooter from "../components/Footer";

export function LandingPage() {
  return (
    <div className="font-Raleway">
      <div className="flex flex-row justify-between items-center mr-12 ml-12 mt-8">
        <div className="flex flex-row gap-6">
          <Link>Home</Link>
          <Link>Invest</Link>
          <Link>About</Link>
          <Link>Blog</Link>
          <Link>FAQ</Link>
        </div>
        <div>
          <img src={logo} className="h-[4rem] w-[4rem]"></img>
        </div>
        <div className="flex flex-row gap-6 justify-center items-center">
          <Link to="/" className="hover:text-blue-500">
            Login
          </Link>
          <Link
            to="/"
            className="h-9 bg-black text-white flex justify-center items-center p-4 rounded-md"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <div className="flex flex-row ml-[10rem] mt-[7rem] gap-[6rem] items-center">
        <div className="text-7xl font-Bricolage">
          <div className="text-gray-400 flex flex-col justify-start items-start">
            <div className="text-left">where focus</div>
            <div className="text-left">meets collaboration</div>
            <div className="text-left">
              <span className="text-gray-900">effortlessly :)</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-7">
          <div className="h-[19rem] w-[13rem] rounded-3xl bg-black flex items-center justify-center">
            <div
              className="h-[80%] w-[80%] bg-cover bg-center"
              style={{ backgroundImage: `url(${calendar})` }}
            ></div>
          </div>
          <div className="h-[19rem] w-[13rem] flex flex-col gap-7">
            <div className="h-[11rem] w-[13rem] rounded-3xl bg-black flex items-center justify-center">
              <div
                className="h-full w-full rounded-3xl bg-cover bg-center "
                style={{ backgroundImage: `url(${laptop})` }}
              ></div>
            </div>
            <div className="h-[6rem] w-[13rem] rounded-3xl bg-gradient-to-r from-gray-300 to-gray-500 flex items-center justify-center shadow-md">
              <div className="text-white m-3 ml-5 text-[24px] font-Bricolage">
                Keeping Your Team in Sync
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[24rem] m-12 rounded-b-xl overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
      </div>

      <div>
        <FeatureSection />
      </div>
      <DefaultFooter />
    </div>
  );
}
