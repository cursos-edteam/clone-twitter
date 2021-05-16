import { useState } from "react";

const useForm = keys => {
    const [form, setForm] = useState({
        values: Object.keys(keys).reduce((container, item) => {
            container[item] = '';
            return container;
        }, {}),
        touched: Object.keys(keys).reduce((container, item) => {
            container[item] = false;
            return container;
        }, {}),
        errors: Object.keys(keys).reduce((container, item) => {
            container[item] = true;
            return container;
        }, {}),
        initialKeys: Object.keys(keys).reduce((container, item) => {
            container[item] = '';
            return container;
        }, {})
    });

    return [{
        values: form.values,
        errors: form.errors,
        touched: form.touched,
        handleErrors: Object.keys(form.initialKeys).some(key => form.errors[key]),
        handleReset: () => {
            setForm(form => ({
              ...form,
              values: form.initialKeys,
              errors: Object.keys(form.initialKeys).reduce((container, key) => {
                container[key] = true;
                return container;
              }, {}),
              touched: Object.keys(form.initialKeys).reduce((container, key) => {
                container[key] = false;
                return container;
              }, {})
            }));
        },
        handleTouched: ({ target: { name }}) => {
            setForm(form => ({
              ...form,
              touched: {
                ...form.touched,
                [name]: true
              }
            }));
        },
        handleChange: ({ target: { name, value } }) => {
            setForm(form => ({
              ...form,
              values: {
                ...form.values,
                [name]: value
              },
              errors: {
                ...form.errors,
                [name]: (value || '').length === 0
              },
              touched: {
                ...form.touched,
                [name]: true
              }
            }));
        }
    }];
};

export default useForm;