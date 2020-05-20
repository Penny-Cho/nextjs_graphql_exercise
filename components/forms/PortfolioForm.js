import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";

const PortfolioForm = ({ onSubmit, initialData = {} }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const { handleSubmit, register, setValue } = useForm({
        defaultValues: initialData
    });
    //datepicker는 input이 아니기 때문에 input이 되도록 설정해줘야함. 그래서 setValue를 넣어서 핸들링 처리

    useEffect(() => {
        register({ name: "startDate" });
        register({ name: "endDate" });
    }, [register]);

    useEffect(() => {
        const { startDate, endDate } = initialData;
        if (startDate) {
            setStartDate(new Date(parseInt(startDate, 10)));
        }
        if (endDate) {
            setEndDate(new Date(parseInt(endDate, 10)));
        }
    }, [initialData]);

    const handleDateChange = (dateType, setDate) => date => {
        setValue(
            dateType,
            (date && new Date(date.setHours(0, 0, 0, 0)).toISOString()) || date
        );
        setDate(date);
    };
    // 아래 내용을 위처럼 축약함
    // const handleStartDate = date => {
    //     setValue("startDate", date.toISOString());
    //     setStartDate(date);
    // };

    // const handleEndDate = date => {
    //     setValue("endDate", date.toISOString());
    //     setEndDate(date);
    // };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    ref={register}
                    name="title"
                    type="text"
                    className="form-control"
                    id="title"
                />
            </div>

            <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                    ref={register}
                    name="company"
                    type="text"
                    className="form-control"
                    id="company"
                />
            </div>

            <div className="form-group">
                <label htmlFor="companyWebsite">CompanyWebsite</label>
                <input
                    ref={register}
                    name="companyWebsite"
                    type="text"
                    className="form-control"
                    id="companyWebsite"
                />
            </div>

            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                    ref={register}
                    name="location"
                    type="text"
                    className="form-control"
                    id="location"
                />
            </div>

            <div className="form-group">
                <label htmlFor="street">Job Title</label>
                <input
                    ref={register}
                    name="jobTitle"
                    type="text"
                    className="form-control"
                    id="jobTitle"
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    ref={register}
                    name="description"
                    rows="5"
                    type="text"
                    className="form-control"
                    id="description"
                ></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <div>
                    <DatePicker
                        showYearDropdown
                        dateFormat="yyyy/MM/dd"
                        selected={startDate}
                        onChange={handleDateChange("startDate", setStartDate)}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <div>
                    <DatePicker
                        showYearDropdown
                        disabled={!endDate}
                        dateFormat="yyyy/MM/dd"
                        selected={endDate}
                        onChange={handleDateChange("endDate", setEndDate)}
                    />
                </div>
            </div>
            <div className="form-group">
                {endDate && (
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                            handleDateChange("endDate", setEndDate)(null);
                        }}
                    >
                        No End Date
                    </button>
                )}
                {!endDate && (
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            handleDateChange("endDate", setEndDate)(new Date());
                        }}
                    >
                        Set End Date
                    </button>
                )}
            </div>

            <button type="submit" className="btn btn-primary">
                Create
            </button>
        </form>
    );
};

export default PortfolioForm;
