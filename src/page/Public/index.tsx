import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdSchool, MdWork, MdLocationOn, MdArrowBack, MdEdit } from "react-icons/md";

export default function PublicPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white">
      {/* Top App Bar */}
      <div className="flex items-center justify-between p-4 sticky top-0 z-10 bg-background-light dark:bg-background-dark/80 backdrop-blur-sm">
        <MdArrowBack className="text-2xl text-[#111418] dark:text-white" />
        <h2 className="text-lg font-bold flex-1 text-center">Profile</h2>
        <button className="p-2 rounded-full bg-transparent text-[#111418] dark:text-white">
          <MdEdit className="text-2xl" />
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4 p-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-linear-to-tr from-blue-500 to-purple-600 blur-xl opacity-40"></div>
          <div
            className="relative w-32 h-32 rounded-full bg-cover bg-center ring-4 ring-white/10"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJZhk01lQxq26rmyMtKdgtXaPfDsuAD7oocaMpG599vY24XGC9kfrfec6S53qTRYnBdboVOLPmsXHEB6rZzAXLQz3y9BBumFgIAXxtSaXoFgVo2HVfyBaejJO2GhKRXzHEW_-leAT9X-HamtdpqrAuthI5IxMHFDQSls4lRcpKYCGEg6XpDeaRK0OM4ryqbJu8kSSJb-6pxJEPVTpLASWNlzBaEgqzQjHQrFTxZoiXq2FAMg3-GyNCo6mi4euDxL7Lnzvzmeioy5ft')",
            }}
          ></div>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">@janedoe</p>
          <p className="text-base text-[#617589] dark:text-gray-400">Jane Doe</p>
        </div>
      </div>

      {/* Basic Info */}
      <div className="space-y-2  dark:bg-background-dark/50 rounded p-2 shadow-sm mx-4">
        <div className="flex items-center gap-4 px-4 py-3 min-h-14">
          <MdSchool className="text-2xl bg-background-light dark:bg-background-dark/80 p-2 rounded-lg" />
          <p className="flex-1 truncate">Studies at University of Design</p>
        </div>
        <div className="flex items-center gap-4 px-4 py-3 min-h-14">
          <MdWork className="text-2xl bg-background-light dark:bg-background-dark/80 p-2 rounded-lg" />
          <p className="flex-1 truncate">Works at Creative Tech Inc.</p>
        </div>
        <div className="flex items-center gap-4 px-4 py-3 min-h-14">
          <MdLocationOn className="text-2xl bg-background-light dark:bg-background-dark/80 p-2 rounded-lg" />
          <p className="flex-1 truncate">Lives in San Francisco, CA</p>
        </div>
      </div>

      {/* About */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">About</h3>
        <div className=" dark:bg-background-dark/50 p-4 rounded shadow-sm">
          <p className="text-[#617589] dark:text-gray-300">
            A passionate UI/UX designer with a knack for creating intuitive and beautiful user experiences. Currently crafting the future of mobile interfaces at Creative Tech Inc.
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {["UI/UX Design", "Prototyping", "iOS Development", "Figma", "User Research"].map(skill => (
            <span key={skill} className="bg-primary/20 text-primary font-medium px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Social Media */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">Socials</h3>
        <div className="flex gap-4 justify-center">
          <a href="#" className="text-xl text-[#111418] dark:text-white"><FaGithub /></a>
          <a href="#" className="text-xl text-[#111418] dark:text-white"><FaLinkedin /></a>
          <a href="#" className="text-xl text-[#111418] dark:text-white"><FaInstagram /></a>
          <a href="#" className="text-xl text-[#111418] dark:text-white"><FaTwitter /></a>
        </div>
      </div>

      {/* Portfolio */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">Portfolio</h3>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {[
            {
              title: "Music App Redesign",
              desc: "A concept for a modern music streaming app.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMclfpj60un2XBiD0afkkywFuEmAlygg05t3h5q-BVG6BayHefj5eko4zBhh8FNpTcVhOlDvLdB8re2h2U83_aD7jaMwOd8XW8hAStFypYq2c37pJ53sD152H-eIZ_o7RrzL8wkbsB6P-gHuABZ8BRISVwS17mvMYVUNvZCbRaLHz2zwlIW8K2FxJIchV250CtVFgqbYFlUDHlHXhlHMpaHSujoRtuoZTXwKzr5OSqxDUFjkGUXAt8zPYJ0paF5xMNLvQPXB7MntHh",
            },
            {
              title: "E-commerce Website",
              desc: "An online store for a local coffee brand.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjU4Rz7UX_j5h4LawZ4h5eeHbBcLyfuTVur50B-vGB3t8BZaDh2iFe2PIKn7zzEq5pOrPYRWWhepSKrGgUgNvrsPEGSA7Y2StmkBAWoLUyc3G3OvEzktUKYfQzHfkhEyGNwbCxH-zJci1Os1U41t02jY2CgTBt8n1klHxrGBhNaxDB4AJ6DCUIMKfjZo7ac-ZyWSqYr3C-mctgjGYC33ia2xpReCdayXOXomxLmj43di5Rq9sTwPkjWAjPFIJ412TD0sge7rHqCZWs",
            },
          ].map((project) => (
            <div key={project.title} className="shrink-0 w-64 space-y-2">
              <div
                className="aspect-video w-full bg-cover bg-center rounded"
                style={{ backgroundImage: `url('${project.img}')` }}
              ></div>
              <h4 className="font-semibold">{project.title}</h4>
              <p className="text-sm text-[#617589] dark:text-gray-400">{project.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Button */}
      <div className="p-4 sticky bottom-0 bg-background-light dark:bg-background-dark/80 backdrop-blur-sm">
        <button className="w-full bg-primary text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/30">
          Contact Me
        </button>
      </div>
    </div>
  );
}
