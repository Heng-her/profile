import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaPhone,
  FaChevronLeft,
} from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import { getUserByUsername, incrementView } from "../../components/auth";
import { useParams } from "react-router-dom";
import { useTranslation } from "../../components/TranslationContext";
import Header from "../../components/Header";
interface ViewProfile {
  id: number;
  user_id: string;
  view_count: number;
}

interface Contact {
  id: number;
  type: string;
  value: string;
  user_id: string;
  created_at: string;
}

interface SocialLink {
  id: number;
  url: string;
  user_id: string;
  platform: string;
  created_at: string;
}

interface ProfileData {
  id: string;
  auth_id?: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  bio: string;
  profile_image: string;
  role: string;
  created_at: string;
  view_profile: ViewProfile | any;
  contacts: Contact[];
  social_links: SocialLink[];
}

const UserProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState("");
  const { username } = useParams<{ username: string }>();
  const { t } = useTranslation();
  // const navigate = useNavigate();
  // const [showupdate, setShowupdate] = useState(false);
  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserByUsername(username || "");
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchProfile();
  }, [username]);
  useEffect(() => {
    if (!profile?.id) return;

    const key = `viewed_${profile.id}`;

    // if already viewed on this device → stop
    if (localStorage.getItem(key)) return;
    window.location.replace("")
    incrementView(profile.id);
    localStorage.setItem(key, "true");
  }, [profile]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getSocialIcon = (platform: string) => {
    const iconClass = "text-2xl";

    switch (platform.toLowerCase()) {
      case "facebook":
        return <FaFacebook className={`${iconClass} text-blue-600`} />;
      case "instagram":
        return <FaInstagram className={`${iconClass} text-pink-600`} />;
      case "tiktok":
        return <FaTiktok className={`${iconClass} text-black`} />;
      case "youtube":
        return <FaYoutube className={`${iconClass} text-red-600`} />;
      case "twitter":
        return <FaTwitter className={`${iconClass} text-blue-400`} />;
      case "linkedin":
        return <FaLinkedin className={`${iconClass} text-blue-700`} />;
      case "github":
        return <FaGithub className={`${iconClass}`} />;
      default:
        return null;
    }
  };

  const getContactIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "phone":
        return <FaPhone className="text-blue-500 text-xl" />;
      case "telegram":
        return <FaTelegram className="text-blue-500 text-xl" />;
      default:
        return null;
    }
  };

  if (error)
    return (
      <div className="text-red-500 p-4 text-center place-self-center flex flex-col justify-center items-center">
        <span>{error}</span>
        <br />
        <a className="p-4 py-2 w-24 rounded-sm bg-blue-500 text-white" href="/">
          Back
        </a>
      </div>
    );
  if (!profile)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <>
      <Header />

      <div className="min-h-screen">
        {/* {showupdate == true && <div>hellos</div>} */}
        <div className="max-w-2xl mx-auto min-h-screen">
          {/* Profile Image and Info */}
          <div className="flex flex-col items-center pt-4 px-4">
            <div className="w-36 h-36 rounded-full overflow-hidden mb-4">
              <img
                src={profile.profile_image || "/profile2.png"}
                alt={`${profile.firstname} ${profile.lastname}`}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-3xl font-bold  mb-1">
              {profile.firstname} {profile.lastname}
            </h2>

            <p className="mb-4">@{profile.username}</p>

            <p className="text-center px-6">{profile.bio}</p>
          </div>

          {profile.contacts.length > 0 && (
            <>
              <div className="px-4 mb-6 mt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold khmer-regular">
                    {/* {translations[lang].contact} */}
                    {t("contact")}
                  </h3>

                  <div className="relative">
                    <div className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-30"></div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">
                      {profile.view_profile?.view_count || "0"}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {profile.contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className=" border border-gray-200 rounded-2xl p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        {getContactIcon(contact?.type)}
                        <span className=" text-lg">{contact.value}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(contact.value)}
                        className="text-blue-500 p-2"
                      >
                        <IoCopyOutline className="text-2xl" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Socials Section */}
          {profile.social_links.length > 0 && (
            <div className="px-4 pb-8">
              <h3 className="text-xl font-bold khmer-regular mb-4">
                {t("socials")}
              </h3>
              <div className="space-y-3">
                {profile.social_links?.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" border border-gray-200 rounded-2xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {getSocialIcon(social.platform)}
                      <span className=" text-lg capitalize">
                        {social.platform}
                      </span>
                    </div>
                    <FaChevronLeft className="text-gray-400 rotate-180" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
