import { JSX } from "solid-js";
import { createStore, unwrap } from "solid-js/store";

interface FormValues {
  [key: string]: any;
}

interface FormHookProps {
  initialValues?: FormValues;
  handleSubmit: (values: FormValues) => void;
}

export const useForm = ({ initialValues, handleSubmit }: FormHookProps) => {
  const [formValues, setFormValues] = createStore<FormValues>(
    initialValues || {}
  );

  const onChange: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event> = (
    event
  ) => {
    const { name, value, checked, type } = event.currentTarget;
    if (type === "checkbox") {
      setFormValues((prev) => ({ ...prev, [name]: !!checked }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = (
    e: Event & {
      submitter: HTMLElement;
    }
  ) => {
    e.preventDefault();
    handleSubmit(getValues());
  };

  const register = (name: string) => ({
    value: formValues[name],
    onChange,
    name,
  });

  const getValues = () => ({ ...unwrap(formValues) });

  return {
    values: getValues,
    setFormValues,
    onSubmit,
    register,
  };
};
