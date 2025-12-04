import { useState, useEffect } from "react";
import { supabase } from "../service/supabase";
import { updateUser } from "../components/auth";
import {
  addContact,
  updateContact,
  deleteContact,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "../components/auth";
import {
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaLine,
  FaEnvelope,
  FaChevronLeft,
  FaCamera,
  FaPlus,
  FaTrash,
  FaSave,
  FaEdit,
  FaTimes,
} from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

type Contact = {
  id: string;
  type: string;
  value: string;
};

type SocialLink = {
  id: string;
  platform: string;
  url: string;
};

export default function EditProfile() {
  const [profileId, setProfileId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [bio, setBio] = useState("");
  const [profile_image, setprofile_image] = useState("");
  const [username, setusername] = useState("");

  // Contacts
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContactType, setNewContactType] = useState("phone");
  const [newContactValue, setNewContactValue] = useState("");
  const [showAddContact, setShowAddContact] = useState(false);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [editContactValue, setEditContactValue] = useState("");

  // Social links
  const [social, setSocial] = useState<SocialLink[]>([]);
  const [newPlatform, setNewPlatform] = useState("facebook");
  const [newUrl, setNewUrl] = useState("");
  const [showAddSocial, setShowAddSocial] = useState(false);
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null);
  const [editSocialUrl, setEditSocialUrl] = useState("");

  // Load user + contacts + social links
  useEffect(() => {
    async function load() {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;

      const { data } = await supabase
        .from("users")
        .select(
          "id, firstname, lastname, bio, username, profile_image, contacts(*), social_links(*)"
        )
        .eq("auth_id", user.id)
        .single();

      if (data) {
        setProfileId(data.id);
        setFirstname(data.firstname || "");
        setLastname(data.lastname || "");
        setBio(data.bio || "");
        setprofile_image(data.profile_image || "");
        setContacts(data.contacts || []);
        setSocial(data.social_links || []);
        setusername(data.username || "");
      }
    }

    load();
  }, []);

  // Update profile
  async function save() {
    await updateUser(profileId, {
      firstname,
      lastname,
      bio,
      profile_image,
    });
    alert("Profile Updated!");
  }

  // Add new contact
  async function saveNewContact() {
    if (!newContactValue.trim()) return;
    const c = await addContact(profileId, newContactType, newContactValue);
    setContacts([...contacts, c]);
    setNewContactValue("");
    setShowAddContact(false);
  }

  // Start editing contact
  function startEditContact(contact: Contact) {
    setEditingContactId(contact.id);
    setEditContactValue(contact.value);
  }

  // Save contact edit
  async function saveContactEdit(contactId: string) {
    const updated = await updateContact(contactId as any, editContactValue);
    setContacts(contacts.map((x) => (x.id === updated.id ? updated : x)));
    setEditingContactId(null);
    setEditContactValue("");
  }

  // Cancel contact edit
  function cancelContactEdit() {
    setEditingContactId(null);
    setEditContactValue("");
  }

  // Delete contact
  async function handleDeleteContact(contactId: string) {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      await deleteContact(contactId as any);
      setContacts(contacts.filter((x) => x.id !== contactId));
    }
  }

  // Add new social link
  async function saveNewSocial() {
    if (!newUrl.trim()) return;
    const s = await addSocialLink(profileId, newPlatform, newUrl);
    setSocial([...social, s]);
    setNewUrl("");
    setShowAddSocial(false);
  }

  // Start editing social
  function startEditSocial(socialLink: SocialLink) {
    setEditingSocialId(socialLink.id);
    setEditSocialUrl(socialLink.url);
  }

  // Save social edit
  async function saveSocialEdit(socialId: string) {
    const updated = await updateSocialLink(socialId as any, editSocialUrl);
    setSocial(social.map((x) => (x.id === updated.id ? updated : x)));
    setEditingSocialId(null);
    setEditSocialUrl("");
  }

  // Cancel social edit
  function cancelSocialEdit() {
    setEditingSocialId(null);
    setEditSocialUrl("");
  }

  // Delete social
  async function handleDeleteSocial(socialId: string) {
    if (window.confirm("Are you sure you want to delete this social link?")) {
      await deleteSocialLink(socialId as any);
      setSocial(social.filter((x) => x.id !== socialId));
    }
  }

  // Get icon for contact type
  const getContactIcon = (type: string) => {
    const iconClass = "text-xl";
    switch (type) {
      case "phone":
        return <FaPhone className={iconClass} />;
      case "telegram":
        return <FaTelegram className={iconClass} />;
      case "whatsapp":
        return <FaWhatsapp className={iconClass} />;
      case "line":
        return <FaLine className={iconClass} />;
      case "email":
        return <FaEnvelope className={iconClass} />;
      default:
        return <FaPhone className={iconClass} />;
    }
  };

  // Get icon for social platform
  const getSocialIcon = (platform: string) => {
    const iconClass = "text-2xl";
    switch (platform) {
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
        return <FaGithub className={`${iconClass} `} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-2xl mx-auto min-h-screen">
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 sticky top-0 
      dark:bg-background-dark/90 backdrop-blur-sm z-20"
        >
          {/* LEFT */}
          <div className="flex items-center">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg 
          bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
          dark:hover:bg-gray-600 transition"
            >
              <a href={`/${username}`}>
                <FaChevronLeft />
              </a>
            </button>
          </div>

          {/* CENTER */}
          <div className="flex-1 text-center">
            <h2 className="text-xl font-bold">{username}</h2>
          </div>

          {/* RIGHT */}
          <div className="relative flex items-center">
            <button
              onClick={() => save()}
              className="flex items-center gap-2 px-3 py-2 rounded-lg 
          bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
          dark:hover:bg-gray-600 transition"
            >
              Save
            </button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center py-2 px-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
              {profile_image ? (
                <img
                  src={profile_image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {firstname.charAt(0)}
                    {lastname.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition">
              <FaCamera className="text-sm" />
            </button>
          </div>

          <input
            type="text"
            value={profile_image}
            onChange={(e) => setprofile_image(e.target.value)}
            placeholder="Profile image URL"
            className="mt-4 w-full max-w-md px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Info Section */}
        <div className="px-4 pb-6 space-y-4">
          {[
            { label: "First Name", value: firstname, onChange: setFirstname },
            { label: "Last Name", value: lastname, onChange: setLastname },
          ].map((item, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {item.label}
              </label>
              <input
                type="text"
                value={item.value}
                onChange={(e) => item.onChange(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder={`Enter ${item.label.toLowerCase()}`}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        {/* Contacts */}
        <div className="px-4 pb-6 ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Contact Information
            </h2>

            <button
              onClick={() => setShowAddContact(!showAddContact)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition"
            >
              {showAddContact ? <IoClose /> : <FaPlus />}
              {showAddContact ? "Cancel" : "Add"}
            </button>
          </div>

          {showAddContact && (
            <div className="mb-4 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-gray-700">
              <div className="space-y-3">
                <select
                  value={newContactType}
                  onChange={(e) => setNewContactType(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="phone">Phone</option>
                  <option value="telegram">Telegram</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="line">Line</option>
                  <option value="email">Email</option>
                </select>

                <input
                  placeholder="Enter contact value"
                  value={newContactValue}
                  onChange={(e) => setNewContactValue(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <button
                  onClick={saveNewContact}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
                >
                  Save Contact
                </button>
              </div>
            </div>
          )}

          {/* Contact list */}
          <div className="space-y-3">
            {contacts.map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition"
              >
                <div className="text-blue-600 dark:text-blue-400">
                  {getContactIcon(c.type)}
                </div>

                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize mb-1">
                    {c.type}
                  </p>

                  {editingContactId === c.id ? (
                    <input
                      value={editContactValue}
                      onChange={(e) => setEditContactValue(e.target.value)}
                      autoFocus
                      className="w-full bg-white dark:bg-gray-900 border border-blue-500 rounded px-2 py-1 text-gray-900 dark:text-gray-100"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {c.value}
                    </p>
                  )}
                </div>

                {/* Edit/Delete Buttons */}
                <div className="flex items-center gap-2">
                  {editingContactId === c.id ? (
                    <>
                      <button
                        onClick={() => saveContactEdit(c.id)}
                        className="text-green-600 hover:bg-green-50 dark:hover:bg-green-900 p-2 rounded-full"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={cancelContactEdit}
                        className="text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditContact(c)}
                        className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 p-2 rounded-full"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteContact(c.id)}
                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded-full"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {contacts.length === 0 && !showAddContact && (
            <p className="text-center text-gray-400 dark:text-gray-500 py-8">
              No contacts added yet
            </p>
          )}
        </div>

        {/* Social Links Section */}
        <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700 pb-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Social Links
            </h2>

            <button
              onClick={() => setShowAddSocial(!showAddSocial)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
            >
              {showAddSocial ? <IoClose /> : <FaPlus />}
              {showAddSocial ? "Cancel" : "Add"}
            </button>
          </div>

          {/* Add social link */}
          {showAddSocial && (
            <div className="mb-4 p-4 bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-lg">
              <div className="space-y-3">
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="github">GitHub</option>
                </select>

                <input
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="Enter social link URL"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <button
                  onClick={saveNewSocial}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                  Save Social Link
                </button>
              </div>
            </div>
          )}

          {/* Social list */}
          <div className="space-y-3">
            {social.map((s) => (
              <div
                key={s.id}
                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition"
              >
                <div className="text-gray-700 dark:text-gray-300">
                  {getSocialIcon(s.platform)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize mb-1">
                    {s.platform}
                  </p>

                  {editingSocialId === s.id ? (
                    <input
                      value={editSocialUrl}
                      onChange={(e) => setEditSocialUrl(e.target.value)}
                      className="w-full bg-white dark:bg-gray-900 border border-blue-500 rounded px-2 py-1 text-gray-900 dark:text-gray-100"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-gray-100 font-medium text-sm truncate">
                      {s.url}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {editingSocialId === s.id ? (
                    <>
                      <button
                        onClick={() => saveSocialEdit(s.id)}
                        className="text-green-600 hover:bg-green-50 dark:hover:bg-green-900 p-2 rounded-full"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={cancelSocialEdit}
                        className="text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditSocial(s)}
                        className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 p-2 rounded-full"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteSocial(s.id)}
                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded-full"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {social.length === 0 && !showAddSocial && (
            <p className="text-center text-gray-400 dark:text-gray-500 py-8">
              No social links added yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
