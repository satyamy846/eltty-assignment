import { useState, useEffect } from 'react';
import './Page.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Page = () => {
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allChecked, setAllChecked] = useState(false);
    const [checkboxes, setCheckboxes] = useState([
        {
            name: "Page 1",
            checked: false,
        },
        {
            name: "Page 2",
            checked: false,
        },
        {
            name: "Page 3",
            checked: false,
        },
        {
            name: "Page 4",
            checked: false,
        }
    ]);


    // Effect to set the allChecked state based on individual checkboxes
    useEffect(() => {
        const allAreChecked = checkboxes.every(checkbox => checkbox.checked);
        setAllChecked(allAreChecked);
    }, [checkboxes]);

    const handleIndividualChange = (event, index) => {
        const { checked } = event.target;
        setCheckboxes((prevCheckboxes) =>
            prevCheckboxes.map((checkbox, i) =>
                i === index ? { ...checkbox, checked } : checkbox
            )
        );
    };

    const handleAllChange = (event) => {
        const { checked } = event.target;
        setAllChecked(checked);
        setCheckboxes((prevCheckboxes) =>
            prevCheckboxes.map((checkbox) => ({
                ...checkbox,
                checked
            }))
        );
    };

    const notify = () => toast('Page submitted!')

    function handleSubmit(){
        setLoading(true)
       
        setTimeout(() =>{
            setLoading(false);
            notify();
        },1000)
        setBtnDisabled(true);
        setAllChecked(false);
        const checked = false;
        setCheckboxes((prevCheckboxes) => 
            prevCheckboxes.map((checkbox) => ({
                ...checkbox,
                checked
            }))
        )

    }

    return (
        <div className="main-container">
            <div className="page-container">
                <div className="page-header">
                    <p>All Pages</p>
                    <label className="checkbox-container">
                        <input
                            type="checkbox"
                            className='check-input'
                            checked={allChecked}
                            onChange={handleAllChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <hr />
                <div className="page-content">
                    {
                        checkboxes.map((item, index) => (
                            <div className="page-wrapper" key={index}>
                                <p>{item.name}</p>
                                <label className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        className='check-input'
                                        checked={item.checked}
                                        onChange={(event) => handleIndividualChange(event, index)}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        ))
                    }
                </div>
                <hr />
                <div className="page-footer">
                    <button
                    disabled={btnDisabled ? true : false} 
                    className={`done-btn ${btnDisabled ? 'btn-disabled':''}`}
                    onClick={() => handleSubmit()}
                    >{loading ? (<i className="fa fa-refresh fa-spin" style={{marginRight:"5px"}}></i>) : ""}
                    Done
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Page;
