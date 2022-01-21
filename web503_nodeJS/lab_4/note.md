# 1. Tạo project với express
Done

# 2. Cài module cho project
> required
npm i http-errors
npm i mysql
> advance
npm i formidable
npm i fs

# 3. Chạy project
Done $ npm start

# 4. Tạo controller trong nodejs
a. routes/category.js
b. app.js

# 5. Tạo model
npm i mysql
models/database.js

# 6. Nhúng model vào controller
routes/category.js - require database

# 7. Chức năng hiện danh sách record
a. routes/category.js - /
b. views/category-list.ejs

# 8. Chức năng hiện form thêm mới
a. routes/category.js - /add
b. views/category-add.ejs

# 9. Chức năng lưu form vào database
a. routes/category.js - /store

# 10. Chức năng hiện form edit 1 record
a. routes/category.js - /edit/:id
b. views/category-edit.ejs

# 11. Code cập nhật record vào database
routes/category.js - /update

# 12. Chức năng xóa 1 record trong database
routes/category.js - /delete/:id

