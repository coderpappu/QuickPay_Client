import React from "react";
import { useGetCompanyDetailsQuery } from "../../features/api";
import { useParams, Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import ProfileImg from "../../assets/profile-placeholder.png";
import { useState } from "react";
import Button from "../../components/company/Button";
import { CiMail } from "react-icons/ci";
import ProfileSection from "../../components/company/ProfileSection";
import { BsTelephone } from "react-icons/bs";
import { PiAddressBookThin } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { format } from "date-fns";
import { LiaFaxSolid } from "react-icons/lia";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import { IoLanguageOutline } from "react-icons/io5";
import { IoAlertCircleOutline } from "react-icons/io5";

const CompanyPofile = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState("1");

  // handle function for button state
  const handleSelect = (id) => {
    setSelected(id);
  };

  const { data, isLoading, isError } = useGetCompanyDetailsQuery(id);

  let content = null;
  if (isLoading && !isError) content = "Loading...";
  if (!isLoading && isError) content = "An error occured";
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

    console.log(logo);
    content = (
      <>
        {/* first Header section  */}
        <div className="w-full p-5 mx-5 mt-5 mb-2 rounded-md bg-white flex flex-wrap justify-between ">
          <div className="flex flex-wrap justify-between  w-full">
            {" "}
            <div className="w-[15%] mr-4">
              <img
                src={logo ? logo : ProfileImg}
                alt="profile pic"
                className="w-[120px] h-[120px] rounded-full"
              />
            </div>
            <div className="w-[78%]">
              <h1 className="font-poppins text-2xl font-semibold">
                {company_name}
              </h1>
              <h3 className="text-[15px] font-medium mt-1 text-[#686767]">
                {address}
              </h3>
              <h3 className="text-[15px] font-medium  text-[#686767]">
                {city + ", " + country}
              </h3>
              <h3 className="text-[15px] font-medium  text-[#686767]">
                {`Website : ${website_url}`}
              </h3>
            </div>
            <div className="w-[40px] cursor-pointer  h-[40px] flex flex-col justify-center align-middle items-center rounded-full bg-[#85858512] mr-2">
              <Link to={`/company/update/${id}`}>
                <FiEdit />
              </Link>
            </div>
          </div>
        </div>

        {/* toogle button for section toggle  */}
        <div className="w-full mx-5 rounded-md bg-white flex flex-wrap  ">
          <Button
            buttonid="1"
            isActive={selected == "1"}
            handleSelect={handleSelect}
            title={"Profile"}
          />
          <Button
            buttonid="2"
            isActive={selected == "2"}
            handleSelect={handleSelect}
            title={"Report"}
          />
          <Button
            buttonid="3"
            isActive={selected == "3"}
            handleSelect={handleSelect}
            title={"Notice"}
          />
          <Button
            buttonid="4"
            isActive={selected == "4"}
            handleSelect={handleSelect}
            title={"Info"}
          />
        </div>

        <div className="w-full p-5 mx-5 mt-5 mb-2 rounded-md bg-white flex flex-wrap justify-between ">
          {/* Profile Section  */}
          {selected == "1" ? (
            <>
              <div className="w-[50%]">
                <h1 className="font-semibold mb-2">Basic Information</h1>

                <ProfileSection
                  id={data.data.id}
                  icon={<CiMail />}
                  title={email}
                />
                <ProfileSection
                  id={data.data.id}
                  icon={<BsTelephone />}
                  title={phone_number}
                />
                <ProfileSection
                  id={data.data.id}
                  icon={<PiAddressBookThin />}
                  title={address}
                />
                <ProfileSection
                  id={data.data.id}
                  icon={<IoLocationOutline />}
                  title={`Created on ${formattedDate}`}
                />
              </div>
              <div className="w-[50%] border-l pl-3 ">
                <h1 className="font-semibold mb-2">Company Settings & Info</h1>
                <ProfileSection
                  id={data.data.id}
                  icon={<BsFileEarmarkPostFill />}
                  title={`Post Code : ${postal_code}`}
                />
                <ProfileSection
                  id={data.data.id}
                  icon={<IoIosTimer />}
                  title={timezone}
                />
                <ProfileSection
                  id={data.data.id}
                  icon={<LiaFaxSolid />}
                  title={fax}
                />
                <ProfileSection
                  id={data.data.id}
                  icon={<IoLanguageOutline />}
                  title={language}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-wrap items-center">
              <IoAlertCircleOutline className="text-[red] mr-3" />{" "}
              <lebel>No data available </lebel>
            </div>
          )}
        </div>
      </>
    );
  }
  return (
    <div>
      <h2> Company / Profile</h2>
      {content}
    </div>
  );
};

export default CompanyPofile;
