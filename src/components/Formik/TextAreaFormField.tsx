import type { FieldInputProps } from "formik";

const TextAreaFormField = ({
    field,
    ...props
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: FieldInputProps<any>;
}) => {
    return <textarea {...field} {...props} className='w-full h-20 text-xs p-2 bg-[#f6f7f5] dark:bg-gray-600 dark:text-white dark:placeholder:text-white text-gray-600 placeholder:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 rounded-md' />;
};

export default TextAreaFormField