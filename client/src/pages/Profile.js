import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/authAPI";
import Avatar from "../componets/Avatar";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        getProfile().then((data) => {
            setUser(data);
            setName(data.name || "User");
        });
    }, []);

    if (!user) return <div className="dark:text-white">Loading...</div>;

    const displayName = user.name || "User";

    const handleSave = async () => {
        const updatedUser = await updateProfile({ name });
        setUser(updatedUser);
        setIsEdit(false);
    };

    return (
        <div className="max-w-3xl">
            <h1 className="text-2xl font-semibold mb-6 dark:text-white">
                Profile
            </h1>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <Avatar name={displayName} size="large" />

                        <div>
                            {isEdit ? (
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-3 py-2 outline-none"
                                />
                            ) : (
                                <h2 className="text-xl font-semibold dark:text-white">
                                    {displayName}
                                </h2>
                            )}

                            <p className="text-gray-400 dark:text-gray-300">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    {isEdit ? (
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsEdit(false)}
                                className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 dark:text-white"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                className="px-4 py-2 rounded-xl bg-indigo-500 text-white"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEdit(true)}
                            className="px-4 py-2 rounded-xl bg-indigo-500 text-white"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}