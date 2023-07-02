import { getProperty, setProperty } from "@/shared/utils";
import { Accessor, JSX, Setter, createSignal } from "solid-js";

type FormValidator<P extends keyof T, T> = (value: T[P], form: T) => boolean;
type FormValidatorObject<P extends keyof T, T> = {
  validator: FormValidator<P, T>;
  errorMessage: string;
};
export type FormValidation<T> = {
  [P in keyof T]?: FormValidatorObject<P, T>[] | FormValidatorObject<P, T>;
};

interface FormHookProps<T> {
  initialValues?: Partial<T>;
  validation?: FormValidation<T>;
  handleSubmit: (values: T) => void;
}

type FormSubmitHanler = (
  e: Event & {
    submitter: HTMLElement;
  }
) => void;

type OnChangeHandler = JSX.ChangeEventHandlerUnion<HTMLInputElement, Event>;

type FormErrors<T> = {
  [P in keyof T]?: string;
};

export type FormRegister = (name: string) => {
  value: any;
  onChange: OnChangeHandler;
  name: string;
};

interface FormHook<T> {
  values: Accessor<T>;
  errors: Accessor<FormErrors<T>>;
  setFormValues: Setter<T>;
  onSubmit: FormSubmitHanler;
  register: FormRegister;
  handleAdd: (path: string) => void;
  handleDelete: (path: string, id: number) => void;
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  handleSubmit,
  validation,
}: FormHookProps<T>): FormHook<T> => {
  const [formValues, setFormValues] = createSignal<T>({
    ...(initialValues as T),
  });
  const [errors, setErrors] = createSignal<FormErrors<T>>({});

  const onChange: OnChangeHandler = (event) => {
    const { name, value, checked, type } = event.currentTarget;
    const newValue = type === "checkbox" ? !!checked : value;
    if (name.includes(".")) {
      setFormValues((prev) => setProperty(prev, name, newValue));
      setErrors((prev) => setProperty(prev, name, ""));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: newValue }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const isValid = (): boolean => {
    if (!validation) return true;

    var isValid = true;
    var currentErrors: FormErrors<T> = {};

    for (let key in validation) {
      const validators = validation[key];
      if (!validators) continue;
      if (Array.isArray(validators)) {
        for (let singleValidator of validators) {
          if (!singleValidator.validator(formValues()[key], formValues())) {
            currentErrors[key] = singleValidator.errorMessage;
            isValid = false;
          }
        }
      } else {
        if (!validators.validator(formValues()[key], formValues())) {
          currentErrors[key] = validators.errorMessage;
          isValid = false;
        }
      }
    }

    setErrors(() => currentErrors);
    return isValid;
  };

  const onSubmit = (
    e: Event & {
      submitter: HTMLElement;
    }
  ) => {
    e.preventDefault();
    if (!isValid()) {
      return;
    }
    handleSubmit(formValues());
  };

  const register = (name: string) => ({
    value: getProperty(formValues(), name),
    error: getProperty(errors(), name),
    onChange,
    name,
  });

  const handleAdd = (path: keyof T) => {
    const newItem = {
      id: Date.now(),
    };
    setFormValues((prev) => ({
      ...prev,
      [path]: prev[path] ? [...prev[path], newItem] : [newItem],
    }));
  };

  const handleDelete = (path: keyof T, id: number) => {
    setFormValues((prev) => ({
      ...prev,
      [path]: prev[path].filter((item: any) => item.id != id),
    }));
  };

  return {
    values: formValues,
    errors,
    setFormValues,
    onSubmit,
    register,
    handleAdd,
    handleDelete,
  };
};

export const required = (value: any) => !!value;
