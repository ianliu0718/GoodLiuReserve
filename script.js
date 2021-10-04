function PostToGAS(){
	////97版測試用
	//var data_url = "https://script.google.com/macros/s/AKfycbz2uNomPmtyYIFtlmFShRajrNeJKbQsi16gv9137U1mMvAfpRwoaAqSxYTCm5tF1Q3c/exec";
	//109版 Line送出訊息移除最後一行空白
	var data_url = "https://script.google.com/macros/s/AKfycbwt1jizyvUveFFvZjRPIudKTJldlniUu4hnA_bEbfKqgSzOnCw_LhNdIXXTYl8YeVcf/exec";
	
	var ianPostData = {
       "ReserveName": document.getElementById('ReserveName').value,
       "ReserveGender": ReserveGenderValue(),
       "ReservePhone": document.getElementById('ReservePhone').value,
       "ReserveItemList": JSON.stringify(ChangeReserveItemListToArray()),
       "ReserveDate": document.getElementById('ReserveDate').value,
       "ReserveTime": document.getElementById('ReserveTime').value,
       "ReservePlace": document.getElementById('ReservePlace').value
	};
	$.ajax({
	type: "POST",
	url: data_url,
	data: ianPostData ,
	success: function(response) {
		//alert("成功");
		console.log(response);
		Return(response.returnMsg);
	},
	error: function(){alert("失敗！")}
	});
}

//換行為：%0A
//GAS回傳後的更新
function SendLINEReservation(sendMsg){
	liff.init({
		liffId: '1656397971-q9WB8y1b'
	})
	.then(() => {
		SendLINELIFF(sendMsg);
	})
	.catch((err) => {
		alert('啟動失敗。');
	});
}
function SendLINELIFF(sendMsg){
	if(!liff.isLoggedIn()){
		liff.login();
		
		liff.sendMessages([{
			type: 'text',
			text: sendMsg
		}])
		.then(() => {
			liff.closeWindow();
		})
		.catch((err) => {
			liff.closeWindow();
		});
	}
	else{
		liff.sendMessages([{
			type: 'text',
			text: sendMsg
		}])
		.then(() => {
			liff.closeWindow();
		})
		.catch((err) => {
			liff.closeWindow();
		});
	}
}

function Return(ReturnModel) {
  if (ReturnModel.State == true){
    document.getElementById('ReturnFalseMsg').hidden = true;
    document.getElementById('ReserveIndex').style.display = 'none';
    document.getElementById('Output').hidden = false;
    document.getElementById('Title').innerHTML = ReturnModel.Title;
    document.getElementById('OutputMsg').innerHTML = ReturnModel.OutputMsg;
    document.getElementById('SendLINEReservationMsg').innerHTML = ReturnModel.SendLINEReservationMsg;
    document.getElementById('TotalAmount').innerHTML = ReturnModel.TotalAmount;
  }
  else{
    document.getElementById('ReturnFalseMsg').hidden = false;
    document.getElementById('ReturnFalseMsg').innerHTML = ReturnModel.ReturnFalseMsg;
  }
}

function ReserveGenderValue(){
  var reserveGenderChecked = document.querySelector('[name=ReserveGender]:checked');
  if(reserveGenderChecked==null){
    return "";
  }
  return reserveGenderChecked.value;
}

function ChangeReserveItemListToArray() {
	var forgetText = ["無","套餐組合","單項部位"]//群組文字都視為空白
	var forget = false;
	var returnText = new Array();
	var text = new Array();
	for(var i=0;i<document.getElementsByName("ReserveItems").length;i++){
		for(var j=0;j<document.getElementsByName("ReserveItems")[i].getElementsByTagName("select").length;j++){
			for(var k=0;k<forgetText.length;k++){
				if (document.getElementsByName("ReserveItems")[i].getElementsByTagName("select")[j].selectedOptions[0].value == forgetText[k]){
					forget = true;
					break;
				}
			}
			if (forget){
				text.push("");
			}
			else{
				text.push(document.getElementsByName("ReserveItems")[i].getElementsByTagName("select")[j].selectedOptions[0].value);
			}
			forget = false;
		}
		returnText.push(text);
		text = new Array();
	}
	return returnText;
}
	
//動態新增 預約項目
function addReserveItems(){
	//獲取div
	var div = document.createElement("div");
	div.innerHTML = document.getElementById("ReserveItems_0").innerHTML;
	//設置屬性
	var No = document.getElementsByName("ReserveItems").length;
	if (No > 2){//項目最多3個
		document.getElementById('AddOverflowMsg').hidden = false;
		document.getElementById('AddOverflowMsg').innerHTML = "項目太多囉~";
	}
	else{
		div.setAttribute("name", "ReserveItems");
		div.setAttribute("id", "ReserveItems_"+No);
		div.setAttribute("class", "list-group-item form-group ReserveItems");
		div.querySelector("div:nth-child(2) > select").index = null;	//下拉式選單歸零
		div.querySelector("div:nth-child(3) > select").index = null;	//下拉式選單歸零
		div.querySelector("div:nth-child(2)").hidden = true;			//隱藏
		div.querySelector("div:nth-child(3)").hidden = true;			//隱藏
		//換行
		document.getElementById("ReserveItemList").appendChild(div);
		document.getElementById("ReserveItemList").appendChild(document.createElement("br"));
	}
}
    
