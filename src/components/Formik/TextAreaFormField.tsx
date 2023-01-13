import type { FieldInputProps, FormikState } from "formik";

const TextAreaFormField = ({
    field,
    form,
    ...props
}: {
    field: FieldInputProps<any>;
    form: FormikState<any>;
}) => {
    return <textarea {...field} {...props} className='w-full h-20 text-xs p-2 bg-[#f6f7f5] text-gray-600 placeholder:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 rounded-md' />;
};

export default TextAreaFormField