import React, { useEffect, useState } from "react";
import BrandCardWrapper from "../../components/company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../components/company/SettingCardHeader";
import { useGetModuleListQuery } from "../../features/api";

const UserPermission = () => {
  const { data: moduleList } = useGetModuleListQuery();
  const [hierarchy, setHierarchy] = useState([]);
  const [permissions, setPermissions] = useState({}); // Track permissions for each child module

  useEffect(() => {
    const structuredData = buildHierarchy(moduleList?.data);
    setHierarchy(structuredData);
  }, [moduleList]);

  // Handle permission selection
  const handlePermissionChange = (moduleId, permission) => {
    setPermissions((prev) => ({
      ...prev,
      [moduleId]: permission,
    }));
  };

  // Handle Save button click
  const handleSave = () => {
    console.log("Selected Permissions:", permissions);
    // You can send the `permissions` object to your backend here
  };

  const renderModules = (modules) => {
    return modules.map((module) => (
      <React.Fragment key={module.id}>
        {/* Parent Row (no radio buttons) */}
        {!module.parentId && (
          <div className="flex w-full items-center justify-between border-t border-dark-border-color bg-light-bg px-3 py-3 text-[13px] dark:border-opacity-10 dark:bg-dark-box">
            <div className="w-[40%] font-bold dark:text-white">
              {module.name}
            </div>
            <div className="w-[15%] text-center dark:text-white">None</div>
            <div className="w-[15%] text-center dark:text-white">View</div>
            <div className="w-[15%] text-center dark:text-white">
              View & Edit
            </div>
            <div className="w-[15%] text-center dark:text-white">Admin</div>
          </div>
        )}

        {/* Child Rows (with radio buttons) */}
        {module.children.map((child) => (
          <div
            key={child.id}
            className="flex w-full items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
          >
            <div className="w-[40%] pl-6 dark:text-white">{child.name}</div>
            <div className="w-[15%] text-center">
              <input
                type="radio"
                className="h-4 w-4 appearance-none rounded-full border border-dark-box bg-slate-600 checked:border-blue-500 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name={`permission_${child.id}`}
                onChange={() => handlePermissionChange(child.id, "None")}
                checked={permissions[child.id] === "None"}
              />
            </div>
            <div className="w-[15%] text-center">
              <input
                type="radio"
                className="h-4 w-4 appearance-none rounded-full border border-dark-box bg-slate-600 checked:border-blue-500 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name={`permission_${child.id}`}
                onChange={() => handlePermissionChange(child.id, "View")}
                checked={permissions[child.id] === "View"}
              />
            </div>
            <div className="w-[15%] text-center">
              <input
                type="radio"
                className="h-4 w-4 appearance-none rounded-full border border-dark-box bg-slate-600 checked:border-blue-500 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name={`permission_${child.id}`}
                onChange={() => handlePermissionChange(child.id, "View & Edit")}
                checked={permissions[child.id] === "View & Edit"}
              />
            </div>
            <div className="w-[15%] text-center">
              <input
                type="radio"
                className="h-4 w-4 appearance-none rounded-full border border-dark-box bg-slate-600 checked:border-blue-500 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name={`permission_${child.id}`}
                onChange={() => handlePermissionChange(child.id, "Admin")}
                checked={permissions[child.id] === "Admin"}
              />
            </div>
          </div>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <div className="mt-3">
      <BrandCardWrapper>
        <HrmSetupCardHeader title="User Permissions" />
        <div className="px-6 py-3">
          {/* Header */}
          <div className="flex w-full justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[40%] font-bold dark:text-white">
              Modules & Actions
            </div>
          </div>

          {/* Body */}
          {renderModules(hierarchy)}

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="rounded bg-blue-600 px-6 py-2 font-bold text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </BrandCardWrapper>
    </div>
  );
};

const buildHierarchy = (data) => {
  const map = {};
  const result = [];

  data?.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  data?.forEach((item) => {
    if (item.parentId) {
      map[item.parentId]?.children.push(map[item.id]);
    } else {
      result.push(map[item.id]);
    }
  });

  return result;
};

export default UserPermission;
