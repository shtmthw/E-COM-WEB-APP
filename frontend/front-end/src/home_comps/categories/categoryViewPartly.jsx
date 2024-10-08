import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './CVP.css'; // Assuming you create a separate CSS file

function CategoryViewPratly() {
    const [categorieData, setCategorieData] = useState([]);
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);
    const [currPage, setCurrPage] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [totalPages, setTotalPages] = useState(0)



    const Navigator = useNavigate();

    const fetchCategories = async () => {
        try {
            const itemSkip = 2
            const resp = await axios.post(`http://localhost:5000/api/category/lazyLoad_categoriesSelection?itemSkip=${itemSkip}&page=${currPage}`);
            if (resp.data.success) {
                setCategorieData(resp.data.items);
                setTotalItems(resp.data.totalItems)
            } else {
                window.alert('Error occurred, check console');
                console.log(resp.data.message);
            }
        } catch (e) {
            window.alert('Error in catch block');
            console.log(e);
        }
    };

    useEffect(() => {
        if (currPage > 0) {
            fetchCategories()
        }
    }, [currPage]);

    useEffect(() => {
        if (categorieData.length > 0 && totalItems > 0 ) {
            setShowCategoryPopup(true)
            setTotalPages(Math.ceil(totalItems / 2))
            
        }
        // fetchCategories()
    }, [categorieData, totalItems ])

    return (
        <>
            <div className="mainCat_body">
                {showCategoryPopup ? (
                    <div className="categorys_body">
                        {categorieData.map((item, index) => {
                            return <>
                                <button onClick={() => {
                                    Navigator(`/categories?category=${item.name}`);
                                }}
                                    className="button-40">{item.name}</button>
                            </>

                        })}
                        <div className="btn_cntrls" style={{display : 'flex' , flexWrap : 'wrap' , justifyContent : 'center' , gap : '90px' , textDecoration : 'underline'}}>
                            
                            <p style={{cursor : 'pointer'}}  onClick={()=>{
                                    if(currPage > 1){
                                        setCurrPage(prev => prev - 1)
                                    }
                                }}>Prev</p>

                            <p style={{cursor : 'pointer'}} onClick={()=>{
                                if(currPage < totalPages){
                                    setCurrPage(prev => prev + 1)
                                }
                                }}>Next</p>

                        </div>
                    </div>

                ) : (
                    <button
                        onClick={() => { setCurrPage(prev => prev + 1) }}
                        className="button-59 ">
                        Our Categories
                    </button>
                )}
            </div>

        </>
    );
}

export default CategoryViewPratly;
