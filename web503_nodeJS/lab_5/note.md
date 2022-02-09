# 0. Tiền chuẩn bị
Đọc hiểu và theo dõi bài giảng, 
chuyến các kiến thức đã học được sang tiếng Anh

# 1. Chuẩn bị Database
2 table gồm: product, product_category
- có nâng cấp thêm các trường mới cho dữ liệu phong phú
- tên các cột đặt theo quy chuẩn bằng tiếng Anh
- các bảng có quan hệ và ràng buộc rõ ràng
- dữ liệu thực tế, chính xác, đa dạng

# 2. Cài module express và express-generator
Đã cài đặt
> npm i -g express
> npm i -g i express-generator

# 3. Tạo project để thực tập
Vào thư mục web503_nodeJS, mở terminal
- chạy lệnh
> express --view=ejs lab_5
- mở terminal tại thư mục lab_5 vừa tạo, chạy lệnh
> npm i
> npm i mysql
 
# 4. Tạo model kết nối db
- tạo thư mục models
- tạo file database.js trong thư mục vừa tạo
`viết code`
- viết bằng tiếng Anh, format đẹp

# 5. Tạo route (product thay sách)
tại file app.js dòng 25, 31
tạo file routes/product.js
- format đẹp, tiếng Anh

# 6. Thực hiện chức năng danh sách record - product
tại router get dòng 7 - file routes/product.js
- gộp sql cùng hàm query, code đẹp, tiếng Anh
- gọi tất cả dữ liệu ra res.json
- tìm hiểu res.json có thể format, định dạng khác với res.send
test với postman, gọi ra. 
- tạo link test vào collection với tên gợi nhớ - get product list data
http://localhost:3000/product - method: GET
(collection - lab 5 node js)

# 7. Thực hiện chức năng thêm record - product
tại router post dòng 26 - file routes/product.js
- code đẹp, tiếng Anh
- có thể upload file ảnh, chỉnh sửa tên ảnh không bị trùng
- làm sạch dữ liệu với các hàm
- xóa file ảnh lưu trên bộ nhớ đệm
test với postman, gọi ra.
- collection: lab 5 node js
- tên gợi nhớ: add product
http://localhost:3000/product - method: POST
truyền tham số tại mục Body > form-data

# 8. Thực hiện chức năng cập nhật record - product
tại router put/:id dòng 84 - file routes/product.js
- code đẹp, tiếng Anh
- có thể upload file ảnh, chỉnh sửa tên ảnh không bị trùng
- làm sạch dữ liệu với các hàm
- xóa file ảnh lưu trên bộ nhớ đệm
- xóa file ảnh cũ, tối ưu tốc độ với LIMIT 1
test với postman, gọi ra
*** cần cập nhật đúng ID
- collection: lab 5 node js
- tên gợi nhớ: update product
http://localhost:3000/product/id - method: PUT
truyền tham số tại mục Body > form-data

# 9. Thực hiện chức năng xóa record
tại router delete/:id dòng 174 - file routes/product.js
- code đẹp, tiếng Anh
- xóa file ảnh theo sản phẩm bị xóa, tối ưu tốc độ với LIMIT 1
test với postman, gọi ra
*** cần cập nhật đúng ID
- collection: lab 5 node js
- tên gợi nhớ: delete product
http://localhost:3000/product/id - method: DELETE

# 10. Thực hiện tương tự với table product_category (loai)
route tại file app.js dòng 24, 30
tại file routes/category.js
*** add,update không dùng form-data do chỉ xử lý với req.body
*** mà dùng x-www-form-urlencoded






