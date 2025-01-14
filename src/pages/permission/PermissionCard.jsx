import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import BrandCardWrapper from "../../components/company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../components/company/SettingCardHeader";
import {
  useDeleteModuleMutation,
  useGetCompanyIdQuery,
  useGetModuleListQuery,
} from "../../features/api";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import PermissionForm from "./PermissionForm";

const PermissionCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [selectId, setSelectId] = useState(null);
  const { data: moduleList } = useGetModuleListQuery();
  const [deleteModule] = useDeleteModuleMutation();

  const onClose = () => {
    setIsPopupOpen(false);
  };

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectId(id);
  };

  const [hierarchy, setHierarchy] = useState([]);

  useEffect(() => {
    // Convert flat data into a hierarchical structure
    const structuredData = buildHierarchy(moduleList?.data);

    setHierarchy(structuredData);
  }, [moduleList]);

  const { data: companyId } = useGetCompanyIdQuery();

  //   const [deleteAllowanceType] = useDeleteAllowanceTypeMutation();

  //   const {
  //     data: allowanceTypeList,
  //     isLoading,
  //     isError,
  //     error,
  //   } = useGetAllowanceTypeListQuery(companyId);

  const handleDeleteAllowance = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteModule(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("Module deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete module");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="Allowance"
          />
        ),
        {
          duration: Infinity,
        },
      );

    confirm();
  };

  const renderModules = (modules, indent = 0) => {
    return modules.map((module) => (
      <div
        key={module.id}
        style={{ paddingLeft: `${indent * 20}px` }}
        className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
      >
        <div className="w-[20%] dark:text-white">
          <h3>{module.name}</h3>
        </div>
        <div className="w-[20%] dark:text-white">
          <h3>{module.slug}</h3>
        </div>
        <div className="w-[20%] dark:text-white">
          <h3>{module.parentId ? "Yes" : "No"}</h3>
        </div>
        <div className="w-[15%] dark:text-white">
          <div className="flex flex-wrap justify-start gap-2">
            {/* edit button  */}
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-indigo-600 p-2">
              <CiEdit size={20} onClick={() => handleOpen(module.id)} />
            </div>
            {/* delete button  */}
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-center">
              <AiOutlineDelete
                size={20}
                onClick={() => handleDeleteAllowance(module.id)}
              />
            </div>
          </div>
        </div>
        {module.children.length > 0 &&
          renderModules(module.children, indent + 1)}
      </div>
    ));
  };

  return (
    <>
      <BrandCardWrapper>
        <HrmSetupCardHeader
          title="Permission Manager"
          handleOpen={handleOpen}
          isPopupOpen={isPopupOpen}
        />
        <div className="px-6 py-3">
          {/* header  */}
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[20%] dark:text-white">
              <h3>Module Name</h3>
            </div>
            <div className="w-[20%] dark:text-white">
              <h3>Slug</h3>
            </div>
            <div className="w-[20%] dark:text-white">
              <h3>Parent</h3>
            </div>
            <div className="w-[15%] dark:text-white">
              <h3>Action</h3>
            </div>
          </div>

          {/* body  */}
          {renderModules(hierarchy)}

        </div>
        
        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-dark-card">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-dark-border-color dark:border-opacity-5">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Permission
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)} // Close popup
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <PermissionForm moduleId={selectId} onClose={onClose} />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
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

export default PermissionCard;
