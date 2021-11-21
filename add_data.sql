SET CLIENT_ENCODING TO 'utf8';

-- insert into users (id, username, password, full_name, address, uid, phone_number, avatar) values (1, 'amanville0', 'wg62gB7', 'Ashia Manville', '786 Fairfield Plaza', 'ed66839a-a270-40ff-af8b-c6dc3c451ecd', '294 882 5183', 'https://robohash.org/situtquam.png?size=50x50&set=set1');
-- insert into users (id, username, password, full_name, address, uid, phone_number, avatar) values (2, 'cminette1', 'rnsyT5JKX', 'Celina Minette', '26 Marquette Junction', 'e4d5c96a-1b2c-4360-81c7-f828bd04f00a', '635 806 7158', 'https://robohash.org/velremid.png?size=50x50&set=set1');
-- insert into users (id, username, password, full_name, address, uid, phone_number, avatar) values (3, 'mtogwell2', 'VBB08TBgQGdL', 'Mia Togwell', '3 Macpherson Pass', 'c3180005-fe5e-469b-ac36-1d0271a3f102', '516 953 2510', 'https://robohash.org/doloremomnisut.png?size=50x50&set=set1');
-- insert into users (id, username, password, full_name, address, uid, phone_number, avatar) values (4, 'agatteridge3', 'otRQ9quzTY', 'Axel Gatteridge', '25 Moulton Place', 'd87ad31a-122d-4576-9954-631ee7030e85', '419 713 9013', 'https://robohash.org/nihilsuntvoluptatem.png?size=50x50&set=set1');
-- insert into users (id, username, password, full_name, address, uid, phone_number, avatar) values (5, 'asquire4', 'FhwQSir', 'Ashton Squire', '43 Dayton Terrace', '28d88b69-a51c-4629-a78f-33da8cc505c2', '619 729 1739', 'https://robohash.org/ducimusodiototam.png?size=50x50&set=set1');
-- insert into users (id, username, password, full_name, address, uid, phone_number, avatar) values (6, 'nghidetti5', 'I27Nrh2t9', 'Nolana Ghidetti', '9 Rutledge Trail', '06b8926d-06c3-4c1a-a3c1-f60de1dbf2c6', '891 625 4188', 'https://robohash.org/occaecatiisteaut.png?size=50x50&set=set1');
-- insert into users (id, username, password, full_name, address, uid, phone_number, avatar) values (7, 'tovell6', 'ru6Ny8omPCg', 'Therine Ovell', '9 Welch Parkway', '4b00b599-a449-4c2e-a087-e69084e054ae', '800 454 2055', 'https://robohash.org/voluptatemnonet.png?size=50x50&set=set1');
-- insert into users (id, username, password, full_name, address, uid, phone_number, avatar) values (8, 'jthomel7', 'nM72msOT', 'Joseph Thomel', '26 Sommers Hill', 'a9374091-958c-4943-a7b9-51f655c5b2a3', '586 677 8240', 'https://robohash.org/eumnecessitatibuset.png?size=50x50&set=set1');
-- insert into users (id, username, password, full_name, address, uid, phone_number, avatar) values (9, 'rdedmam8', 'uailbW4f4Qo', 'Rosaleen Dedmam', '4 Steensland Terrace', '584cc3cf-3191-4409-ab5b-92e653d2a84c', '710 181 1668', 'https://robohash.org/nemoetvel.png?size=50x50&set=set1');
-- insert into users (id, username, password, full_name, address, uid, phone_number, avatar) values (10, 'ngannan9', 'DrOcaftMSct', 'Nanette Gannan', '987 Chive Way', '0fbab097-bed7-4c25-b6d5-d8168bf7e16e', '244 355 7061', 'https://robohash.org/aliquamsolutaoccaecati.png?size=50x50&set=set1');

