import { getProperty, setProperty } from "@/shared/utils";
import { Accessor, JSX, Setter, createSignal } from "solid-js";

interface FormErrorStringIndexer {
  [key: string]: string | undefined;
}

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
  [P in keyof T]?: string | FormErrorStringIndexer[];
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
  clearForm: () => void;
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
      if (!!getProperty(errors(), name)) {
        setErrors((prev) => setProperty(prev, name, ""));
      }
    } else {
      setFormValues((prev) => ({ ...prev, [name]: newValue }));
      if (!!errors()[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const validate = (
    validators:
      | FormValidatorObject<Extract<keyof T, string>, T>
      | FormValidatorObject<Extract<keyof T, string>, T>[],
    value: any
  ): [boolean, string?] => {
    if (Array.isArray(validators)) {
      for (let singleValidator of validators) {
        if (!singleValidator.validator(value, formValues())) {
          return [false, singleValidator.errorMessage];
        }
      }
    } else {
      if (!validators.validator(value, formValues())) {
        return [false, validators.errorMessage];
      }
    }

    return [true, undefined];
  };

  const isValid = (): boolean => {
    if (!validation) return true;

    var isValid = true;
    var currentErrors: FormErrors<T> = {};

    for (let key in validation) {
      const validators = validation[key];
      if (!validators) continue;
      if (key.includes(".")) {
        const keys = key.split(".");
        if (Array.isArray(formValues()[keys[0]])) {
          if (!currentErrors[keys[0]]) {
            currentErrors = {
              ...currentErrors,
              [keys[0]]: formValues()[keys[0]].map(() => ({})),
            };
          }
          for (let i = 0; i < formValues()[keys[0]].length; i++) {
            var [res, msg] = validate(
              validators,
              formValues()[keys[0]][i][keys[1]]
            );
            if (!res) {
              (currentErrors[keys[0]]![i] as FormErrorStringIndexer)[keys[1]] =
                msg;
              isValid = false;
            }
          }
        }
      } else {
        var [res, msg] = validate(validators, formValues()[key]);
        if (!res) {
          currentErrors[key] = msg;
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

  const clearForm = () => {
    setFormValues(() => ({} as T));
    setErrors(() => ({}));
  };

  return {
    values: formValues,
    errors,
    setFormValues,
    onSubmit,
    register,
    handleAdd,
    handleDelete,
    clearForm,
  };
};

export const required = (value: any) => !!value;
