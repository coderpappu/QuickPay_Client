import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  useGetCompaniesQuery,
  useSetCompanyIdMutation,
  useGetCompanyIdQuery,
} from "../features/api";

import { Link } from "react-router-dom";
import { useState } from "react";

export default function PopUp() {
  const {
    data: companiesData,
    isLoading,
    isError,
    error,
  } = useGetCompaniesQuery();

  const [setCompanyId] = useSetCompanyIdMutation();

  const { data: companyId } = useGetCompanyIdQuery();

  const [open, setOpen] = useState(companyId == null);

  const handleActivate = (id) => {
    setCompanyId(id);
    setOpen(false);
  };

  let content;

  if (isLoading && !isError)
    content = (
      <div className="flex items-center justify-between">
        <h3 className="mb-0">Loading...</h3>
      </div>
    );

  if (!isLoading && isError) {
    if (error.status == 404) {
      content = (
        <div className="flex items-center justify-between">
          <h3 className="mb-0">Create your first company</h3>
          <Link to="/company/create">
            <button className="bg-[#6D28D9] text-white font-semibold py-3 px-2 rounded text-xs">
              Add Company
            </button>
          </Link>
          <button
            className="bg-red-500 text-white font-semibold py-3 px-2 rounded text-xs "
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>
      );
    } else {
      content = (
        <div className="flex items-center justify-between">
          <h3 className="mb-0">{error?.data?.message}</h3>
        </div>
      );
    }
  }

  if (!isLoading & !isError) {
    const { data } = companiesData;
    content =
      data?.length > 0 &&
      data?.map((company) => (
        <tr key={company.id}>
          <td className="py-2 px-4 text-center">{company.company_name}</td>
          <td className="py-2 px-4 text-center">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm w-28"
              onClick={() => handleActivate(company.id)}
            >
              Select
            </button>
          </td>
        </tr>
      ));
  }

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:translate-y-0 sm:scale-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900 flex justify-between items-center"
                  >
                    Select Your Company
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </DialogTitle>
                  <div className="mt-7 w-full">
                    <table className="min-w-full bg-white">
                      <tbody>{content}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
