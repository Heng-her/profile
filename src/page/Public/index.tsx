import {
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import {
  MdSchool,
  MdWork,
  MdLocationOn,
  MdArrowBack,
  MdEdit,
} from "react-icons/md";
import profileData from "../../data/profile.json";
import Projects from "../../components/Portfolio";
import { Helmet } from "react-helmet";
const iconMap = {
  MdSchool: <MdSchool size={28} />,
  MdWork: <MdWork size={28} />,
  MdLocationOn: <MdLocationOn size={28} />,
};

const socialIconMap: Record<
  "Github" | "Facebook" | "Instagram" | "Tiktok",
  JSX.Element
> = {
  Github: <FaGithub />,
  Facebook: <FaFacebook />,
  Instagram: <FaInstagram />,
  // Telegram: <FaTelegram />,
  Tiktok: <FaTiktok />,
};

export default function PublicPage() {
  const { profile, basicInfo, skills, projects, socialLinks } = profileData;
  return (
    <>
      <Helmet>
        <title>Her Bunheng</title>
        <meta
          name="description"
          content="Jane Doe is a UI/UX designer at Creative Tech Inc. specializing in user interfaces and prototypes."
        />
        <meta property="og:image" content={profile.profileImageUrl} />
      </Helmet>
      <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white">
        {/* Top App Bar */}
        <div className="flex items-center justify-between p-4 sticky top-0 z-20 bg-background-light dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <MdArrowBack className="text-2xl text-[#111418] dark:text-white cursor-pointer" />
          <h2 className="text-xl  flex-1 text-center">សួរស្ដី</h2>
          <button className="p-2 rounded-full bg-transparent text-[#111418] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <MdEdit className="text-2xl" />
          </button>
        </div>

        <div className="py-8 grid grid-cols-1 lg:grid-cols-3">
          {/* Left Sidebar: Profile Info */}
          <div className="flex flex-col items-center lg:mt-5 gap-2">
            {/* Profile Picture */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-linear-to-tr from-blue-500 to-purple-600 blur-xl opacity-40"></div>
              <div
                className="relative w-40 h-40 rounded-full bg-cover bg-center ring-4 ring-white/10"
                style={{ backgroundImage: `url('${profile.profileImageUrl}')` }}
              ></div>
            </div>
            <div className="text-center lg:text-left mt-6">
              <p className="text-2xl font-bold">{profile.username}</p>
              <p className="text-base text-[#617589] dark:text-gray-400">
                {profile.name}
              </p>
            </div>

            {/* Contact Button */}
            <button className="w-full lg:w-auto bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition">
              Sicial Media
            </button>

            {/* Social Media */}
            <div className="flex gap-4 justify-center lg:justify-start text-2xl text-[#111418] dark:text-white">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.url}>
                  {socialIconMap[social.platform as keyof typeof socialIconMap]}
                </a>
              ))}
            </div>
          </div>

          {/* Middle: Info Cards */}
          <div className="lg:col-span-2 mt-4 ml-2 flex flex-col gap-6">
            {/* Basic Info */}
            <div className="lg:flex grid">
              {basicInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-background-light dark:bg-background-dark/50 rounded shadow hover:shadow-lg transition"
                >
                  {iconMap[item.icon as keyof typeof iconMap]}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* About */}
            <div>
              <h3 className="text-lg font-bold mb-2">About</h3>
                <p className="text-[#617589] dark:text-gray-300 px-6 text-center lg:text-left">
                  {profile.about}
                </p>
              {/* <div className="p-6 bg-background-light dark:bg-background-dark/50 rounded shadow">
              </div> */}
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-bold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-primary/20 text-primary font-medium px-4 py-2 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <Projects projects={projects} />
          </div>
        </div>
        <div className="p-4 sticky bottom-0 bg-background-light dark:bg-background-dark/80 backdrop-blur-sm">
          {" "}
          <button className="w-full bg-primary font-bold py-4 rounded-lg shadow-lg shadow-primary/30">
            {" "}
            Contact Me{" "}
          </button>{" "}
        </div>
      </div>
    </>
  );
}
