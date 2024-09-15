import courses from "../data/course_data.json";
import sections from "../data/section_data.json";
import Fuse from "fuse.js";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useState, useEffect } from "react"
import { Outlet, Link } from "react-router-dom";

// Colors
const grey = "#f2f2f2"
const red = "#dc5e5766"
const blue = "#6a74ef66"
const yellow = "#d5a31966"
const green = "#6dad8966"

// Component imports
import Row from "./Row"
import SectionRow from "./SectionRow"

// Placing course objects into a list

let courses_list = []

for (let i = 0; i < Object.keys(courses).length; i++){
    if (courses[i]["title"] != ""){
        courses_list.unshift(courses[i])
    }
}

// Sorting courses alphabetically

courses_list.sort((a, b) => a.id.localeCompare(b.id));

// Placing section objects into a list

let sections_list = []

for (let i = 0; i < Object.keys(sections).length; i++){
    if (sections[i]["title"] != "" ){
        sections_list.unshift(sections[i])   
    }
}

// Sorting sections alphabetically

sections_list.sort((a, b) => a.id.localeCompare(b.id));

// Fuzzy Search Configuration

const fuseOptions = {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'id', weight: 0.4 },
      { name: 'description', weight: 0.2 }
    ],
    threshold: 0.4, // Adjust for fuzziness, lower is stricter
  };

const fuse = new Fuse(courses_list, fuseOptions);

// Main Course Component

