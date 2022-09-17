import {useFormAndValidation} from "../hooks/useFormAndValidation";

const Login = () => {
    const loginData = {
        email:'',
        password:'',
    }
    const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation(loginData)
    return (
        <section className='auth'>
            <form className='form'>
                <h3 className='form__title'>Вход</h3>
                <label className='form__formfield form__formfield_type_name'>
                    <input
                        type='email'
                        className='form__input form__input_type_auth'
                        placeholder='Email'
                        name='email'
                        minLength='4'
                        maxLength='40'
                        value={values.email || ''}
                        onChange={handleChange}
                        required
                    />
                    <span
                        className={`form__input-error form__input-error_type_auth ${isValid ? '' : 'form__input-error_active'}`}>{errors.email}</span>
                </label>
                <label className='form__formfield '>
                    <input
                        type='password'
                        className='form__input form__input_type_auth'
                        placeholder='Пароль'
                        name='password'
                        minLength='4'
                        maxLength='40'
                        value={values.password || ''}
                        onChange={handleChange}
                        required
                    />
                    <span
                        className={`form__input-error form__input-error_type_auth ${isValid ? '' : 'form__input-error_active'}`}>{errors.password}</span>
                </label>
                <button type="submit" name="login" className='form__button form__button_type_auth' disabled={false}>
                    Войти
                </button>
            </form>
        </section>
    );
};

export {Login}