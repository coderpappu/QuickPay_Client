import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { PiEyeLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BrandCardWrapper from "../../components/company/BrandCardWrapper";
import { HrmSetupCardHeader } from "../../components/company/SettingCardHeader";
import {
  useDeleteReconciliationMutation,
  useGetReconciliationApplicationsQuery,
} from "../../features/api";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import CardSkeleton from "../../skeletons/card";
import {
  DateConverterFromUTC,
  TimeConverterFromUTC,
} from "../../utils/Converter";
import ErrorMessage from "../../utils/ErrorMessage";
import ReconciliationView from "./ReconciliationViewWithEdit";

const ReconciliationApplicationListCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const companyId = useSelector((state) => state.company.companyId);
  const [deleteReconciliation] = useDeleteReconciliationMutation();

  const handleOpen = (id) => {
    setIsPopupOpen(true);
    setSelectId(id);
  };

  const {
    data: reconciliationList,
    isLoading,
    isError,
    error,
  } = useGetReconciliationApplicationsQuery(companyId);

  const statusColorHandler = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-300 text-black";
      case "APPROVED":
        return "bg-green-500 text-white";
      case "REJECTED":
        return "bg-red-500 text-white";
      default:
        return "text-gray-500";
    }
  };

  const handleDeleteReconciliation = async (id) => {
    toast(
      (t) => (
        <ConfirmDialog
          title="reconciliation"
          onConfirm={async () => {
            toast.dismiss(t.id);
            try {
              await deleteReconciliation(id).then((res) => {
                if (res.error) {
                  toast.error(res.error.data.message);
                } else {
                  toast.success("Reconciliation deleted successfully");
                }
              });
            } catch (error) {
              toast.error(error.message || "Failed to delete reconciliation");
            }
          }}
          onCancel={() => toast.dismiss(t.id)}
        />
      ),
      {
        duration: Infinity,
      },
    );
  };

  let content;

  console.log(reconciliationList?.data);
  if (isLoading) return <CardSkeleton />;
  if (isError) return <ErrorMessage message={error?.data?.message} />;

  if (!isLoading && !isError) {
    content = (
      <>
        {reconciliationList?.data?.map((app, index) => (
          <div
            key={app.id}
            className="flex w-full flex-wrap items-center justify-between border-t border-dark-border-color px-3 py-3 text-[13px] dark:border-opacity-10"
          >
            <div className="w-[3%] dark:text-white">{++index}</div>
            <div className="w-[12%] dark:text-white">
              {app.employee?.employeeId}
            </div>
            <div className="w-[12%] dark:text-white">{app.employee?.name}</div>
            <div className="w-[10%] dark:text-white">
              {DateConverterFromUTC(app.date)}
            </div>
            <div className="w-[10%] dark:text-white">
              {app.approvedCheckIn
                ? TimeConverterFromUTC(app.approvedCheckIn)
                : "N/A"}
            </div>
            <div className="w-[10%] dark:text-white">
              {app.approvedCheckOut
                ? TimeConverterFromUTC(app.approvedCheckOut)
                : "N/A"}
            </div>
            <div className="w-[10%] dark:text-white">{app.reason}</div>
            <div className="w-[10%]">
              <div
                className={`w-24 rounded-full px-2 py-1 text-center text-xs font-bold ${statusColorHandler(app.status)}`}
              >
                {app.status}
              </div>
            </div>
            <div className="flex w-[13%] gap-2">
              <Link to={`/reconciliation/${app.id}`}>
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-green-600 p-2 text-white">
                  <PiEyeLight size={20} />
                </div>
              </Link>
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-indigo-700 p-2 text-white">
                <CiEdit size={20} onClick={() => handleOpen(app.id)} />
              </div>
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm bg-red-500 p-2 text-white">
                <AiOutlineDelete
                  size={20}
                  onClick={() => handleDeleteReconciliation(app.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <BrandCardWrapper>
        <HrmSetupCardHeader
          title="Reconciliation Applications"
          handleOpen={handleOpen}
        />
        <div className="px-6 py-3">
          <div className="flex w-full flex-wrap justify-between rounded-sm bg-light-bg px-3 py-3 text-sm dark:bg-dark-box">
            <div className="w-[3%] dark:text-white">SL</div>
            <div className="w-[12%] dark:text-white">Emp ID</div>
            <div className="w-[12%] dark:text-white">Name</div>
            <div className="w-[10%] dark:text-white">Date</div>
            <div className="w-[10%] dark:text-white">Check In</div>
            <div className="w-[10%] dark:text-white">Check Out</div>
            <div className="w-[10%] dark:text-white">Reason</div>
            <div className="w-[10%] dark:text-white">Status</div>
            <div className="w-[13%] dark:text-white">Action</div>
          </div>
          {content}
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-4xl rounded-lg bg-white p-6 dark:bg-dark-card">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-dark-border-color">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Reconciliation Form
                </h3>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <ReconciliationView
                  selectId={selectId}
                  setIsPopupOpen={setIsPopupOpen}
                />
              </div>
            </div>
          </div>
        )}
      </BrandCardWrapper>
    </>
  );
};

export default ReconciliationApplicationListCard;
