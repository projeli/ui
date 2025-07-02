import { Errors } from "@/lib/types/form-types";
import { cn } from "@/lib/utils";
import _ from "lodash";
import { Label } from "./label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";

type LabeledSelectProps = React.ComponentProps<typeof Select> & {
    label: string;
    errors?: Errors;
    className?: string;
    options: string[];
};

const LabeledSelect = ({
    label,
    errors,
    className,
    options,
    name,
    required,
    ...props
}: LabeledSelectProps) => {
    return (
        <div
            className={cn(
                "grid w-full gap-1.5",
                errors && name && errors[name]
                    ? "grid-rows-[min-content_1fr_auto]"
                    : "grid-rows-[min-content_1fr]",
                className
            )}
        >
            <Label htmlFor={name}>
                {label}
                {required && <span className="text-destructive">*</span>}
            </Label>
            <Select name={name} required={required} {...props}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options.map((option) => (
                            <SelectItem key={option} value={option}>
                                {_.startCase(option)}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {errors && name && errors[name] && (
                <p className="text-sm text-destructive">{errors[name]}</p>
            )}
        </div>
    );
};

export default LabeledSelect;
