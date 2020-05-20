import { useForm } from "react-hook-form";

const RegisterForm = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="avatar">Avatar</label>
                <input
                    ref={register}
                    type="text"
                    name="avatar"
                    className="form-control"
                    id="avatar"
                />
            </div>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    ref={register}
                    type="username"
                    name="username"
                    className="form-control"
                    id="username"
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    ref={register}
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    ref={register}
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                />
            </div>
            <div className="form-group">
                <label htmlFor="passwordConfirmation">
                    Password Confirmation
                </label>
                <input
                    ref={register}
                    type="password"
                    name="passwordConfirmation"
                    className="form-control"
                    id="passwordConfirmation"
                />
            </div>
            <button type="submit" className="btn btn-main bg-blue py-2 ttu">
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
