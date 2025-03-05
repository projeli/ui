import useFormActionState from "@/lib/hooks/form-hook";
import { ServerAction } from "@/lib/types/form-types";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { ControlGroup, ControlGroupItem } from "../ui/control-group";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
    InputBase,
    InputBaseAdornment,
    InputBaseControl,
    InputBaseInput,
} from "../ui/input-base";
import LoadingSpinner from "../ui/loading-spinner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import FormAlert from "./form-alert";

type SmartFormProps = {
    action: ServerAction;
    formSchema: any;
    defaultValues: any;
    inputs: FormElement[];
    submitButton: {
        icon?: React.ReactNode;
        label: string;
        className?: string;
    };
};

const SmartForm = ({
    action,
    formSchema,
    defaultValues,
    inputs,
    submitButton,
}: SmartFormProps) => {
    const [form, handleSubmit, formState, isLoading] = useFormActionState(
        action,
        formSchema,
        defaultValues
    );

    return (
        <Form {...form}>
            <FormAlert formState={formState} className="my-4" />
            <form onSubmit={handleSubmit} className="space-y-4">
                {inputs.map((input, index) =>
                    input.type === "hidden" ? (
                        <FormField
                            key={index}
                            control={form.control}
                            name={input.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="hidden" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ) : (
                        <FormField
                            key={index}
                            control={form.control}
                            name={input.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{input.label}</FormLabel>
                                    <FormControl>
                                        {input.type === "text" ||
                                        input.type === "email" ||
                                        input.type === "password" ||
                                        input.type === "number" ||
                                        input.type === "tel" ||
                                        input.type === "url" ? (
                                            <Input
                                                type={input.type}
                                                placeholder={input.placeholder}
                                                className={input.className}
                                                {...field}
                                            />
                                        ) : input.type === "textarea" ? (
                                            <Textarea
                                                rows={input.rows}
                                                cols={input.cols}
                                                placeholder={input.placeholder}
                                                className={input.className}
                                                {...field}
                                            />
                                        ) : input.type === "select" ? (
                                            <Select
                                                onValueChange={(value) =>
                                                    field.onChange(value)
                                                }
                                                value={String(field.value)}
                                            >
                                                <FormControl
                                                    className={input.className}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder={
                                                                input.placeholder
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {input.options.map(
                                                        (option) => (
                                                            <SelectItem
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.label}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        ) : input.type === "checkbox" ? (
                                            <Checkbox
                                                className={input.className}
                                                {...field}
                                            />
                                        ) : input.type === "prefixed_text" ? (
                                            <ControlGroup
                                                className={input.className}
                                            >
                                                <ControlGroupItem>
                                                    <InputBase>
                                                        <InputBaseAdornment>
                                                            {input.prefix}
                                                        </InputBaseAdornment>
                                                    </InputBase>
                                                </ControlGroupItem>
                                                <ControlGroupItem className="grow bg-background">
                                                    <InputBase>
                                                        <InputBaseControl>
                                                            <InputBaseInput
                                                                required={
                                                                    input.required
                                                                }
                                                                {...field}
                                                            />
                                                        </InputBaseControl>
                                                    </InputBase>
                                                </ControlGroupItem>
                                            </ControlGroup>
                                        ) : null}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )
                )}
                {submitButton && (
                    <Button type="submit" className="btn-primary">
                        {submitButton.icon ? (
                            isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                submitButton.icon
                            )
                        ) : null}
                        {submitButton.label}
                    </Button>
                )}
            </form>
        </Form>
    );
};

export default SmartForm;

interface BaseFormElement {
    id?: string;
    name: string;
    className?: string;
    placeholder?: string;
    label: string;
    required?: boolean;
    disabled?: boolean;
    value?: string;
    readonly?: boolean;
}

interface TextInputProps extends BaseFormElement {
    type: "text" | "email" | "password" | "number" | "tel" | "url";
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    autocomplete?: string;
}

interface TextareaProps extends BaseFormElement {
    type: "textarea";
    rows?: number;
    cols?: number;
    minLength?: number;
    maxLength?: number;
    wrap?: "hard" | "soft" | "off";
}

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
    selected?: boolean;
}

interface SelectProps extends BaseFormElement {
    type: "select";
    options: SelectOption[];
    multiple?: boolean;
    size?: number;
}

// For other common input types
interface CheckboxProps extends BaseFormElement {
    type: "checkbox";
    checked?: boolean;
}

interface RadioProps extends BaseFormElement {
    type: "radio";
    checked?: boolean;
    value: string;
}

interface PrefixedInputProps extends BaseFormElement {
    type: "prefixed_text";
    prefix: string;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    autocomplete?: string;
}

interface HiddenInputProps extends BaseFormElement {
    type: "hidden";
}

export type FormElement =
    | TextInputProps
    | TextareaProps
    | SelectProps
    | CheckboxProps
    | RadioProps
    | PrefixedInputProps
    | HiddenInputProps;
