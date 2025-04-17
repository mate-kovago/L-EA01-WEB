let code = "DZMWSONJ3j3lszo";
let url = "http://gamf.nhely.hu/ajax2/";

async function read() {
    document.getElementById("code").innerHTML = "code=" + code;
    let totalHeight = 0;
    let maxHeight = 0;

    let response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "code=" + code + "&op=read"
    });

    let data = await response.text();
    data = JSON.parse(data);
    let list = data.list;
    let str = "<h1>Read</h1>";
    str += "<p>Rekordok száma: " + data.rowCount + "</p>";
    str += "<p>Az utolsü maximum" + data.maxNum + " rekord:</p>";
    str += "<table><tr><th>id</th><th>Név</th><th>Magasság</th><th>Tömeg</th></tr>";

    for (let i = 0; i < list.length; i++) {
        str += "<tr><td>" + list[i].id + "</td><td>" + list[i].name + "</td><td>" + list[i].height + "</td><td>" + list[i].weight + "</td></tr>";
        let height = parseFloat(list[i].height);
        if (!isNaN(height)) {
            totalHeight += height;
            if (height > maxHeight) {
                maxHeight = height;
            }
        }
    }

    let avgHeight = (list.length > 0) ? (totalHeight / list.length).toFixed(2) : 0;

    str += "</table>";
    str += "<p><strong>Maximum magasság:</strong> " + maxHeight + "</p>";
    str += "<p><strong>Magasságok összege:</strong> " + totalHeight + "</p>";
    str += "<p><strong>Magasságok átlaga:</strong> " + avgHeight + "</p>";
    document.getElementById("readDiv").innerHTML = str;

}

async function create() {
    const nameStr = document.getElementById("name1").value.trim();
    const heightStr = document.getElementById("height1").value.trim();
    const weightStr = document.getElementById("weight1").value.trim();

    if (nameStr.length > 0 && nameStr.length <= 30 &&
        heightStr.length > 0 && heightStr.length <= 30 &&
        weightStr.length > 0 && weightStr.length <= 30 &&
        code.length <= 30) {

        try {
            const response = await fetch(url, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `code=${encodeURIComponent(code)}&op=create&name=${encodeURIComponent(nameStr)}&weight=${encodeURIComponent(weightStr)}&height=${encodeURIComponent(heightStr)}`
            });

            const data = await response.text();
            const resultMessage = (parseInt(data) > 0) ? "Create successful!" : "Create NOT successful!";
            document.getElementById("createResult").innerText = resultMessage;

            document.getElementById("name1").value = "";
            document.getElementById("height1").value = "";
            document.getElementById("weight1").value = "";

            read();
        } catch (error) {
            document.getElementById("createResult").innerText = "Error: " + error.message;
        }
    } else {
        document.getElementById("createResult").innerText = "Validation error!!";
    }
}

async function getDataForId() {
    let response = await fetch(url, {
        method: 'post',
        cache: 'no-cache',
        headers: {'Content-Type': 'application/x-www-form-urlencoded',},
        body: "code="+code+"&op=read"
        });
    let data = await response.text();
    data = JSON.parse(data);
    let list = data.list;
    for(let i=0; i<list.length; i++)
    if(list[i].id==document.getElementById("idUpd").value){
    document.getElementById("name2").value=list[i].name;
    document.getElementById("weight2").value=list[i].weight;
    document.getElementById("height2").value=list[i].height;
    }
}

async function update(){
    id = document.getElementById("idUpd").value;
    nameStr = document.getElementById("name2").value;
    heightStr = document.getElementById("height2").value;
    weightStr = document.getElementById("weight2").value;
    if(id.length>0 && id.length<=30 && nameStr.length>0 && nameStr.length<=30 && heightStr.length>0 && heightStr.length<=30 && weightStr.length>0 && weightStr.length<=30 && code.length<=30){
        let response = await fetch(url, {
            method: 'post',
            cache: 'no-cache',
            headers: {'Content-Type': 'application/x-www-form-urlencoded',},
            body: `code=${encodeURIComponent(code)}&op=update&id=${encodeURIComponent(id)}&name=${encodeURIComponent(nameStr)}&weight=${encodeURIComponent(weightStr)}&height=${encodeURIComponent(heightStr)}`
    });
    let data = await response.text();
    if(data>0)
    str="Update successful!";
    elsestr="Update NOT successful!";
    document.getElementById("updateResult").innerHTML=str;
    document.getElementById("idUpd").value="";
    document.getElementById("name2").value = "";
    document.getElementById("height2").value = "";
    document.getElementById("weight2").value = "";
    read();
    }
    else
    document.getElementById("updateResult").innerHTML="Validation error!!";
    }

    async function deleteF(){
        id = document.getElementById("idDel").value;
        if(id.length>0 && id.length<=30){
            let response = await fetch(url, {
                method: 'post',
                cache: 'no-cache',
                headers: {'Content-Type': 'application/x-www-form-urlencoded',},
                body: "code="+code+"&op=delete&id="+id
            });
        let data = await response.text();
        if(data>0) {str="Delete successful!";}
        else {str="Delete NOT successful!";}
        document.getElementById("deleteResult").innerHTML=str;
        document.getElementById("idDel").value="";
        read();
        }
        else
        document.getElementById("deleteResult").innerHTML="Validation error!!";
        }
        window.onload = function() {
        read();
        };