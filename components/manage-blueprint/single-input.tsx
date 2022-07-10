import * as React from "react";

export interface ISingleInputProps {
  type: string;
  handleChange: (data: string) => void;
  unit?: string;
  defaultVal?: string;
}

const SingleInput = (props: ISingleInputProps) => {
  const { handleChange, type, unit, defaultVal } = props;
  const [value, setValue] = React.useState(defaultVal);

  React.useEffect(() => {
    setValue(defaultVal);
  }, [defaultVal]);

  return (
    <div>
      <input
        type={type}
        className="custom-input"
        aria-label="Inches (with dot and two decimal places)"
        onChange={(e: any) => {
          setValue(e.target.value);
          handleChange(e.target.value);
        }}
        value={value}
      />
    </div>
  );
};

const SingleInputMemo = React.memo(SingleInput);
export default SingleInputMemo;
