# 0. Tiền chuẩn bị
Đọc hiểu và theo dõi bài giảng, 
chuyến các kiến thức đã học được sang tiếng Anh

# 1. Chuẩn bị Database
3 table gồm: product, product_category, user
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
- format đẹp

# 6. Thực hiện chức năng danh sách record
tại router get dòng 7 - file routes/product.js
- gộp sql cùng hàm query, code đẹp
- gọi tất cả dữ liệu ra res.json
- tìm hiểu res.json có thể format, định dạng khác với res.send
test với postman, gọi ra. 
- tạo link test vào collection với tên gợi nhớ - get product list data
http://localhost:3000/product - method: GET
(collection - lab 5 node js)

# 7. Thực hiện chức năng thêm record



