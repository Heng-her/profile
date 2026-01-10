import { type Sex, type RegisterData } from "../../components/chat/register";
import NestedCommentSystem from "../../components/chat/NestedCommentSystem";
import RegisterForm from "../../components/chat/register";
import { comment } from "../../service/supabase";
import { encryptData, decryptData } from "../../util/crypto";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { gradients } from "../../assets/style";
// import CircularRadio from "../../components/circleselect";
import CircularMenuPopup from "../../components/circleselect";
import { useNavigate } from "react-router-dom";
const ROUTE_MAP: Record<string, string> = {
  Home: "/",
  Settings: "/settings",
  About: "/about",
  Support: "/support",
};

export default function Chat() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"register" | "update">("register");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    username: string;
    age: number;
    sex: string;
  } | null>(null);
  const getCurrentUserData = () => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        return decryptData(userCookie);
      } catch {
        return null;
      }
    }
    return null;
  };
  // Check login status & user data on mount
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const decrypted = decryptData(userCookie);
        if (decrypted?.id && decrypted.username) {
          setCurrentUser(decrypted);
          setIsLoggedIn(true);
          return;
        }
      } catch (e) {
        console.warn("Failed to parse user cookie", e);
      }
    }
    setCurrentUser(null);
    setIsLoggedIn(false);
  }, []);

  const handleRegistration = async (data: {
    username: string;
    sex: string;
    age: number;
  }) => {
    setLoading(true);

    const payload = {
      username: data.username,
      age: data.age,
      sex: data.sex === "Other" ? "O" : data.sex,
      online: true,
    };

    try {
      const { error, data: res } = await comment
        .from("users")
        .insert([payload])
        .select();

      if (error) throw error;

      const user = res[0];
      const encryptedUser = encryptData({
        id: user.id,
        username: user.username,
        age: user.age,
        sex: user.sex,
      });

      Cookies.set("user", encryptedUser, {
        expires: 365,
        secure: true,
        sameSite: "strict",
      });

      // Update local state
      setCurrentUser({
        id: user.id,
        username: user.username,
        age: user.age,
        sex: user.sex,
      });
      setIsLoggedIn(true);

      alert("Registration Successful!");
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Supabase error:", error);

      if (error.code === "23505" && error.message.includes("unique_username")) {
        const newUsername = prompt(
          "Username already exists. Enter a new username:"
        );
        if (newUsername) {
          handleRegistration({ ...data, username: newUsername });
        }
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: {
    id: string;
    username: string;
    sex: string;
    age: number;
  }) => {
    setLoading(true);

    if (!data.id) {
      alert("User ID is missing. Please log in again.");
      setLoading(false);
      return;
    }

    const currentUser = getCurrentUserData(); // ← Should include id & old username
    if (!currentUser) {
      alert("Session expired. Please log in again.");
      setLoading(false);
      return;
    }

    // Only include username in update if it changed
    const payload: any = {
      age: data.age,
      sex: data.sex === "Other" ? "O" : data.sex,
      online: true,
    };

    // Allow username update if different
    if (data.username !== currentUser.username) {
      payload.username = data.username;
    }

    try {
      const { error, data: updatedUsers } = await comment
        .from("users")
        .update(payload)
        .eq("id", data.id) // ✅ CORRECT: Use ID to locate user
        .select();

      if (error) throw error;
      if (!updatedUsers || updatedUsers.length === 0) {
        throw new Error("User not found. Please log in again.");
      }

      const updatedUser = updatedUsers[0];

      // Update cookie with possibly new username
      const newUserState = {
        id: updatedUser.id,
        username: updatedUser.username, // ← could be new
        age: updatedUser.age,
        sex: updatedUser.sex,
      };

      const encryptedUser = encryptData(newUserState);
      Cookies.set("user", encryptedUser, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      setCurrentUser(newUserState); // Update local state
      alert("Profile Updated Successfully!");
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Update error:", error);

      // Handle duplicate username (same as registration!)
      if (error.code === "23505" && error.message.includes("unique_username")) {
        const newUsername = prompt(
          "Username already taken. Enter a different one:"
        );
        if (newUsername) {
          handleUpdate({ ...data, username: newUsername });
        }
      } else {
        alert(`Update failed: ${error.message || "Unknown error."}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const index = currentUser?.id
    ? parseInt(currentUser.id, 36) % gradients.length // base36 converts alphanumeric string to number
    : 0;
  // const [dialSelection, setDialSelection] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const openDialMenu = (mode: "register" | "update") => {
    setIsOpen(true); // This opens the Circular Dial
    setModalMode(mode); // Set the default mode
  };
  const handleConfirmFromDial = (selection: string) => {
    setIsOpen(false);

    // Route-based navigation
    if (ROUTE_MAP[selection]) {
      navigate(ROUTE_MAP[selection]);
      return;
    }

    // Auth-based actions
    if (selection === "Register") {
      setModalMode("register");
      setIsModalOpen(true);
    }

    if (selection === "Update") {
      setModalMode("update");
      setIsModalOpen(true);
    }
  };
  // Decide which button to show
  const renderActionButton = () => {
    return (
      <button
        onClick={() => openDialMenu(isLoggedIn ? "update" : "register")}
        className={`flex items-center justify-center rounded-full w-10 h-10 text-sm shrink-0 ring-2 ring-white dark:ring-slate-700 shadow-sm text-white font-bold`}
        style={{
          backgroundImage: gradients[index],
        }}
      >
        {isLoggedIn ? (
          <>
            {currentUser?.username
              ? currentUser.username.slice(0, 2).toUpperCase()
              : ""}
          </>
        ) : (
          <>
            <FaRegUserCircle size={30} />
          </>
        )}
      </button>
    );
  };

  return (
    <>
      {isOpen && (
        <CircularMenuPopup
          isLoggedIn={isLoggedIn}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirmFromDial}
        />
      )}

      <NestedCommentSystem renderActionButton={renderActionButton} />

      {/* <div className="flex gap-4 mt-4">{renderActionButton()}</div> */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md">
            <RegisterForm
              mode={modalMode}
              initialData={
                modalMode === "update"
                  ? {
                      id: currentUser?.id || "",
                      username: currentUser?.username || "",
                      sex: (currentUser?.sex === "O"
                        ? "Other"
                        : currentUser?.sex || "") as Sex,
                      age: currentUser?.age || 0,
                    }
                  : undefined
              }
              loading={loading}
              onRegister={(data: RegisterData) => {
                if (modalMode === "register") {
                  handleRegistration(data);
                } else if (data.id) {
                  handleUpdate(
                    data as {
                      id: string;
                      username: string;
                      sex: string;
                      age: number;
                    }
                  );
                }
              }}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
