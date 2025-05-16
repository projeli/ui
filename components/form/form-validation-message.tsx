import { FormState } from "@/lib/types/form-types";

const FormValidationMessage = ({
    id,
    formState,
}: {
    id: string;
    formState: FormState;
}) => {
    if (!formState || !formState.errors) {
        return null;
    }

    const lowerCaseErrors = Object.keys(formState.errors).reduce((acc, key) => {
        acc[key.toLowerCase()] = formState.errors![key];
        return acc;
    }, {} as Record<string, string[]>);

    const errors = lowerCaseErrors[id.toLowerCase()];

    if (!errors) {
        return <div></div>;
    }

    return errors.map((error, index) => (
        <div key={index} className="text-error mt-2">
            {error}
        </div>
    ));
};

export default FormValidationMessage;
