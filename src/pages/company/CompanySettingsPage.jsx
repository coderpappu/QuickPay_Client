import { useParams } from "react-router-dom";
import CompanyForm from "./CompanyForm";

const CompanySettingsPage = () => {
  let { id } = useParams();

  let h1 = "Add company";
  if (id != null) {
    h1 = "Update company";
  }
  return (
    <div className="w-full h-screen bg-[#FCFCFC] dark:bg-dark-card py-2 px-4">
      <h1 className="text-2xl my-4 font-bold dark:text-dark-heading-color">
        {h1}
      </h1>

      <div className="creation-form">
        <CompanyForm />
      </div>
    </div>
  );
};

export default CompanySettingsPage;
