// let url = "http://universities.hipolabs.com/search?name=";
// let btn = document.querySelector("button");

// btn.addEventListener("click", async () => {
//    let country = document.querySelector("input").value;
//    console.log(country);

//    let colArr = await getColleges(country);
//    show(colArr);
// });


// function show(colArr) {
//   let list = document.querySelector("#list")
//   list.innerText = "";
//     for(col of colArr) {
//         console.log(col.name);

//         let li = document.createElement("li");
//         li.innerText = col.name;
//         list.appendChild(li);
//     }
// }

// async function getColleges(country) {
//    try {
//     let res =  await axios.get(url+country);
//     return res.data;

//    } catch (e) {
//     console.log("error :", e);
//     return[];
//    }
// }



let url = "http://universities.hipolabs.com/search?country=India";
let btn = document.querySelector("button");

btn.addEventListener("click", async () => {
    let state = document.querySelector("#state").value.trim().toLowerCase();
    let colArr = await getColleges();

    if (state) {
        colArr = colArr.filter(col => 
            col["state-province"] && col["state-province"].toLowerCase().includes(state)
        );
    }

    show(colArr);
});

function show(colArr) {
    let list = document.querySelector("#list");
    list.innerText = "";

    if (colArr.length === 0) {
        list.innerText = "No colleges found in that state.";
        return;
    }

    for (let col of colArr) {
        let li = document.createElement("li");
        li.innerText = `${col.name} (${col["state-province"] || "State Unknown"})`;
        list.appendChild(li);
    }
}

async function getColleges() {
    try {
        let res = await axios.get(url);
        return res.data;
    } catch (e) {
        console.log("Error fetching colleges:", e);
        return [];
    }
}