////套餐組合
_reserveItemDetal=new Array();
// 空白選單
_reserveItemDetal[0]=["套餐組合"];
// 按摩_指壓
_reserveItemDetal[1]=["套餐組合", "套餐A.60分鐘 $1200", "套餐B.90分鐘 $1600", "套餐C.120分鐘 $1900"];
// 按摩_油壓	
_reserveItemDetal[2]=["套餐組合", "套餐D.60分鐘 $1800", "套餐E.90分鐘 $2200", "套餐F.120分鐘 $2500"];
// 按摩_雙壓
_reserveItemDetal[3]=["套餐組合", "套餐G.90分鐘 $2000", "套餐H.120分鐘 $2300"];
// 按摩_局部	
_reserveItemDetal[4]=["套餐組合", "特定局部加強 $現場定價"];		
// 熱蠟除毛_男仕		
_reserveItemDetal[5]=["套餐組合", "套餐A.基礎 $1000", "套餐B.經典 $1200", "套餐C.進階 $1400", "套餐D.精緻 $1600", "套餐E.鄰家 $1800", "套餐F.陽光 $2000"];
// 熱蠟除毛_女仕		
_reserveItemDetal[6]=["套餐組合", "套餐A.基礎 $1000", "套餐B.經典 $1200", "套餐C.進階 $1400", "套餐D.精緻 $1600", "套餐E.鄰家 $1800", "套餐F.陽光 $2000"];

////單項部位
_reserveExtraItem=new Array();
// 空白選單
_reserveExtraItem[0]=["單項部位"];
// 按摩_指壓
_reserveExtraItem[1]=["單項部位"];
// 按摩_油壓	
_reserveExtraItem[2]=["單項部位"];
// 按摩_雙壓
_reserveExtraItem[3]=["單項部位"];
// 按摩_局部	
_reserveExtraItem[4]=["單項部位"];		
// 熱蠟除毛_男仕		
_reserveExtraItem[5]=
[	"單項部位", 
	"面部-眉毛 $300", "面部-鼻孔 $300", "面部-唇週 $300", "面部-下巴 $300", 
	"私密處-V陰部 $300", "私密處-B蛋蛋 $300", "私密處-O後庭 $300", "私密處-泳褲 $300", "私密處-造型 $300",
	"上身-腋下 $300", "上身-全臂 $300", "上身-前臂 $300", "上身-胸部 $300", "上身-背部 $300", "上身-肚臍 $300", "上身-腹部 $300", 
	"下身-臀部 $300", "下身-全腿 $300", "下身-小腿 $300"
];
// 熱蠟除毛_女仕		
_reserveExtraItem[6]=
[	"單項部位", 
	"面部-眉毛 $300", "面部-鼻孔 $300", "面部-唇週 $300",
	"私密處-V陰部 $300", "私密處-I底部 $300", "私密處-O後庭 $300", "私密處-比基尼 $300", "私密處-造型 $300",
	"上身-腋下 $300", "上身-全臂 $300", "上身-前臂 $300", "上身-胸部 $300", "上身-背部 $300", "上身-肚臍 $300", "上身-腹部 $300", 
	"下身-臀部 $300", "下身-全腿 $300", "下身-小腿 $300"
];

//更新 預約項目下拉式選單
function RenewItem(id, index){
	var itemListNo = id.split("_")[1];
	//欄位調整：套餐組合
	for(var i=0;i<_reserveItemDetal[index].length;i++){
		document.getElementsByName("ReserveItemDetal")[itemListNo].options[i]=new Option(_reserveItemDetal[index][i], _reserveItemDetal[index][i]);	// 設定   新選項
	}
	document.getElementsByName("ReserveItemDetal")[itemListNo].length=_reserveItemDetal[index].length;	// 刪除多餘的選項
	//若無資料則隱藏
	if (document.getElementsByName("ReserveItemDetal")[itemListNo].length <= 1){
		document.getElementsByName("ReserveItemDetalText")[itemListNo].hidden = true
	}
	else{
		document.getElementsByName("ReserveItemDetalText")[itemListNo].hidden = false
	}
	
	//欄位調整：單項部位選項
	for(var i=0;i<_reserveExtraItem[index].length;i++){
		document.getElementsByName("ReserveExtraItem")[itemListNo].options[i]=new Option(_reserveExtraItem[index][i], _reserveExtraItem[index][i]);	// 設定   新選項
	}
	document.getElementsByName("ReserveExtraItem")[itemListNo].length=_reserveExtraItem[index].length;	// 刪除多餘的選項
	//若無資料則隱藏
	if (document.getElementsByName("ReserveExtraItem")[itemListNo].length <= 1){
		document.getElementsByName("ReserveExtraItemText")[itemListNo].hidden = true
	}
	else{
		document.getElementsByName("ReserveExtraItemText")[itemListNo].hidden = false
	}
}