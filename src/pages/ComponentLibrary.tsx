import { type ReactNode } from "react";
import {
  NVMButton,
  NVMCheckbox,
  NVMInput,
  NVMLabel,
  NVMRadio,
  NVMRadioGroup,
  NVMSelect,
  NVMSwitch,
  nvmToast,
} from "@/common/components";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-3">
      <h2 className="text-h4">{title}</h2>
      {children}
    </section>
  );
}

export function ComponentLibraryPage() {
  return (
    <div className="mx-auto grid max-w-3xl gap-10">
      <h1 className="text-h3">Component library</h1>

      <Section title="Input">
        <div className="grid gap-3">
          <NVMLabel>Normal</NVMLabel>
          <NVMInput placeholder="Placeholder" />
          <NVMLabel>Typing / focused</NVMLabel>
          <NVMInput autoFocus placeholder="Focus this field" />
          <NVMLabel>Active (filled)</NVMLabel>
          <NVMInput defaultValue="Filled value" />
          <NVMLabel>Error</NVMLabel>
          <NVMInput state="error" placeholder="Required" />
          <NVMLabel>Error filled</NVMLabel>
          <NVMInput state="error" defaultValue="Invalid value" />
          <NVMLabel>Disabled</NVMLabel>
          <NVMInput disabled placeholder="Disabled" />
        </div>
      </Section>

      <Section title="Button">
        <div className="flex flex-wrap gap-2">
          <NVMButton variant="primary">Primary</NVMButton>
          <NVMButton variant="outline">Outline</NVMButton>
          <NVMButton variant="transparent">Transparent</NVMButton>
          <NVMButton variant="cancel">Cancel</NVMButton>
          <NVMButton variant="success">Success</NVMButton>
          <NVMButton variant="pending">Pending</NVMButton>
          <NVMButton variant="link">Link</NVMButton>
          <NVMButton variant="danger">Danger</NVMButton>
          <NVMButton disabled>Disabled</NVMButton>
        </div>
      </Section>

      <Section title="Toast">
        <div className="flex flex-wrap gap-2">
          <NVMButton onClick={() => nvmToast.success("Saved")}>
            Success
          </NVMButton>
          <NVMButton
            variant="pending"
            onClick={() => nvmToast.pending("Waiting")}
          >
            Pending
          </NVMButton>
          <NVMButton
            variant="danger"
            onClick={() => nvmToast.reject("Rejected")}
          >
            Reject
          </NVMButton>
          <NVMButton
            variant="outline"
            onClick={() => nvmToast.preparing("In progress")}
          >
            Preparing
          </NVMButton>
        </div>
      </Section>

      <Section title="Checkbox">
        <div className="flex flex-col gap-2">
          <NVMCheckbox label="Unchecked" />
          <NVMCheckbox defaultChecked label="Checked" />
          <NVMCheckbox disabled label="Disabled" />
        </div>
      </Section>

      <Section title="Switch">
        <div className="flex items-center gap-4">
          <NVMSwitch />
          <NVMSwitch defaultChecked />
        </div>
      </Section>

      <Section title="Radio">
        <NVMRadioGroup defaultValue="a">
          <NVMRadio value="a" label="Option A" />
          <NVMRadio value="b" label="Option B" />
        </NVMRadioGroup>
      </Section>

      <Section title="Select">
        <NVMSelect
          placeholder="Select option"
          options={[
            { value: "one", label: "Option one" },
            { value: "two", label: "Option two" },
          ]}
        />
      </Section>
    </div>
  );
}
