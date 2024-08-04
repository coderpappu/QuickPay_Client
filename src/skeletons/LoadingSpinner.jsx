
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingSpinner = () => {
    return (
        <FontAwesomeIcon
            icon={faSpinner}
            className="animate-spin text-gray-500"
            size="1x"
        />
    )
}

export default LoadingSpinner;