# The Band Project 
Bước 1: Phân tích

Bước 2: Dựng Base 

Bước 3: Xây dựng chi tiết

Bước 4: Kiểm tra lại và Hoàn thiện

# Bước 1: Phân tích
Gọi tên các thành phần của website 
1. Header > Navigation + Search
2. Slider: Banner (Hình + Mô tả)
3. Content:
   3.1 Section: About 
   3.2 Section: Tour
   3.3 Section: Contact
   3.4 Section: Image
4. Footer
# Bước 2: Dựng Base 
## Cấu trúc thư mục project 
📦012-TheBand

 ┣ 📂img

 ┣ 📜README.MD

 ┣ 📜index.html

 ┗ 📜style.css

## Khung file index.html
```html
header.header
   
section.slider

.content
   section#about
   section#tour
   section#contact
   section#image

footer.footer
```
## Khung file Css
Dựa vào đọc hiểu design về các yếu tố để đưa ra khung file css 

1. Khối
2. Màu nền
3. Màu chữ
4. Font chữ

### 1. reset css
```scss
*,
*::before,
*::after{
  box-sizing: border-box;
  margin: 0;
}
```

### 2. khai báo biến
Màu nền, màu chữ, và font chữ
```scss
:root {
  --clr-primary-900: #000;
  --clr-primary-100: #ccc;
  --clr-accent-900: #f44336;

  --clr-neutral-100: #fff;

  --ff-primary: "Lato", sans-serif;
  --ff-accent: "Segoe UI", Arial, sans-serif;
}
```
### 3. Cài đặt các thông số mặc định khác
```scss
body {
  font-family: var(--ff-primary);
  font-size: 15px;
}

ul {
  list-style-type: none;
}

a {
  text-decoration: none;
}
```




# Bước 3: Xây dựng chi tiết

## 1. Header 
1. Cao: 46px
2. Màu nền: #000
```scss
header {
  background-color: var(--clr-primary-900);
  height: 46px;
}
```
## 2. Navigation
Dựng HTML cho navigation
```html
nav 
   ul.mainNav
     li > a|href="#" > Home
     li > a|href="band" > Band
     li > a|href="tour" > Tour
     li > a|href="contact" > Contact
     li.more  
          a|href="#" > More <i class="fa fa-caret-down"></i>
          ul.subNav
             li > a|href="#" > Merchandise
             li > a|href="#" > Extras
             li > a|href="#" > Media
```
### 2.1. CSS cho mainNav
1. Display: flex để dàn hàng ngang các list item
2. Các thẻ a để có thể tạo padding thì cần thuộc tính display có giá trị inline-block hoặc block
```scss
nav ul.mainNav {
  display: flex;
  & > li > a {
    display: inline-block;
    padding: 0 24px;
    color: var(--clr-neutral-100);
    text-transform: uppercase;
/* thủ thuật: line-height của content mà = chiều cao của phần tử cha, thì content của phần tử con sẽ được canh giữa theo trục Y */
    line-height: 46px;
    &:hover {
      background-color: var(--clr-primary-100);
      color: var(--clr-primary-900);
    }
  }
/* Khi hover qua list item có content là More sẽ hiển thị subNav */
  & li.more:hover ul.subNav {
    display: block;
  }
}
```
### 2.2. CSS cho subNav
1. CSS cho thẻ ul bao gồm các thuộc tính: background-color; box-shadow, độ rộng nhỏ nhất = 160px; Và cho ul này ẩn.
2. Cho thẻ a có display=block; khi này chiều ngang của thẻ a sẽ chiếm toàn bộ chiều ngang của thẻ cha li. Nhờ vậy, khi hover qua li hay a, đều có thể bấm vào link được, và background của các thẻ a sẽ rộng ngang nhau.
```scss
nav ul.subNav {
  display: none;
  min-width: 160px;
  background-color: var(--clr-neutral-100);
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);
  transition: all 0.2s;
  & > li {
    & > a {
      display: block;
      padding: 8px 16px;
      font-family: var(--ff-accent);
      color: var(--clr-primary-900);
      text-transform: capitalize;
      &:hover {
        background-color: var(--clr-primary-100);
      }
    }
  }
}
```
## 3. Nút search
3.1 HTML

Ý tưởng là sẽ dùng display flex ở khối cha (header), 2 div con sẽ trở thành item của display flex bao gồm (navigation và btn-search)
```html
header 
  nav
  .btn-search > <i class="fa fa-search"></i>
```

3.2 CSS cho button search 

