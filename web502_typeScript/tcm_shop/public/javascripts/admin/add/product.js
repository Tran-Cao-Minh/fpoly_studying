(()=>{"use strict";var t,e=function(t){return function(e){console.log(t,e)}},n=function(t,e){console.log("Main Class: ",t,"Selected Property: ",e)},o=function(t,e,n){console.log("Main Class: ",t,"Selected Method: ",e,"Method Descriptor: ",n)},r=function(t,e,n,o){var r,a=arguments.length,c=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(a<3?r(c):a>3?r(e,n,c):r(e,n))||c);return a>3&&c&&Object.defineProperty(e,n,c),c},a=function(){function t(t,e,n,o){this.selectElement=t,this.activeClass=e,this.selectOptionContainer=n,this.attributeList=o}return t.prototype.addOptionItem=function(t,e){void 0===e&&(e=[{key:String(),data:String()}]);var n=document.createElement("li");e.forEach((function(t){n.setAttribute(t.key,t.data)})),n.innerText=t,this.selectOptionContainer.appendChild(n)},t.prototype.createLabelPointer=function(t){var e=this;t.addEventListener("click",(function(){e.selectElement.focus()}))},t.prototype.createCustomSelect=function(t,e,n){var o=this;this.selectElement.setAttribute("tabindex","0");var r,a,c=function(t){t?o.selectElement.classList.add(o.activeClass):o.selectElement.classList.remove(o.activeClass)},i=function(t){u.forEach((function(t){t.removeAttribute(n)})),t.setAttribute(n,"")},u=this.selectElement.querySelectorAll("li"),s=0;o.selectElement.addEventListener("focus",(function(){c(!0),i(u[s])})),o.selectElement.addEventListener("focusout",(function(){c(!1)})),o.selectElement.addEventListener("mouseenter",(function(){c(!0),i(u[s])})),o.selectElement.addEventListener("mouseleave",(function(){c(!1)})),o.selectElement.addEventListener("click",(function(){c(r),r=!0})),o.selectElement.addEventListener("keydown",(function(t){"ArrowDown"===t.key?(s<u.length-1?s++:s=0,i(u[s])):"ArrowUp"===t.key?(s>0?s--:s=u.length-1,i(u[s])):"Enter"===t.key&&(o.selectElement.classList.contains(o.activeClass)?u[s].click():c(!0))})),a=function(t){o.attributeList.forEach((function(e){o.selectElement.setAttribute(e,t.getAttribute(e))})),e.innerHTML=t.innerHTML,r=!1},u.forEach((function(e,n){e.getAttribute("value")===t&&(a(e),r=!0,s=n,i(e)),e.addEventListener("click",(function(){a(e),s=n,i(e),c(!1)})),e.addEventListener("mouseenter",(function(){i(e)}))}))},r([n],t.prototype,"selectElement",void 0),r([n],t.prototype,"activeClass",void 0),r([n],t.prototype,"selectOptionContainer",void 0),r([n],t.prototype,"attributeList",void 0),r([o],t.prototype,"addOptionItem",null),r([o],t.prototype,"createLabelPointer",null),r([o],t.prototype,"createCustomSelect",null),r([e("Custom Select Creator")],t)}(),c=(t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)},function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}),i=function(t,e,n,o){var r,a=arguments.length,c=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(a<3?r(c):a>3?r(e,n,c):r(e,n))||c);return a>3&&c&&Object.defineProperty(e,n,c),c},u=function(t,e){this.fetchLink=t,this.fetchMethod=e},s=function(t){function n(e){return t.call(this,"".concat(e,".json"),"GET")||this}return c(n,t),n.prototype.readData=function(t){fetch(this.fetchLink,{method:this.fetchMethod}).then((function(t){if(!t.ok)throw new Error("Error = "+t.status);return t.json()})).then((function(e){t(e)})).catch((function(t){console.log("error: "+t)}))},i([o],n.prototype,"readData",null),i([e("Data Reader")],n)}(u),l=(function(t){function n(e){return t.call(this,e,"DELETE")||this}c(n,t),n.prototype.deleteData=function(t,e){var n="".concat(this.fetchLink,"/").concat(t,".json");fetch(n,{method:this.fetchMethod}).then((function(t){if(!t.ok)throw new Error("error = "+t.status);return t.json()})).then((function(t){e(t)})).catch((function(t){console.log("error: "+t)}))},i([o],n.prototype,"deleteData",null),n=i([e("Data Deleter")],n)}(u),function(t){function n(e){return t.call(this,e,"POST")||this}return c(n,t),n.prototype.addData=function(t,e,n){fetch("".concat(this.fetchLink,".json"),{method:this.fetchMethod,body:t}).then((function(t){if(!t.ok)throw n(),new Error("error = "+t.status);return t.json()})).then((function(){e()})).catch((function(t){console.log("error: "+t)}))},i([o],n.prototype,"addData",null),i([e("Data Adder")],n)}(u)),d=function(t){function n(e){return t.call(this,e,"PUT")||this}return c(n,t),n.prototype.updateData=function(t,e,n,o){fetch("".concat(this.fetchLink+t,".json"),{method:this.fetchMethod,body:JSON.stringify(e)}).then((function(t){if(!t.ok)throw o(),new Error("error = "+t.status);return t.json()})).then((function(){n()})).catch((function(t){console.log("error: "+t)}))},i([o],n.prototype,"updateData",null),i([e("Data Updater")],n)}(u),p=function(t,e,n,o){var r,a=arguments.length,c=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(a<3?r(c):a>3?r(e,n,c):r(e,n))||c);return a>3&&c&&Object.defineProperty(e,n,c),c},h=function(){function t(t,e,n,o){this.submitButton=t,this.hideMessageContainerClass=e,this.inputInvalidClass=n,this.inputValidClass=o,this.inputList=[],this.checkValidate=!1}return t.prototype.changeInputStatus=function(t,e,n){!0===n?(e.classList.add(this.hideMessageContainerClass),t.classList.remove(this.inputInvalidClass),t.classList.add(this.inputValidClass)):!1===n&&(e.classList.remove(this.hideMessageContainerClass),t.classList.remove(this.inputValidClass),t.classList.add(this.inputInvalidClass))},t.prototype.changeButtonStatus=function(){var t=this;this.checkValidate=!0,this.inputList.forEach((function(e){!1===e.classList.contains(t.inputValidClass)&&(t.checkValidate=!1)})),!0===this.checkValidate?this.submitButton.removeAttribute("disabled"):this.submitButton.setAttribute("disabled","")},t.prototype.addTextInputValidator=function(t,e,n,o,r,a,c){var i=this;this.inputList.push(t),t.addEventListener("change",(function(){t.value=t.value.trim();var u=t.value,s=!1;u.length<o?(n.innerHTML="The ".concat(e," must have more than ").concat(o," "),n.innerHTML+=1===o?"character":"characters"):u.length>r?(n.innerHTML="The ".concat(e," must have less than ").concat(r," "),n.innerHTML+=1===r?"character":"characters"):!1===a.test(u)?n.innerHTML=c:s=!0,i.changeInputStatus(t,n,s),i.changeButtonStatus()}))},t.prototype.addNumberInputValidator=function(t,e,n,o,r,a){var c=this;this.inputList.push(t),t.addEventListener("input",(function(){var i=Number(t.value),u=!1;isNaN(i)||""===t.value?n.innerHTML="The ".concat(e," must be a number"):i<o?n.innerHTML="The ".concat(e," must greater than ").concat(o):i>r?n.innerHTML="The ".concat(e," must lesser than ").concat(r):i/a%1!=0?n.innerHTML="The ".concat(e," step must be ").concat(a):u=!0,c.changeInputStatus(t,n,u),c.changeButtonStatus()}))},t.prototype.addFileInputValidator=function(t,e,n,o,r,a){var c=this;this.inputList.push(t);var i=1048576;t.addEventListener("change",(function(u){var s=!1,l=u.target.files[0],d=l.type,p=!1;if(o.forEach((function(t){d===t&&(p=!0)})),!1===p){var h="The ".concat(e," file extension must be a value in the list:");o.forEach((function(t){h+=" ".concat(t.split("/").pop().toUpperCase(),",")})),n.innerHTML=h.slice(0,-2)}else l.size<r*i?n.innerHTML="The ".concat(e," file size must greater than ").concat(r," MB"):l.size>a*i?n.innerHTML="The ".concat(e," file size must lesser than ").concat(a," MB"):s=!0;c.changeInputStatus(t,n,s),c.changeButtonStatus()}))},t.prototype.addDateInputValidator=function(t,e,n,o,r){var a=this;void 0===o&&(o={day:Number(),month:Number(),year:Number()}),void 0===r&&(r={day:Number(),month:Number(),year:Number()}),this.inputList.push(t);var c=new Date(o.year,o.month-1,o.day).getTime(),i=new Date(r.year,r.month-1,r.day).getTime(),u=function(){var u=t.value,s=!1;if(""===u)n.innerHTML="The ".concat(e," must be a valid date");else{var l=u.split(/\D/),d=Number(l[0]),p=Number(l[1])-1,h=Number(l[2]),f=new Date(d,p,h).getTime();if(f<c||d<100&&o.year>=100){var m="".concat(o.day,"/").concat(o.month,"/").concat(o.year);n.innerHTML="The ".concat(e," must greater than ").concat(m)}else if(f>i){var y="".concat(r.day,"/").concat(r.month,"/").concat(r.year);n.innerHTML="The ".concat(e," must lesser than ").concat(y)}else s=!0}a.changeInputStatus(t,n,s),a.changeButtonStatus()};t.addEventListener("blur",u),t.addEventListener("keypress",(function(t){"Enter"===t.key&&u()}))},t.prototype.addRetypeInputValidator=function(t,e,n,o,r){var a=this;this.inputList.push(n);var c,i=!1,u=function(){!1==(c=n.value===t.value)&&(r.innerHTML="The ".concat(o," must be like the ").concat(e)),a.changeInputStatus(n,r,c),a.changeButtonStatus()};t.addEventListener("change",(function(){!0===i&&u()})),n.addEventListener("change",(function(){i=!0,u()}))},t.prototype.checkDuplicateValidator=function(t,e,n,o,r,a,c){var i=this;void 0===r&&(r=Boolean()),void 0===a&&(a=Boolean()),void 0===c&&(c=Boolean()),t.setAttribute("data-duplicate",JSON.stringify(o));var u=function(o){var c,u=JSON.parse(t.dataset.duplicate);!0===a&&(o=o.toLowerCase(),u.forEach((function(t,e,n){n[e]=t.toLowerCase()}))),!0===r?(c=!1,u.forEach((function(t){o===t&&(c=!0)}))):!1===r&&(c=!0,u.forEach((function(t){o===t&&(c=!1)}))),!1===c&&!1===r?n.innerHTML="The ".concat(e," is exist"):!1===c&&!0===r&&(n.innerHTML="The ".concat(e," is not exist")),i.changeInputStatus(t,n,c),i.changeButtonStatus()};!1===c?(this.inputList.push(t),t.addEventListener("change",(function(){u(t.value)}))):t.addEventListener("change",(function(){t.classList.contains(i.inputValidClass)&&u(t.value)}))},t.prototype.changeDuplicateValue=function(t,e,n){var o=JSON.parse(t.dataset.duplicate);!0===n?o.push(e):o.splice(o.indexOf(e),1),t.setAttribute("data-duplicate",JSON.stringify(o))},t.prototype.createSubmitButtonEvent=function(t,e){var n=this;!0===e?this.submitButton.setAttribute("disabled","true"):(this.checkValidate=!0,this.inputList.forEach((function(t){t.classList.add(n.inputValidClass)}))),this.submitButton.addEventListener("click",(function(e){e.preventDefault(),!0===n.checkValidate&&t()}))},t.prototype.resetForm=function(t){var e=this;t.reset(),this.inputList.forEach((function(t){t.classList.remove(e.inputValidClass)})),this.changeButtonStatus()},p([n],t.prototype,"submitButton",void 0),p([n],t.prototype,"hideMessageContainerClass",void 0),p([n],t.prototype,"inputInvalidClass",void 0),p([n],t.prototype,"inputValidClass",void 0),p([n],t.prototype,"inputList",void 0),p([n],t.prototype,"checkValidate",void 0),p([o],t.prototype,"changeInputStatus",null),p([o],t.prototype,"changeButtonStatus",null),p([o],t.prototype,"addTextInputValidator",null),p([o],t.prototype,"addNumberInputValidator",null),p([o],t.prototype,"addFileInputValidator",null),p([o],t.prototype,"addDateInputValidator",null),p([o],t.prototype,"addRetypeInputValidator",null),p([o],t.prototype,"checkDuplicateValidator",null),p([o],t.prototype,"changeDuplicateValue",null),p([o],t.prototype,"createSubmitButtonEvent",null),p([o],t.prototype,"resetForm",null),p([e("Form Validator")],t)}(),f=function(t,e,n,o){var r,a=arguments.length,c=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(a<3?r(c):a>3?r(e,n,c):r(e,n))||c);return a>3&&c&&Object.defineProperty(e,n,c),c},m=function(){function t(t,e,n,o){this.verticalAlign=t,this.verticalOffset=e,this.horizontalAlign=n,this.horizontalOffset=o}return t.prototype.createToast=function(t,e,n){var o,r=this,a=document.body,c="toast-".concat(t);switch(t){case"success":o='<i class="fa-solid fa-check"></i>';break;case"danger":o='<i class="fa-solid fa-xmark"></i>';break;case"warning":o='<i class="fa-solid fa-exclamation"></i>';break;case"info":o='<i class="fa-solid fa-question"></i>'}var i=document.createElement("div");i.setAttribute("class","toast ".concat(c," js-toastify")),i.innerHTML='\n      <div class="toast-icon">\n        '.concat(o,'\n      </div>\n      <div class="toast-message">\n        ').concat(e,'\n      </div>\n      <div class="toast-close">\n        <i class="fa-solid fa-xmark"></i>\n      </div>\n    ');var u=document.querySelectorAll(".js-toastify"),s=this.verticalOffset;u.length>0&&u.forEach((function(t){s+=r.verticalOffset+t.offsetHeight})),i.setAttribute("style","\n      ".concat(this.horizontalAlign,": ").concat(this.horizontalOffset,"px;\n      ").concat(this.verticalAlign,": ").concat(s,"px;\n    ")),a.appendChild(i);var l=function(){i.style[r.horizontalAlign]="-".concat(i.offsetWidth,"px"),i.style.opacity="0.2",setTimeout((function(){for(var t=i.nextElementSibling;t;){var e=Number(t.style[r.verticalAlign].slice(0,-2));t.style[r.verticalAlign]="".concat(e-i.offsetHeight-r.verticalOffset,"px"),t=t.nextElementSibling}a.removeChild(i)}),200)},d=setTimeout((function(){l()}),1e3*n);i.querySelector(".toast-close").addEventListener("click",(function(){clearTimeout(d),l()}))},f([n],t.prototype,"verticalAlign",void 0),f([n],t.prototype,"verticalOffset",void 0),f([n],t.prototype,"horizontalAlign",void 0),f([n],t.prototype,"horizontalOffset",void 0),f([o],t.prototype,"createToast",null),f([e("Toast Creator")],t)}(),y=function(t,e,n,o){var r,a=arguments.length,c=a<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(a<3?r(c):a>3?r(e,n,c):r(e,n))||c);return a>3&&c&&Object.defineProperty(e,n,c),c},v=function(){function t(t){this.input=t}return t.prototype.addShowImageEvent=function(t){var e=this;this.input.addEventListener("change",(function(n){var o=n.target.files[0],r=new FileReader;r.readAsDataURL(o),r.addEventListener("load",(function(){var n=r.result;t.src=n,e.input.setAttribute("data-base64",n)}))}))},t.prototype.addShowImageFileNameEvent=function(t){this.input.addEventListener("change",(function(e){var n=e.target.files[0].name;t.innerHTML=n}))},y([n],t.prototype,"input",void 0),y([o],t.prototype,"addShowImageEvent",null),y([o],t.prototype,"addShowImageFileNameEvent",null),y([e("Sing Image Previewer")],t)}(),g=new m("bottom",16,"right",16),b={form:document.querySelector("#addProductForm"),productName:document.querySelector("#productName"),productPublisher:document.querySelector("#productPublisher"),productDimensions:document.querySelector("#productDimensions"),productPublishDate:document.querySelector("#productPublishDate"),productCategory:document.querySelector("#productCategory"),productTag:document.querySelector("#productTag"),productDisplay:document.querySelector("#productDisplay"),productPrice:document.querySelector("#productPrice"),productSalePercent:document.querySelector("#productSalePercent"),productQuantity:document.querySelector("#productQuantity"),productOrder:document.querySelector("#productOrder"),productPages:document.querySelector("#productPages"),productImage:document.querySelector("#productImage"),productDescription:document.querySelector("#productDescription"),submitButton:document.querySelector("#js-add-data-submit")};window.addEventListener("load",(function(){var t,e,n,o,r,c,i,u,p,f,m,y,E,S,L,P,T,D,w,k,C,I;e=(t=document.querySelector("#productImage")).parentElement.querySelector("[for=productImage]"),n=t.parentElement.parentElement.querySelector("img.js-preview-image"),(o=new v(t)).addShowImageFileNameEvent(e),o.addShowImageEvent(n),function(){var t=document.querySelector("#productDisplay"),e=t.querySelector(".custom-select-list"),n=t.querySelector(".custom-select-text"),o=document.querySelectorAll("[for=productDisplay]"),r=new a(t,"active",e,["value"]);o.forEach((function(t){r.createLabelPointer(t)}));var c=["Show","Hide"];c.forEach((function(t){r.addOptionItem(t,[{key:"value",data:t}])})),r.createCustomSelect(c[0],n,"choosen")}(),c=(r=document.querySelector("#productCategory")).querySelector(".custom-select-list"),i=r.querySelector(".custom-select-text"),u=document.querySelector("[for=productCategory]"),(p=new a(r,"active",c,["value"])).createLabelPointer(u),new s("https://tcm-shop-default-rtdb.firebaseio.com/categories").readData((function(t){Object.keys(t).map((function(e){var n=t[e].CategoryName;p.addOptionItem(n,[{key:"value",data:n}])})),p.createCustomSelect(t[Object.keys(t)[0]].CategoryName,i,"choosen")})),function(){var t=document.querySelector("#productTag"),e=t.querySelector(".custom-select-list"),n=t.querySelector(".custom-select-text"),o=document.querySelector("[for=productTag]"),r=new a(t,"active",e,["value"]);r.createLabelPointer(o);var c=["None","Hot","New"];c.forEach((function(t){r.addOptionItem(t,[{key:"value",data:t}])})),r.createCustomSelect(c[0],n,"choosen")}(),I=new h(b.submitButton,"d-none","is-invalid","is-valid"),C=b.productName.parentElement.parentElement.querySelector(".invalid-feedback"),I.addTextInputValidator(b.productName,"product name",C,4,200,/^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{3,199})$/,"Product name must be start with alphanumeric and \n      contains only alphanumeric, underscore or some specials \n      characters include , ' \" : - ; _ + . |"),new s("https://tcm-shop-default-rtdb.firebaseio.com/products").readData((function(t){var e=[];Object.keys(t).map((function(n){e.push(t[n].ProductName)})),I.checkDuplicateValidator(b.productName,"product name",C,e,!1,!1,!0)})),f=b.productPublisher.parentElement.parentElement.querySelector(".invalid-feedback"),I.addTextInputValidator(b.productPublisher,"product publisher",f,4,200,/^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{3,199})$/,"Product publisher must be start with alphanumeric and \n      contains only alphanumeric, underscore or some specials \n      characters include , ' \" : - ; _ + . |"),m=b.productDimensions.parentElement.parentElement.querySelector(".invalid-feedback"),I.addTextInputValidator(b.productDimensions,"product dimensions",m,4,200,/^([A-Za-z0-9]{1})([\w\s'":,.&+|-]{0,199})$/,"Product dimensions must be start with alphanumeric and \n      contains only alphanumeric, underscore or some specials \n      characters include , ' \" : - ; _ + . |"),y=b.productPublishDate.parentElement.parentElement.querySelector(".invalid-feedback"),I.addDateInputValidator(b.productPublishDate,"product publish date",y,{day:1,month:1,year:1800},{day:31,month:12,year:3e3}),E=b.productPrice.parentElement.parentElement.querySelector(".invalid-feedback"),I.addNumberInputValidator(b.productPrice,"product price",E,0,999999999.99,.01),S=b.productSalePercent.parentElement.parentElement.querySelector(".invalid-feedback"),I.addNumberInputValidator(b.productSalePercent,"product sale percent",S,0,100,1),L=b.productQuantity.parentElement.parentElement.querySelector(".invalid-feedback"),I.addNumberInputValidator(b.productQuantity,"product quantity",L,0,999999999,1),P=b.productOrder.parentElement.parentElement.querySelector(".invalid-feedback"),I.addNumberInputValidator(b.productOrder,"product order",P,1,99,1),T=b.productPages.parentElement.parentElement.querySelector(".invalid-feedback"),I.addNumberInputValidator(b.productPages,"product pages",T,1,99999,1),D=b.productImage.parentElement.parentElement.querySelector(".invalid-feedback"),I.addFileInputValidator(b.productImage,"product image",D,["image/jpeg","+/webp"],0,2),w=b.productDescription.parentElement.parentElement.querySelector(".invalid-feedback"),I.addTextInputValidator(b.productDescription,"product description",w,50,2e3,/^([A-Za-z0-9]{1})([\s\S]{49,1999})$/,"Product description must be start with alphanumeric"),k=new l("https://tcm-shop-default-rtdb.firebaseio.com/products"),I.createSubmitButtonEvent((function(){var t=JSON.stringify({ProductName:b.productName.value,ProductPublisher:b.productPublisher.value,ProductDimensions:b.productDimensions.value,ProductPublishDate:b.productPublishDate.value,ProductCategory:b.productCategory.getAttribute("value"),ProductTag:b.productTag.getAttribute("value"),ProductDisplay:b.productDisplay.getAttribute("value"),ProductPrice:Number(b.productPrice.value),ProductSalePercent:Number(b.productSalePercent.value),ProductQuantity:Number(b.productQuantity.value),ProductOrder:Number(b.productOrder.value),ProductPages:Number(b.productPages.value),ProductImage:b.productImage.dataset.base64,ProductDescription:b.productDescription.value,ProductViews:0,ProductSoldQuantity:0});k.addData(t,(function(){var t,e,n,o,r;g.createToast("success","Add product completed \n Product name: ".concat(b.productName.value),2),I.changeDuplicateValue(b.productName,b.productName.value,!0),I.resetForm(b.form),b.productImage.parentElement.parentElement.querySelector("img.js-preview-image").src="/images/base/preview-img.svg",b.productImage.parentElement.querySelector("[for=productImage]").innerText="Choose an image",t=b.productCategory.getAttribute("value"),e=new s("https://tcm-shop-default-rtdb.firebaseio.com/categories"),n=new d("https://tcm-shop-default-rtdb.firebaseio.com/categories/"),o=function(){setTimeout((function(){g.createToast("success",'Update overide category product quantity of "'.concat(t,'" completed'),2)}),100)},r=function(){setTimeout((function(){g.createToast("danger","Update overide pcategory product quantity failed",2)}),100)},e.readData((function(e){Object.keys(e).map((function(a){e[a].CategoryName===t&&function(t,e){var a=t+"/CategoryProductQuantity",c=e+1;n.updateData(a,c,o,r)}(a,e[a].CategoryProductQuantity)}))}))}),(function(){g.createToast("danger","Add product failed",2)}))}),!0)}))})();