import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { BsFileEarmarkPostFill, BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { IoIosTimer } from "react-icons/io";
import {
  IoAlertCircleOutline,
  IoLanguageOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { LiaFaxSolid } from "react-icons/lia";
import { PiAddressBookThin } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/company/Button";
import ProfileSection from "../../components/company/ProfileSection";
import {
  useGetbrandQuery,
  useGetCompanyDetailsQuery,
  useGetCompanyIdQuery,
  useGetEmailSettingQuery,
} from "../../features/api";
import ProfileSkeleton from "../../skeletons/ProfileSkeleton";
import ErrorMessage from "../../utils/ErrorMessage";

const CompanyPofile = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState("1");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // handle function for button state
  const handleSelect = (id) => {
    setSelected(id);
  };

  const { data, isLoading, isError, error } = useGetCompanyDetailsQuery(id);
  const { data: companyId } = useGetCompanyIdQuery();
  const { data: brandDetails } = useGetbrandQuery(companyId);
  const { data: emailData } = useGetEmailSettingQuery(companyId);

  let content = null;
  if (isLoading && !isError) content = <ProfileSkeleton />;
  if (!isLoading && isError)
    content = <ErrorMessage message={error?.message} />;

  if (!isLoading && !isError && data) {
    const {
      id,
      userid,
      company_name,
      address,
      country,
      city,
      state,
      postal_code,
      email,
      phone_number,
      mobile_number,
      fax,
      website_url,
      data_formate,
      timezone,
      language,
      currency_code,
      currency_symbol,
      logo,
      createdAt,
      updatedAt,
    } = data.data;

    const dateGet = new Date(createdAt);

    const formattedDate = format(dateGet, "MMMM d, yyyy, h:mm:ss a");

    content = (
      <>
        {/* first Header section  */}
        <div className="mx-5 mb-2 mt-5 flex w-full flex-wrap justify-between rounded-md bg-white p-5 dark:bg-dark-card">
          <div className="flex w-full flex-wrap justify-between">
            {" "}
            <div className="mr-4 h-[120px] w-[120px]">
              {/* company logic change only for this time  */}
              <img
                src={
                  isDarkMode
                    ? brandDetails?.data?.darkImageUrl
                    : brandDetails?.data?.lightImageUrl
                }
                alt="company logo"
                className="rounded-full"
              />
            </div>
            <div className="w-[78%]">
              <h1 className="font-poppins text-2xl font-semibold dark:text-dark-heading-color">
                {company_name}
              </h1>
              <h3 className="mt-1 text-[15px] font-medium text-[#686767] dark:text-dark-text-color">
                {address}
              </h3>
              <h3 className="text-[15px] font-medium text-[#686767] dark:text-dark-text-color">
                {city + ", " + country}
              </h3>
              <h3 className="text-[15px] font-medium text-[#686767] dark:text-dark-text-color">
                {`Website : ${website_url}`}
              </h3>
            </div>
            <div className="mr-2 flex h-[40px] w-[40px] cursor-pointer flex-col items-center justify-center rounded-full bg-[#85858512] align-middle dark:bg-dark-box">
              <Link to={`/company/update/${id}`}>
                <FiEdit className="dark:text-dark-text-color" />
              </Link>
            </div>
          </div>
        </div>

        {/* toogle button for section toggle  */}
        <div className="mx-5 flex w-full flex-wrap rounded-md bg-white dark:bg-dark-card">
          <Button
            buttonid="1"
            isActive={selected == "1"}
            handleSelect={() => handleSelect(1)}
            title={"Profile"}
          />
          <Button
            buttonid="2"
            isActive={selected == "2"}
            handleSelect={() => handleSelect(2)}
            title={"Report"}
          />
          <Button
            buttonid="3"
            isActive={selected == "3"}
            handleSelect={() => handleSelect(3)}
            title={"Notice"}
          />
          <Button
            buttonid="4"
            isActive={selected == "4"}
            handleSelect={() => handleSelect(4)}
            title={"Info"}
          />
        </div>

        <div className="mx-5 mb-2 mt-5 flex w-full flex-wrap justify-between rounded-md bg-white p-5 dark:bg-dark-card">
          {/* Profile Section  */}
          {selected == "1" ? (
            <>
              <div className="w-[50%]">
                <h1 className="mb-2 font-semibold dark:text-dark-heading-color">
                  Basic Information
                </h1>

                <ProfileSection
                  id={data.data.id}
                  icon={<CiMail className="dark:text-dark-text-color" />}
                  title={emailData?.data?.address}
                />
                <ProfileSection
                  id={data.data.id}
                  icon={<BsTelephone className="dark:text-dark-text-color" />}
                  title={phone_number}
                />
                <ProfileSection
                  id={data.data.id}
                  icon={
                    <PiAddressBookThin className="dark:text-dark-text-color" />
                  }
                  title={address}
                />
                <ProfileSection
                  id={data.data.id}
                  icon={
                    <IoLocationOutline className="dark:text-dark-text-color" />
                  }
                  title={`Created on ${formattedDate}`}
                />
              </div>
              <div className="w-[50%] border-l pl-3">
                <h1 className="mb-2 font-semibold dark:text-dark-heading-color">
                  Company Settings & Info
                </h1>
                <ProfileSection
                  id={data.data.id}
                  icon={
                    <BsFileEarmarkPostFill className="dark:text-dark-text-color" />
                  }
                  title={`Post Code : ${postal_code}`}
                />
                <ProfileSection
                  id={data.data.id}
                  icon={<IoIosTimer className="dark:text-dark-text-color" />}
                  title={timezone}
                />
                <ProfileSection
                  id={data.data.id}
                  icon={<LiaFaxSolid className="dark:text-dark-text-color" />}
                  title={fax}
                />
                <ProfileSection
                  id={data.data.id}
                  icon={
                    <IoLanguageOutline className="dark:text-dark-text-color" />
                  }
                  title={language}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-wrap items-center">
              <IoAlertCircleOutline className="mr-3 text-[red]" />{" "}
              <lebel>No data available </lebel>
            </div>
          )}
        </div>
      </>
    );
  }
  return (
    <div>
      <h2 className="dark:text-dark-text-color"> Company / Profile</h2>
      {content}
    </div>
  );
};

export default CompanyPofile;
