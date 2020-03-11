# React Native Movies App - powered by React-native ATI team

## Technologies

1. React / ReactNative
2. Js
3. React Navigation
4. Firebase
5. Redux / Redux Sagas
6. Axios
   ...along with some other libraries...

## Installation and run

As any other RN application on Github, what you need to do:

1. Well, get setup for React Native
2. Clone this repo
3. Install the dependencies with `yarn`
4. Run `react-native run-ios` or `react-native run-android`

## Coding Convention

1. Project cấu trúc theo hướng feature, tùy theo chức năng để phân chia folder, tất cả các screen khi muốn thêm mới đều coppy từ folder "base-folder"
2. Tách các component ra các element nhỏ nhất để tăng tính resuse và dễ dàng cho người đọc và maintain sau này, khi tách ra đảm bảo tính độc lập nghĩa là chuyển sang chỗ khác chỉ cần truyền props vào là work.
3. Các base element đều phải implement từ folder "component" để dùng, ví dụ "Button,Text, Image ...."
4. Không được import dạng ..../....// , tất cả phải import asoblute path
5. Cấu trúc class component
    - contructor
    - lifecycle
        - dùng static getderivedstatefromprops, và didupdate để check change
    - event
        - public: onPress = () => {}
        - private: \_onPress = () => {}
    - render các element : chú ý render các element thì đặt tên để khi người khác vào maintain thì biết phần render đó đang vẽ giao diện phần nào, ví dụ
      \_renderAvatar() , \_renderLocation()
    - connect với redux thông qua file container, không được connect trực tiếp
6. Các hàm xử lý liên quan đến datetime, asynstore, realm, đều phải viết trong folder util,
7. Các biến hệ thống, môi trường như url, env, kích thước thì khai báo trong folder contstant
8. color, themse, font được khai báo trong folder asset
9. API network, socket được khai báo trong folder api
10. no style in line, no bind function, use arrow function
11. Đặt tên biến + folder + class + function có chất xám :v
12. Mong mọi người đoàn kết làm việc chửi nhau thì được nhưng đừng có lì =))
13. dùng Yarn nhé
14. Tên folder đặt tên dạng viết thường phân cách nhau bởi dấu "-" ví dụ, login,
    login-default, login-with-account,
15. Tất cả string để phải lấy từ file vi.json, đặt tên biến dạng : logout-default, logout-with-account
