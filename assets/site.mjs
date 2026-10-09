import {prepareInquiry,todayInEcuador} from './inquiry.mjs';
const form=document.querySelector('#inquiry'),result=document.querySelector('#result'),error=document.querySelector('#error');
form.querySelector('fieldset').disabled=false;form.elements.date.min=todayInEcuador();
function clearDraft(){result.hidden=true;document.querySelector('#whatsapp').removeAttribute('href');document.querySelector('#draft').textContent='';error.textContent='';}
form.addEventListener('input',clearDraft);form.addEventListener('change',clearDraft);
form.addEventListener('submit',event=>{
 event.preventDefault();clearDraft();form.elements.date.min=todayInEcuador();
 try{const prepared=prepareInquiry(Object.fromEntries(new FormData(form)));document.querySelector('#draft').textContent=prepared.text;document.querySelector('#whatsapp').href=prepared.url;result.hidden=false;document.querySelector('#result-title').focus();}
 catch(e){error.textContent=e.message;}
});