insert into brands (id, name) values(1, 'apple');
insert into brands (id, name) values(2, 'samsung');
insert into brands (id, name) values(3, 'xiaomi');
insert into brands (id, name) values(4, 'oppo');
insert into brands (id, name) values(5, 'nokia');
insert into brands (id, name) values(6, 'realme');
insert into brands (id, name) values(7, 'vsmart');
insert into brands (id, name) values(8, 'asus');
insert into brands (id, name) values(9, 'vivo');
insert into brands (id, name) values(10, 'oneplus');
insert into brands (id, name) values(11, 'nubia');


insert into mobiles (id, full_name,  price, brand_id, rating) values(1, 'iPhone 11 I Chính hãng VN/A', 18000000,1, 1.0);
insert into mobiles (id, full_name,  price, brand_id, rating) values(2, 'Samsung Galaxy Note 20 Ultra 5G',  32990000,2, 2.0);
insert into mobiles (id, full_name,  price, brand_id, rating) values(3, 'Xiaomi Mi 11 Lite 5G', 10490000,3, 1.0);
insert into mobiles (id, full_name,  price, brand_id, rating) values(4, 'OPPO Reno6 Z 5G', 9490000,4, 0.0);
insert into mobiles (id, full_name,  price, brand_id, rating) values(5, 'Nokia 5.4', 4190000,5, 0.0);
insert into mobiles (id, full_name,  price, brand_id, rating) values(6, 'Realme 7',6990000,6, 1.0);
insert into mobiles (id, full_name,  price, brand_id, rating) values(7, 'Vsmart Live 4', 4290000,7, 2.0);
insert into mobiles (id, full_name,  price, brand_id, rating) values(8, 'ASUS ROG Phone 5 chính hãng', 22990000,8, 4.0);
insert into mobiles (id, full_name,  price, brand_id, rating) values(9, 'Vivo V20', 8490000,9, 4.0);
insert into mobiles (id, full_name,  price, brand_id, rating) values(10, 'OnePlus Nord CE 5G', 8990000,10, 0.0);
insert into mobiles (id, full_name,  price, brand_id, rating) values(11, 'Nubia Red Magic 6', 17990000,11, 1.0);


