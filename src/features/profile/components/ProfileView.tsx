import { NVMCard, NVMDivider, NVMTypography } from "@/common/components";
import { LabelValueDisplay } from "@/common/components/LabelValueDisplay";
import { formatDate, getDisplayName, getInitials } from "@/common/utils";
import { useUser } from "@/features/auth";

function displayValue(value: unknown): string {
  if (value == null || value === "") {
    return "";
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value).trim();
  }

  if (typeof value === "object" && "name" in value) {
    return displayValue((value as { name?: unknown }).name);
  }

  return "";
}

export function ProfileView() {
  const { user } = useUser();
  const displayName = getDisplayName(user);
  const avatarUrl = user?.profileUrl;
  const employeeNumber = user?.employeeNumber;

  return (
    <div className="flex flex-col gap-4">
      <NVMTypography variant="h5">Profile Information</NVMTypography>

      <NVMCard className="w-3xl bg-white-pale">
        <div className="flex flex-col gap-5">
          <NVMCard>
            <div className="flex items-center gap-4">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="size-10 rounded-full object-cover bg-primary-50"
                />
              ) : (
                <span className="flex size-20 items-center justify-center rounded-full bg-primary-50 text-body font-medium text-primary-500">
                  {getInitials(displayName)}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate font-medium text-grey-medium">
                  {displayName}
                </p>
                <p className="truncate text-body-sm text-primary">
                  ({employeeNumber ? employeeNumber : "—"})
                </p>
              </div>
            </div>
          </NVMCard>

          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-linear">Personal Information</h3>
            <LabelValueDisplay label="Full Name" value={displayName} />
            <LabelValueDisplay
              label="Phone Number"
              value={displayValue(user?.phoneNumber)}
            />
            <LabelValueDisplay
              label="Email Address"
              value={displayValue(user?.email)}
            />
            <LabelValueDisplay
              label="Date Of Birth"
              value={user?.dateOfBirth ? formatDate(user.dateOfBirth) : ""}
            />
            <LabelValueDisplay
              label="Gender"
              value={displayValue(user?.gender)}
            />
          </div>

          <NVMDivider />

          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-linear">Address</h3>
            <LabelValueDisplay
              label="Division/State"
              value={displayValue(user?.township?.division?.name)}
            />
            <LabelValueDisplay
              label="Township/City"
              value={displayValue(user?.township?.name)}
            />
            <LabelValueDisplay
              label="Address"
              value={displayValue(user?.address1)}
            />
          </div>

          <NVMDivider />

          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-linear">Employee Information</h3>
            <LabelValueDisplay
              label="Employee ID"
              value={displayValue(user?.employeeNumber)}
              valueClassName="text-primary"
            />
            <LabelValueDisplay
              label="Position"
              value={displayValue(user?.position)}
            />
            <LabelValueDisplay label="Rank" value={displayValue(user?.rank)} />
            <LabelValueDisplay
              label="Employee Type"
              value={displayValue(user?.employmentType)}
            />
            <LabelValueDisplay label="Team" value={displayValue(user?.team)} />
            <LabelValueDisplay
              label="Work Location"
              value={displayValue(user?.workLocation)}
              valueClassName="text-success"
            />
            <LabelValueDisplay
              label="Joined Date"
              value={user?.joinedDate ? formatDate(user.joinedDate) : ""}
            />
          </div>
        </div>
      </NVMCard>
    </div>
  );
}