const Main = () => {

    // Text in search
    const [search, setSearch] = useState("");

    // Top matches rendered
    const [topMatches, setTopMatches] = useState([...courses_list].slice(0,100));

    // Selected course
    const [activeCourse, setActiveCourse] = useState({})

    // Sections of selected course
    const [activeSections, setActiveSections] = useState([])

    const [cart, setCart] = useLocalStorage("cart", [])
    const [cartDisplay, setCartDisplay] = useState([])

    // load CIS 1600 as active course

    useEffect(() => {
        info({id: "CIS-1600", course_quality: 2.722, instructor_quality: 2.971, difficulty: 3.599, work_required: 3.57, course_color: blue, instructor_color: blue, diff_color: red, work_color: red})
      }, []);

    // update activeSections when activeCourse changes
    useEffect(() => {
        let filtered = sections_list.filter(item => item.id.includes(activeCourse["id"]));
        setActiveSections([...filtered])
      }, [activeCourse]);

    // update results in table on type
    const handleType = (e) => {
        setSearch(e.target.value);
        const results = fuse.search(search)
        .map(result => result.item)
        .slice(0, 100); 
        setTopMatches(results);
    }

    // logic for updating cart on click of section rows

    const stageCart = (section) => {


        let cart_copy = [...cart]

        let equivalent_course = -1
        let exact_course = -1

        // checks if there's a section in the cart of the same ID and activity as the staged one
        // also checks if section is already in cart

        for (let i = 0; i < cart_copy.length; i++) {
            let element = cart_copy[i]
            if (section["id"] == element["id"] && section["activity"] == element["activity"]){
                equivalent_course = i
            }
            if (section["section_id"] == element["section_id"]){
                exact_course = i
            }
        }

         // removes course if it is already in the cart (allows clicking rows to serve as toggle)
        if (exact_course != -1){
            cart_copy.splice(exact_course, 1)
        } 
        
        // adds section if there is not a section in the cart of the same id and activity
        // if there is, that section is replaced with the staged section
        else {
            if (equivalent_course == -1 && cart.length < 7){
                cart_copy.unshift(section)
            } else {
                cart_copy[equivalent_course] = section
            }
        }

        // updating state of cart
        setCart([...cart_copy])


    }

    // returns submit button if cart has >= 1 item
    // otherwise returns text with instructions about using cart
    const submit = () => {
        if (cart.length > 0){
            return <>
                <Link to="/receipt">
                    <div className="cart-element submit-cart">
                        <div>
                            <p>Submit Cart</p>
                        </div>
                    </div>
                </Link>
                <p className="cart-info-note">* Click on course name to render more information.</p>
            </>
        }
        return <>
        <h3 className="cart-note">Cart is empty. Click on a course row to see sections. Click on a section row to add or remove from cart.</h3>
        </>
    }

    // removes section on click
    const remove = (section) => {

        let del = 0
        for (let i = 0; i < cart.length; i++) {
            let element = cart[i]
            if (section["section_id"] == element["section_id"]){
                del = i
            }
        }

        let cart_copy = [...cart]
        cart_copy.splice(del, 1)

        setCart([...cart_copy])

    }

    // makes section rows invisible until a course is clicked
    const visibility = () => {
        if (Object.keys(activeCourse).length == 0){
            return {display: "none"}
        }
        return {}
    }

    // function for setting active course to the one clicked in the cart with appropriate colors
    const info = (course) => {

        let obj = {}
        courses_list.forEach((element)=> {
            if (course["id"] == element["id"]){
                obj = {...element}
            }
        })

        obj["course_color"] = course["course_color"]
        obj["instructor_color"] = course["instructor_color"]
        obj["diff_color"] = course["diff_color"]
        obj["work_color"] = course["work_color"]


        setActiveCourse({...obj})
    }

    // body
    return (

        <div style={{minHeight: "100vh", width: "100%"}}>

            { /* Navbar - not a separate component for convenience with search */}

            <div className="search-div">
                <h3>Penn Course Cart</h3>
                <input className="search" type="text" placeholder="Search for ANY Course" value={search} onChange={(e) => handleType(e)} ></input>
            </div>

            { /* Flexbox for course list and cart */ }

            <div className="data-container-flex">

                { /* Course list container */ }

                <div id="course-div">

                    { /* Table for courses */ }

                    <div className="table-container">
                        <div className="table-row header">
                            <div className="cell cell-id">Code</div>
                            <div className="cell cell-title">Title </div>
                            <div className="cell cell-num">CU</div>
                            <div className="cell cell-num">Course</div>
                            <div className="cell cell-num">Instructor</div>
                            <div className="cell cell-num">Difficulty</div>
                            <div className="cell cell-num">Work</div>
                        </div>
                        
                        {topMatches.map((course)=>{

                            {/* Row component */ }
                            return (
                                <Row {...course} update={setActiveCourse} key={course["id"]}></Row>
                            )

                        })}
                    </div>
                </div>

                {/* Container for course cart */}

                <div id="cart-div">
                    <div className="content">
                        <h2>Cart ({cart.length})</h2>

                        {/* iterates through cart contents and displays them */}

                        {cart.map((section) => {             

                            return <>
                                <div className="cart-element course-element">
                                    <div className="course-text" onClick={(()=>{info(section)})}><h3>{section["section_id"]} ({section["credits"]} CU)</h3></div>
                                    <div className="delete" onClick={()=>{remove(section)}}><p>×</p>
                                    </div>
                                </div>
                            </>

                        })}

                        {/* loads result of submit function described earlier */}
                        {submit()}

                    </div>
                </div>
            </div>

            {/* container carrying table of course section info */}

            <div id="sections-div" style={visibility()}>

                {/* displaying basic course information (e.g. description) with text and quality/difficulty stats with colored squares */}

                <div className="content">
                    <div className="section-header">
                        <h2>{activeCourse["id"]}</h2>
                        <div className="score-cell" style={{backgroundColor: activeCourse["course_color"]}}></div>
                        <div className="score-cell" style={{backgroundColor: activeCourse["instructor_color"]}}></div>
                        <div className="score-cell" style={{backgroundColor: activeCourse["diff_color"]}}></div>
                        <div className="score-cell" style={{backgroundColor: activeCourse["work_color"]}}></div>
                    </div>
                    <p className="section-description">{activeCourse["description"]}</p>
                </div>

                {/* Table containing all rows of section data */}
                
                <div className="table-container section-table" style={{marginLeft: "2rem"}} >

                    {/* Header row */}
                    <div className="table-row header">
                        <div className="cell cell-num">Added</div> 
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
                    {[...activeSections].reverse().map((section)=>{
                        return (
                            <SectionRow {...section} update={stageCart} cart={cart} key={section["section-id"]}></SectionRow>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}



export default Main