-- insert into specifications (id, mobile_id, name, value) values(1, 1, 'Công nghệ màn hình', 'IPS LCD');
-- insert into specifications (id, mobile_id, name, value) values(2, 1, 'Camera sau', 'Camera kép 12MP: - Camera góc rộng: ƒ/1.8 aperture - Camera siêu rộng: ƒ/2.4 aperture');
-- insert into specifications (id, mobile_id, name, value) values(3, 1, 'Camera trước', '12 MP, ƒ/2.2 aperture');
-- insert into specifications (id, mobile_id, name, value) values(4, 1, 'Chipset', 'A13 Bionic');
-- insert into specifications (id, mobile_id, name, value) values(5, 1, 'Dung lượng RAM', '4 GB');
-- insert into specifications (id, mobile_id, name, value) values(6, 1, 'Bộ nhớ trong', '64 GB');
-- insert into specifications (id, mobile_id, name, value) values(7, 1, 'Pin', '3110 mAh');
-- insert into specifications (id, mobile_id, name, value) values(8, 1, 'Thẻ SIM', 'Nano-SIM + eSIM');
-- insert into specifications (id, mobile_id, name, value) values(9, 1, 'Hệ điều hành', 'iOS 13 hoặc cao hơn (Tùy vào phiên bản phát hành)');
-- insert into specifications (id, mobile_id, name, value) values(10, 1, 'Độ phân giải màn hình', '1792 x 828 pixel');
-- insert into specifications (id, mobile_id, name, value) values(11, 1, 'Tính năng màn hình', 'True-tone');
-- insert into specifications (id, mobile_id, name, value) values(12, 1, 'Loại CPU', 'Hexa-core');
-- insert into specifications (id, mobile_id, name, value) values(13, 1, 'GPU', 'Apple GPU');
-- insert into specifications (id, mobile_id, name, value) values(14, 1, 'Quay video', 'Quay video 4K ở tốc độ 24 fps, 30 fps hoặc 60 fps');
-- insert into specifications (id, mobile_id, name, value) values(15, 1, 'Quay video trước', '4K@24/30/60fps, 1080p@30/60/120fps, gyro-EIS');
-- insert into specifications (id, mobile_id, name, value) values(16, 1, 'Kích thước', '150.9mm - 75.7mm - 8.3mm');
-- insert into specifications (id, mobile_id, name, value) values(17, 1, 'Trọng lượng', '194 g');
-- insert into specifications (id, mobile_id, name, value) values(18, 1, 'Chất liệu mặt lưng', 'Kính');
-- insert into specifications (id, mobile_id, name, value) values(19, 1, 'Chất liệu khung viền', 'Kim loại');
-- insert into specifications (id, mobile_id, name, value) values(20, 1, 'Công nghệ sạc', 'Sạc nhanh 18WPower Delivery 2.0');
-- insert into specifications (id, mobile_id, name, value) values(21, 1, 'Cổng sạc', 'Lightning');
-- insert into specifications (id, mobile_id, name, value) values(22, 1, 'Hồng ngoại', 'Không');
-- insert into specifications (id, mobile_id, name, value) values(23, 1, 'Jack tai nghe 3.5', 'Không');
-- insert into specifications (id, mobile_id, name, value) values(24, 1, 'Cảm biến vân tay', 'Không');
-- insert into specifications (id, mobile_id, name, value) values(25, 1, 'Các loại cảm biến', 'Cảm biến ánh sáng, Cảm biến áp kế, Cảm biến gia tốc, Cảm biến tiệm cận, Con quay hồi chuyển, La bàn');
-- insert into specifications (id, mobile_id, name, value) values(26, 1, 'Công nghệ NFC', 'Có');
-- insert into specifications (id, mobile_id, name, value) values(27, 1, 'Khe cắm thẻ nhớ', 'Không');
-- insert into specifications (id, mobile_id, name, value) values(28, 1, 'Wi-Fi', '802.11ax Wi‑Fi 6 with 2x2 MIMO');
-- insert into specifications (id, mobile_id, name, value) values(29, 1, 'Bluetooth', '5.0');
-- insert into specifications (id, mobile_id, name, value) values(30, 1, 'GPS', 'GPS/GNSS');
-- insert into specifications (id, mobile_id, name, value) values(31, 1, 'Kiểu màn hình', 'Tai thỏ');
-- insert into specifications (id, mobile_id, name, value) values(32, 1, 'Tính năng camera', 'Chụp góc rộng, Chụp xóa phông, Chụp Zoom xa, Chống rung, Quay video 4K');
-- insert into specifications (id, mobile_id, name, value) values(33, 1, 'Tính năng đặc biệt', 'Sạc không dây');
-- insert into specifications (id, mobile_id, name, value) values(34, 1, 'Kích thước màn hình', '6.1 inches');

