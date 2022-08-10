 {
 #   Stellar Explorer
 [! [Bản dựng trạng thái] (https://travis-ci.org/chatch/stellarexplorer.svg?branch=master)] (https://travis-ci.org/chatch/stellarexplorer)
 Một công cụ khám phá sổ cái cho [Stellar] (https://stellar.org).
Công khai: https://steexp.com
Kiểm tra: https://testnet.steexp.com
Địa phương: http: // localhost: 3000
## Resource
### Danh sách
| Tài nguyên | URI |
| ------------ | -------------------------------------------- |
| Hoạt động | [ / Operating ] (https://steexp.com/operations) |
| Giao dịch | [ / txs ] (https://steexp.com/txs) |
| Cái bút ký | [ / ledgers ] (https://steexp.com/ledgers) |
| Thanh toán | [ / Payment ] (https://steexp.com/payments) |
| Giao dịch | [ / trades ] (https://steexp.com/trades) |
| Hiệu ứng | [ / Effects ] (https://steexp.com/effects) |
### Directory
| Tài nguyên | URI |
| --------------- | ------------------------------------------ |
| Tài sản | [ / asset ] (https://steexp.com/assets) |
| Neo | [ / anchor ] (https://steexp.com/anchors) |
| Sở giao dịch | [ / sàn giao dịch ] (https://steexp.com/exchanges) |
| Hồ sơ phát | [ / pool ] (https://steexp.com/pools) |
### Account
| Tài nguyên | URI |
| -------------------- | -------------------------------------------------- -------------------------------------------------- -------------------------------------------------- - |
| theo address Lien bang | [ /account/stellar\*fed.network ] (https://steexp.com/account/stellar*fed.network) |
| theo khai báo Address | [ / account / GAREELUB43IRHWEASCFBLKHURCGMHE5IF6XSE7EXDLACYHGRHM43RFOX ] (https://steexp.com/account/GAREELUB43IRHWEASCFBLKHURCGMHE5IF6XSE7EXDLACYHGRHM43RFOFOX) |
#### Chuyển hướng
| Tài nguyên | URI |
| ---------------- | -------------------------------------------------- -------------------------------------------------- ----- |
| Tab Cân bằng | [ /account/stellar\*fed.network#balances ] (https://steexp.com/account/stellar*fed.network#balances) |
| Tab Thanh toán | [ /account/stellar\*fed.network#payments ] (https://steexp.com/account/stellar*fed.network#payments) |
| Mua hàng | [ /account/stellar\*fed.network#offers ] (https://steexp.com/account/stellar*fed.network#offers) |
| Tab Hiệu ứng | [ /account/stellar\*fed.network#effects ] (https://steexp.com/account/stellar*fed.network#effects) |
| Tab Hoạt động | [ /account/stellar\*fed.network#operations ] (https://steexp.com/account/stellar*fed.network#operations) |
| Tab Giao dịch | [ /account/stellar\*fed.network#transactions ] (https://steexp.com/account/stellar*fed.network#transactions) |
| Tab Đăng ký | [ /account/stellar\*fed.network#signs ] (https://steexp.com/account/stellar*fed.network#signs) |
| Flag tag | [ /account/stellar\*fed.network#flags ] (https://steexp.com/account/stellar*fed.network#flags) |
| Dữ liệu tab | [ /account/stellar\*fed.network#data ] (https: //steexpcom/account/stellar*fed.network#data) |
### Tìm kiếm
| Tài nguyên | URI |
| --------------------- | -------------------------------------------------- -------------------------------------------------- -------------------------------------------------- ---------------- |
| Liên kết địa chỉ | [ /search/steexp\*fed.network ] (https://steexp.com/search/steexp*fed.network) |
| Cộng đồng địa chỉ | [ / search / GAREELUB43IRHWEASCFBLKHURCGMHE5IF6XSE7EXDLACYHGRHM43RFOX ] (https://steexp.com/search/GAREELUB43IRHWEASCFBLKHURCGMHE5IF6XSE7EXDLACYHGRHM43RFOX) |
| Cái bút ký | [ / search / 10000000 ] (https://steexp.com/search/10000000) |
| Giao dịch | [ / search / 26a568681712a44a515b2c90dcfaadb3ed2c40dc60254638407937bee4767071 ] (https://steexp.com/search/26a568681712a44a515b2c90dcfaadb3ed2c40dc60254638407937bee476707937bee47) |
| Mã tài sản | [ / search / NGN ] (https://steexp.com/search/NGN) |
| Mỏ neo tên | [ / search / ripplefox ] (https://steexp.com/search/ripplefox) |
| Mỏ neo tên (Một phần) | [ / search / fox ] (https://steexp.com/search/fox) |
### Misc
| Tài nguyên | URI |
| ----------- | -------------------------------------------------- -------------------------------------------------- -------------------------------------------------- -------- |
| Giao dịch | [ / tx / 26a568681712a44a515b2c90dcfaadb3ed2c40dc60254638407937bee4767071 ] (https://steexp.com/tx/26a568681712a44a515b2c90dcfaadb3ed2c40dc60254638407937bee47) |
| Cái bút ký | [ / ledger / 10000000 ] (https://steexp.com/ledger/10000000) |
| Neo | [ /anchor/apay.io ] (https://steexp.com/anchor/apay.io) |
| Tài sản | [ / asset / NGN ] (https://steexp.com/asset/NGN) |
## Khám phá Mạng Phát triển Riêng / Địa phương <a name="private-networks"> </a>
steexp sẽ kết nối với một phiên bản đường chân trời cục bộ tại http: // localhost: 8000 theo mặc định. Nếu bạn đang chạy một cục cục mạng riêng để phát triển, điều này khá thuận lợi để duyệt các thay đổi của bạn đối với cái sổ.
Ngoài ra, bạn có thể chạy cục bộ kết nối với testnet hoặc các trường hợp đồng mạng công cộng. Để thực hiện công việc này, hãy xác định các bí danh này cho localhost:
 ``
127.0.1.1 testnet.local # cho steexp use đường chân trời testnet
127.0.1.1 publicnet.local # cho steexp use mainnet đường chân trời
 ``
Điều hướng đến http: //testnet.local: 3000 hoặc http: //publicnet.local: 3000 để chọn mạng mà bạn muốn khám phá.
## Phát triển
LƯU Ý: use npm thay vì sợi để cài đặt các phụ thuộc - xem [# 15] (https://github.com/chatch/stellarexplorer/issues/15) để biết chi tiết
Xem phần [Khám phá Mạng Phát triển Riêng / Cục bộ] (# mạng riêng) để kết nối với các phụ trợ mạng khác nhau. Theo default, steexp sẽ tìm kiếm một bản sao của đường chân trời.
Startup:
 ``
npm tôi && npm start
 ``
Bài kiểm tra:
 ``
npm tôi && npm kiểm tra
 ``
Build:
 ``
npm i && npm run build
 ``
## Language
Sử dụng ngôn ngữ chọn ở góc trên cùng bên phải để thay đổi ngôn ngữ.
Các dịch tập tin ở đây:
https://github.com/chatch/stellarexplorer/tree/master/src/languages
Gửi yêu cầu kéo với mới ngôn ngữ hoặc ngôn ngữ lỗi sửa chữa ở đó.

}
