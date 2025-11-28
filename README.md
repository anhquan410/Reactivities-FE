// 1

- [x] Render List Activities with activities state
- [x] Click on "Create Activity" => open ActivityForm

- [x] In ActivityList, click on "View" => open ActivityDetail + fill data to detail
- [x] In ActivityList, click "Delete" => delete activity on FE

- [x] In ActivityDetail, click "Edit" button => show ActivityForm with select Activity
- [x] In ActivityDetail, click "Cancel" button => cancel ActivityDetail

- [x] In ActivityForm, click "Cancel" button => cancel ActivityForm with select Activity
- [x] In ActivityForm, click "Submit" button => update data

// 2

- [ ] Move all logic to context (useContext)
- [ ] use Reducer to manage complex state (formType, selectedActivity)

// 3
// Authentication flow phía FE

- Gửi req đến server
- server trả về token cho backend => cấp quyền

- Đặc điểm của cookie: ko thể edit, tự động đính kèm vào header khi gửi req (thêm withCredentials: true)

// Khi nào React query refetch data

- khi queryKey changes
- observer mount: khi component mount -> unmount -> mount
- window nhận focus event
  refetchOnMount: false
  refetchOnWindowFocus: false
  refetchOnReconnect: false
- the device goes offline

// Todo

- Trong profile:
  - [x] Phần Header, show data của user
  - [ ] Phần About, show data của user,
        Thêm nút Edit => bấm Edit show form to edit => Cancel/Save
  - [ ] Phần Photo, show data
        Add Photo, Delete Photo
  - [ ] Phần Following, show data
  - [ ] Phần Follower, show data

// 4
