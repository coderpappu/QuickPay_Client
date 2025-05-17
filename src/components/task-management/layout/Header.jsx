import { Bell, Moon, Sun, User } from "lucide-react";

const Header = ({
  user,
  isDarkMode,
  toggleDarkMode,
  notificationCount = 0,
}) => {
  return (
    <header className="border-b border-gray-200 bg-white px-4 py-3 md:px-6 dark:border-gray-700 dark:bg-dark-box">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-dark-text-color">
            Task Management
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="relative">
            <button className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={20} className="text-gray-600 dark:text-gray-300" />
              )}
            </div>
            <span className="hidden text-sm font-medium text-gray-700 md:block dark:text-gray-300">
              {user.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
