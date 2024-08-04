import { useParams } from "react-router-dom";
import SectionForm from "./SectionForm";

const SectionSettings = () => {
    const { id } = useParams();

    let h1 = "Add section";
    if (id != null) {
        h1 = "Update Section";
    }

    return (
        <div className="w-full h-screen bg-[#FCFCFC] p-2 " >
            <div className="py-4 md:w-full lg:w-[400px]  m-auto">

                <h1 className="text-2xl my-4 font-bold">
                    {h1}
                </h1>

                <div className="creation-form ">

                    <SectionForm />

                </div>
            </div>

        </div>
    )

}

export default SectionSettings;