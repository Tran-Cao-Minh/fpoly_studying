# different from add and update
## update
- have 
const pageUrl = location.href;
const fetchLinkPrefix = 'https://tcm-shop-default-rtdb.firebaseio.com/???/';
const id = pageUrl.substring(pageUrl.lastIndexOf('/') + 1);

- when create custom select need parameter to set default value for option

- when create form validator need all modified fields to check and require change at least one field

- when check duplicate need to remove the value of it like it name

-> when success: add -> reset form + change duplicate value by add new | update -> not reset but change it with new value + no need to change duplicate

-> change all text from add to update

-# some special need overide update when success update