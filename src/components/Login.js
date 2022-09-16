import {useFormAndValidation} from "../hooks/useFormAndValidation";

const Login = () => {
    return (
        <section className='auth'>
            <form className='form'>
                <h3 className='form__title'>Вход</h3>
                <label className='form__formfield form__formfield_type_name'>
                    <input
                        type='email'
                        className='form__input form__input_type_auth'
                        placeholder='Email'
                        name='name'
                        minLength='2'
                        maxLength='40'
                        required
                    />
                    <span
                        className={`form__input-error form__input-error_type_name ${1 ? '' : 'form__input-error_active'}`}>{1}</span>
                </label>
                <label className='form__formfield '>
                    <input
                        type='password'
                        className='form__input form__input_type_auth'
                        placeholder='Пароль'
                        name='about'
                        minLength='2'
                        maxLength='200'
                        required

                    />
                    <span
                        className={`form__input-error form__input-error_type_about ${1 ? '' : 'form__input-error_active'}`}>{1}</span>
                </label>
                <button type="submit" name="login" className='form__button form__button_type_auth' disabled={false}>
                    Войти
                </button>
            </form>
        </section>
    );
};

export {Login}