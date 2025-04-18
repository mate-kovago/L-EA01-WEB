var selectedRow = null;
    var formData={};

    function onFormSubmit(){
      if(validate()){
        var formData = readFormData();
        if(selectedRow == null){insertNewRecord(formData);}
        else {updateRecord(formData);
          }}
        resetForm();
      }

      function validate(){
        var isValid = true;
        if(document.getElementById("gyarto").value == ""){
          isValid = false;
          document.getElementById("gyartoValidErr").style.display = "inline";
          console.log(isValid);
        }
        else if(document.getElementById("tipus").value == "")
        {
          isValid = false;
          document.getElementById("tipusValidErr").style.display = "inline";
          console.log(isValid);
        }
        else if(document.getElementById("rendszam").value == "")
        {
          isValid = false;
          document.getElementById("rendszamValidErr").style.display = "inline";
          console.log(isValid);
        }
        else if(document.getElementById("telep").value == "")
        {
          isValid = false;
          document.getElementById("telepValidErr").style.display = "inline";
          console.log(isValid);
        } else{isValid = true;}
        return isValid;
      }

      function readFormData(){
          formData["gyarto"] = document.getElementById("gyarto").value;
          formData["tipus"] = document.getElementById("tipus").value;
          formData["rendszam"] = document.getElementById("rendszam").value;
          formData["telep"] = document.getElementById("telep").value;
          
          return formData;
      }

      function insertNewRecord(data){
        
        var table = document.getElementById("myTable").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.gyarto;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.tipus;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.rendszam;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.telep;
        cell4 = newRow.insertCell(4);

        cell4.innerHTML = `<a style="text-decoration:none;color:white;background-color:blue;" onClick="onEdit(this)">Edit</a>
        <a style="text-decoration:none;color:white;background-color:blue;" onClick="onDelete(this)">Delete</a>`;
      }

      function resetForm() {
          document.getElementById("gyarto").value = "";
          document.getElementById("tipus").value = "";
          document.getElementById("rendszam").value = "";
          document.getElementById("telep").value = "";
          selectedRow = null;
        }


        function onEdit(td) {
          selectedRow = td.parentElement.parentElement;
          document.getElementById("gyarto").value = selectedRow.cells[0].innerHTML;
          document.getElementById("tipus").value = selectedRow.cells[1].innerHTML;
          document.getElementById("rendszam").value = selectedRow.cells[2].innerHTML;
          document.getElementById("telep").value = selectedRow.cells[3].innerHTML;
        }

        function updateRecord(formData) {
          selectedRow.cells[0].innerHTML = formData.gyarto;
          selectedRow.cells[1].innerHTML = formData.tipus;
          selectedRow.cells[2].innerHTML = formData.rendszam;
          selectedRow.cells[3].innerHTML = formData.telep;
          }

          function onDelete(td) {
            if (confirm('Biztosan törölni akarod ezt a sort ?')) {
              row = td.parentElement.parentElement;
              document.getElementById("myTable").deleteRow(row.rowIndex);
              resetForm();

            }
          } 

          function searchFunction(){
            var input, filter, table, tr, td, i, txtValue, j;
            
            input = document.getElementById("searchInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");
            for (i = 1; i < tr.length; i++)
              {
                td = tr[i].getElementsByTagName("td");
                var match = false;
                for( j = 0; j< td.length-1; j++)
                  {
                    //console.log(td[j].textContent.toLocaleUpperCase());
                    if (td[j].textContent.toUpperCase().includes(filter)) {
                    match = true;
                    break;
                  }
                }
                tr[i].style.display = match ? "" : "none";

              }
          }

          function sortTable(k)
          {
            var table, rows, switching, i, x, y, shouldSwitch;
            table = document.getElementById("myTable");
            switching = true;
            while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
              shouldSwitch = false;
              x = rows[i].getElementsByTagName("TD")[k];
              y = rows[i + 1].getElementsByTagName("TD")[k];
              if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
                }
              }
              if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
              }
            }
          }


          let startData=[
          { gyarto: "Opel", tipus: "Corsa", rendszam: "AAAZ-121", telep: "Dabas" },
          { gyarto: "Ford", tipus: "Focus", rendszam: "BBBZ-234", telep: "Kecskemét" },
          { gyarto: "Toyota", tipus: "Yaris", rendszam: "CCCX-567", telep: "Szolnok" },
          { gyarto: "Volkswagen", tipus: "Golf", rendszam: "DDDT-890", telep: "Győr" },
          { gyarto: "Renault", tipus: "Clio", rendszam: "EEEY-345", telep: "Pécs" },
          { gyarto: "Suzuki", tipus: "Swift", rendszam: "FFFU-678", telep: "Miskolc" }
          ]

          window.onload = function() {
          for(let dat of startData)
          {
            insertNewRecord(dat)
          }
        }





   