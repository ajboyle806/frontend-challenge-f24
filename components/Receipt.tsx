import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useState, useEffect } from "react"
import CartRow from "./CartRow"
import { Outlet, Link } from "react-router-dom";

// Color variables
const grey = "#f2f2f2"
const red = "#dc5e5766"
const blue = "#6a74ef66"
const yellow = "#d5a31966"
const green = "#6dad8966"

const Receipt = () => {

    const [cart, setCart] = useLocalStorage("cart", [])
    const [display, setDisplay] = useState([...cart])

    /* calls function described below on start */
    useEffect(() => {
        total()
      }, []);


    /* adds a row to be displayed with overall data */

    const total = () => {

        /* calculating CU sum and avg of stats */

        let cu = 0
        let course_quality = 0
        let course_quality_records = 0
        let instructor_quality = 0
        let instructor_quality_records = 0
        let difficulty = 0
        let difficulty_records = 0
        let work_required = 0
        let work_required_records = 0

        cart.forEach((element)=>{

            cu += element["credits"]
            if (element["course_quality"] != null){
                course_quality += element["course_quality"]
                course_quality_records += 1
            }
            if (element["instructor_quality"] != null){
                instructor_quality += element["instructor_quality"]
                instructor_quality_records += 1
            }
            if (element["difficulty"] != null){
                difficulty += element["difficulty"]
                difficulty_records += 1
            }
            if (element["work_required"] != null ){
                work_required += element["work_required"]
                work_required_records += 1
            }
        })

        let avg_cq = "N/A"
        let avg_iq = "N/A"
        let avg_diff = "N/A"
        let avg_work = "N/A"

        if (course_quality_records != 0){
            avg_cq = (Math.round(course_quality / course_quality_records * 1000)/1000).toString()
        } if (course_quality_records != 0){
            avg_iq = (Math.round(instructor_quality / instructor_quality_records * 1000)/1000).toString()
        } if (course_quality_records != 0){
            avg_diff = (Math.round(difficulty / difficulty_records * 1000)/1000).toString()
        } if (course_quality_records != 0){
            avg_work = (Math.round(work_required / work_required_records * 1000)/1000).toString()
        }

        /* calculating colors of stats */


        let course_color = grey
        if (avg_cq != "N/A"){
            course_color = blue
            if (parseFloat(avg_cq) < 1){
                course_color = red
            } else if (parseFloat(avg_cq) < 2){
                course_color = yellow
            } else if (parseFloat(avg_cq) < 3){
                course_color = green
            }
        }

        let instructor_color = grey
        if (avg_iq != "N/A"){
            instructor_color = blue
            if (parseFloat(avg_iq) < 1){
                instructor_color = red
            } else if (parseFloat(avg_iq) < 2){
                instructor_color = yellow
            } else if (parseFloat(avg_iq) < 3){
                instructor_color = green
            }
        }

        let diff_color = grey
        if (avg_diff != "N/A"){
            diff_color = red
            if (parseFloat(avg_diff) < 1){
                diff_color = blue
            } else if (parseFloat(avg_diff) < 2){
                diff_color = green
            } else if (parseFloat(avg_diff) < 3){
                diff_color = yellow
            }
        }

        let work_color = grey
        if (avg_work != "N/A"){
            work_color = red
            if (parseFloat(avg_work) < 1){
                work_color = blue
            } else if (parseFloat(avg_work) < 2){
                work_color = green
            } else if (parseFloat(avg_work) < 3){
                work_color = yellow
            }
        }
        
        /* constructing object of row to add */

        let total = {"section_id": "OVERALL", "activity": "", "instructor": "", "credits": cu, "days": "", "start": "", "end": "", "course_quality": avg_cq, "instructor_quality": avg_iq, "difficulty": avg_diff, "work_required": avg_work, "course_color": course_color, "instructor_color": instructor_color, "diff_color": diff_color, "work_color": work_color}
    
        let cart_copy = [...cart]
        cart_copy.push(total)

        setDisplay([...cart_copy])
    
    }
    

    return (
        <>
            <div style={{minHeight: "100vh", width: "100%"}}>

                { /* Navbar - not a separate component for convenience with search */}

                <div className="search-div">
                    <h3 style={{fontSize: "1.25rem"}}>Penn Course Cart</h3>
                </div>   
                   
                <div id="sections-div" className="receipt-div">

                    {/* Table containing all rows of section data */}

                    <div className="content">
                        <div className="section-header receipt-head">
                            <h2>Checkout Successful!</h2>
                        </div>
                    </div>
                    
                    <div className="table-container section-table receipt-table" >

                        {/* Header row */}
                        <div className="table-row header">
                            <div className="cell medium">ID</div> 
                            <div className="cell cell-num">Activity</div> 
                            <div className="cell large">Instructor</div> 
                            <div className="cell cell-num">CU</div>
                            <div className="cell cell-num">Days</div> 
                            <div className="cell cell-num">Start</div> 
                            <div className="cell cell-num">End</div> 
                            <div className="cell cell-num">Course</div>
                            <div className="cell cell-num">Instructor</div>
                            <div className="cell cell-num">Difficulty</div>
                            <div className="cell cell-num">Work</div> 
                        </div>

                        {/* iterating through section data and rendering rows */}
                        {[...display].map((section)=>{
                            return (
                                <CartRow {...section} key={section["section-id"]}></CartRow>
                            )
                        })}

                    </div>
                    <Link to="/">
                        <div className="homeButton">
                            Return Home
                        </div>
                    </Link>


                </div>
            </div>
        </>
    )
}

export default Receipt;