Thêm thuộc tính display:flex cho header 
```scss
header {
  display: flex;
/* 2 item con bên trong header sẽ được float đều sang 2 cạnh trái phải của header */
  justify-content: space-between;
  background-color: var(--clr-primary-900);
  height: 46px;
}
```
```scss
header .btn-search {
  color: var(--clr-neutral-100);
/* Canh giữa theo trục Y cho icon Search */
  line-height: 46px;
  padding: 0 24px;
  background-color: transparent;
  cursor: pointer
  &:hover {
    background-color: var(--clr-accent-900);
  }
}
```

## 4. Slider 
Slider là gì:
- Slider thực chất là 1 khung nhìn cố định (giống như màn hình tivi). 
- Slider có thể chứa rất nhiều banner con bên trong, nhưng đảm bảo sao cho, mỗi 1 thời điểm chỉ hiển thị 1 banner. Nghĩa là các banner còn lại sẽ ẩn đi, hoặc di chuyển sang vị trí khác nằm ngoài khung nhìn.
- Tùy vào hiệu ứng khi banner xuất hiện, mà sẽ có cách sắp xếp vị trí từng banner cho phù hợp.

Ví dụ: Hiệu ứng là banner sẽ trượt từ bên phải vào trong khung nhìn, vậy thì: 
- Vị trí ban đầu của banner phải nằm bên ngoài khung nhìn, và ở phía bên phải.
- Sau 1 khoảng thời gian, hoặc là được user bấm vào nút nào đó, mà banner sẽ dịch chuyển sang trái đi vào khung nhìn, cho đến khi lấp đầy hết khung nhìn.

Hiệu ứng chuyển động của banner: 
- Cách di chuyển nhanh, hay chậm của banner sẽ phụ thuộc vào thuộc tính transition của banner.
- Còn nếu banner di chuyển bằng thuộc tính animation và rule @keyframe, thì tốc độ và cách chuyển động sẽ do thuộc tính animation quyết định.

Từ bản thiết kế, mình thấy là:
Mỗi slide là 1 banner có:
- Chiều rộng = 2 * Chiều cao 
- Có background là 1 tấm hình 
- Có 1 tiêu đề và 1 câu mô tả
- Hiệu ứng đổi banner là: ẩn hiện tại chỗ sau 2 giây.

### 4.1 HTML
Có 1 section slider là thẻ cha bao ngoài các item con.

Mỗi item con là 1 banner.
```html
section.slider 
   .banner.banner-1.active
       .banner-desc
           h2 > Chicago
           p
   .banner.banner-2
       .banner-desc
           h2 > Los Angeles
           p
   .banner.banner-3
       .banner-desc
           h2 > NewYork
           p
```

### 4.2 SCSS
 
CSS sẽ được code tùy theo hiệu ứng slide từ bản design.

Ở bản design này, hiệu ứng chuyển slide sẽ là thay đổi thuộc tính:
- opacity (biến mất:0; xuất hiện: 1)
- z-index: 1 (Mục đích là để tăng trải nghiệm của user, khi họ muốn quét chọn nội dung hiện trên slide)

#### 1. CSS cho slider bao ngoài: 
Mục đích để các banner con có thể sử dụng thuộc position để thay đổi vị trí
```scss
.slider {
  position: relative;
  background-color: var(--clr-primary-900);
/* thủ thuật tạo chiều cao cho div có div con là absolute */
  padding-top: 50%;
}
```
#### 2. 1 banner sẽ có 3 class chi phối bao gồm:
- class .banner: để cài đặt các thuộc tính chung của cả 3 banner 
- class .banner-*number: để cài đặt background-image riêng cho từng banner
- class .active: để cài đặt thuộc tính hiển thị cho banner. Không có class này, thì banner ko hiển thị.

```scss
& .banner {
/* thủ thuật tạo background-image có chiều ngang và chiều cao tỷ lệ 2:1 */
    padding-top: 50%;
/* dịch chuyển banner lên khung nhìn của div cha slider */
    margin-top: -50%;
    background-size: cover;
/* vị trí của các banner sẽ xếp chồng lên nhau */
    position: absolute;
    width: 100%;
    transition: var(--transition-slow);
/* Mặc định banner sẽ không hiển thị */
    opacity: 0; 
}
```
```scss
&.banner-1 {
      background-image: url("./img/img_ch.jpeg");
    }
&.banner-2 {
      background-image: url("./img/img_la.jpeg");
    }
&.banner-3 {
      background-image: url("./img/img_ny.jpeg");
    }
```
```scss
&.active {
      opacity: 1;
      z-index: 1;
    }
```

