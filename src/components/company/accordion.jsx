// @ts-nocheck
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";
import { cn } from "../../utils/uiSetup";

const AccordionContext = React.createContext({});
const useAccordion = () => React.useContext(AccordionContext);

export function AccordionContainer({ children, className }) {
  return (
    <div className={cn("grid grid-cols-2 gap-1", className)}>{children}</div>
  );
}
export function AccordionWrapper({ children }) {
  return <div>{children}</div>;
}

export function Accordion({ children, multiple, defaultValue }) {
  const [activeIndex, setActiveIndex] = React.useState(
    multiple ? (defaultValue ? [defaultValue] : []) : [defaultValue]
  );

  function onChangeIndex(value) {
    setActiveIndex((currentActiveIndex) => {
      if (!multiple) {
        return value === currentActiveIndex ? null : value;
      }

      if (currentActiveIndex.includes(value)) {
        return currentActiveIndex.filter((i) => i !== value);
      }

      return [...currentActiveIndex, value];
    });
  }

  return React.Children.map(children, (child) => {
    const value = child.props.value;
    const isActive = multiple
      ? Array.isArray(activeIndex) && activeIndex.includes(value)
      : Array.isArray(activeIndex)
        ? activeIndex[0].includes(value)
        : activeIndex === value;

    return (
      <AccordionContext.Provider value={{ isActive, value, onChangeIndex }}>
        <>{child}</>
      </AccordionContext.Provider>
    );
  });
}

export function AccordionItem({ children, value }) {
  const { isActive } = useAccordion();

  return (
    <div
      className={`rounded-lg overflow-hidden mb-2 border border-dark-border-color  dark:border-none${
        isActive
          ? "active dark:border-[#656fe2]  border-dark-box  dark:bg-[#E0ECFB] bg-light-bg"
          : "  "
      }
    `}
      value={value}
    >
      {children}
    </div>
  );
}
export function AccordionHeader({ children, icon, isEnabled, onToggle }) {
  const { isActive, value, onChangeIndex } = useAccordion();

  return (
    <motion.div
      className={`p-4 cursor-pointer transition-all font-medium text-sm dark:text-white text-black dark:bg-dark-box dark:hover:text-white hover:text-black flex justify-between items-center ${
        isActive ? "active bg-[#fff]" : "dark:bg-[#11112b]"
      }`}
      onClick={() => onChangeIndex(value)}
    >
      {children}

      <div className="flex gap-3 items-center">
        <label className="inline-flex items-center cursor-pointer">
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-2 items-center">
            Enable
          </span>

          <input
            type="checkbox"
            className="sr-only peer"
            checked={isEnabled}
            onClick={() => {
              onToggle(!isEnabled); // Toggle the value
            }}
          />
          <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        {icon ? (
          <div
            className={`${
              isActive ? "rotate-90" : "rotate-0"
            } transition-transform bg-white p-1 rounded-full`}
          >
            {icon}
          </div>
        ) : (
          <ChevronDown
            className={`${
              isActive ? "rotate-180" : "rotate-0"
            } transition-transform`}
          />
        )}
      </div>
    </motion.div>
  );
}
export function AccordionPanel({ children }) {
  const { isActive } = useAccordion();

  return (
    <AnimatePresence initial={true}>
      {isActive && (
        <motion.div
          initial={{ height: 0, overflow: "hidden" }}
          animate={{ height: "auto", overflow: "hidden" }}
          exit={{ height: 0 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className={` bg-[#fff] dark:bg-dark-box 
          `}
        >
          <motion.article
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
            exit={{
              clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            }}
            transition={{
              type: "spring",
              duration: 0.4,
              bounce: 0,
            }}
            className={`p-3 bg-transparent text-black dark:text-dark-text-color text-sm `}
          >
            {children}
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