-- insert into capacities (id, name) values(1, '128 GB');
-- insert into options (id, mobile_id, capacity_id, name, price) values(1, 1, 1, 'Trắng', '16000000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(2, 1, 1, 'Vàng', '16000000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(3, 1, 1, 'Xanh lá', '16200000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(4, 1, 1, 'Đen', '16200000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(5, 1, 1, 'Đỏ', '16000000');
-- insert into capacities (id, name) values(2, '64 GB');
-- insert into options (id, mobile_id, capacity_id, name, price) values(6, 1, 2, 'Tím', '14700000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(7, 1, 2, 'Trắng', '14700000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(8, 1, 2, 'Vàng', '14700000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(9, 1, 2, 'Xanh lá', '14700000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(10, 1, 2, 'Đen ', '14500000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(11, 1, 2, 'Đỏ', '14500000');
-- insert into capacities (id, name) values(3, 'Note 20 Ultra 5G');
-- insert into options (id, mobile_id, capacity_id, name, price) values(12, 2, 3, 'Trắng', '19990000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(13, 2, 3, 'Vàng Đồng ', '19990000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(14, 2, 3, 'Đen', '19990000');
-- insert into capacities (id, name) values(4, 'Note 20 Ultra');
-- insert into options (id, mobile_id, capacity_id, name, price) values(15, 2, 4, 'Trắng', '18990000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(16, 2, 4, 'Vàng Đồng ', '18990000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(17, 2, 4, 'Đen', '18990000');
-- insert into capacities (id, name) values(5, 'Note 20');
-- insert into capacities (id, name) values(6, 'Realme 7i');
-- insert into options (id, mobile_id, capacity_id, name, price) values(18, 6, 6, 'Xanh dương', '5390000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(19, 6, 6, 'Xanh lá', '5390000');
-- insert into capacities (id, name) values(7, 'Realme 7');
-- insert into options (id, mobile_id, capacity_id, name, price) values(20, 6, 7, 'Trắng ', '5090000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(21, 6, 7, 'Xanh', '5090000');
-- insert into capacities (id, name) values(8, 'Realme 7 Pro');
-- insert into options (id, mobile_id, capacity_id, name, price) values(22, 6, 8, 'Bạc', '7590000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(23, 6, 8, 'Xanh ', '7590000');
-- insert into capacities (id, name) values(9, 'Vivo V20');
-- insert into options (id, mobile_id, capacity_id, name, price) values(24, 9, 9, 'Xanh', '6800000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(25, 9, 9, 'Đen', '6800000');
-- insert into capacities (id, name) values(10, 'V20 SE');
-- insert into options (id, mobile_id, capacity_id, name, price) values(26, 9, 10, 'Xanh', '5890000');
-- insert into options (id, mobile_id, capacity_id, name, price) values(27, 9, 10, 'Đen', '5890000');
-- insert into capacities (id, name) values(11, 'Red Magic 6 Pro', );
-- insert into options (id, mobile_id, capacity_id, name, price) values(28, 11, 11, 'Bạc', '19990000');
-- insert into capacities (id, name) values(12, 'Red Magic 6');
-- insert into options (id, mobile_id, capacity_id, name, price) values(29, 11, 12, 'Đen', '16990000');

-- insert into cart (id, user_id) values(1, 1);
-- insert into cart (id, user_id) values(2, 2);
-- insert into cart (id, user_id) values(3, 3);
-- insert into cart (id, user_id) values(4, 4);

-- insert into cart_details(id, cart_id, option_id) values(1, 1, 15)
-- insert into cart_details(id, cart_id, option_id) values(2, 2, 16)
-- insert into cart_details(id, cart_id, option_id) values(3, 3, 21)
-- insert into cart_details(id, cart_id, option_id) values(4, 4, 3)

-- insert into orders (id, user_id) values(1, 1);
-- insert into orders (id, user_id) values(2, 2);
-- insert into orders (id, user_id) values(3, 3);
-- insert into orders (id, user_id) values(4, 4);

-- insert into order_details(id, order_id, option_id) values(1, 1, 15);
-- insert into order_details(id, order_id, option_id) values(2, 2, 14);
-- insert into order_details(id, order_id, option_id) values(3, 3, 21);
-- insert into order_details(id, order_id, option_id) values(4, 4, 23);


-- insert into comments(id, user_id, mobile_id, body, rating) values(1, 1, 13, 'Good', 5);
-- insert into comments(id, user_id, mobile_id, body, rating) values(2, 2, 18, 'Not bad', 4);
-- insert into comments(id, user_id, mobile_id, body, rating) values(3, 3, 21, 'Normal', 4);
-- insert into comments(id, user_id, mobile_id, body, rating) values(4, 4, 23, 'Too bad', 1);
