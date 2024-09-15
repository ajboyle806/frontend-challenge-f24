// Color variables
const grey = "#f2f2f2"
const red = "#dc5e5766"
const blue = "#6a74ef66"
const yellow = "#d5a31966"
const green = "#6dad8966"

const SectionRow = (section) => {
    
    /* coloring in rows in cart */

    let added_color = "#ffffff00"

    for (let i = 0; i < section["cart"].length; i++) {
        if (section["cart"][i]["section_id"] == section["section_id"]){
            added_color = "#747bff55"
        }
    }

    /* calculating colors and text of stats */

    let course_quality_text = ""
    let course_color = grey
    

    if (section["course_quality"] == null){
        course_quality_text = "N/A"
    } else {
        course_quality_text = section["course_quality"].toString()
        course_color = blue
        if (section["course_quality"] < 1){
            course_color = red
        } else if (section["course_quality"] < 2){
            course_color = yellow
        } else if (section["course_quality"] < 3){
            course_color = green
        }
    }

    let instructor_quality_text = ""
    let instructor_color = grey
    if (section["instructor_quality"] == null){
        instructor_quality_text = "N/A"
    } else {
        instructor_quality_text = section["instructor_quality"].toString()
        instructor_color = blue
        if (section["instructor_quality"] < 1){
            instructor_color = red
        } else if (section["instructor_quality"] < 2){
            instructor_color = yellow
        } else if (section["instructor_quality"] < 3){
            instructor_color = green
        }
    }

    let diff_text = ""
    let diff_color = grey
    if (section["difficulty"] == null){
        diff_text = "N/A"
    } else {
        diff_text = section["difficulty"].toString()
        diff_color = red
        if (section["difficulty"] < 1){
            diff_color = blue
        } else if (section["difficulty"] < 2){
            diff_color = green
        } else if (section["difficulty"] < 3){
            diff_color = yellow
        }
    }

    let work_text = ""
    let work_color = grey
    if (section["work_required"] == null){
        work_text = "N/A"
    } else {
        work_text = section["work_required"].toString()
        work_color = red
        if (section["work_required"] < 1){
            work_color = blue
        } else if (section["work_required"] < 2){
            work_color = green
        } else if (section["work_required"] < 3){
            work_color = yellow
        }
    }

    /* reformatting dates and times */

    let days = ""
    let start = 0
    let end = 0

    let time_dict = {"8.3": "8:30", "9.29": "9:29", "9.59": "9:59", "10.15": "10:15", "11.14": "11:14", "11.29": "11:29", "11.44": "11:44", "12": "12:00", "12.59": "12:59", "13.29": "1:29", "13.45": "1:45", "14.44": "2:44", "15.14": "3:14", "15.3": "3:30", "16.29": "4:29", "16.59": "4:59", "17.15": "5:15", "18.14": "6:14", "18.29": "6:29", "18.44": "6:44", "19": "7:00", "19.59": "7:59", "20.29": "20:29", "20.3": "8:30", "21.29": "9:29"}

    section["meetings"].reverse().map((meeting)=>{
        days += meeting['day']
        if (start == 0){
            start = time_dict[meeting['start'].toString()]
            end = time_dict[meeting['end'].toString()]
        }
    })
    if (days == "RT"){
        days = "TR"
    }
    if (days == "FMW"){
        days = "MWF"
    }

    /* adding staff as placeholder for instructor */

    let instructor = section["instructor"]
    if (section["instructor"] == ""){
        instructor = "Staff"
    }

    /* saving data */
    
    let active = {...section}
    active["course_color"] = course_color
    active["instructor_color"] = instructor_color
    active["diff_color"] = diff_color
    active["work_color"] = work_color
    active["instructor"] = instructor
    active["days"] = days
    active["start"] = start
    active["end"] = end

    /* returning */
        
    return <>
        <div className="table-row sections-row" style={{textAlign: "center"}} onClick={()=>{section["update"]({...active})}}>
            <div className="cell cell-num" style={{backgroundColor: added_color}}>{}</div>
            <div className="cell medium">{section["section_id"]}</div>
            <div className="cell cell-num">{section["activity"]}</div>
            <div className="cell large">{instructor}</div>
            <div className="cell cell-num">{section["credits"]}</div>
            <div className="cell cell-num">{days}</div> 
            <div className="cell cell-num">{start}</div> 
            <div className="cell cell-num">{end}</div> 
            <div className="cell cell-num" style={{backgroundColor: course_color}}>{section["course_quality"]}</div>
            <div className="cell cell-num" style={{backgroundColor: instructor_color}}>{section["instructor_quality"]}</div>
            <div className="cell cell-num" style={{backgroundColor: diff_color}}>{section["difficulty"]}</div>
            <div className="cell cell-num" style={{backgroundColor: work_color}}>{section["work_required"]}</div> 
        </div>
    </>

}

export default SectionRow