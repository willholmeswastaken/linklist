import type { FieldInputProps } from "formik";

const InputFormField = ({
    field,
    ...props
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: FieldInputProps<any>;
}) => {
    return <input {...field} {...props} className='w-full h-11 p-2 bg-[#f6f7f5] dark:bg-gray-600 text-gray-600 dark:text-white dark:placeholder:text-white placeholder:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 rounded-md' />;
};

export default InputFormField;