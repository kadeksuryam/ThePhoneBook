(this["webpackJsonp2.6-2.10"]=this["webpackJsonp2.6-2.10"]||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var r=t(0),s=t(2),c=t(15),o=t.n(c),u=t(3),a=t(6),i=t(4),j=t.n(i),l="/api/persons",b=function(){return j.a.get(l).then((function(e){return e.data}))},d=function(e){return j.a.post(l,e).then((function(e){return e.data}))},f=function(e){return j.a.delete("".concat(l,"/").concat(e)).then((function(e){return e.data}))},h=function(e,n){return j.a.put("".concat(l,"/").concat(n),e).then((function(e){return e.data}))},m=function(e){var n=e.person,t=e.persons,s=e.setPersons,c=e.setErrorMessange;return Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)("div",{children:[n.name," ",n.number," ",Object(r.jsx)("button",{onClick:function(){window.confirm("Delete ".concat(n.name,"?"))&&f(n.id).then((function(e){var r=t.filter((function(e){return e.id!==n.id}));s(r)})).catch((function(e){c("Information of ".concat(n.name," has already been removed from server")),setTimeout((function(){c(null)}),5e3),s(t.filter((function(e){return e.id!==n.id})))}))},children:"delete"})]})})},O=function(e){var n=e.persons,t=e.filter,s=e.setPersons,c=e.setErrorMessange,o=n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())}));return Object(r.jsx)("div",{children:Object(r.jsx)("ul",{children:o.map((function(e){return Object(r.jsx)(m,{person:e,persons:n,setPersons:s,setErrorMessange:c},e.name)}))})})},p=function(e){var n=e.newFilter,t=e.setNewFilter;return Object(r.jsxs)("div",{children:["filter shown with ",Object(r.jsx)("input",{value:n,onChange:function(e){t(e.target.value)}})]})},v=function(e){var n=e.persons,t=e.setPersons,s=e.newName,c=e.newNumber,o=e.setNewName,u=e.setNewNumber,i=e.setSuccessMessange,j=e.setErrorMessange;return Object(r.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),n.some((function(e){return e.name===s}))){if(window.confirm("".concat(s," is already added to phonebook, replace the old number with a new one?"))){var r=n.find((function(e){return e.name===s})),l=Object(a.a)(Object(a.a)({},r),{},{number:c});h(l,l.id).then((function(e){t(n.map((function(n){return n.name!==s?n:e})))})).catch((function(e){j(e.response.data.error),setTimeout((function(){j(null)}),5e3)}))}}else d({name:s,number:c}).then((function(e){i("Added ".concat(s)),setTimeout((function(){i(null)}),5e3),t(n.concat(e))})).catch((function(e){j(e.response.data.error),setTimeout((function(){j(null)}),5e3)}));o(""),u("")},children:[Object(r.jsxs)("div",{children:["name: ",Object(r.jsx)("input",{value:s,onChange:function(e){o(e.target.value)}})]}),Object(r.jsxs)("div",{children:["number: ",Object(r.jsx)("input",{value:c,onChange:function(e){u(e.target.value)}})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})},x=function(e){var n=e.successMessange;return null==n?null:Object(r.jsx)("div",{className:"success",children:n})},w=function(e){var n=e.errorMessange;return null==n?null:Object(r.jsx)("div",{className:"error",children:n})},g=function(){var e=Object(s.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],o=Object(s.useState)(""),a=Object(u.a)(o,2),i=a[0],j=a[1],l=Object(s.useState)(""),d=Object(u.a)(l,2),f=d[0],h=d[1],m=Object(s.useState)(""),g=Object(u.a)(m,2),N=g[0],M=g[1],S=Object(s.useState)(null),E=Object(u.a)(S,2),P=E[0],C=E[1],k=Object(s.useState)(null),F=Object(u.a)(k,2),y=F[0],T=F[1];return Object(s.useEffect)((function(){b().then((function(e){c(e)}))}),[]),Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(w,{errorMessange:P}),Object(r.jsx)(x,{successMessange:y}),Object(r.jsx)(p,{newFilter:N,setNewFilter:M}),Object(r.jsx)("h3",{children:"add a new"}),Object(r.jsx)(v,{persons:t,setPersons:c,newName:i,newNumber:f,setNewName:j,setNewNumber:h,setSuccessMessange:T,setErrorMessange:C}),Object(r.jsx)("h2",{children:"Numbers"}),Object(r.jsx)(O,{persons:t,filter:N,setPersons:c,setErrorMessange:C})]})};t(39);o.a.render(Object(r.jsx)(g,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.370a74da.chunk.js.map