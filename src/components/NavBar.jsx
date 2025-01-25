import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <Link to='/'>
        <h1 className="text-3xl font-bold ml-5 mt-1 cursor-pointer">
          <span className="text-black">SpeakX</span>{" "}
          <span className="text-[#fe913a]">Search</span>
        </h1>
      </Link>
      <nav className="text-center">
        <ul className="flex flex-row justify-center m-2 gap-3 font-semibold cursor-pointer">
          <Link to='/'><li>HOME</li></Link>
          <Link to='/mcqpage'><li>MCQ</li></Link>
          <Link to='/read_alongpage'><li>READ_ALONG</li></Link>
          <Link to='/content_onlypage'><li>CONTENT_ONLY</li></Link>
          <Link to='/anagrampage'><li>ANAGRAM</li></Link>
        </ul>
      </nav>
    </div>
  );
};


export default NavBar;