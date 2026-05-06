function Avatar({ name = "User", size = "small" }) {
    const letter = name.charAt(0).toUpperCase();

    const colors = [
        "bg-red-500",
        "bg-green-500",
        "bg-blue-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-indigo-500",
    ];

    const index =
        name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
        colors.length;

    const color = colors[index];

    const sizeClass =
        size === "large"
            ? "w-20 h-20 text-3xl"
            : "w-10 h-10 text-base";

    return (
        <div
            className={`${sizeClass} rounded-full flex items-center justify-center text-white font-semibold shadow-md ${color}`}
        >
            {letter}
        </div>
    );
}

export default Avatar;