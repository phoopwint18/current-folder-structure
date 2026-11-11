import NoDataFoundIcon from "@/assets/no-data.svg";
import NVMTypography from "./custom/NVMTypography";

type NoDataFoundProps = {
  src?: string;
  title?: string;
  description?: string;
};

const NoDataFound = ({
  src,
  title = "No Data Found",
  description,
}: NoDataFoundProps) => {
  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      <img
        src={src || NoDataFoundIcon}
        alt="No Data Found"
        className="size-25"
      />
      <NVMTypography variant="body" className="font-medium text-grey-medium">
        {title}
      </NVMTypography>
      {description ? (
        <NVMTypography
          variant="bodySm"
          className="text-center text-sm text-grey-light"
        >
          {description}
        </NVMTypography>
      ) : null}
    </div>
  );
};

export default NoDataFound;
