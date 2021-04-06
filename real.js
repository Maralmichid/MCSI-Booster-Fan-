var uiController = (function () {
    var DOMstrings = {
      inputSAP: ".search__field",
      searchBtn: ".search__btn",
      nameP: ".name",
      nameCom: ".companyName",
      incomeList: ".list",
      loaderDiv: ".results",
      surgalt: ".surgaltHaruulah",
      surgaltList: ".surgalt",
      voc: ".vocHaruulah",
    };
  
    return {
      //surgaltiin booklesen heseg
  
      //qualification gargah heseg
      medee: function (a) {
        // a ajiltnii surgaltiin medeelel massive bdlaar irj bga
        this.a = a;
  
        if (a.length == 0) {
          const loader = document.querySelector(".loader");
          if (loader) loader.parentElement.removeChild(loader);
          document.querySelector(DOMstrings.nameCom).textContent =
            "Илэрц олдсонгүй...";
        } else {
          document.querySelector(DOMstrings.nameP).textContent = a[0].Employee;
          document.querySelector(DOMstrings.nameCom).textContent = a[0].Vendor;
          console.log(a[0].Employee);
  
          //   for (const { Qualification } of a) {
          //     console.log(Qualification);
          //   }2
          var html = "",
            list = "";
          list = DOMstrings.incomeList;
          for (let i = 0; i < a.length; i++) {
            const loader = document.querySelector(".loader");
            if (loader) loader.parentElement.removeChild(loader);
            document.querySelector(DOMstrings.nameP).textContent = a[0].Employee;
            document.querySelector(DOMstrings.nameCom).textContent = a[0].Vendor;
            var today = new Date();
            var n = today.toLocaleDateString();
            var expiryDate = new Date(a[i].QED);
            var dc = expiryDate.toLocaleDateString();
            var expiryTime = expiryDate.getTime();
            var todayTime = today.getTime();
            var z = todayTime - expiryTime;
            var zz = z + 7776000000;
  
            // console.log(z / 86400000);
  
            if (z > 0) {
              console.log("Hugatsaaa duussan!!!!!!");
              html =
                '<div id="delete" class="list_duussan clearfix"><div class="qualification">$$qua$$</div><div class="right clearfix"><div class="expiry_date">$$date$$</div></div></div>';
              html = html.replace("$$qua$$", a[i].Qualification);
              html = html.replace("$$date$$", a[i].QED);
              document.querySelector(list).insertAdjacentHTML("beforeend", html);
            } else {
              if (zz > 0) {
                html =
                  '<div id="delete" class="list_duusaj clearfix"><div class="qualification">$$qua$$</div><div class="right clearfix"><div class="expiry_date">$$date$$</div></div></div>';
                html = html.replace("$$qua$$", a[i].Qualification);
                html = html.replace("$$date$$", a[i].QED);
                document
                  .querySelector(list)
                  .insertAdjacentHTML("beforeend", html);
              } else {
                html =
                  '<div id="delete" class="list_heviin clearfix"><div class="qualification">$$qua$$</div><div class="right clearfix"><div class="expiry_date">$$date$$</div></div></div>';
                html = html.replace("$$qua$$", a[i].Qualification);
                html = html.replace("$$date$$", a[i].QED);
                document
                  .querySelector(list)
                  .insertAdjacentHTML("beforeend", html);
              }
            }
          }
        }
      },
      trainingMedee: function (l) {
        this.l = l;
        var html = "",
          list = "";
        list = DOMstrings.surgalt;
  
        for (let i = 0; i < l.length; i++) {
          html =
            '<div class="surgalt"><div class="surgaltDate">$$date$$</div><div class="surgaltName">$$qua$$</div><div class="venue">$$venue$$</div><div class="hours">$$hour$$</div></div>';
          html = html.replace("$$date$$", l[i].Date);
          html = html.replace("$$qua$$", l[i].TrainingName);
          html = html.replace("$$venue$$", l[i].Venue);
          html = html.replace("$$hour$$", l[i].Time);
          document.querySelector(list).insertAdjacentHTML("beforeend", html);
        }
      },
      vocMedee: function (v) {
        this.v = v;
        var html = "",
          list = "";
        list = DOMstrings.voc;
  
        for (let i = 0; i < v.length; i++) {
          var vocDate = new Date(v[i].Date);
          var vdate = vocDate.toLocaleDateString();
          html =
            '<div class="voc"><div class="eqType">$$type$$</div><div class="eqBrand">$$brand$$</div><div class="eqModel">$$model$$</div><div class="vocDate">$$vocDate$$</div></div>';
          html = html.replace("$$type$$", v[i].EquipmentType);
          html = html.replace("$$brand$$", v[i].Brand);
          html = html.replace("$$model$$", v[i].Model);
          html = html.replace("$$vocDate$$", vdate);
          document.querySelector(list).insertAdjacentHTML("beforeend", html);
        }
      },
      getInput: function () {
        return {
          sap: document.querySelector(DOMstrings.inputSAP).value,
        };
      },
  
      getDOMstrings: function () {
        return DOMstrings;
      },
    };
  })();
  
  var financeController = (function () {})();
  
  // surgaltiin medeelel excel file naas unshij hereglegchiin oruulsan SAP aar shuugeed massive bdlaar butsaana
  var appController = (function (uiController, financeController) {
    var ctrlVocList = function () {
      //SAP dugaar shalgah
      var sapP = Math.ceil(uiController.getInput().sap);
  
      // excel file unshih heseg
      var url = "./voc.xlsx";
  
      var oReq = new XMLHttpRequest();
  
      oReq.open("GET", url, true);
  
      oReq.responseType = "arraybuffer";
  
      oReq.onload = function (e) {
        var arraybuffer = oReq.response;
  
        /* convert data to binary string */
  
        var data = new Uint8Array(arraybuffer);
  
        var arr = new Array();
  
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
  
        var bstr = arr.join("");
  
        /* Call XLSX */
  
        var workbook = XLSX.read(bstr, { type: "binary" });
  
        /* DO SOMETHING WITH workbook HERE */
  
        var first_sheet_name = workbook.SheetNames[0];
  
        /* Get worksheet */
  
        var worksheet = workbook.Sheets[first_sheet_name];
        var dataT = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        var result = dataT.filter((x) => x.SAP === sapP);
        uiController.vocMedee(result);
      };
  
      oReq.send();
    };
    var ctrlTrainingList = function () {
      //SAP dugaar shalgah
      var sapP = Math.ceil(uiController.getInput().sap);
  
      // excel file unshih heseg
      var url = "./training.xlsx";
  
      var oReq = new XMLHttpRequest();
  
      oReq.open("GET", url, true);
  
      oReq.responseType = "arraybuffer";
  
      oReq.onload = function (e) {
        var arraybuffer = oReq.response;
  
        /* convert data to binary string */
  
        var data = new Uint8Array(arraybuffer);
  
        var arr = new Array();
  
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
  
        var bstr = arr.join("");
  
        /* Call XLSX */
  
        var workbook = XLSX.read(bstr, { type: "binary" });
  
        /* DO SOMETHING WITH workbook HERE */
  
        var first_sheet_name = workbook.SheetNames[0];
  
        /* Get worksheet */
  
        var worksheet = workbook.Sheets[first_sheet_name];
        var dataT = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        var result = dataT.filter((x) => x.SAP === sapP);
        uiController.trainingMedee(result);
      };
  
      oReq.send();
    };
  
    //qualification list
  
    
      
      var firebaseConfig = {
        apiKey: "AIzaSyBK4caff0HKXlYB6qJxrsC6KRga0p_lQhQ",
        authDomain: "mcsi-booster-fan.firebaseapp.com",
        databaseURL: "https://mcsi-booster-fan-default-rtdb.firebaseio.com",
        projectId: "mcsi-booster-fan",
        storageBucket: "mcsi-booster-fan.appspot.com",
        messagingSenderId: "533847511325",  
        appId: "1:533847511325:web:e5d0d72bf912b3bd9691f4"
      };
      firebase.initializeApp(firebaseConfig);
      var messagesRef = firebase.database().ref('Data');
      var result=[];
      var dataT
      messagesRef.once('value', function(snapshot){
        dataT = snapshot.val();
      },);
  
    var ctrlAddItem = function () {
      //SAP dugaar shalgah
      var sapP = Math.ceil(uiController.getInput().sap);
      
    
      // Initialize Firebase
      
      
        result = [];
        for(let x in dataT){
          var sapCheck = dataT[x]['SAP'];
          if( sapCheck == sapP){
            result.push(dataT[x]);
          
          }
          
        };  
        uiController.medee(result);
      
      
      
      
        
    };
  
    var setupEventListeners = function () {
      var DOM = uiController.getDOMstrings();
      var html1, loader;
      loader = DOM.loaderDiv;
      train = DOM.surgalt;
      html2 = "";
      html1 =
        '<div class="loader"><svg><use href="icons.svg#icon-cw"</use></svg></div>';
      document
        .querySelector(DOM.searchBtn)
        .addEventListener("click", function () {
          var sapCheck = uiController.getInput().sap;
          if (isNaN(sapCheck)) {
            window.alert("Зөвхөн тоо оруулна уу!!!");
          } else {
            if (sapCheck.length < 7) {
              window.alert("САП дугаар алдаатай байна!!!");
            } else {
              if (sapCheck.length > 7) {
                window.alert("САП дугаар алдаатай байна!!!");
              } else {
                document.getElementById("nemeh").innerHTML = "";
                document.getElementById("trainustgah").innerHTML = "";
                document.getElementById("vocUstgah").innerHTML = "";
                document.querySelector(DOM.nameP).textContent = "";
                document.querySelector(DOM.nameCom).textContent = "";
                document
                  .querySelector(loader)
                  .insertAdjacentHTML("beforeend", html1);
                // document
                //   .querySelector(train)
                //   .insertAdjacentHTML("beforeend", html2);
  
                ctrlAddItem();
                // ctrlTrainingList();
                // ctrlVocList();
              }
            }
          }
        });
  
      document.addEventListener("keypress", function (event) {
        if (event.keyCode === 13 || event.which === 13) {
          var sapCheck = uiController.getInput().sap;
          if (isNaN(sapCheck)) {
            window.alert("Зөвхөн тоо оруулна уу!!!");
          } else {
            if (sapCheck.length < 7) {
              window.alert("САП дугаар алдаатай байна!!!");
            } else {
              if (sapCheck.length > 7) {
                window.alert("САП дугаар алдаатай байна!!!");
              } else {
                document.getElementById("nemeh").innerHTML = "";
                document.getElementById("trainustgah").innerHTML = "";
                document.getElementById("vocUstgah").innerHTML = "";
                document.querySelector(DOM.nameP).textContent = "";
                document.querySelector(DOM.nameCom).textContent = "";
                document
                  .querySelector(loader)
                  .insertAdjacentHTML("beforeend", html1);
                // document
                //   .querySelector(train)
                //   .insertAdjacentHTML("beforeend", html2);
  
                ctrlAddItem();
                // ctrlTrainingList();
                // ctrlVocList();
              }
            }
          }
        }
      });
    };
  
    return {
      init: function () {
        console.log("Application started...");
        setupEventListeners();
      },
    };
  })(uiController, financeController);
  
  appController.init();
  
  