#### 4. css cho phần chữ trên banner 
```scss
& .banner-desc {
    color: var(--clr-neutral-100);
    text-align: center;
    padding-bottom: 50px;
    position: absolute;
    bottom: 0;
    width: 100%;
    & h2 {
      line-height: 36px;
      font-family: var(--ff-accent);
      font-weight: 400;
      padding-bottom: 20px;
    }
    & p {
      font-weight: 700;
    }
  }
```
### 4.3 JAVASCRIPT
Theo thiết kế, slider sẽ tự động hiệu ứng ẩn/hiện banner trong 2 giây.

Để tăng trải nghiệm người dùng: 
- Khi hover vào banner thì banner đó sẽ dừng lại để user đọc được nội dung. 
- Khi user di chuột ra ngoài banner thì banner tiếp tục chuyển động.

Ý tưởng là:
- Dùng hàm có sẵn của trình duyệt là setInterval để cứ sau 2 giây thì gắn class active cho banner cần hiển thị, và hủy class active ở các banner ko cần hiển thị.

#### 1. Lấy các element cần thiết
```javascript
let banners = document.querySelectorAll(".banner");
/* Khai báo 1 số biến cờ khác*/
let countOfBanners = banners.length - 1;
let number = 1;
/* trùng với tên class dùng ở file html */
let active = "active";
/* paused để biết là có nên dừng slide hay không */
let paused = false;
```

#### 2. Tạo hàm chạy bên trong phương thức setInterval
```javascript
let intervalSlide = setInterval(() => {
  if (!paused) {
    number > countOfBanners ? (number = 1) : number++;

    let className = `.banner-${number}`;
    let banner1 = document.querySelector(className);
    banners.forEach((banner) => {
      banner.classList.remove(active);
    });
    banner1.classList.add(active);
  }
}, 2000);
```
#### 3. Gắn lắng nghe sự kiện di chuột ở từng banner
```javascript
banners.forEach((banner) => {
  banner.addEventListener("mouseover", () => {
    paused = true;
  });
  banner.addEventListener("mouseout", () => {
    paused = false;
  });
});
```







# Bước 4: Kiểm tra lại và Hoàn thiện

## 1. Hoàn thiện sticky Menu ở header 
CSS cho các thuộc tính position của header
```scss
header{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 2;
}
```
Đẩy slider xuống 46px
```scss
.slider {
  margin-top: 46px;
}
```
## 2. Hoàn thiện responsive Menu ở header 
Khi màn hình có độ rộng nhỏ hơn 600 thì:
- Ẩn menu, chừa lại menu item HOME
- Ẩn nút search, thay bằng nút btn-menu
- Gắn sự kiện click vào nút btn-menu
- Tạo menu nav2, mặc định là ẩn
- Khi nút btn-menu được click thì nav2 hiện, click lại lần nữa thì nav2 ẩn.
B1: html cho nav2
```html
<ul class="nav2">
  <li><a href="#band">Band</a></li>
  <li><a href="#tour">tour</a></li>
  <li><a href="#contact">contact</a></li>
  <li><a href="#">merch</a></li>
</ul>
```
B2: html cho btn-menu (nằm trong header)
```html
<div class="btn-menu">
  <i class="fa fa-bars"></i>
</div>
```
B3: CSS cho nav2, btn-menu
Dùng position:absolute cho nav2 để không chiếm không gian của slider. Khi nav2 được hiển thị, nó sẽ nằm lên trên slider 
```scss
.nav2 {
  text-transform: uppercase;
  background-color: var(--clr-primary-900);
  width: 100%;
  position: absolute;
  top: 46px;
  left: 0;
  right: 0;
  z-index: 2; 
  display: none;
  &.active {
    display: block;
  }
  & a {
    display: block;
    color: var(--clr-neutral-100);
    padding: 12px 24px;
    &:hover {
      background-color: var(--clr-primary-100);
      color: var(--clr-primary-900);
    }
  }
}
```
B4: Dùng query @media để responsive
B5: Viết javascript cho sự kiện click vào btn-menu
```javascript
let btnMenu = document.querySelector(".btn-menu");
let nav2 = document.querySelector(".nav2");
btnMenu.addEventListener("click", () => {
  nav2.classList.toggle("active");
});
```
Khi click vào menu nav2 để scroll tới nội dung user muốn xem rồi, thì ẩn menu nav2 đi
```javascript
nav2.addEventListener("click", () => {
  nav2.classList.remove("active");
});
```